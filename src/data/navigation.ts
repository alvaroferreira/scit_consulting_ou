export interface NavItem {
  labelKey: string
  href: string
  children?: NavItem[]
}

export const mainNavItems: NavItem[] = [
  {
    labelKey: 'nav.services',
    href: '/services',
    children: [
      { labelKey: 'nav.aiAutomation', href: '/services/ai-automation' },
      { labelKey: 'nav.aiAgents', href: '/services/ai-agents' },
      { labelKey: 'nav.chatbots', href: '/services/chatbots' },
      { labelKey: 'nav.aiTools', href: '/services/ai-tools' },
      { labelKey: 'nav.aiConsulting', href: '/services/ai-consulting' },
      { labelKey: 'nav.digitalTransformation', href: '/services/digital-transformation' },
    ],
  },
  { labelKey: 'nav.caseStudies', href: '/case-studies' },
  {
    labelKey: 'nav.resources',
    href: '/resources',
    children: [
      { labelKey: 'nav.blog', href: '/blog' },
      { labelKey: 'nav.roiCalculator', href: '/tools/roi-calculator' },
      { labelKey: 'nav.aiReadiness', href: '/tools/ai-readiness-assessment' },
    ],
  },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.contact', href: '/contact' },
]

export const footerNavItems = {
  services: [
    { labelKey: 'footer.aiAutomation', href: '/services/ai-automation' },
    { labelKey: 'footer.aiAgents', href: '/services/ai-agents' },
    { labelKey: 'footer.chatbots', href: '/services/chatbots' },
    { labelKey: 'footer.aiTools', href: '/services/ai-tools' },
    { labelKey: 'footer.aiConsulting', href: '/services/ai-consulting' },
    { labelKey: 'footer.digitalTransformation', href: '/services/digital-transformation' },
  ],
  company: [
    { labelKey: 'footer.about', href: '/about' },
    { labelKey: 'footer.approach', href: '/approach' },
    { labelKey: 'nav.caseStudies', href: '/case-studies' },
    { labelKey: 'footer.blog', href: '/blog' },
    { labelKey: 'footer.resources', href: '/resources' },
    { labelKey: 'footer.contact', href: '/contact' },
  ],
  legal: [
    { labelKey: 'footer.privacyPolicy', href: '/privacy-policy' },
    { labelKey: 'footer.termsOfService', href: '/terms' },
  ],
}
