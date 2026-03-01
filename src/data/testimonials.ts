export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'SCIT transformed our document processing workflow with AI automation. What used to take our team hours now happens in minutes with greater accuracy.',
    name: 'Maria S.',
    role: 'Operations Director',
    company: 'Legal Services Firm',
  },
  {
    quote:
      'The AI prospecting agent SCIT built for us generates qualified leads around the clock. Our sales pipeline has never been healthier.',
    name: 'Thomas K.',
    role: 'Head of Sales',
    company: 'B2B SaaS Company',
  },
  {
    quote:
      'Their strategic approach to AI implementation gave us clarity. Instead of chasing trends, we now have a focused roadmap with measurable outcomes.',
    name: 'Ana R.',
    role: 'CEO',
    company: 'Healthcare Tech Startup',
  },
]
