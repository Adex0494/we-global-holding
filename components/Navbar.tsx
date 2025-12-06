import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/30 border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT AREA - LOGO + TEXT */}
        <div className="flex items-center gap-3">
          <Image
            src="/WE-logo-transparent.png"
            alt="WE Logo"
            width={38}
            height={38}
            className="object-contain opacity-95 pt-1"
          />
          <span className="text-white font-medium text-lg tracking-wide">
            WE Global
          </span>
        </div>

        {/* RIGHT AREA - NAV LINKS */}
        <div className="flex items-center space-x-10 text-white text-sm">
          <a className="nav-link" href="/">
            Home
          </a>
          <a className="nav-link" href="/about">
            About
          </a>
          <a className="nav-link" href="/divisions">
            Divisions
          </a>
          <a className="nav-link" href="/login">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
