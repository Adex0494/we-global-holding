'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Divisions', href: '/divisions' },
    { label: 'Login', href: '/login' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <nav
        className="
          glass-navbar 
          flex items-center justify-between 
          px-8 md:px-16 py-4 
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-we.png" alt="WE Logo" className="h-6 opacity-90" />
          <span className="text-lg font-semibold tracking-wide text-black">
            Global Holding Inc.
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                text-sm font-medium transition
                ${pathname === item.href ? 'opacity-100' : 'opacity-60'}
                hover:opacity-100 text-black
              `}
            >
              {item.label}
            </Link>
          ))}

          {/* USER AVATAR (FAKE) */}
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm shadow-md cursor-pointer">
            N
          </div>
        </div>
      </nav>
    </header>
  );
}
