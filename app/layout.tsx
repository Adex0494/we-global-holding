import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { LanguageProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'WE Global Holding Inc.',
  description: 'Bridging global innovation, investment & growth.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-black">
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-300"
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

        <LanguageProvider>
          <Navbar />
          <div id="main-content">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
