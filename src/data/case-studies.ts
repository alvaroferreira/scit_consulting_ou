export interface CaseStudyResult {
  metric: string
  value: number
  suffix: string
  description: string
}

export interface CaseStudy {
  slug: string
  title: string
  industry: string
  industryCategory: 'Healthcare' | 'B2B Services' | 'Real Estate'
  challenge: string
  approach: string[]
  solution: string
  results: CaseStudyResult[]
  techStack: string[]
  testimonialQuote?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'physiotherapy-clinic-chain',
    title: 'Multi-Location Physiotherapy Clinic Chain',
    industry: 'Healthcare',
    industryCategory: 'Healthcare',
    challenge:
      'A multi-location physiotherapy clinic chain was struggling with patient scheduling inefficiencies, high no-show rates, and fragmented communication across clinics. Staff spent excessive time on manual appointment management, reducing their capacity to focus on patient care.',
    approach: [
      'Audited existing scheduling workflows and identified bottleneck patterns across all locations',
      'Designed an AI-powered scheduling assistant that learns patient preferences and optimizes appointment slots',
      'Implemented automated reminders via SMS and email with intelligent re-scheduling suggestions',
      'Built a centralized dashboard for cross-location visibility and resource allocation',
    ],
    solution:
      'We deployed a custom AI scheduling system integrated with their existing clinic management software. The solution uses predictive analytics to identify patients at risk of no-shows and proactively reaches out with alternative time slots. A conversational AI assistant handles booking, rescheduling, and cancellations across all locations through a unified interface.',
    results: [
      { metric: 'No-Show Reduction', value: 42, suffix: '%', description: 'Decrease in patient no-shows through predictive outreach' },
      { metric: 'Staff Hours Saved', value: 25, suffix: 'h/week', description: 'Weekly hours freed from manual scheduling tasks' },
      { metric: 'Patient Satisfaction', value: 94, suffix: '%', description: 'Satisfaction score for the booking experience' },
      { metric: 'Booking Efficiency', value: 3, suffix: 'x', description: 'Faster appointment scheduling across locations' },
    ],
    techStack: ['AI Scheduling Engine', 'Conversational AI', 'SMS/Email Automation', 'Analytics Dashboard', 'API Integration'],
  },
  {
    slug: 'luxury-elderly-care',
    title: 'Leading Luxury Elderly Care Provider',
    industry: 'Healthcare',
    industryCategory: 'Healthcare',
    challenge:
      'A premium elderly care provider needed to modernize their operations without compromising the personalized, high-touch service their residents expected. Their legacy systems created data silos between care teams, administration, and family communications.',
    approach: [
      'Conducted stakeholder interviews with care staff, administrators, and resident families',
      'Mapped the full care journey to identify digital intervention points that enhance rather than replace human touch',
      'Developed a phased digital transformation roadmap prioritizing quick wins',
      'Implemented AI tools for care documentation and family communication while preserving personal relationships',
    ],
    solution:
      'We created a digital transformation strategy centered on an AI-enhanced care coordination platform. The system automates routine documentation, generates intelligent care insights from daily observations, and provides families with personalized updates. Voice-to-text AI helps caregivers document interactions naturally without disrupting their workflow.',
    results: [
      { metric: 'Documentation Time', value: 60, suffix: '%', description: 'Reduction in time spent on care documentation' },
      { metric: 'Family Engagement', value: 85, suffix: '%', description: 'Increase in family portal usage and satisfaction' },
      { metric: 'Care Quality Score', value: 97, suffix: '%', description: 'Quality audit score after implementation' },
      { metric: 'Staff Retention', value: 35, suffix: '%', description: 'Improvement in staff retention over 12 months' },
    ],
    techStack: ['Care Coordination Platform', 'Voice-to-Text AI', 'Family Portal', 'Predictive Analytics', 'Mobile App'],
  },
  {
    slug: 'european-b2b-services',
    title: 'European B2B Services Company',
    industry: 'B2B Services',
    industryCategory: 'B2B Services',
    challenge:
      'A European B2B services company was losing deals due to slow response times and inconsistent proposal quality. Their sales team spent 70% of their time on administrative tasks rather than building client relationships, and cross-border operations added complexity to their workflows.',
    approach: [
      'Analyzed the full sales pipeline to identify where AI could have the highest impact',
      'Designed custom AI agents for proposal generation, lead qualification, and follow-up automation',
      'Integrated AI tools with their existing CRM and communication platforms',
      'Trained the sales team on AI-augmented workflows while maintaining their consultative approach',
    ],
    solution:
      'We built a suite of AI agents that automate the heavy lifting in the sales process. A proposal generator creates customized, on-brand proposals in minutes rather than hours. An intelligent lead scoring system prioritizes high-value opportunities. Automated follow-up sequences maintain engagement while the sales team focuses on strategic conversations.',
    results: [
      { metric: 'Proposal Time', value: 75, suffix: '%', description: 'Reduction in time from brief to finished proposal' },
      { metric: 'Win Rate', value: 28, suffix: '%', description: 'Increase in proposal-to-close conversion rate' },
      { metric: 'Revenue Growth', value: 40, suffix: '%', description: 'Year-over-year revenue increase attributed to AI workflows' },
      { metric: 'Response Time', value: 80, suffix: '%', description: 'Faster average response to incoming leads' },
    ],
    techStack: ['Custom AI Agents', 'CRM Integration', 'Proposal Automation', 'Lead Scoring AI', 'Multi-language NLP'],
  },
  {
    slug: 'real-estate-portfolio',
    title: 'Real Estate Management Portfolio',
    industry: 'Real Estate',
    industryCategory: 'Real Estate',
    challenge:
      'A real estate management company overseeing a diverse portfolio of properties was drowning in tenant communications, maintenance requests, and document management. Manual processes led to delayed responses, missed maintenance windows, and tenant dissatisfaction.',
    approach: [
      'Mapped all tenant touchpoints and identified repetitive patterns suitable for AI automation',
      'Built a conversational AI chatbot for 24/7 tenant support and maintenance request triage',
      'Implemented intelligent document processing for lease management and compliance',
      'Created predictive maintenance models based on historical data and property characteristics',
    ],
    solution:
      'We deployed an AI-powered property management assistant that handles tenant inquiries, triages maintenance requests by urgency, and automates document workflows. The chatbot manages routine communications in multiple languages while escalating complex issues to human managers. Predictive maintenance algorithms help prevent costly emergency repairs.',
    results: [
      { metric: 'Response Time', value: 90, suffix: '%', description: 'Reduction in average tenant response time' },
      { metric: 'Maintenance Costs', value: 30, suffix: '%', description: 'Decrease in emergency maintenance expenses' },
      { metric: 'Tenant Satisfaction', value: 88, suffix: '%', description: 'Overall tenant satisfaction rating' },
      { metric: 'Requests Automated', value: 65, suffix: '%', description: 'Tenant requests handled without human intervention' },
    ],
    techStack: ['Conversational AI Chatbot', 'Document Processing AI', 'Predictive Maintenance', 'Multi-language Support', 'Property Management Integration'],
  },
  {
    slug: 'medical-clinic-network',
    title: 'Medical Clinic Network',
    industry: 'Healthcare',
    industryCategory: 'Healthcare',
    challenge:
      'A network of medical clinics needed to implement AI tools across their operations but lacked internal expertise. They wanted to leverage AI for clinical documentation, patient triage, and operational analytics without disrupting existing workflows or compromising data privacy.',
    approach: [
      'Conducted an AI readiness assessment across all clinics to evaluate infrastructure and staff capabilities',
      'Developed a prioritized AI implementation roadmap with clear ROI projections for each initiative',
      'Implemented AI tools in pilot clinics first, measuring impact before network-wide rollout',
      'Established AI governance policies and training programs for all staff levels',
    ],
    solution:
      'We provided end-to-end AI strategy consulting, starting with a comprehensive readiness assessment and culminating in a phased rollout across the clinic network. AI-powered tools now assist with clinical documentation, patient intake, and operational reporting. A custom analytics dashboard provides network-wide insights for data-driven decision making.',
    results: [
      { metric: 'Operational Efficiency', value: 45, suffix: '%', description: 'Improvement in overall operational efficiency' },
      { metric: 'Documentation Accuracy', value: 98, suffix: '%', description: 'Clinical documentation accuracy with AI assistance' },
      { metric: 'Cost Savings', value: 250, suffix: 'K', description: 'Annual cost savings from AI-driven process improvements' },
      { metric: 'Staff Adoption', value: 92, suffix: '%', description: 'Staff AI tool adoption rate after training program' },
    ],
    techStack: ['AI Strategy Consulting', 'Clinical NLP', 'Analytics Dashboard', 'AI Governance Framework', 'Staff Training Program'],
  },
]

export const industryCategories = [...new Set(caseStudies.map((cs) => cs.industryCategory))]
