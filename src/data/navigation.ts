export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const mainNavItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'AI Automation & Processes', href: '/services/ai-automation' },
      { label: 'Custom AI Agents', href: '/services/ai-agents' },
      { label: 'Chatbots & Conversational AI', href: '/services/chatbots' },
      { label: 'AI Tools Implementation', href: '/services/ai-tools' },
      { label: 'AI Strategy & Consulting', href: '/services/ai-consulting' },
      { label: 'Digital Transformation', href: '/services/digital-transformation' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Blog & Insights', href: '/blog' },
      { label: 'AI ROI Calculator', href: '/tools/roi-calculator' },
      { label: 'AI Readiness Assessment', href: '/tools/ai-readiness-assessment' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const footerNavItems = {
  services: [
    { label: 'AI Automation', href: '/services/ai-automation' },
    { label: 'AI Agents', href: '/services/ai-agents' },
    { label: 'Chatbots', href: '/services/chatbots' },
    { label: 'AI Tools', href: '/services/ai-tools' },
    { label: 'AI Consulting', href: '/services/ai-consulting' },
    { label: 'Digital Transformation', href: '/services/digital-transformation' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Approach', href: '/approach' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}
