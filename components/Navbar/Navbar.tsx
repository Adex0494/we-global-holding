'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Menu,
  X,
  Home,
  Info,
  LayoutGrid,
  LogIn,
  ChevronRight,
  User,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

type NavItem = {
  labelKey: TranslationKey;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { labelKey: 'navHome', href: '/', icon: Home },
  { labelKey: 'navAbout', href: '/about', icon: Info },
  { labelKey: 'navDivisions', href: '/divisions', icon: LayoutGrid },
  { labelKey: 'navLogin', href: '/login', icon: LogIn },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const activeHref = useMemo(
    () => navItems.find((i) => i.href === pathname)?.href ?? '',
    [pathname]
  );

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  /* Close on ESC */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  /* Lock body scroll */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* NAVBAR */}
      <nav className="glass-navbar flex items-center justify-between px-6 md:px-16 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image
            src="/logo-we.png"
            alt="WE Logo"
            width={24}
            height={24}
            className="opacity-90"
          />
          <span className="text-lg font-semibold tracking-wide text-black">
            Global Holding Inc.
          </span>
        </Link>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="w-9 h-9 rounded-full bg-black/90 flex items-center justify-center text-white text-xs shadow-sm">
            N
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/35 border border-white/40 shadow-sm transition-all duration-200 hover:bg-white/50 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-black" />
            ) : (
              <Menu className="w-5 h-5 text-black" />
            )}
          </button>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link text-sm font-medium transition text-black ${
                activeHref === item.href
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}

          <div className="w-9 h-9 rounded-full bg-black/90 flex items-center justify-center text-white text-xs shadow-sm cursor-pointer">
            N
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER WRAPPER — RIGHT ALIGNED BY LAYOUT */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex justify-end ${
          menuOpen
            ? 'visible pointer-events-auto'
            : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <button
          onClick={closeMenu}
          aria-label="Close menu"
          className={`absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* DRAWER PANEL */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          className={`relative h-full w-[88%] max-w-sm glass-card p-6
            rounded-l-[22px] rounded-r-none
            border-l border-white/30 border-r-0
            transition-all duration-300 ease-out
            ${
              menuOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[100%] opacity-0'
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black/90 flex items-center justify-center text-white shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {t('navWelcome')}
                </p>
                <p className="text-xs text-neutral-600">WE Global Holding</p>
              </div>
            </div>

            <button
              onClick={closeMenu}
              className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/35 border border-white/40 shadow-sm transition-all duration-200 hover:bg-white/50 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Links */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeHref;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3 bg-white/30 border border-white/35 shadow-sm transition-all duration-200 hover:bg-white/45 hover:-translate-y-[1px] ${
                    isActive ? 'bg-white/55 border-white/55' : ''
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center ${
                        isActive ? 'bg-black/10' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5 text-black" />
                    </span>
                    <span className="text-sm font-medium text-neutral-900">
                      {t(item.labelKey)}
                    </span>
                  </span>

                  <ChevronRight className="w-4 h-4 text-neutral-600 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/30">
            <p className="text-xs text-neutral-600">
              {t('navFooterText')}
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}
