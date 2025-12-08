'use client';

import Image from 'next/image';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 nav-glass">
      <nav
        className="
        mx-auto max-w-[1300px]
        px-6 h-16
        flex items-center justify-between
      "
      >
        {/* LOGO + BRAND */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-we.png"
            alt="WE Logo"
            width={120} // ancho base → Next recalcula proporción
            height={40} // altura base → buen balance
            priority
            className="h-8 w-auto md:h-10 pt-1"
          />

          <span className="font-semibold text-lg tracking-wide text-white">
            WE Global
          </span>
        </Link>

        {/* NAV LINKS */}
        <ul className="flex items-center space-x-10 text-white/90">
          <li>
            <Link href="/" className="nav-link hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/divisions" className="nav-link hover:text-white">
              Divisions
            </Link>
          </li>
          <li>
            <Link href="/login" className="nav-link hover:text-white">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
