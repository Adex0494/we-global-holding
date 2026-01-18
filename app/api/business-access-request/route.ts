import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getSession } from '@/lib/auth';

// Error codes that map to translation keys on the frontend
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  MISSING_FIELDS: 'MISSING_FIELDS',
  PENDING_REQUEST: 'PENDING_REQUEST',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

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

    // Basic required-field validation (app-level)
    // Note: userId is obtained from session, not request body
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

    // Check for existing pending request for the same user
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

    const request = await prisma.businessAccessRequest.create({
      data: {
        userId,
        legalCompanyName,
        incorporationCountry,
        incorporationState: incorporationState || null,
        registrationNumber,
        companyType,
        businessAddress,
        website: website || null,
        corporateEmail,
        industry,
        description,
        socialLink: socialLink || null,
        representativeName,
        representativePosition,
        interestExplanation,
        status: 'PENDING',
      },
    });

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
