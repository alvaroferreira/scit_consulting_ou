import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight, IconBuildingSkyscraper, IconUsers, IconBrain, IconWorld } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Stats } from '@/components/home/stats'
import { TechnologiesSection } from '@/components/about/technologies-section'
import { MarketsMap } from '@/components/about/markets-map'
import { CompanyTimeline } from '@/components/about/company-timeline'
import { useLocale } from '@/hooks/use-locale'

export const Route = createFileRoute('/$locale/about')({
  component: AboutPage,
})

const highlightIcons = [IconWorld, IconBuildingSkyscraper, IconBrain, IconUsers]

function AboutPage() {
  const locale = useLocale()
  const { t } = useTranslation('about')

  const highlights = t('mission.highlights', { returnObjects: true }) as Array<{ title: string; description: string }>
  const values = t('values.items', { returnObjects: true }) as Array<{ title: string; description: string }>

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        path="/about"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              {t('mission.title')}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('mission.paragraph1')}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('mission.paragraph2')}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('mission.paragraph3')}
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1">
            {highlights.map((item, index) => {
              const Icon = highlightIcons[index]
              return (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Stats />

      {/* Technologies */}
      <TechnologiesSection />

      {/* Markets */}
      <MarketsMap />

      {/* Timeline */}
      <CompanyTimeline />

      {/* Values */}
      <Section>
        <SectionHeading
          title={t('values.title')}
          subtitle={t('values.subtitle')}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/$locale/contact" params={{ locale }}>
                {t('cta.button')}
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
