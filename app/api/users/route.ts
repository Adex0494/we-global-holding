import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
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
