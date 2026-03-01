import { useEffect } from 'react'

const SITE_NAME = 'SCIT Consulting'
const SITE_URL = 'https://scitconsulting.eu'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

const DEFAULT_TITLE = 'SCIT Consulting - AI-First Digital Transformation'
const DEFAULT_DESCRIPTION =
  'We implement AI tools, automate processes and build intelligent agents. From strategy to execution, SCIT Consulting transforms your business with artificial intelligence.'

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
    element.setAttribute(attribute.split('=')[0], value)
    if (attribute.startsWith('property')) {
      element.setAttribute('property', value)
    } else {
      element.setAttribute('name', value)
    }
    document.head.appendChild(element)
  }
  return element
}

function getOrCreateLink(rel: string): HTMLLinkElement {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  return element
}

export function SEO({ title, description, path, ogImage }: SEOProps) {
  useEffect(() => {
    const isHomePage = path === '/'
    const fullTitle = isHomePage ? title : `${title} | ${SITE_NAME}`
    const canonicalUrl = `${SITE_URL}${path}`
    const image = ogImage ?? DEFAULT_OG_IMAGE

    // Set document title
    document.title = fullTitle

    // Meta description
    const metaDescription = getOrCreateMeta('name', 'description')
    metaDescription.setAttribute('content', description)

    // Canonical link
    const canonical = getOrCreateLink('canonical')
    canonical.setAttribute('href', canonicalUrl)

    // Open Graph tags
    const ogTitle = getOrCreateMeta('property', 'og:title')
    ogTitle.setAttribute('content', fullTitle)

    const ogDesc = getOrCreateMeta('property', 'og:description')
    ogDesc.setAttribute('content', description)

    const ogUrl = getOrCreateMeta('property', 'og:url')
    ogUrl.setAttribute('content', canonicalUrl)

    const ogImg = getOrCreateMeta('property', 'og:image')
    ogImg.setAttribute('content', image)

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

      metaDescription.setAttribute('content', DEFAULT_DESCRIPTION)

      canonical.setAttribute('href', `${SITE_URL}/`)

      ogTitle.setAttribute('content', DEFAULT_TITLE)
      ogDesc.setAttribute('content', DEFAULT_DESCRIPTION)
      ogUrl.setAttribute('content', SITE_URL)
      ogImg.setAttribute('content', DEFAULT_OG_IMAGE)

      twTitle.setAttribute('content', DEFAULT_TITLE)
      twDesc.setAttribute('content', DEFAULT_DESCRIPTION)
      twUrl.setAttribute('content', SITE_URL)
    }
  }, [title, description, path, ogImage])

  return null
}
