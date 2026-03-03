import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { CaseStudyCard } from '@/components/case-studies/case-study-card'
import { caseStudies, industryCategories } from '@/data/case-studies'

export const Route = createFileRoute('/$locale/case-studies/')({
  beforeLoad: async ({ params }) => {
    await loadNamespace(params.locale, 'case-studies')
  },
  component: CaseStudiesIndex,
})

function CaseStudiesIndex() {
  const { t } = useTranslation('case-studies')
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.industryCategory === activeFilter)

  return (
    <>
      <SEO
        title={t('page.title')}
        description={t('page.subtitle')}
        path="/case-studies"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('page.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('page.subtitle')}
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
              {category === 'All' ? t('page.filterAll') : category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div aria-live="polite" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>
    </>
  )
}
