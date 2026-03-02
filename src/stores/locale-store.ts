import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'en' | 'pt' | 'es' | 'fr'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'pt', 'es', 'fr']
export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  pt: '🇵🇹',
  es: '🇪🇸',
  fr: '🇫🇷',
}

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'scit-locale',
    },
  ),
)

export function isValidLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}
