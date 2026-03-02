export interface Industry {
  id: string
  title: string
  description: string
  icon: string
  caseStudySlugs: string[]
  serviceIds: string[]
}

export const industries: Industry[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description:
      'AI-powered scheduling, clinical documentation, patient engagement, and care coordination for clinics and care providers.',
    icon: '🏥',
    caseStudySlugs: ['physiotherapy-clinic-chain', 'luxury-elderly-care', 'medical-clinic-network'],
    serviceIds: ['ai-automation', 'chatbots', 'ai-consulting'],
  },
  {
    id: 'financial-services',
    title: 'Financial Services',
    description:
      'Intelligent document processing, compliance automation, risk analysis, and customer-facing AI assistants for financial institutions.',
    icon: '🏦',
    caseStudySlugs: [],
    serviceIds: ['ai-automation', 'ai-agents', 'ai-tools'],
  },
  {
    id: 'retail',
    title: 'Retail & E-Commerce',
    description:
      'Personalized customer experiences, inventory optimization, conversational commerce, and demand forecasting with AI.',
    icon: '🛒',
    caseStudySlugs: [],
    serviceIds: ['chatbots', 'ai-tools', 'digital-transformation'],
  },
  {
    id: 'b2b-services',
    title: 'B2B Services',
    description:
      'Sales automation, proposal generation, lead scoring, and AI-augmented workflows for professional services companies.',
    icon: '🤝',
    caseStudySlugs: ['european-b2b-services'],
    serviceIds: ['ai-agents', 'ai-automation', 'ai-consulting'],
  },
]
