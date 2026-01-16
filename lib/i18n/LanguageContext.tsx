'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Locale, TranslationKey } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectBrowserLanguage(): Locale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  // Check navigator.language first (most reliable)
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';

  // Check if it starts with 'es' for Spanish
  if (browserLang.toLowerCase().startsWith('es')) {
    return 'es';
  }

  // Check navigator.languages array for Spanish
  if (navigator.languages && navigator.languages.length > 0) {
    for (const lang of navigator.languages) {
      if (lang.toLowerCase().startsWith('es')) {
        return 'es';
      }
    }
  }

  // Default to English
  return 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Detect language on mount
  useEffect(() => {
    const detectedLocale = detectBrowserLanguage();
    setLocaleState(detectedLocale);
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[locale][key];
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
  }), [locale, setLocale, t]);

  // Prevent hydration mismatch by rendering with default locale until hydrated
  if (!isHydrated) {
    const defaultT = (key: TranslationKey): string => translations.en[key];
    return (
      <LanguageContext.Provider value={{ locale: 'en', setLocale, t: defaultT }}>
        {children}
      </LanguageContext.Provider>
    );
  }

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
