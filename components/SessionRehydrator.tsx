'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

const REHYDRATION_KEY = 'session_rehydrated';

export default function SessionRehydrator() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run rehydration on initial app load (fresh browser session)
    if (typeof window === 'undefined') return;

    // Skip if already rehydrated this browser session
    if (sessionStorage.getItem(REHYDRATION_KEY)) return;

    // Skip rehydration on protected pages (they handle their own redirects)
    const skipPaths = ['/account', '/admin', '/dashboard', '/business-access'];
    if (skipPaths.some((p) => pathname.startsWith(p))) {
      sessionStorage.setItem(REHYDRATION_KEY, 'true');
      return;
    }

    // Skip on login page (it handles its own redirect)
    if (pathname === '/login') {
      sessionStorage.setItem(REHYDRATION_KEY, 'true');
      return;
    }

    async function rehydrate() {
      try {
        const res = await fetch('/api/auth/session', { credentials: 'include' });
        const data = await res.json();

        if (data.ok && data.session) {
          const redirectUrl =
            data.session.role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : ROUTES.ACCOUNT;
          router.replace(redirectUrl);
        }
      } catch {
        // Ignore errors - user stays on current page
      } finally {
        sessionStorage.setItem(REHYDRATION_KEY, 'true');
      }
    }

    rehydrate();
  }, [router, pathname]);

  return null;
}
