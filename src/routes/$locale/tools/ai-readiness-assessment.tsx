import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/shared/seo'
import { AiReadinessAssessment } from '@/components/tools/ai-readiness-assessment'

export const Route = createFileRoute('/$locale/tools/ai-readiness-assessment')({
  component: AiReadinessAssessmentPage,
})

function AiReadinessAssessmentPage() {
  return (
    <>
      <SEO
        title="AI Readiness Assessment"
        description="Take our free 10-question assessment to discover how ready your organization is for AI adoption. Get personalized recommendations from SCIT Consulting."
        path="/tools/ai-readiness-assessment"
      />
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            AI Readiness Assessment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Answer 10 quick questions to discover how ready your organization is for AI — and get
            actionable recommendations.
          </p>
        </div>
      </section>
      <AiReadinessAssessment />
    </>
  )
}
