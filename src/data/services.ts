import {
  IconRobot,
  IconBrain,
  IconMessageChatbot,
  IconTool,
  IconBulb,
  IconTransform,
} from '@tabler/icons-react'

interface ServiceFAQ {
  question: string
  answer: string
}

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
  heroHeadline: string
  problemDescription: string
  solutionDescription: string
  faqs: ServiceFAQ[]
  relatedCaseStudySlugs: string[]
  relatedServiceDescriptions: Record<string, string>
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
    heroHeadline: 'Your Team Is Drowning in Repetitive Tasks. AI Can Fix That.',
    problemDescription:
      'Every day, your employees spend hours on manual data entry, document processing, and routine workflows that drain their energy and slow your growth. These repetitive tasks create bottlenecks, introduce human error, and keep your best people from doing the strategic work that actually moves the needle.',
    solutionDescription:
      'We design intelligent automation systems that combine AI with your existing tools to eliminate busywork at scale. From document processing that reads and extracts data automatically to multi-step workflows that run without human intervention, we free your team to focus on high-value work while AI handles the rest.',
    faqs: [
      {
        question: 'How long does it take to implement AI automation?',
        answer:
          'Most automation projects take 4-8 weeks from discovery to deployment. We start with your highest-impact processes, deliver a working solution within the first sprint, and iterate from there. You see measurable results within the first month.',
      },
      {
        question: 'Will AI automation replace our employees?',
        answer:
          'No. Our goal is to augment your team, not replace them. Automation handles the tedious, repetitive tasks so your employees can focus on creative problem-solving, relationship building, and strategic decision-making, the work they were actually hired to do.',
      },
      {
        question: 'Can AI automation integrate with our existing software?',
        answer:
          'Yes. We build integrations with virtually any system, including CRMs, ERPs, accounting software, email platforms, and legacy tools. If it has an API or accepts file inputs, we can connect it.',
      },
      {
        question: 'What kind of ROI can we expect?',
        answer:
          'Most clients see a 3-5x return on investment within the first year. The typical payback period is 3-6 months, driven by reduced processing time, fewer errors, and the ability to scale without adding headcount.',
      },
    ],
    relatedCaseStudySlugs: ['physiotherapy-clinic-chain', 'real-estate-portfolio'],
    relatedServiceDescriptions: {
      'ai-agents':
        'For tasks too complex for simple automation, our Custom AI Agents add reasoning and judgment to handle multi-step processes autonomously.',
      chatbots:
        'Pair your automated workflows with Conversational AI to give customers and employees a natural interface for triggering processes and getting status updates.',
      'ai-tools':
        'Maximize your automation ROI by equipping your team with the right AI tools for the tasks that still require human input.',
    },
  },
  {
    id: 'ai-agents',
    title: 'Custom AI Agents',
    shortTitle: 'AI Agents',
    description:
      'Autonomous AI agents for complex tasks like sales prospecting, customer support, data analysis, and business intelligence.',
    longDescription:
      'We build custom AI agents that operate autonomously to handle complex business tasks. These intelligent systems can prospect for leads, analyze data patterns, support customers, and make decisions based on your business rules, working 24/7 without fatigue.',
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
    heroHeadline: 'Complex Tasks Are Eating Your Team Alive. Let AI Agents Do the Heavy Lifting.',
    problemDescription:
      'Your skilled professionals are buried in tasks that require judgment but follow predictable patterns, from qualifying leads and drafting proposals to analyzing reports and triaging support tickets. These knowledge-intensive activities are too complex for simple automation, yet too repetitive to justify senior talent.',
    solutionDescription:
      'We build custom AI agents that reason, decide, and act on your behalf. Unlike basic automation, these agents handle multi-step processes that require context, judgment, and adaptability. They integrate with your existing tools, follow your business rules, and escalate to humans only when truly needed.',
    faqs: [
      {
        question: 'What is the difference between AI agents and simple automation?',
        answer:
          'Simple automation follows rigid, pre-defined rules. AI agents can reason about situations, adapt to new information, make decisions based on context, and handle multi-step tasks that require judgment. Think of automation as a conveyor belt and an AI agent as a skilled assistant.',
      },
      {
        question: 'How do AI agents handle edge cases or unusual situations?',
        answer:
          'We build human-in-the-loop workflows so agents can escalate decisions they are not confident about. Over time, agents learn from these escalations and handle more situations independently, but you always retain oversight and control.',
      },
      {
        question: 'Are AI agents secure enough for sensitive business data?',
        answer:
          'Absolutely. We implement enterprise-grade security including data encryption, access controls, audit logging, and compliance with GDPR and other regulations. Your data never leaves your approved infrastructure.',
      },
      {
        question: 'Can we customize the agent behavior to match our processes?',
        answer:
          'Yes, that is the whole point. Every agent is built around your specific workflows, business rules, and quality standards. We work closely with your team to encode your domain expertise into the agent logic.',
      },
    ],
    relatedCaseStudySlugs: ['european-b2b-services', 'real-estate-portfolio'],
    relatedServiceDescriptions: {
      'ai-automation':
        'For simpler, rule-based tasks that feed into your agent workflows, our AI Automation solutions handle the structured groundwork.',
      chatbots:
        'Give your AI agents a conversational interface with our Chatbot solutions, so customers and team members can interact with agents naturally.',
      'ai-consulting':
        'Not sure where agents will deliver the most value? Our AI Strategy consulting identifies the highest-impact opportunities first.',
    },
  },
  {
    id: 'chatbots',
    title: 'Chatbots & Conversational AI',
    shortTitle: 'Chatbots',
    description:
      'Intelligent conversational interfaces for customer support, internal helpdesks, and interactive product experiences.',
    longDescription:
      'We create sophisticated conversational AI systems that go beyond simple FAQ bots. Our chatbots understand context, handle complex queries, and provide personalized responses, whether serving your customers or empowering your internal teams.',
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
    heroHeadline: 'Your Customers Expect Instant Answers. Your Team Cannot Keep Up.',
    problemDescription:
      'Customers message at all hours, across multiple channels, expecting immediate responses. Your support team is overwhelmed with repetitive questions, leading to slow response times, inconsistent answers, and burned-out staff. Every unanswered message is a potential lost customer.',
    solutionDescription:
      'We build intelligent chatbots that understand context, speak your brand voice, and resolve the majority of inquiries without human intervention. Deployed across web, WhatsApp, Slack, and more, they provide instant, accurate support 24/7 while seamlessly escalating complex issues to your team.',
    faqs: [
      {
        question: 'How accurate are AI chatbots compared to human agents?',
        answer:
          'Our chatbots achieve 85-95% accuracy on trained topics by using retrieval-augmented generation (RAG) grounded in your actual knowledge base. They only answer based on verified information, reducing hallucination risks. For anything outside their confidence threshold, they route to a human agent.',
      },
      {
        question: 'Can the chatbot handle multiple languages?',
        answer:
          'Yes. Our chatbots support over 50 languages out of the box and can be fine-tuned for specific dialects or industry terminology. This is especially valuable for European businesses serving customers across multiple markets.',
      },
      {
        question: 'What happens when the chatbot cannot answer a question?',
        answer:
          'We implement intelligent handoff workflows. When the chatbot detects a query it cannot handle confidently, it smoothly transfers the conversation to a human agent, along with the full context, so the customer never has to repeat themselves.',
      },
      {
        question: 'How do you train the chatbot on our specific business knowledge?',
        answer:
          'We integrate your existing documentation, FAQs, product information, and internal knowledge bases using RAG technology. The chatbot retrieves the most relevant information in real time. Updates to your knowledge base are reflected immediately, with no retraining needed.',
      },
    ],
    relatedCaseStudySlugs: ['real-estate-portfolio', 'physiotherapy-clinic-chain'],
    relatedServiceDescriptions: {
      'ai-agents':
        'When conversations require complex actions beyond answering questions, our AI Agents can execute multi-step tasks triggered directly from chatbot interactions.',
      'ai-automation':
        'Connect your chatbot to backend automation so conversations lead to real action, such as booking appointments, updating records, or processing requests.',
      'ai-tools':
        'Complement your chatbot with enterprise AI tools that empower your internal team to handle the complex queries that still need a human touch.',
    },
  },
  {
    id: 'ai-tools',
    title: 'AI Tools Implementation',
    shortTitle: 'AI Tools',
    description:
      'Selection and implementation of enterprise AI tools like ChatGPT Enterprise, Claude, GitHub Copilot, and custom solutions.',
    longDescription:
      'Navigating the rapidly evolving AI tools landscape can be overwhelming. We help you select, implement, and optimize the right AI tools for your specific needs, from enterprise platforms like ChatGPT and Claude to specialized tools for coding, design, and content creation.',
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
    heroHeadline: 'Overwhelmed by AI Tools? Stop Guessing and Start Getting Results.',
    problemDescription:
      'New AI tools launch every week, each promising to transform your business. Your team experiments with free tiers, data leaks into unvetted platforms, and nobody knows which tools actually deliver ROI. Without a clear strategy, you are wasting budget on shelfware and exposing your business to security risks.',
    solutionDescription:
      'We cut through the noise and help you select, deploy, and adopt the AI tools that actually matter for your business. From enterprise-grade security setup to custom prompt libraries and team training, we ensure your AI tools investment translates into measurable productivity gains, not just another unused subscription.',
    faqs: [
      {
        question: 'Which AI tools do you recommend for most businesses?',
        answer:
          'There is no one-size-fits-all answer. We evaluate your specific workflows, team capabilities, security requirements, and budget before recommending tools. That said, we frequently help companies implement platforms like ChatGPT Enterprise, Claude for Teams, GitHub Copilot, and specialized tools for content, design, and data analysis.',
      },
      {
        question: 'How do you ensure data security when using AI tools?',
        answer:
          'We implement enterprise-grade configurations that keep your data private, including SSO integration, data loss prevention policies, approved usage guidelines, and audit logging. We ensure no sensitive data is used for model training and that all tools comply with GDPR and your internal security policies.',
      },
      {
        question: 'How do you drive team adoption so tools do not go unused?',
        answer:
          'We combine hands-on training workshops with role-specific prompt libraries and use-case playbooks. We identify internal champions, set up feedback loops, and track adoption metrics to ensure tools are actually being used, and used effectively.',
      },
      {
        question: 'Can you help us consolidate tools we have already adopted?',
        answer:
          'Absolutely. We often find companies paying for overlapping tools with low utilization. We audit your current AI tool stack, measure actual usage and value, and recommend a streamlined setup that reduces cost while improving capability.',
      },
    ],
    relatedCaseStudySlugs: ['medical-clinic-network', 'european-b2b-services'],
    relatedServiceDescriptions: {
      'ai-consulting':
        'Pair your tool implementation with our AI Strategy consulting to ensure every tool aligns with your broader business objectives and transformation roadmap.',
      'ai-automation':
        'Once your team is equipped with AI tools, our Automation solutions connect those tools into end-to-end workflows that multiply their impact.',
      'ai-agents':
        'Go beyond individual tools by deploying Custom AI Agents that orchestrate multiple tools autonomously to complete complex tasks.',
    },
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
    heroHeadline: 'Everyone Says You Need AI. Nobody Tells You Where to Start.',
    problemDescription:
      'The pressure to adopt AI is real, but jumping in without a strategy leads to wasted budgets, failed pilots, and frustrated teams. You see competitors moving fast while your organization debates which use case to tackle first. Without a clear roadmap, every AI initiative feels like a gamble.',
    solutionDescription:
      'We give you clarity before you spend a single euro on implementation. Through structured assessments, stakeholder workshops, and data-driven opportunity mapping, we build a prioritized AI roadmap that aligns with your business goals. You will know exactly what to build, in what order, and what results to expect.',
    faqs: [
      {
        question: 'Do we need an AI strategy if we are a small or mid-sized business?',
        answer:
          'Especially if you are a smaller business. Larger companies can afford to experiment and fail. SMEs need every investment to count. A focused strategy ensures you invest in the AI initiatives that will deliver the highest impact for your specific situation, not what is trendy.',
      },
      {
        question: 'How long does an AI strategy engagement take?',
        answer:
          'A focused AI readiness assessment takes 2-3 weeks. A comprehensive strategy with roadmap typically takes 4-6 weeks. We can also run intensive executive workshops in as little as 2-3 days for teams that need to align quickly on direction.',
      },
      {
        question: 'What deliverables do we receive?',
        answer:
          'You receive an AI readiness report, prioritized opportunity map, a phased implementation roadmap with timelines and budget estimates, success metrics and OKRs, and a vendor evaluation framework. Everything is actionable, not a generic slide deck.',
      },
      {
        question: 'Can you also help with implementation after the strategy phase?',
        answer:
          'Yes. Many clients engage us for strategy first, then move into implementation with our AI Automation, AI Agents, or Digital Transformation services. Having built the strategy, we are uniquely positioned to execute it efficiently.',
      },
    ],
    relatedCaseStudySlugs: ['medical-clinic-network', 'luxury-elderly-care'],
    relatedServiceDescriptions: {
      'digital-transformation':
        'Once your AI strategy is defined, our Digital Transformation service executes the full transformation program, from process redesign to change management.',
      'ai-tools':
        'Your strategy will identify which AI tools to adopt. Our AI Tools Implementation service handles the deployment, security, and team training.',
      'ai-automation':
        'Turn strategic priorities into working solutions with our AI Automation service, which builds the workflows identified in your roadmap.',
    },
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    shortTitle: 'Transformation',
    description:
      'Complete process modernization programs, including audit, agile delivery, change management, and AI-centered redesign.',
    longDescription:
      'True digital transformation goes beyond technology, it requires rethinking processes, culture, and workflows with AI at the center. We guide organizations through comprehensive transformation programs that deliver measurable business outcomes.',
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
    heroHeadline: 'Your Processes Were Built for a Pre-AI World. It Is Time to Redesign Them.',
    problemDescription:
      'Your organization is running on processes designed decades ago, patched with workarounds and duct-taped with spreadsheets. Teams resist change because past transformation efforts failed to deliver. Meanwhile, AI-native competitors are operating at a speed and efficiency your current setup simply cannot match.',
    solutionDescription:
      'We do not just bolt AI onto broken processes. We redesign your operations from the ground up with AI at the center, combining process auditing, agile delivery, and hands-on change management. We deliver early wins to build momentum, then systematically transform your organization into one that is built to compete in an AI-driven market.',
    faqs: [
      {
        question: 'How is this different from traditional digital transformation?',
        answer:
          'Traditional digital transformation often means digitizing existing processes, moving from paper to software. AI-centered transformation rethinks the processes themselves. Instead of automating a broken workflow, we redesign it around what AI makes possible, often eliminating steps entirely.',
      },
      {
        question: 'How do you handle resistance to change from employees?',
        answer:
          'Change management is built into every phase, not an afterthought. We involve stakeholders from day one, communicate benefits clearly, deliver quick wins to build trust, and provide comprehensive training. People resist when they feel excluded; we make them co-owners of the transformation.',
      },
      {
        question: 'How long does a full digital transformation take?',
        answer:
          'A comprehensive transformation program typically runs 6-12 months, but we deliver in agile sprints so you see results from month one. We prioritize high-impact, quick-win initiatives first to build momentum and demonstrate ROI before tackling larger systemic changes.',
      },
      {
        question: 'What if we only want to transform one department?',
        answer:
          'That is actually a smart approach. We often recommend starting with a single department as a pilot, proving the model, and then expanding. This reduces risk, builds internal champions, and creates a proven playbook for the rest of the organization.',
      },
    ],
    relatedCaseStudySlugs: ['luxury-elderly-care', 'medical-clinic-network'],
    relatedServiceDescriptions: {
      'ai-consulting':
        'Every transformation starts with strategy. Our AI Strategy consulting defines the vision and roadmap before execution begins.',
      'ai-automation':
        'As part of your transformation, our AI Automation service builds the intelligent workflows that replace manual, legacy processes.',
      'ai-agents':
        'Deploy Custom AI Agents to handle the complex, knowledge-intensive tasks that emerge from your redesigned processes.',
    },
  },
]

interface Pillar {
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
      'We build and integrate AI solutions into your business, from automated workflows and intelligent agents to conversational interfaces and enterprise tool deployments.',
    services: ['ai-automation', 'ai-agents', 'chatbots', 'ai-tools'],
  },
  {
    id: 'consult',
    title: 'Advise',
    subtitle: 'AI Consulting',
    description:
      'We define the right AI strategy for your business, assessing readiness, mapping opportunities, aligning objectives, and training your teams for successful AI adoption.',
    services: ['ai-consulting'],
  },
  {
    id: 'transform',
    title: 'Transform',
    subtitle: 'AI Processes',
    description:
      'We redesign your processes with AI at the center, auditing operations, implementing agile delivery, managing change, and driving comprehensive digital transformation.',
    services: ['digital-transformation'],
  },
]
