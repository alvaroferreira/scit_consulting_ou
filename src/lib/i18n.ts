import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import type { Locale } from '@/stores/locale-store'

// Dynamic import map for locale files
const localeModules = import.meta.glob('../locales/**/*.json')

// Cache loaded namespaces
const loadedNamespaces = new Set<string>()

function getResourcePath(locale: string, ns: string): string {
  return `../locales/${locale}/${ns}.json`
}

// Load a namespace dynamically
export async function loadNamespace(
  locale: string,
  ns: string,
): Promise<void> {
  const key = `${locale}:${ns}`
  if (loadedNamespaces.has(key)) return

  const path = getResourcePath(locale, ns)
  const loader = localeModules[path]
  if (!loader) return

  try {
    const mod = (await loader()) as { default: Record<string, unknown> }
    i18n.addResourceBundle(locale, ns, mod.default, true, true)
    loadedNamespaces.add(key)
  } catch {
    // If locale not found, try fallback to EN
    if (locale !== 'en') {
      await loadNamespace('en', ns)
    }
  }
}

// Load blog content by slug with fallback
export async function loadBlogContent(
  locale: string,
  slug: string,
): Promise<void> {
  const ns = `blog-content/${slug}`
  const key = `${locale}:${ns}`
  if (loadedNamespaces.has(key)) return

  const path = `../locales/${locale}/blog-content/${slug}.json`
  const loader = localeModules[path]

  if (loader) {
    try {
      const mod = (await loader()) as { default: Record<string, unknown> }
      i18n.addResourceBundle(locale, ns, mod.default, true, true)
      loadedNamespaces.add(key)
      return
    } catch {
      // Fall through to EN fallback
    }
  }

  // Fallback to EN
  if (locale !== 'en') {
    await loadBlogContent('en', slug)
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'pt', 'es', 'fr'],
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],

    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: false,
    },

    // Start with empty resources - loaded dynamically
    resources: {},
  })

export async function changeLocale(locale: Locale): Promise<void> {
  await loadNamespace(locale, 'common')
  await i18n.changeLanguage(locale)
  document.documentElement.lang = locale
}

export default i18n
