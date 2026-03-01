import { Link } from '@tanstack/react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { services } from '@/data/services'

export function ServicesGrid() {
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title="Our Services"
        subtitle="Comprehensive AI solutions tailored to your business needs, from automation to strategic consulting."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Link
              key={service.id}
              to={service.href}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg hover:shadow-scit-purple/5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                <Icon size={22} />
              </div>

              <h3 className="text-lg font-semibold group-hover:text-scit-purple transition-colors">
                {service.shortTitle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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
  )
}
