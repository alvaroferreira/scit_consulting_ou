import { createFileRoute, Link } from '@tanstack/react-router'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { processSteps } from '@/data/process'

export const Route = createFileRoute('/approach')({
  component: ApproachPage,
})

function ApproachPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Our Approach
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            A proven methodology that ensures every AI initiative delivers measurable business results.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <Section>
        <SectionHeading
          title="How We Work"
          subtitle="Four phases that take you from vision to value."
        />
        <div className="space-y-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0
            return (
              <div
                key={step.number}
                className={`flex flex-col gap-8 md:flex-row md:items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-scit-purple to-scit-cyan text-white mb-4">
                    <Icon size={22} />
                  </div>
                  <div className="text-xs font-medium text-scit-purple mb-1">Phase {step.number}</div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{step.description}</p>
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
          title="Our Principles"
          subtitle="The values that guide every engagement."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Business-First AI',
              description: 'We start with your business goals, not the technology. AI is a means to an end, not the end itself.',
            },
            {
              title: 'Iterative Delivery',
              description: 'We deliver value in weeks, not months. Agile sprints ensure continuous progress and early feedback.',
            },
            {
              title: 'Measurable Outcomes',
              description: 'Every initiative has clear KPIs and success metrics. We measure impact, not just output.',
            },
            {
              title: 'Knowledge Transfer',
              description: 'We build your team\'s capabilities alongside the solution. You own the knowledge, not just the code.',
            },
            {
              title: 'Transparent Partnership',
              description: 'No black boxes. We communicate openly about progress, challenges, and trade-offs.',
            },
            {
              title: 'Sustainable Scale',
              description: 'Solutions designed to grow with your business, not create vendor dependency.',
            },
          ].map((principle) => (
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
            Let&apos;s Work Together
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Ready to apply this methodology to your business? Start with a free consultation.
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
    </>
  )
}
