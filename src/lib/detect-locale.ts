import { type Locale, DEFAULT_LOCALE, isValidLocale } from '@/stores/locale-store'

const STORAGE_KEY = 'scit-locale'
const API_TIMEOUT = 2000

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // Portuguese-speaking
  PT: 'pt',
  BR: 'pt',
  AO: 'pt',
  MZ: 'pt',
  // Spanish-speaking
  ES: 'es',
  AR: 'es',
  MX: 'es',
  CL: 'es',
  CO: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  UY: 'es',
  PY: 'es',
  BO: 'es',
  CR: 'es',
  PA: 'es',
  DO: 'es',
  GT: 'es',
  HN: 'es',
  SV: 'es',
  NI: 'es',
  CU: 'es',
  // French-speaking
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  CA: 'fr',
  SN: 'fr',
  CI: 'fr',
  ML: 'fr',
  BF: 'fr',
  NE: 'fr',
  TG: 'fr',
  BJ: 'fr',
  GA: 'fr',
  CG: 'fr',
  CD: 'fr',
  MG: 'fr',
  CM: 'fr',
  HT: 'fr',
  LU: 'fr',
  MC: 'fr',
}

function getNavigatorLocale(): Locale {
  const lang = navigator.language?.split('-')[0]?.toLowerCase()
  if (lang && isValidLocale(lang)) return lang
  return DEFAULT_LOCALE
}

async function fetchLocaleFromIP(): Promise<Locale> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    })
    const data = await response.json()
    const countryCode = data?.country_code?.toUpperCase()
    return COUNTRY_TO_LOCALE[countryCode] || DEFAULT_LOCALE
  } catch {
    return getNavigatorLocale()
  } finally {
    clearTimeout(timeout)
  }
}

export async function detectLocale(): Promise<Locale> {
  // Check localStorage first (Zustand persisted state)
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const locale = parsed?.state?.locale
      if (locale && isValidLocale(locale)) return locale
    }
  } catch {
    // Ignore parse errors
  }

  // Detect via IP geolocation
  const locale = await fetchLocaleFromIP()

  // Persist for future visits
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { locale }, version: 0 }),
    )
  } catch {
    // Ignore storage errors
  }

  return locale
}
