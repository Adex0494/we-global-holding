import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/30 border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT AREA - LOGO + TEXT */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo-we.png"
              alt="WE Logo"
              width={38}
              height={38}
              className="object-contain opacity-95 cursor-pointer pt-1"
            />
          </Link>

          <Link href="/">
            <span className="text-white font-medium text-lg tracking-wide cursor-pointer">
              WE Global Holding
            </span>
          </Link>
        </div>

        {/* RIGHT AREA - NAV LINKS */}
        <div className="flex items-center space-x-10 text-white text-sm">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/about">
            About
          </Link>
          <Link className="nav-link" href="/divisions">
            Divisions
          </Link>
          <Link className="nav-link" href="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
