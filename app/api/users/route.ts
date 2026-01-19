import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhone,
  isValidDateOfBirth,
  sanitizeString,
  sanitizeEmail,
  type ValidationError,
} from '@/lib/validation';
import { VALIDATION } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, dateOfBirth, phone } = body;

    // Collect validation errors
    const errors: ValidationError[] = [];

    // Required fields check
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeString(fullName);
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedPhone = phone ? sanitizeString(phone) : null;

    // Validate name length
    if (!isValidName(sanitizedName)) {
      errors.push({
        field: 'fullName',
        message: `Name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`,
      });
    }

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      errors.push({
        field: 'email',
        message: 'Invalid email format',
      });
    }

    // Validate password length
    if (!isValidPassword(password)) {
      errors.push({
        field: 'password',
        message: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`,
      });
    }

    // Validate phone if provided
    if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
      errors.push({
        field: 'phone',
        message: `Phone must be at least ${VALIDATION.MIN_PHONE_LENGTH} characters`,
      });
    }

    // Validate date of birth if provided
    if (dateOfBirth && !isValidDateOfBirth(dateOfBirth)) {
      errors.push({
        field: 'dateOfBirth',
        message: 'Invalid date of birth',
      });
    }

    // Return all validation errors at once
    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Validation failed', errors },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: sanitizedName,
        email: sanitizedEmail,
        passwordHash,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone: sanitizedPhone,
      },
    });

    // Don't return passwordHash in response
    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          accessStatus: user.accessStatus,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    ) {
      const target = (
        error as {
          meta?: { target?: string[] };
        }
      ).meta?.target;

      if (target?.includes('email')) {
        return NextResponse.json(
          { ok: false, error: 'Email already registered' },
          { status: 409 }
        );
      }

      if (target?.includes('phone')) {
        return NextResponse.json(
          { ok: false, error: 'Phone number already registered' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { ok: false, error: 'Unique constraint violation' },
        { status: 409 }
      );
    }
    console.error('Create user error:', error);

    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
