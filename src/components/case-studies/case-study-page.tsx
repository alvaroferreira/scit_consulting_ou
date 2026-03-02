import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { JsonLd } from '@/components/shared/json-ld'
import { Section } from '@/components/shared/section'
import { ResultCard } from './result-card'
import type { CaseStudy } from '@/data/case-studies'

interface CaseStudyPageProps {
  caseStudy: CaseStudy
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const articleJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${caseStudy.title} — Case Study`,
    description: caseStudy.challenge.slice(0, 155),
    author: {
      '@type': 'Organization',
      name: 'SCIT Consulting',
      url: 'https://scitconsulting.eu',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SCIT Consulting',
      url: 'https://scitconsulting.eu',
      logo: { '@type': 'ImageObject', url: 'https://scitconsulting.eu/images/logo-black.png' },
    },
    mainEntityOfPage: `https://scitconsulting.eu/case-studies/${caseStudy.slug}`,
    about: { '@type': 'Thing', name: caseStudy.industry },
  }), [caseStudy])

  return (
    <>
      <SEO
        title={`${caseStudy.title} — Case Study`}
        description={caseStudy.challenge.slice(0, 155) + '...'}
        path={`/case-studies/${caseStudy.slug}`}
      />
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              {caseStudy.industry}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {caseStudy.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">The Challenge</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {caseStudy.challenge}
          </p>
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">Our Approach</h2>
          <div className="mt-6 grid gap-4">
            {caseStudy.approach.map((step, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-scit-purple to-scit-cyan text-white text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">The Solution</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
      </Section>

      {/* Results */}
      <Section className="bg-muted/30">
        <h2 className="text-2xl font-bold text-center md:text-3xl mb-10">
          Results
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.results.map((result) => (
            <ResultCard key={result.metric} result={result} />
          ))}
        </div>
      </Section>

      {/* Tech Stack */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">Technology Stack</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {caseStudy.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <IconCheck size={14} className="text-scit-purple" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready for Similar Results?
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Let&apos;s discuss how we can help your business achieve measurable outcomes with AI.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/contact">
                Get in Touch
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-scit-deep">
              <Link to="/case-studies">
                More Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
