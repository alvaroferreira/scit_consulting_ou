import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/hooks/use-locale'
import {
  IconArrowRight,
  IconCheck,
  IconAlertTriangle,
  IconBulb,
  IconChevronDown,
  IconTrophy,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { services, type Service } from '@/data/services'
import { caseStudies, type CaseStudy } from '@/data/case-studies'

interface ServicePageProps {
  serviceId: string
}

export function ServicePage({ serviceId }: ServicePageProps) {
  const { t } = useTranslation('services')
  const service = services.find((s) => s.id === serviceId)
  if (!service) return null

  const serviceKey = service.id

  const relatedServices = services.filter(
    (s) => s.id !== serviceId && s.pillar === service.pillar
  ).slice(0, 3)

  const otherServices = relatedServices.length > 0
    ? relatedServices
    : services.filter((s) => s.id !== serviceId).slice(0, 3)

  // Get the related services to display, preferring those with contextual descriptions
  const contextualServiceIds = Object.keys(service.relatedServiceDescriptions)
  const enhancedRelatedServices = contextualServiceIds.length > 0
    ? services.filter((s) => contextualServiceIds.includes(s.id))
    : otherServices

  // Get the first related case study
  const relatedCaseStudy = service.relatedCaseStudySlugs.length > 0
    ? caseStudies.find((cs) => cs.slug === service.relatedCaseStudySlugs[0])
    : undefined

  return (
    <>
      <SEO
        title={t(`services.${serviceKey}.title`)}
        description={t(`services.${serviceKey}.description`)}
        path={service.href}
      />
      <ServiceHero service={service} serviceKey={serviceKey} />
      <ServiceProblem serviceKey={serviceKey} />
      <ServiceSolution serviceKey={serviceKey} />
      <ServiceFeatures serviceKey={serviceKey} />
      {relatedCaseStudy && (
        <MiniCaseStudy caseStudy={relatedCaseStudy} />
      )}
      <ServiceBenefits serviceKey={serviceKey} />
      <ServiceFAQ serviceKey={serviceKey} />
      <RelatedServices
        services={enhancedRelatedServices}
        currentServiceKey={serviceKey}
      />
      <ServiceCta />
    </>
  )
}

function ServiceHero({ service, serviceKey }: { service: Service; serviceKey: string }) {
  const locale = useLocale()
  const { t } = useTranslation('services')
  const Icon = service.icon
  return (
    <section className="relative overflow-hidden bg-scit-deep py-20 md:py-28">
      {/* Video Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/videos/corporate-tech.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-scit-deep/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-scit-deep/50 to-scit-deep/90" />
      </div>
      <div className="container relative mx-auto">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
            <Icon size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t(`services.${serviceKey}.heroHeadline`)}
          </h1>
          <p className="mt-4 text-lg text-white/70 md:text-xl max-w-2xl">
            {t(`services.${serviceKey}.longDescription`)}
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-scit-deep hover:bg-white/90"
            >
              <Link to="/$locale/contact" params={{ locale }}>
                {t('template.getStarted')}
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceProblem({ serviceKey }: { serviceKey: string }) {
  const { t } = useTranslation('services')
  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
            <IconAlertTriangle size={22} />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.theChallenge')}</h2>
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {t(`services.${serviceKey}.problemDescription`)}
          </p>
        </div>
      </div>
    </Section>
  )
}

function ServiceSolution({ serviceKey }: { serviceKey: string }) {
  const { t } = useTranslation('services')
  return (
    <Section className="bg-muted/30">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
            <IconBulb size={22} />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.ourSolution')}</h2>
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {t(`services.${serviceKey}.solutionDescription`)}
          </p>
        </div>
      </div>
    </Section>
  )
}

function ServiceFeatures({ serviceKey }: { serviceKey: string }) {
  const { t } = useTranslation('services')
  const features = t(`services.${serviceKey}.features`, { returnObjects: true }) as string[]

  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.whatsIncluded')}</h2>
          <p className="mt-3 text-muted-foreground">
            {t('template.whatsIncludedSubtitle')}
          </p>
        </div>
        <div className="grid gap-3">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-scit-purple/10">
                <IconCheck size={12} className="text-scit-purple" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function MiniCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const locale = useLocale()
  const { t } = useTranslation('services')
  const { t: tCs } = useTranslation('case-studies')
  const firstTwoResults = caseStudy.results.slice(0, 2)
  const csKey = caseStudy.slug

  return (
    <Section className="bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.realResults')}</h2>
          <p className="mt-3 text-muted-foreground">
            {t('template.realResultsSubtitle')}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold">{tCs(`caseStudies.${csKey}.title`)}</h3>
              <span className="mt-1 inline-block rounded-full bg-scit-purple/10 px-3 py-1 text-xs font-medium text-scit-purple">
                {tCs(`caseStudies.${csKey}.industry`)}
              </span>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
              <IconTrophy size={20} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {firstTwoResults.map((result, i) => {
              const results = tCs(`caseStudies.${csKey}.results`, { returnObjects: true }) as Array<{ metric: string; description: string }>
              const translatedResult = results[i]
              return (
                <div
                  key={result.metric}
                  className="rounded-lg border border-border bg-muted/50 p-4 text-center"
                >
                  <div className="text-2xl font-bold text-scit-purple">
                    {result.value}
                    {result.suffix}
                  </div>
                  <div className="mt-1 text-sm font-medium">{translatedResult?.metric ?? result.metric}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {translatedResult?.description ?? result.description}
                  </div>
                </div>
              )
            })}
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link
              to="/$locale/case-studies/$slug"
              params={{ locale, slug: caseStudy.slug }}
            >
              {t('template.readFullCaseStudy')}
              <IconArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

function ServiceBenefits({ serviceKey }: { serviceKey: string }) {
  const { t } = useTranslation('services')
  const benefits = t(`services.${serviceKey}.benefits`, { returnObjects: true }) as string[]

  return (
    <Section>
      <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
        {t('template.businessBenefits')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-scit-purple to-scit-cyan text-white text-sm font-bold">
              {i + 1}
            </div>
            <p className="text-sm leading-relaxed">{benefit}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ServiceFAQ({ serviceKey }: { serviceKey: string }) {
  const { t } = useTranslation('services')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = t(`services.${serviceKey}.faqs`, { returnObjects: true }) as Array<{ question: string; answer: string }>

  // Inject FAQPage JSON-LD schema
  useEffect(() => {
    if (!faqs || faqs.length === 0) return

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(faqSchema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [faqs])

  if (!faqs || faqs.length === 0) return null

  return (
    <Section className="bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
          {t('template.faq')}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="rounded-lg border border-border bg-card">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium hover:bg-muted/50 transition-colors rounded-lg"
                >
                  <span>{faq.question}</span>
                  <IconChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function RelatedServices({
  services: relatedServices,
  currentServiceKey,
}: {
  services: Service[]
  currentServiceKey: string
}) {
  const locale = useLocale()
  const { t } = useTranslation('services')

  if (relatedServices.length === 0) return null

  return (
    <Section>
      <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
        {t('template.relatedServices')}
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedServices.map((service) => {
          const Icon = service.icon
          const contextualDescription = t(`services.${currentServiceKey}.relatedServiceDescriptions.${service.id}`, { defaultValue: '' })
          return (
            <Link
              key={service.id}
              to={`/$locale${service.href}` as string}
              params={{ locale }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold group-hover:text-scit-purple transition-colors">
                {t(`services.${service.id}.shortTitle`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {contextualDescription || t(`services.${service.id}.description`)}
              </p>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}

function ServiceCta() {
  const locale = useLocale()
  const { t } = useTranslation('services')
  return (
    <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          {t('template.ctaTitle')}
        </h2>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">
          {t('template.ctaSubtitle')}
        </p>
        <div className="mt-6">
          <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
            <Link to="/$locale/contact" params={{ locale }}>
              {t('template.bookConsultation')}
              <IconArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
