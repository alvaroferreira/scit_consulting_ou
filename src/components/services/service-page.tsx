import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
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
  const service = services.find((s) => s.id === serviceId)
  if (!service) return null

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
        title={service.title}
        description={service.description}
        path={service.href}
      />
      <ServiceHero service={service} />
      <ServiceProblem service={service} />
      <ServiceSolution service={service} />
      <ServiceFeatures service={service} />
      {relatedCaseStudy && (
        <MiniCaseStudy caseStudy={relatedCaseStudy} />
      )}
      <ServiceBenefits service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices
        services={enhancedRelatedServices}
        descriptions={service.relatedServiceDescriptions}
      />
      <ServiceCta />
    </>
  )
}

function ServiceHero({ service }: { service: Service }) {
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
            {service.heroHeadline}
          </h1>
          <p className="mt-4 text-lg text-white/70 md:text-xl max-w-2xl">
            {service.longDescription}
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-scit-deep hover:bg-white/90"
            >
              <Link to="/contact">
                Get Started
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceProblem({ service }: { service: Service }) {
  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
            <IconAlertTriangle size={22} />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">The Challenge</h2>
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {service.problemDescription}
          </p>
        </div>
      </div>
    </Section>
  )
}

function ServiceSolution({ service }: { service: Service }) {
  return (
    <Section className="bg-muted/30">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
            <IconBulb size={22} />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">Our Solution</h2>
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {service.solutionDescription}
          </p>
        </div>
      </div>
    </Section>
  )
}

function ServiceFeatures({ service }: { service: Service }) {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">What&apos;s Included</h2>
          <p className="mt-3 text-muted-foreground">
            Comprehensive solutions designed to deliver measurable results.
          </p>
        </div>
        <div className="grid gap-3">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 rounded-lg border border-border p-4">
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
  const firstTwoResults = caseStudy.results.slice(0, 2)

  return (
    <Section className="bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Real Results</h2>
          <p className="mt-3 text-muted-foreground">
            See how we delivered measurable impact in a similar engagement.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold">{caseStudy.title}</h3>
              <span className="mt-1 inline-block rounded-full bg-scit-purple/10 px-3 py-1 text-xs font-medium text-scit-purple">
                {caseStudy.industry}
              </span>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
              <IconTrophy size={20} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {firstTwoResults.map((result) => (
              <div
                key={result.metric}
                className="rounded-lg border border-border bg-muted/50 p-4 text-center"
              >
                <div className="text-2xl font-bold text-scit-purple">
                  {result.value}
                  {result.suffix}
                </div>
                <div className="mt-1 text-sm font-medium">{result.metric}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {result.description}
                </div>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link
              to="/case-studies/$slug"
              params={{ slug: caseStudy.slug }}
            >
              Read the Full Case Study
              <IconArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

function ServiceBenefits({ service }: { service: Service }) {
  return (
    <Section>
      <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
        Business Benefits
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {service.benefits.map((benefit, i) => (
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

function ServiceFAQ({ service }: { service: Service }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Inject FAQPage JSON-LD schema
  useEffect(() => {
    if (service.faqs.length === 0) return

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
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
  }, [service.faqs])

  if (service.faqs.length === 0) return null

  return (
    <Section className="bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {service.faqs.map((faq, i) => {
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
  descriptions,
}: {
  services: Service[]
  descriptions: Record<string, string>
}) {
  if (relatedServices.length === 0) return null

  return (
    <Section>
      <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
        Related Services
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedServices.map((service) => {
          const Icon = service.icon
          const contextualDescription = descriptions[service.id]
          return (
            <Link
              key={service.id}
              to={service.href}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold group-hover:text-scit-purple transition-colors">
                {service.shortTitle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {contextualDescription || service.description}
              </p>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}

function ServiceCta() {
  return (
    <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Ready to Get Started?
        </h2>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">
          Let&apos;s discuss how we can help your business leverage AI for real results.
        </p>
        <div className="mt-6">
          <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
            <Link to="/contact">
              Book a Consultation
              <IconArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
