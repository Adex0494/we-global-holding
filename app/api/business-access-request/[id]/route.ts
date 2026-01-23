import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import {
  isValidUUID,
  isValidEmail,
  isValidURL,
  isValidCompanyType,
  isWithinWordLimit,
  sanitizeString,
  sanitizeEmail,
  type ValidationError,
} from '@/lib/validation';
import { VALIDATION } from '@/lib/constants';

const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INVALID_ID: 'INVALID_ID',
  NOT_PENDING: 'NOT_PENDING',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// DELETE: Cancel a pending request
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidUUID(id)) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.INVALID_ID },
        { status: 400 }
      );
    }

    const request = await prisma.businessAccessRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.NOT_FOUND },
        { status: 404 }
      );
    }

    // Ensure user owns this request
    if (request.userId !== session.userId) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.FORBIDDEN },
        { status: 403 }
      );
    }

    // Can only cancel pending requests
    if (request.status !== 'PENDING') {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.NOT_PENDING },
        { status: 409 }
      );
    }

    // Delete request and reset user status atomically
    await prisma.$transaction([
      prisma.businessAccessRequest.delete({
        where: { id },
      }),
      prisma.user.update({
        where: { id: session.userId },
        data: { businessStatus: 'NONE' },
      }),
    ]);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Cancel request error:', error);
    return NextResponse.json(
      { ok: false, errorCode: ERROR_CODES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}

// PATCH: Update a pending request
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidUUID(id)) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.INVALID_ID },
        { status: 400 }
      );
    }

    const existingRequest = await prisma.businessAccessRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.NOT_FOUND },
        { status: 404 }
      );
    }

    // Ensure user owns this request
    if (existingRequest.userId !== session.userId) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.FORBIDDEN },
        { status: 403 }
      );
    }

    // Can only edit pending requests
    if (existingRequest.status !== 'PENDING') {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.NOT_PENDING },
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

    // Collect validation errors
    const errors: ValidationError[] = [];

    if (!isValidCompanyType(sanitizedData.companyType)) {
      errors.push({
        field: 'companyType',
        message: 'Invalid company type. Must be LLC, CORP, SRL, or OTHER',
      });
    }

    if (!isValidEmail(sanitizedData.corporateEmail)) {
      errors.push({
        field: 'corporateEmail',
        message: 'Invalid email format',
      });
    }

    if (sanitizedData.website && !isValidURL(sanitizedData.website)) {
      errors.push({
        field: 'website',
        message: 'Invalid URL format. Must start with http:// or https://',
      });
    }

    if (sanitizedData.socialLink && !isValidURL(sanitizedData.socialLink)) {
      errors.push({
        field: 'socialLink',
        message: 'Invalid URL format. Must start with http:// or https://',
      });
    }

    if (!isWithinWordLimit(sanitizedData.interestExplanation, VALIDATION.MAX_INTEREST_WORDS)) {
      errors.push({
        field: 'interestExplanation',
        message: `Interest explanation must not exceed ${VALIDATION.MAX_INTEREST_WORDS} words`,
      });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, errorCode: ERROR_CODES.VALIDATION_ERROR, errors },
        { status: 400 }
      );
    }

    const updatedRequest = await prisma.businessAccessRequest.update({
      where: { id },
      data: {
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
      },
    });

    return NextResponse.json({ ok: true, request: updatedRequest }, { status: 200 });
  } catch (error) {
    console.error('Update request error:', error);
    return NextResponse.json(
      { ok: false, errorCode: ERROR_CODES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}
