'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Menu,
  X,
  Home,
  Info,
  LayoutGrid,
  LogIn,
  LogOut,
  ChevronRight,
  User,
  Shield,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import type { TranslationKey, Locale } from '@/lib/i18n';

type NavItem = {
  labelKey: TranslationKey;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

type Role = 'ADMIN' | 'USER';

interface Session {
  userId: string;
  email: string;
  role: Role;
}

interface LanguageToggleProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function LanguageToggle({ locale, onLocaleChange }: LanguageToggleProps) {
  return (
    <div
      className="relative flex items-center h-8 p-0.5 rounded-xl bg-white/30 border border-white/40 shadow-sm"
      role="group"
      aria-label="Language selection"
    >
      {/* Sliding indicator */}
      <div
        className={`absolute h-7 w-9 rounded-[10px] bg-black/90 shadow-sm transition-transform duration-200 ease-out ${
          locale === 'es' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />
      {/* EN button */}
      <button
        type="button"
        onClick={() => onLocaleChange('en')}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
        className={`relative z-10 w-9 h-7 text-xs font-semibold rounded-[10px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-1 ${
          locale === 'en' ? 'text-white' : 'text-black/70 hover:text-black'
        }`}
      >
        EN
      </button>
      {/* ES button */}
      <button
        type="button"
        onClick={() => onLocaleChange('es')}
        aria-label="Cambiar a Español"
        aria-pressed={locale === 'es'}
        className={`relative z-10 w-9 h-7 text-xs font-semibold rounded-[10px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-1 ${
          locale === 'es' ? 'text-white' : 'text-black/70 hover:text-black'
        }`}
      >
        ES
      </button>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, locale, setLocale } = useLanguage();

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  // Fetch session on mount
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch('/api/auth/session', { credentials: 'include' });
        const data = await res.json();
        if (data.ok && data.session) {
          setSession(data.session);
        } else {
          setSession(null);
        }
      } catch {
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSession();
  }, []);

  // Logout handler
  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setSession(null);
      closeMenu();
      router.push('/login');
    } catch {
      // Ignore errors
    }
  }, [router]);

  // Build navigation items based on auth state
  const navItems: NavItem[] = useMemo(() => {
    const baseItems: NavItem[] = [
      { labelKey: 'navHome', href: '/', icon: Home },
      { labelKey: 'navDivisions', href: '/divisions', icon: LayoutGrid },
    ];

    if (!session) {
      // Logged-out users: Home, Divisions, About, Login
      return [
        ...baseItems,
        { labelKey: 'navAbout', href: '/about', icon: Info },
        { labelKey: 'navLogin', href: '/login', icon: LogIn },
      ];
    }

    if (session.role === 'ADMIN') {
      // Admin users: Home, Divisions, Admin, Logout
      return [
        ...baseItems,
        { labelKey: 'navAdmin', href: '/admin/dashboard', icon: Shield },
        { labelKey: 'navLogout', href: '#', icon: LogOut, onClick: handleLogout },
      ];
    }

    // Regular users: Home, Divisions, Account, Logout
    return [
      ...baseItems,
      { labelKey: 'navAccount', href: '/account', icon: User },
      { labelKey: 'navLogout', href: '#', icon: LogOut, onClick: handleLogout },
    ];
  }, [session, handleLogout]);

  const activeHref = useMemo(
    () => navItems.find((i) => i.href === pathname)?.href ?? '',
    [pathname, navItems]
  );

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

  // Get user initials for avatar
  const userInitial = session?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="fixed top-0 left-0 w-full z-40" role="banner">
      {/* NAVBAR */}
      <nav className="glass-navbar flex items-center justify-between px-6 md:px-16 py-4" aria-label="Main navigation">
        {/* Left section: Language Toggle + Logo */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <LanguageToggle locale={locale} onLocaleChange={setLocale} />

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 rounded-lg"
            onClick={closeMenu}
            aria-label="WE Global Holding Inc. - Go to homepage"
          >
          <Image
            src="/logo-we.png"
            alt=""
            width={24}
            height={24}
            className="opacity-90"
            aria-hidden="true"
          />
          <span className="text-lg font-semibold tracking-wide text-black">
            Global Holding Inc.
          </span>
        </Link>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-3 md:hidden">
          {!isLoading && session && (
            <div
              className="w-9 h-9 rounded-full bg-black/90 flex items-center justify-center text-white text-xs shadow-sm"
              role="img"
              aria-label="User avatar"
            >
              {userInitial}
            </div>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/35 border border-white/40 shadow-sm transition-all duration-200 hover:bg-white/50 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-black" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-black" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10" role="menubar">
          {navItems.map((item) => (
            item.onClick ? (
              <button
                key={item.labelKey}
                onClick={item.onClick}
                role="menuitem"
                className="nav-link text-sm font-medium transition text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 rounded-md px-2 py-1 opacity-60 hover:opacity-100"
              >
                {t(item.labelKey)}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                aria-current={activeHref === item.href ? 'page' : undefined}
                className={`nav-link text-sm font-medium transition text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 rounded-md px-2 py-1 ${
                  activeHref === item.href
                    ? 'opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            )
          ))}

          {!isLoading && session && (
            <div
              className="w-9 h-9 rounded-full bg-black/90 flex items-center justify-center text-white text-xs shadow-sm"
              role="img"
              aria-label="User avatar"
            >
              {userInitial}
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE DRAWER WRAPPER — RIGHT ALIGNED BY LAYOUT */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex justify-end ${
          menuOpen
            ? 'visible pointer-events-auto'
            : 'invisible pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <button
          onClick={closeMenu}
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
          className={`absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* DRAWER PANEL */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
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
              <div
                className="w-10 h-10 rounded-2xl bg-black/90 flex items-center justify-center text-white shadow-sm"
                role="img"
                aria-label="User avatar"
              >
                {session ? (
                  <span className="text-sm font-medium">{userInitial}</span>
                ) : (
                  <User className="w-5 h-5" aria-hidden="true" />
                )}
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
              aria-label="Close navigation menu"
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/35 border border-white/40 shadow-sm transition-all duration-200 hover:bg-white/50 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
            >
              <X className="w-5 h-5 text-black" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav aria-label="Mobile navigation">
            <ul className="space-y-2" role="menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === activeHref;

                if (item.onClick) {
                  return (
                    <li key={item.labelKey} role="none">
                      <button
                        onClick={() => {
                          item.onClick?.();
                        }}
                        role="menuitem"
                        tabIndex={menuOpen ? 0 : -1}
                        className="w-full group flex items-center justify-between rounded-2xl px-4 py-3 bg-white/30 border border-white/35 shadow-sm transition-all duration-200 hover:bg-white/45 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Icon className="w-5 h-5 text-black" />
                          </span>
                          <span className="text-sm font-medium text-neutral-900">
                            {t(item.labelKey)}
                          </span>
                        </span>

                        <ChevronRight className="w-4 h-4 text-neutral-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      tabIndex={menuOpen ? 0 : -1}
                      className={`group flex items-center justify-between rounded-2xl px-4 py-3 bg-white/30 border border-white/35 shadow-sm transition-all duration-200 hover:bg-white/45 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 ${
                        isActive ? 'bg-white/55 border-white/55' : ''
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center ${
                            isActive ? 'bg-black/10' : ''
                          }`}
                          aria-hidden="true"
                        >
                          <Icon className="w-5 h-5 text-black" />
                        </span>
                        <span className="text-sm font-medium text-neutral-900">
                          {t(item.labelKey)}
                        </span>
                      </span>

                      <ChevronRight className="w-4 h-4 text-neutral-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

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
