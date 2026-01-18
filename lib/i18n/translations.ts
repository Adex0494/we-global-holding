import { en } from './locales/en';
import { es } from './locales/es';

export type Locale = 'en' | 'es';

export const translations = {
  en,
  es,
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}
