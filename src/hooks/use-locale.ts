import { useParams } from '@tanstack/react-router'
import type { Locale } from '@/stores/locale-store'
import { DEFAULT_LOCALE, isValidLocale } from '@/stores/locale-store'

export function useLocale(): Locale {
  const params = useParams({ strict: false }) as { locale?: string }
  const locale = params.locale
  if (locale && isValidLocale(locale)) return locale
  return DEFAULT_LOCALE
}
