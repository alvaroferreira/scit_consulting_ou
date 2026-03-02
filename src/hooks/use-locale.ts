import { useParams } from '@tanstack/react-router'
import type { Locale } from '@/stores/locale-store'
import { DEFAULT_LOCALE, isValidLocale } from '@/stores/locale-store'

export function useLocale(): Locale {
  const params = useParams({ strict: false }) as { locale?: string }
  const locale = params.locale
  if (locale && isValidLocale(locale)) return locale
  return DEFAULT_LOCALE
}

export function useLocalePath(path: string): string {
  const locale = useLocale()
  // Strip leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `/${locale}/${cleanPath}`
}
