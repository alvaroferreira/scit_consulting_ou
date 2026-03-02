import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { CaseStudyCard } from '@/components/case-studies/case-study-card'
import { caseStudies, industryCategories } from '@/data/case-studies'

export const Route = createFileRoute('/case-studies/')({
  component: CaseStudiesIndex,
})

function CaseStudiesIndex() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.industryCategory === activeFilter)

  return (
    <>
      <SEO
        title="Case Studies"
        description="Explore how SCIT Consulting has helped businesses across healthcare, B2B services, and real estate achieve measurable results with AI solutions."
        path="/case-studies"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Case Studies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Real results from real projects. See how we&apos;ve helped businesses transform with AI.
          </p>
        </div>
      </section>

      <Section>
        {/* Industry Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {['All', ...industryCategories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-scit-purple text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>
    </>
  )
}
