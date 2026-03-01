import {
  IconRobot,
  IconBrain,
  IconMessageChatbot,
  IconTool,
  IconBulb,
  IconTransform,
} from '@tabler/icons-react'

export interface Service {
  id: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  href: string
  icon: typeof IconRobot
  pillar: 'implement' | 'consult' | 'transform'
  features: string[]
  benefits: string[]
  useCases: string[]
}

export const services: Service[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation & Process Automation',
    shortTitle: 'AI Automation',
    description:
      'Automated workflows, document processing, and RPA enhanced with AI to eliminate repetitive tasks and boost efficiency.',
    longDescription:
      'We design and implement intelligent automation solutions that combine traditional RPA with cutting-edge AI capabilities. From document processing and data extraction to complex multi-step workflows, we help your team focus on high-value work while AI handles the routine.',
    href: '/services/ai-automation',
    icon: IconRobot,
    pillar: 'implement',
    features: [
      'Intelligent document processing & OCR',
      'Workflow automation with AI decision-making',
      'Data extraction and transformation pipelines',
      'Email and communication automation',
      'Integration with existing business systems',
      'Real-time monitoring and alerts',
    ],
    benefits: [
      'Reduce manual processing time by up to 80%',
      'Eliminate human error in repetitive tasks',
      'Scale operations without proportional headcount',
      'Free your team for strategic, creative work',
    ],
    useCases: [
      'Invoice processing and financial document automation',
      'Lead qualification and CRM data enrichment',
      'Report generation and data aggregation',
      'Customer onboarding workflow automation',
    ],
  },
  {
    id: 'ai-agents',
    title: 'Custom AI Agents',
    shortTitle: 'AI Agents',
    description:
      'Autonomous AI agents for complex tasks like sales prospecting, customer support, data analysis, and business intelligence.',
    longDescription:
      'We build custom AI agents that operate autonomously to handle complex business tasks. These intelligent systems can prospect for leads, analyze data patterns, support customers, and make decisions based on your business rules -- working 24/7 without fatigue.',
    href: '/services/ai-agents',
    icon: IconBrain,
    pillar: 'implement',
    features: [
      'Multi-step reasoning and task execution',
      'Integration with APIs and business tools',
      'Natural language understanding and generation',
      'Memory and context management',
      'Human-in-the-loop approval workflows',
      'Performance monitoring and optimization',
    ],
    benefits: [
      'Handle complex tasks that require judgment',
      '24/7 operation without supervision',
      'Consistent quality and compliance',
      'Rapid scaling of knowledge-intensive work',
    ],
    useCases: [
      'B2B sales prospecting and outreach',
      'Legal document analysis and research',
      'Financial data monitoring and alerts',
      'Technical support triage and resolution',
    ],
  },
  {
    id: 'chatbots',
    title: 'Chatbots & Conversational AI',
    shortTitle: 'Chatbots',
    description:
      'Intelligent conversational interfaces for customer support, internal helpdesks, and interactive product experiences.',
    longDescription:
      'We create sophisticated conversational AI systems that go beyond simple FAQ bots. Our chatbots understand context, handle complex queries, and provide personalized responses -- whether serving your customers or empowering your internal teams.',
    href: '/services/chatbots',
    icon: IconMessageChatbot,
    pillar: 'implement',
    features: [
      'Multi-channel deployment (web, WhatsApp, Slack)',
      'Knowledge base integration and RAG',
      'Multilingual support',
      'Seamless human handoff',
      'Analytics and conversation insights',
      'Custom personality and brand voice',
    ],
    benefits: [
      'Instant 24/7 customer support',
      'Reduce support ticket volume by 40-60%',
      'Consistent brand experience across channels',
      'Valuable insights from conversation data',
    ],
    useCases: [
      'Customer support and FAQ automation',
      'Internal knowledge base assistant',
      'Product recommendation engine',
      'Appointment scheduling and booking',
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools Implementation',
    shortTitle: 'AI Tools',
    description:
      'Selection and implementation of enterprise AI tools like ChatGPT Enterprise, Claude, GitHub Copilot, and custom solutions.',
    longDescription:
      'Navigating the rapidly evolving AI tools landscape can be overwhelming. We help you select, implement, and optimize the right AI tools for your specific needs -- from enterprise platforms like ChatGPT and Claude to specialized tools for coding, design, and content creation.',
    href: '/services/ai-tools',
    icon: IconTool,
    pillar: 'implement',
    features: [
      'AI tools landscape assessment',
      'Enterprise deployment and configuration',
      'Security and compliance setup',
      'Custom prompt libraries and templates',
      'Team training and adoption programs',
      'Usage monitoring and ROI tracking',
    ],
    benefits: [
      'Make informed tool selection decisions',
      'Maximize ROI from AI investments',
      'Ensure security and compliance',
      'Accelerate team adoption and productivity',
    ],
    useCases: [
      'ChatGPT Enterprise or Claude deployment',
      'GitHub Copilot for development teams',
      'AI-powered content creation workflows',
      'Multi-model comparison and optimization',
    ],
  },
  {
    id: 'ai-consulting',
    title: 'AI Strategy & Consulting',
    shortTitle: 'AI Consulting',
    description:
      'AI readiness assessments, strategic roadmaps, OKR alignment, and team training to define your AI transformation path.',
    longDescription:
      'Before implementing AI, you need the right strategy. We assess your current capabilities, identify the highest-impact opportunities, and create a practical roadmap that aligns AI initiatives with your business objectives and measurable outcomes.',
    href: '/services/ai-consulting',
    icon: IconBulb,
    pillar: 'consult',
    features: [
      'AI readiness assessment',
      'Opportunity identification and prioritization',
      'Strategic AI roadmap with milestones',
      'OKR alignment and success metrics',
      'Team training and upskilling programs',
      'Vendor evaluation and selection support',
    ],
    benefits: [
      'Clear vision and actionable AI strategy',
      'Prioritized initiatives with highest ROI',
      'Measurable objectives and key results',
      'Reduced risk of failed AI implementations',
    ],
    useCases: [
      'Executive AI strategy workshops',
      'Department-level AI opportunity mapping',
      'AI maturity assessment and benchmarking',
      'Custom training programs for teams',
    ],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    shortTitle: 'Transformation',
    description:
      'Complete process modernization programs, including audit, agile delivery, change management, and AI-centered redesign.',
    longDescription:
      'True digital transformation goes beyond technology -- it requires rethinking processes, culture, and workflows with AI at the center. We guide organizations through comprehensive transformation programs that deliver measurable business outcomes.',
    href: '/services/digital-transformation',
    icon: IconTransform,
    pillar: 'transform',
    features: [
      'Process audit and AI opportunity mapping',
      'Agile AI delivery (Scrum/Kanban)',
      'Change management and cultural alignment',
      'Legacy system modernization',
      'Data infrastructure optimization',
      'Continuous improvement frameworks',
    ],
    benefits: [
      'End-to-end transformation with clear ownership',
      'Reduced resistance through change management',
      'Iterative delivery with early wins',
      'Sustainable, long-term organizational change',
    ],
    useCases: [
      'Enterprise-wide AI transformation programs',
      'Department digitization initiatives',
      'Legacy system migration to AI-powered platforms',
      'Organizational AI culture building',
    ],
  },
]

export interface Pillar {
  id: string
  title: string
  subtitle: string
  description: string
  services: string[]
}

export const pillars: Pillar[] = [
  {
    id: 'implement',
    title: 'Implement',
    subtitle: 'AI Tools & Build',
    description:
      'We build and integrate AI solutions into your business -- from automated workflows and intelligent agents to conversational interfaces and enterprise tool deployments.',
    services: ['ai-automation', 'ai-agents', 'chatbots', 'ai-tools'],
  },
  {
    id: 'consult',
    title: 'Advise',
    subtitle: 'AI Consulting',
    description:
      'We define the right AI strategy for your business -- assessing readiness, mapping opportunities, aligning objectives, and training your teams for successful AI adoption.',
    services: ['ai-consulting'],
  },
  {
    id: 'transform',
    title: 'Transform',
    subtitle: 'AI Processes',
    description:
      'We redesign your processes with AI at the center -- auditing operations, implementing agile delivery, managing change, and driving comprehensive digital transformation.',
    services: ['digital-transformation'],
  },
]
