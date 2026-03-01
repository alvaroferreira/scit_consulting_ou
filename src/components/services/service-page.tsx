import { Link } from '@tanstack/react-router'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/shared/section'
import { services, type Service } from '@/data/services'

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

  return (
    <>
      <ServiceHero service={service} />
      <ServiceFeatures service={service} />
      <ServiceBenefits service={service} />
      <ServiceUseCases service={service} />
      <RelatedServices services={otherServices} />
      <ServiceCta />
    </>
  )
}

function ServiceHero({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-scit-cyan/10 blur-3xl" />
      </div>
      <div className="container relative mx-auto">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
            <Icon size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {service.title}
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

function ServiceBenefits({ service }: { service: Service }) {
  return (
    <Section className="bg-muted/30">
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

function ServiceUseCases({ service }: { service: Service }) {
  return (
    <Section>
      <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
        Use Cases
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {service.useCases.map((useCase, i) => (
          <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple text-sm font-bold">
              {i + 1}
            </div>
            <p className="text-sm leading-relaxed">{useCase}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function RelatedServices({ services: relatedServices }: { services: Service[] }) {
  if (relatedServices.length === 0) return null

  return (
    <Section className="bg-muted/30">
      <h2 className="text-2xl font-bold text-center md:text-3xl mb-12">
        Related Services
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedServices.map((service) => {
          const Icon = service.icon
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
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {service.description}
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
