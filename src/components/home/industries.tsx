import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { industries } from '@/data/industries'
import { useLocale } from '@/hooks/use-locale'

const industryIdToKey: Record<string, string> = {
  'healthcare': 'healthcare',
  'financial-services': 'financialServices',
  'retail': 'retail',
  'b2b-services': 'b2bServices',
}

export function Industries() {
  const locale = useLocale()
  const { t } = useTranslation('home')
  return (
    <Section>
      <SectionHeading
        title={t('industries.sectionTitle')}
        subtitle={t('industries.sectionSubtitle')}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => {
          const key = industryIdToKey[industry.id] ?? industry.id
          return (
            <div
              key={industry.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
            >
              <div className="mb-3 text-3xl">{industry.icon}</div>
              <h3 className="font-semibold">{t(`industries.items.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`industries.items.${key}.description`)}
              </p>
              {industry.caseStudySlugs.length > 0 && (
                <Link
                  to="/$locale/case-studies"
                  params={{ locale }}
                  className="mt-4 inline-flex items-center text-sm font-medium text-scit-purple hover:underline"
                >
                  {t('industries.viewCaseStudies')}
                  <IconArrowRight size={14} className="ml-1" />
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
