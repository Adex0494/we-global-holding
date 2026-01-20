import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
);

interface SessionPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

async function getSessionFromRequest(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get('session')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// Routes that require authentication only
const AUTH_PROTECTED_ROUTES = [
  '/account',
  '/business-access/request',
  '/dashboard',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* routes - only accessible if role === 'ADMIN'
  if (pathname.startsWith('/admin')) {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/account', request.url));
    }

    return NextResponse.next();
  }

  // Protect auth-required routes - only accessible to authenticated users
  const isAuthProtectedRoute = AUTH_PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isAuthProtectedRoute) {
    const session = await getSessionFromRequest(request);

    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/business-access/:path*',
    '/dashboard/:path*',
  ],
};
