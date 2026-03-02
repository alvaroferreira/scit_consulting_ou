import { useTranslation } from 'react-i18next'

const partners = [
  { name: 'OpenAI', logo: '/images/partners/openai.svg' },
  { name: 'Anthropic', logo: '/images/partners/anthropic.svg' },
  { name: 'Google Cloud', logo: '/images/partners/google-cloud.svg' },
  { name: 'Microsoft Azure', logo: '/images/partners/azure.svg' },
  { name: 'Cloudflare', logo: '/images/partners/cloudflare.svg' },
  { name: 'Vercel', logo: '/images/partners/vercel.svg' },
  { name: 'Supabase', logo: '/images/partners/supabase.svg' },
]

export function TechPartners() {
  const { t } = useTranslation('home')
  return (
    <section className="border-b border-border bg-muted/30 py-8">
      <div className="container mx-auto">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('techPartners.title')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex items-center justify-center"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-7 w-auto opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-200 dark:opacity-30 dark:group-hover:opacity-100 dark:group-hover:brightness-100"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
