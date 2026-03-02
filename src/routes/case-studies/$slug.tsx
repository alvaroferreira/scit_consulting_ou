import { createFileRoute } from '@tanstack/react-router'
import { CaseStudyPage } from '@/components/case-studies/case-study-page'
import { caseStudies } from '@/data/case-studies'

export const Route = createFileRoute('/case-studies/$slug')({
  component: CaseStudyRoute,
})

function CaseStudyRoute() {
  const { slug } = Route.useParams()
  const caseStudy = caseStudies.find((cs) => cs.slug === slug)

  if (!caseStudy) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Case Study Not Found</h1>
        <p className="mt-2 text-muted-foreground">The case study you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    )
  }

  return <CaseStudyPage caseStudy={caseStudy} />
}
