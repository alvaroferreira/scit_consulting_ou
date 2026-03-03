import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { processSteps } from '@/data/process'
import { useLocale } from '@/hooks/use-locale'

export const Route = createFileRoute('/$locale/approach')({
  beforeLoad: async ({ params }) => {
    await loadNamespace(params.locale, 'approach')
  },
  component: ApproachPage,
})

function ApproachPage() {
  const { t } = useTranslation('approach')
  const locale = useLocale()

  const steps = t('process.steps', { returnObjects: true }) as Array<{
    number: number
    title: string
    description: string
  }>

  const principles = t('principles.items', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        path="/approach"
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

      {/* Process Steps */}
      <Section>
        <SectionHeading
          title={t('process.title')}
          subtitle={t('process.subtitle')}
        />
        <div className="space-y-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0
            const stepData = steps[index]
            return (
              <div
                key={step.number}
                className={`flex flex-col gap-8 md:flex-row md:items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-scit-purple to-scit-cyan text-white mb-4">
                    <Icon size={22} />
                  </div>
                  <div className="text-xs font-medium text-scit-purple mb-1">{t('process.phaseLabel')} {step.number}</div>
                  <h3 className="text-2xl font-bold">{stepData?.title ?? step.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{stepData?.description ?? step.description}</p>
                </div>
                <div className="flex-1">
                  <div className="rounded-xl border border-border bg-muted/50 p-8 h-48 flex items-center justify-center">
                    <Icon size={64} className="text-scit-purple/20" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-muted/30">
        <SectionHeading
          title={t('principles.title')}
          subtitle={t('principles.subtitle')}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-scit-purple/10">
                <IconCheck size={16} className="text-scit-purple" />
              </div>
              <h3 className="font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
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
