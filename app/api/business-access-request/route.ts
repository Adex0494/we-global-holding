import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getSession } from '@/lib/auth';
import {
  isValidEmail,
  isValidURL,
  isValidCompanyType,
  isWithinWordLimit,
  sanitizeString,
  sanitizeEmail,
  type ValidationError,
} from '@/lib/validation';
import { VALIDATION } from '@/lib/constants';

// Error codes that map to translation keys on the frontend
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  MISSING_FIELDS: 'MISSING_FIELDS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  PENDING_REQUEST: 'PENDING_REQUEST',
  ALREADY_APPROVED: 'ALREADY_APPROVED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
} as const;

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const request = await prisma.businessAccessRequest.findFirst({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ ok: true, request }, { status: 200 });
  } catch (error) {
    console.error('Get user request error:', error);
    return NextResponse.json(
      { ok: false, errorCode: ERROR_CODES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Get userId from session
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const userId = session.userId;

    // Check if user already has approved access or pending request
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { businessStatus: true },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    // Prevent submission if user already has approved access
    if (user.businessStatus === 'APPROVED') {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.ALREADY_APPROVED },
        { status: 409 }
      );
    }

    // Check for existing pending request
    if (user.businessStatus === 'PENDING') {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.PENDING_REQUEST },
        { status: 409 }
      );
    }

    const body = await req.json();

    const {
      legalCompanyName,
      incorporationCountry,
      incorporationState,
      registrationNumber,
      companyType,
      businessAddress,
      website,
      corporateEmail,
      industry,
      description,
      socialLink,
      representativeName,
      representativePosition,
      interestExplanation,
    } = body;

    // Basic required-field validation
    const requiredFields = [
      'legalCompanyName',
      'incorporationCountry',
      'registrationNumber',
      'companyType',
      'businessAddress',
      'corporateEmail',
      'industry',
      'description',
      'representativeName',
      'representativePosition',
      'interestExplanation',
    ] as const;

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          errorCode: ERROR_CODES.MISSING_FIELDS,
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    // Collect validation errors
    const errors: ValidationError[] = [];

    // Sanitize inputs
    const sanitizedData = {
      legalCompanyName: sanitizeString(legalCompanyName),
      incorporationCountry: sanitizeString(incorporationCountry),
      incorporationState: incorporationState ? sanitizeString(incorporationState) : null,
      registrationNumber: sanitizeString(registrationNumber),
      companyType: sanitizeString(companyType),
      businessAddress: sanitizeString(businessAddress),
      website: website ? sanitizeString(website) : null,
      corporateEmail: sanitizeEmail(corporateEmail),
      industry: sanitizeString(industry),
      description: sanitizeString(description),
      socialLink: socialLink ? sanitizeString(socialLink) : null,
      representativeName: sanitizeString(representativeName),
      representativePosition: sanitizeString(representativePosition),
      interestExplanation: sanitizeString(interestExplanation),
    };

    // Validate company type is a valid enum
    if (!isValidCompanyType(sanitizedData.companyType)) {
      errors.push({
        field: 'companyType',
        message: 'Invalid company type. Must be LLC, CORP, SRL, or OTHER',
      });
    }

    // Validate corporate email format
    if (!isValidEmail(sanitizedData.corporateEmail)) {
      errors.push({
        field: 'corporateEmail',
        message: 'Invalid email format',
      });
    }

    // Validate website URL format if provided
    if (sanitizedData.website && !isValidURL(sanitizedData.website)) {
      errors.push({
        field: 'website',
        message: 'Invalid URL format. Must start with http:// or https://',
      });
    }

    // Validate social link URL format if provided
    if (sanitizedData.socialLink && !isValidURL(sanitizedData.socialLink)) {
      errors.push({
        field: 'socialLink',
        message: 'Invalid URL format. Must start with http:// or https://',
      });
    }

    // Validate interest explanation word count
    if (!isWithinWordLimit(sanitizedData.interestExplanation)) {
      errors.push({
        field: 'interestExplanation',
        message: `Interest explanation must not exceed ${VALIDATION.MAX_INTEREST_WORDS} words`,
      });
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          errorCode: ERROR_CODES.VALIDATION_ERROR,
          errors,
        },
        { status: 400 }
      );
    }

    // Double-check for existing pending request (race condition protection)
    const existingRequest = await prisma.businessAccessRequest.findFirst({
      where: {
        userId,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        {
          ok: false,
          errorCode: ERROR_CODES.PENDING_REQUEST,
        },
        { status: 409 }
      );
    }

    // Create request and update user status atomically
    const [request] = await prisma.$transaction([
      prisma.businessAccessRequest.create({
        data: {
          userId,
          legalCompanyName: sanitizedData.legalCompanyName,
          incorporationCountry: sanitizedData.incorporationCountry,
          incorporationState: sanitizedData.incorporationState,
          registrationNumber: sanitizedData.registrationNumber,
          companyType: sanitizedData.companyType as 'LLC' | 'CORP' | 'SRL' | 'OTHER',
          businessAddress: sanitizedData.businessAddress,
          website: sanitizedData.website,
          corporateEmail: sanitizedData.corporateEmail,
          industry: sanitizedData.industry,
          description: sanitizedData.description,
          socialLink: sanitizedData.socialLink,
          representativeName: sanitizedData.representativeName,
          representativePosition: sanitizedData.representativePosition,
          interestExplanation: sanitizedData.interestExplanation,
          status: 'PENDING',
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { businessStatus: 'PENDING' },
      }),
    ]);

    return NextResponse.json({ ok: true, request }, { status: 201 });
  } catch (error) {
    // Prisma-known errors (validation, constraints, enums, etc.)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Create business access request error:', error);

      return NextResponse.json(
        {
          ok: false,
          errorCode: ERROR_CODES.INTERNAL_ERROR,
        },
        { status: 400 }
      );
    }

    // Truly unexpected errors
    console.error('Unexpected business access error:', error);

    return NextResponse.json(
      { ok: false, errorCode: ERROR_CODES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}
