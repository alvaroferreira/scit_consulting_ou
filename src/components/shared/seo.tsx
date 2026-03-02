import { useEffect } from 'react'
import { useLocale } from '@/hooks/use-locale'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/stores/locale-store'

const SITE_NAME = 'SCIT Consulting'
const SITE_URL = 'https://scitconsulting.eu'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

const DEFAULT_TITLE = 'SCIT Consulting - AI-First Digital Transformation'
const DEFAULT_DESCRIPTION =
  'We implement AI tools, automate processes and build intelligent agents. From strategy to execution, SCIT Consulting transforms your business with artificial intelligence.'

const LOCALE_TO_OG: Record<string, string> = {
  en: 'en_GB',
  pt: 'pt_PT',
  es: 'es_ES',
  fr: 'fr_FR',
}

interface SEOProps {
  title: string
  description: string
  path: string
  ogImage?: string
}

function getOrCreateMeta(attribute: string, value: string): HTMLMetaElement {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`
  )
  if (!element) {
    element = document.createElement('meta')
    if (attribute.startsWith('property')) {
      element.setAttribute('property', value)
    } else {
      element.setAttribute('name', value)
    }
    document.head.appendChild(element)
  }
  return element
}

function getOrCreateLink(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let element = document.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (hreflang) element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }
  return element
}

export function SEO({ title, description, path, ogImage }: SEOProps) {
  const locale = useLocale()

  useEffect(() => {
    const isHomePage = path === '/'
    const fullTitle = isHomePage ? title : `${title} | ${SITE_NAME}`
    const canonicalUrl = `${SITE_URL}/${locale}${path}`
    const image = ogImage ?? DEFAULT_OG_IMAGE

    // Set document title and lang
    document.title = fullTitle
    document.documentElement.lang = locale

    // Meta description
    const metaDescription = getOrCreateMeta('name', 'description')
    metaDescription.setAttribute('content', description)

    // Canonical link
    const canonical = getOrCreateLink('canonical')
    canonical.setAttribute('href', canonicalUrl)

    // Hreflang tags for all locales
    const hreflangLinks: HTMLLinkElement[] = []
    for (const loc of SUPPORTED_LOCALES) {
      const link = getOrCreateLink('alternate', loc)
      link.setAttribute('href', `${SITE_URL}/${loc}${path}`)
      hreflangLinks.push(link)
    }
    // x-default (EN)
    const xDefault = getOrCreateLink('alternate', 'x-default')
    xDefault.setAttribute('href', `${SITE_URL}/${DEFAULT_LOCALE}${path}`)
    hreflangLinks.push(xDefault)

    // Open Graph tags
    const ogTitle = getOrCreateMeta('property', 'og:title')
    ogTitle.setAttribute('content', fullTitle)

    const ogDesc = getOrCreateMeta('property', 'og:description')
    ogDesc.setAttribute('content', description)

    const ogUrl = getOrCreateMeta('property', 'og:url')
    ogUrl.setAttribute('content', canonicalUrl)

    const ogImg = getOrCreateMeta('property', 'og:image')
    ogImg.setAttribute('content', image)

    const ogLocale = getOrCreateMeta('property', 'og:locale')
    ogLocale.setAttribute('content', LOCALE_TO_OG[locale] || 'en_GB')

    // og:locale:alternate for other locales
    const ogAlternateElements: HTMLMetaElement[] = []
    for (const loc of SUPPORTED_LOCALES) {
      if (loc === locale) continue
      const el = getOrCreateMeta('property', `og:locale:alternate:${loc}`)
      el.setAttribute('property', 'og:locale:alternate')
      el.setAttribute('content', LOCALE_TO_OG[loc] || 'en_GB')
      ogAlternateElements.push(el)
    }

    // Twitter tags
    const twTitle = getOrCreateMeta('property', 'twitter:title')
    twTitle.setAttribute('content', fullTitle)

    const twDesc = getOrCreateMeta('property', 'twitter:description')
    twDesc.setAttribute('content', description)

    const twUrl = getOrCreateMeta('property', 'twitter:url')
    twUrl.setAttribute('content', canonicalUrl)

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE
      document.documentElement.lang = DEFAULT_LOCALE

      metaDescription.setAttribute('content', DEFAULT_DESCRIPTION)
      canonical.setAttribute('href', `${SITE_URL}/`)

      ogTitle.setAttribute('content', DEFAULT_TITLE)
      ogDesc.setAttribute('content', DEFAULT_DESCRIPTION)
      ogUrl.setAttribute('content', SITE_URL)
      ogImg.setAttribute('content', DEFAULT_OG_IMAGE)
      ogLocale.setAttribute('content', 'en_GB')

      twTitle.setAttribute('content', DEFAULT_TITLE)
      twDesc.setAttribute('content', DEFAULT_DESCRIPTION)
      twUrl.setAttribute('content', SITE_URL)

      // Remove hreflang and og:locale:alternate elements
      hreflangLinks.forEach((el) => el.remove())
      ogAlternateElements.forEach((el) => el.remove())
    }
  }, [title, description, path, ogImage, locale])

  return null
}
