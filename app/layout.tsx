import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import './globals.css';
import Navbar from '@/components/Navbar';
import { LanguageProvider, LANGUAGE_COOKIE_NAME } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { SessionProvider, type Session } from '@/lib/auth/SessionContext';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'WE Global Holding Inc.',
  description: 'Bridging global innovation, investment & growth.',
  icons: {
    icon: '/favicon.png',
  },
};

async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;

  // If cookie exists and is valid, use it
  if (localeCookie === 'en' || localeCookie === 'es') {
    return localeCookie;
  }

  // Otherwise, detect from Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // Check if Spanish is preferred
  if (acceptLanguage.toLowerCase().includes('es')) {
    return 'es';
  }

  return 'en';
}

async function getInitialSession(): Promise<Session | null> {
  const sessionPayload = await getSession();
  if (!sessionPayload) return null;

  return {
    userId: sessionPayload.userId,
    email: sessionPayload.email,
    role: sessionPayload.role,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialLocale, initialSession] = await Promise.all([
    getInitialLocale(),
    getInitialSession(),
  ]);

  return (
    <html lang={initialLocale}>
      <body className="relative min-h-screen text-black">
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-neutral-900 focus-visible:text-white focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
        >
          Skip to main content
        </a>

        {/* Global Background */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/pinkBg.webp')" }}
          />
          <div className="absolute inset-0 bg-we-silver/80" />
        </div>

        <LanguageProvider initialLocale={initialLocale}>
          <SessionProvider initialSession={initialSession}>
            <Navbar />
            <div id="main-content">
              {children}
            </div>
          </SessionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
