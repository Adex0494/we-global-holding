import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
  '/business-access/request',
  '/dashboard',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get('session');

    if (!sessionCookie?.value) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/business-access/:path*',
    '/dashboard/:path*',
  ],
};
