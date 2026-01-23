'use client';

import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Locale, TranslationKey } from './translations';
import { LANGUAGE_COOKIE_NAME, COOKIE_MAX_AGE } from './constants';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function setLanguageCookie(locale: Locale) {
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getLanguageCookie(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${LANGUAGE_COOKIE_NAME}=([^;]+)`));
  const value = match?.[2];
  if (value === 'en' || value === 'es') {
    return value;
  }
  return null;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // After mount, check if cookie differs from server's detection
  // Trust the cookie (user's explicit choice) over Accept-Language
  useEffect(() => {
    const cookieLocale = getLanguageCookie();

    if (cookieLocale && cookieLocale !== initialLocale) {
      // Cookie exists and differs from server - trust the cookie
      setLocaleState(cookieLocale);
      document.documentElement.lang = cookieLocale;
    } else if (!cookieLocale) {
      // No cookie exists - persist the server-detected locale
      setLanguageCookie(initialLocale);
    }
  }, [initialLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setLanguageCookie(newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[locale][key];
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
  }), [locale, setLocale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { t, locale } = useLanguage();
  return { t, locale };
}
