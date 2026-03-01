import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { processSteps } from '@/data/process'

export function ProcessSteps() {
  return (
    <Section>
      <SectionHeading
        title="Our Approach"
        subtitle="A proven methodology that ensures every AI initiative delivers measurable business results."
      />

      <div className="grid gap-8 md:grid-cols-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.number} className="relative text-center">
              {/* Connector line */}
              {index < processSteps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+24px)] hidden h-0.5 w-[calc(100%-48px)] bg-gradient-to-r from-scit-purple/30 to-scit-cyan/30 md:block" />
              )}

              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-scit-purple to-scit-cyan text-white">
                <Icon size={22} />
              </div>

              <div className="text-xs font-medium text-scit-purple mb-1">
                Step {step.number}
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
