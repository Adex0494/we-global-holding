import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

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
        {/* Global Background */}
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/pinkBg.webp')" }}
          />
          <div className="absolute inset-0 bg-we-silver/80" />
        </div>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
