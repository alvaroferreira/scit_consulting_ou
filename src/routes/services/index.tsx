import { createFileRoute, Link } from '@tanstack/react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { services, pillars } from '@/data/services'
import { IconRocket, IconBulb, IconRefresh } from '@tabler/icons-react'

export const Route = createFileRoute('/services/')({
  component: ServicesPage,
})

const pillarIcons = {
  implement: IconRocket,
  consult: IconBulb,
  transform: IconRefresh,
}

function ServicesPage() {
  return (
    <>
      <SEO
        title="AI Services"
        description="Comprehensive AI solutions: automation, custom agents, chatbots, AI tools implementation, strategic consulting, and digital transformation."
        path="/services"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Comprehensive AI solutions across three pillars: implementation, consulting, and transformation.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <Section>
        <SectionHeading
          title="Three Pillars of AI Transformation"
          subtitle="Every engagement starts with understanding where you are and where you want to go."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons]
            return (
              <div key={pillar.id} className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-scit-purple to-scit-cyan text-white">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold">{pillar.title}</h3>
                <p className="text-sm font-medium text-scit-purple">{pillar.subtitle}</p>
                <p className="mt-3 text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* All Services */}
      <Section className="bg-muted/30">
        <SectionHeading title="All Services" subtitle="Explore our full range of AI solutions." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                to={service.href}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold group-hover:text-scit-purple transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-scit-purple">
                  Learn more
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
            Not Sure Where to Start?
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Book a free consultation and we&apos;ll help you identify the best AI opportunities for your business.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
