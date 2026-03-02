import { Link } from '@tanstack/react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface Need {
  label: string
  description: string
  href: string
}

const needs: Need[] = [
  {
    label: 'Automate repetitive processes',
    description: 'Free your team from manual tasks with AI-powered workflows.',
    href: '/services/ai-automation',
  },
  {
    label: 'Build intelligent AI agents',
    description: 'Deploy custom agents that handle complex tasks autonomously.',
    href: '/services/ai-agents',
  },
  {
    label: 'Improve customer support',
    description: 'AI chatbots that resolve issues and scale effortlessly.',
    href: '/services/chatbots',
  },
  {
    label: 'Implement AI tools across my org',
    description: 'Strategic rollout of Claude, GPT, Gemini, and more.',
    href: '/services/ai-tools',
  },
  {
    label: 'Define an AI strategy',
    description: 'Readiness assessment and roadmap for AI adoption.',
    href: '/services/ai-consulting',
  },
  {
    label: 'Modernize legacy operations',
    description: 'End-to-end digital transformation with AI at the core.',
    href: '/services/digital-transformation',
  },
  {
    label: 'See proven results first',
    description: 'Browse real outcomes from businesses like yours.',
    href: '/case-studies',
  },
]

export function NeedsNavigation() {
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title="What Are You Looking to Achieve?"
        subtitle="Choose your goal and we'll show you how we can help."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {needs.map((need) => (
          <Link
            key={need.label}
            to={need.href}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-scit-purple/30 hover:shadow-lg"
          >
            <div className="flex-1">
              <p className="font-medium text-sm group-hover:text-scit-purple transition-colors">
                {need.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {need.description}
              </p>
            </div>
            <IconArrowRight
              size={16}
              className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </Section>
  )
}
