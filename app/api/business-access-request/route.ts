import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
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
    const requiredFields = [
      'userId',
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
          error: 'Missing required fields',
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
          error: 'A business access request is already pending for this user',
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
          error: error.message,
        },
        { status: 400 }
      );
    }

    // Truly unexpected errors
    console.error('Unexpected business access error:', error);

    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
