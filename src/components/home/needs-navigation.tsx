import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { useLocale } from '@/hooks/use-locale'

const needs = [
  { key: 'automateProcesses', href: '/services/ai-automation' },
  { key: 'buildAgents', href: '/services/ai-agents' },
  { key: 'improveSupport', href: '/services/chatbots' },
  { key: 'implementTools', href: '/services/ai-tools' },
  { key: 'defineStrategy', href: '/services/ai-consulting' },
  { key: 'modernizeOperations', href: '/services/digital-transformation' },
  { key: 'seeResults', href: '/case-studies' },
]

export function NeedsNavigation() {
  const locale = useLocale()
  const { t } = useTranslation('home')
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title={t('needs.sectionTitle')}
        subtitle={t('needs.sectionSubtitle')}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {needs.map((need) => (
          <Link
            key={need.key}
            to={`/$locale${need.href}` as string}
            params={{ locale }}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-scit-purple/30 hover:shadow-lg"
          >
            <div className="flex-1">
              <p className="font-medium text-sm group-hover:text-scit-purple transition-colors">
                {t(`needs.items.${need.key}.label`)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(`needs.items.${need.key}.description`)}
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
