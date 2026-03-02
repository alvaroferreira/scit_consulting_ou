import { useTranslation } from 'react-i18next'
import {
  IconSearch,
  IconMap,
  IconRocket,
  IconTrendingUp,
} from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

const steps = [
  { id: 'diagnose', number: 1, icon: IconSearch },
  { id: 'plan', number: 2, icon: IconMap },
  { id: 'implement', number: 3, icon: IconRocket },
  { id: 'scale', number: 4, icon: IconTrendingUp },
]

export function ProcessSteps() {
  const { t } = useTranslation('home')
  return (
    <Section>
      <SectionHeading
        title={t('process.sectionTitle')}
        subtitle={t('process.sectionSubtitle')}
      />

      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.id} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+24px)] hidden h-0.5 w-[calc(100%-48px)] bg-gradient-to-r from-scit-purple/30 to-scit-cyan/30 md:block" />
              )}

              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-scit-purple to-scit-cyan text-white">
                <Icon size={22} />
              </div>

              <div className="text-xs font-medium text-scit-purple mb-1">
                {t('process.stepLabel')} {step.number}
              </div>
              <h3 className="text-lg font-bold">{t(`process.steps.${step.id}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`process.steps.${step.id}.description`)}
              </p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
