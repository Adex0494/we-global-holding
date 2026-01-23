import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession, getSessionCookieOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

/**
 * DEV ONLY: Check if this is the admin shortcut login
 * Works only when NODE_ENV === 'development'
 * Credentials: admin/admin@gmail.com with password: admin
 */
function isDevAdminLogin(email: string, password: string): boolean {
  if (process.env.NODE_ENV !== 'development') {
    return false;
  }
  const normalizedEmail = email.toLowerCase().trim();
  return (
    (normalizedEmail === 'admin' || normalizedEmail === 'admin@gmail.com') &&
    password === 'admin'
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // DEV ONLY: Admin shortcut login
    if (isDevAdminLogin(email, password)) {
      // Find or verify an admin user exists in the database
      const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });

      if (adminUser) {
        // Create session for the admin user
        const token = await createSession({
          userId: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
        });

        const cookieOptions = getSessionCookieOptions();
        const response = NextResponse.json(
          {
            ok: true,
            user: {
              id: adminUser.id,
              email: adminUser.email,
              fullName: adminUser.fullName,
              role: adminUser.role,
            },
          },
          { status: 200 }
        );

        response.cookies.set(cookieOptions.name, token, {
          httpOnly: cookieOptions.httpOnly,
          secure: cookieOptions.secure,
          sameSite: cookieOptions.sameSite,
          path: cookieOptions.path,
          maxAge: cookieOptions.maxAge,
        });

        return response;
      }
      // If no admin user exists, fall through to normal login flow
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // Generic message to prevent email enumeration
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password with stored hash
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set session cookie and return success
    const cookieOptions = getSessionCookieOptions();
    const response = NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
