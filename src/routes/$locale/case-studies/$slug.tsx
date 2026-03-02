import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { CaseStudyPage } from '@/components/case-studies/case-study-page'
import { caseStudies } from '@/data/case-studies'

export const Route = createFileRoute('/$locale/case-studies/$slug')({
  component: CaseStudyRoute,
})

function CaseStudyRoute() {
  const { slug } = Route.useParams()
  const { t } = useTranslation('case-studies')
  const caseStudy = caseStudies.find((cs) => cs.slug === slug)

  if (!caseStudy) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">{t('template.notFound')}</h1>
        <p className="mt-2 text-muted-foreground">{t('template.notFoundMessage')}</p>
      </div>
    )
  }

  return <CaseStudyPage caseStudy={caseStudy} />
}
