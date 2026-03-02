import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconRocket, IconBulb, IconRefresh, IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

const pillarItems = [
  { id: 'implement', link: '/services' },
  { id: 'consult', link: '/services/ai-consulting' },
  { id: 'transform', link: '/services/digital-transformation' },
]

const pillarIcons = {
  implement: IconRocket,
  consult: IconBulb,
  transform: IconRefresh,
}

export function Pillars() {
  const { t } = useTranslation('home')
  return (
    <Section>
      <SectionHeading
        title={t('pillars.sectionTitle')}
        subtitle={t('pillars.sectionSubtitle')}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {pillarItems.map((pillar) => {
          const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons]

          return (
            <div
              key={pillar.id}
              className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-scit-purple/30 hover:shadow-lg hover:shadow-scit-purple/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-scit-purple to-scit-cyan text-white">
                <Icon size={24} />
              </div>

              <h3 className="text-xl font-bold">{t(`pillars.items.${pillar.id}.title`)}</h3>
              <p className="text-sm font-medium text-scit-purple">{t(`pillars.items.${pillar.id}.subtitle`)}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {t(`pillars.items.${pillar.id}.description`)}
              </p>

              <Link
                to={pillar.link}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-scit-purple transition-colors hover:text-scit-violet"
              >
                {t('pillars.learnMore')}
                <IconArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
