import {
  IconSearch,
  IconMap,
  IconRocket,
  IconTrendingUp,
} from '@tabler/icons-react'

export interface ProcessStep {
  number: number
  title: string
  description: string
  icon: typeof IconSearch
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Diagnose',
    description:
      'We analyze your current processes, technology stack, and business objectives to identify where AI can create the most impact.',
    icon: IconSearch,
  },
  {
    number: 2,
    title: 'Plan',
    description:
      'We design a tailored AI strategy with clear priorities, timelines, and measurable outcomes aligned with your goals.',
    icon: IconMap,
  },
  {
    number: 3,
    title: 'Implement',
    description:
      'We build and deploy AI solutions using agile development methodologies with live sharing of product evolution, so you follow every step of progress in real time.',
    icon: IconRocket,
  },
  {
    number: 4,
    title: 'Scale',
    description:
      'We optimize, monitor, and expand successful AI implementations across your organization for maximum business impact.',
    icon: IconTrendingUp,
  },
]
