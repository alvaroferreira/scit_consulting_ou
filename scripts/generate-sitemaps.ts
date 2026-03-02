import { writeFileSync } from 'fs'
import { resolve } from 'path'

const SITE_URL = 'https://www.scitconsulting.eu'
const LOCALES = ['en', 'pt', 'es', 'fr']
const DEFAULT_LOCALE = 'en'

// All routes (without locale prefix)
const STATIC_ROUTES = [
  '/',
  '/about',
  '/approach',
  '/contact',
  '/resources',
  '/privacy-policy',
  '/terms',
  '/services',
  '/services/ai-automation',
  '/services/ai-agents',
  '/services/chatbots',
  '/services/ai-tools',
  '/services/ai-consulting',
  '/services/digital-transformation',
  '/case-studies',
  '/blog',
  '/tools/roi-calculator',
  '/tools/ai-readiness-assessment',
]

// Blog post slugs
const BLOG_SLUGS = [
  'ai-agents-transforming-business-operations-2025',
  'roi-of-ai-automation-year-one',
  'choosing-right-ai-strategy-business-size',
  '5-signs-business-ready-ai-implementation',
  'conversational-ai-vs-traditional-chatbots',
  'ai-in-healthcare-practical-applications',
  'building-ai-first-culture-leadership-guide',
  'hidden-costs-not-automating-b2b',
  'data-privacy-ai-european-businesses',
  'pilot-to-production-scaling-ai-projects',
]

// Case study slugs
const CASE_STUDY_SLUGS = [
  'physiotherapy-clinic-chain',
  'luxury-elderly-care',
  'european-b2b-services',
  'real-estate-portfolio',
  'medical-clinic-network',
]

const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...BLOG_SLUGS.map((slug) => `/blog/${slug}`),
  ...CASE_STUDY_SLUGS.map((slug) => `/case-studies/${slug}`),
]

const TODAY = new Date().toISOString().split('T')[0]

function generateHreflangLinks(path: string): string {
  return LOCALES.map(
    (loc) =>
      `      <xhtml:link rel="alternate" hreflang="${loc}" href="${SITE_URL}/${loc}${path}" />`
  ).join('\n') + `\n      <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LOCALE}${path}" />`
}

function generateLocaleSitemap(locale: string): string {
  const urls = ALL_ROUTES.map(
    (path) => `  <url>
    <loc>${SITE_URL}/${locale}${path}</loc>
    <lastmod>${TODAY}</lastmod>
${generateHreflangLinks(path)}
  </url>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
}

function generateSitemapIndex(): string {
  const sitemaps = LOCALES.map(
    (locale) => `  <sitemap>
    <loc>${SITE_URL}/sitemap-${locale}.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`
}

// Generate files
const distDir = resolve(import.meta.dirname, '..', 'dist')

// Sitemap index
writeFileSync(resolve(distDir, 'sitemap.xml'), generateSitemapIndex())
console.log('Generated sitemap.xml (index)')

// Per-locale sitemaps
for (const locale of LOCALES) {
  const filename = `sitemap-${locale}.xml`
  writeFileSync(resolve(distDir, filename), generateLocaleSitemap(locale))
  console.log(`Generated ${filename}`)
}

console.log(`\nTotal: ${ALL_ROUTES.length} routes × ${LOCALES.length} locales = ${ALL_ROUTES.length * LOCALES.length} URLs`)
