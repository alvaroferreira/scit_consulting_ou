import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { services } from '@/data/services'
import { useLocale } from '@/hooks/use-locale'

const serviceIdToKey: Record<string, string> = {
  'ai-automation': 'aiAutomation',
  'ai-agents': 'aiAgents',
  'chatbots': 'chatbots',
  'ai-tools': 'aiTools',
  'ai-consulting': 'aiConsulting',
  'digital-transformation': 'digitalTransformation',
}

export function ServicesGrid() {
  const locale = useLocale()
  const { t } = useTranslation('home')
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title={t('servicesGrid.sectionTitle')}
        subtitle={t('servicesGrid.sectionSubtitle')}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          const key = serviceIdToKey[service.id] ?? service.id
          return (
            <Link
              key={service.id}
              to={`/$locale${service.href}` as string}
              params={{ locale }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg hover:shadow-scit-purple/5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                <Icon size={22} />
              </div>

              <h3 className="text-lg font-semibold group-hover:text-scit-purple transition-colors">
                {t(`servicesGrid.items.${key}.shortTitle`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`servicesGrid.items.${key}.description`)}
              </p>

              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-scit-purple">
                {t('servicesGrid.learnMore')}
                <IconArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
