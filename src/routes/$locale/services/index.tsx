import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { services, pillars } from '@/data/services'
import { IconRocket, IconBulb, IconRefresh } from '@tabler/icons-react'
import { useLocale } from '@/hooks/use-locale'

export const Route = createFileRoute('/$locale/services/')({
  component: ServicesPage,
})

const pillarIcons = {
  implement: IconRocket,
  consult: IconBulb,
  transform: IconRefresh,
}

function ServicesPage() {
  const locale = useLocale()
  const { t } = useTranslation('services')

  return (
    <>
      <SEO
        title={t('page.title')}
        description={t('page.subtitle')}
        path="/services"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('page.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('page.subtitle')}
          </p>
        </div>
      </section>

      {/* Pillars */}
      <Section>
        <SectionHeading
          title={t('page.pillarsTitle')}
          subtitle={t('page.pillarsSubtitle')}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons]
            return (
              <div key={pillar.id} className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-scit-purple to-scit-cyan text-white">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold">{t(`pillars.${pillar.id}.title`)}</h3>
                <p className="text-sm font-medium text-scit-purple">{t(`pillars.${pillar.id}.subtitle`)}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t(`pillars.${pillar.id}.description`)}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* All Services */}
      <Section className="bg-muted/30">
        <SectionHeading title={t('page.allServicesTitle')} subtitle={t('page.allServicesSubtitle')} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                to={`/$locale/services/${service.id}` as string}
                params={{ locale }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold group-hover:text-scit-purple transition-colors">
                  {t(`services.${service.id}.shortTitle`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {t(`services.${service.id}.description`)}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-scit-purple">
                  {t('template.learnMore')}
                  <IconArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t('page.ctaTitle')}
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            {t('page.ctaSubtitle')}
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/$locale/contact" params={{ locale }}>{t('template.bookConsultation')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
