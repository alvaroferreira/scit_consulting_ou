import { Link } from '@tanstack/react-router'
import { IconRocket, IconBulb, IconRefresh, IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { pillars } from '@/data/services'

const pillarIcons = {
  implement: IconRocket,
  consult: IconBulb,
  transform: IconRefresh,
}

const pillarLinks = {
  implement: '/services',
  consult: '/services/ai-consulting',
  transform: '/services/digital-transformation',
}

export function Pillars() {
  return (
    <Section>
      <SectionHeading
        title="How We Help"
        subtitle="Three pillars that drive your AI transformation journey, from strategy to implementation and beyond."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons]
          const link = pillarLinks[pillar.id as keyof typeof pillarLinks]

          return (
            <div
              key={pillar.id}
              className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-scit-purple/30 hover:shadow-lg hover:shadow-scit-purple/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-scit-purple to-scit-cyan text-white">
                <Icon size={24} />
              </div>

              <h3 className="text-xl font-bold">{pillar.title}</h3>
              <p className="text-sm font-medium text-scit-purple">{pillar.subtitle}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>

              <Link
                to={link}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-scit-purple transition-colors hover:text-scit-violet"
              >
                Learn more
                <IconArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
