import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { JsonLd } from '@/components/shared/json-ld'
import { Section } from '@/components/shared/section'
import { useLocale } from '@/hooks/use-locale'
import { ResultCard } from './result-card'
import type { CaseStudy } from '@/data/case-studies'

interface CaseStudyPageProps {
  caseStudy: CaseStudy
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const locale = useLocale()
  const { t } = useTranslation('case-studies')
  const csKey = caseStudy.slug

  const title = t(`caseStudies.${csKey}.title`)
  const challenge = t(`caseStudies.${csKey}.challenge`)
  const approach = t(`caseStudies.${csKey}.approach`, { returnObjects: true }) as string[]
  const solution = t(`caseStudies.${csKey}.solution`)
  const industry = t(`caseStudies.${csKey}.industry`)
  const results = t(`caseStudies.${csKey}.results`, { returnObjects: true }) as Array<{ metric: string; description: string }>

  const articleJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${title} — ${t('page.title')}`,
    description: challenge.slice(0, 155),
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
    mainEntityOfPage: `https://scitconsulting.eu/${locale}/case-studies/${caseStudy.slug}`,
    about: { '@type': 'Thing', name: industry },
  }), [title, challenge, industry, caseStudy.slug, locale, t])

  return (
    <>
      <SEO
        title={`${title} — ${t('page.title')}`}
        description={challenge.slice(0, 155) + '...'}
        path={`/case-studies/${caseStudy.slug}`}
      />
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              {industry}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.theChallenge')}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {challenge}
          </p>
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.ourApproach')}</h2>
          <div className="mt-6 grid gap-4">
            {approach.map((step, i) => (
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
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.theSolution')}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {solution}
          </p>
        </div>
      </Section>

      {/* Results */}
      <Section className="bg-muted/30">
        <h2 className="text-2xl font-bold text-center md:text-3xl mb-10">
          {t('template.results')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.results.map((result, i) => (
            <ResultCard
              key={result.metric}
              result={{
                ...result,
                metric: results[i]?.metric ?? result.metric,
                description: results[i]?.description ?? result.description,
              }}
            />
          ))}
        </div>
      </Section>

      {/* Tech Stack */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">{t('template.techStack')}</h2>
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
            {t('template.ctaTitle')}
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            {t('template.ctaSubtitle')}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/$locale/contact" params={{ locale }}>
                {t('template.getInTouch')}
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-scit-deep">
              <Link to="/$locale/case-studies" params={{ locale }}>
                {t('template.moreCaseStudies')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
