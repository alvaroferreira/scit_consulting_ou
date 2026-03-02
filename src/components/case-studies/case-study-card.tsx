import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight } from '@tabler/icons-react'
import { useLocale } from '@/hooks/use-locale'
import type { CaseStudy } from '@/data/case-studies'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const locale = useLocale()
  const { t } = useTranslation('case-studies')
  const csKey = caseStudy.slug

  const title = t(`caseStudies.${csKey}.title`)
  const industry = t(`caseStudies.${csKey}.industry`)
  const challenge = t(`caseStudies.${csKey}.challenge`)
  const results = t(`caseStudies.${csKey}.results`, { returnObjects: true }) as Array<{ metric: string; description: string }>

  return (
    <Link
      to="/$locale/case-studies/$slug"
      params={{ locale, slug: caseStudy.slug }}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
    >
      <div className="mb-3">
        <span className="inline-block rounded-full bg-scit-purple/10 px-3 py-1 text-xs font-medium text-scit-purple">
          {industry}
        </span>
      </div>
      <h3 className="text-lg font-semibold group-hover:text-scit-purple transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
        {challenge}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {caseStudy.results.slice(0, 2).map((result, i) => (
          <div key={result.metric} className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-lg font-bold text-scit-purple">
              {result.value}{result.suffix}
            </p>
            <p className="text-xs text-muted-foreground">{results[i]?.metric ?? result.metric}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 flex items-center text-sm font-medium text-scit-purple opacity-0 transition-opacity group-hover:opacity-100">
        {t('template.readCaseStudy')}
        <IconArrowRight size={16} className="ml-1" />
      </div>
    </Link>
  )
}
