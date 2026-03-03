import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import {
  IconArrowRight,
  IconBriefcase,
  IconArticle,
  IconCalculator,
  IconClipboardCheck,
} from '@tabler/icons-react'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { caseStudies } from '@/data/case-studies'
import { blogPosts } from '@/data/blog-posts'
import { useLocale } from '@/hooks/use-locale'

export const Route = createFileRoute('/$locale/resources')({
  beforeLoad: async ({ params }) => {
    await Promise.all([
      loadNamespace(params.locale, 'resources'),
      loadNamespace(params.locale, 'blog'),
    ])
  },
  component: ResourcesPage,
})

function ResourcesPage() {
  const { t } = useTranslation('resources')
  const { t: tBlog } = useTranslation('blog')
  const locale = useLocale()

  const sectionItems = t('sections.items', { returnObjects: true }) as Array<{
    title: string
    description?: string
    descriptionTemplate?: string
  }>

  const resourceSections = [
    {
      title: sectionItems[0]?.title ?? 'Case Studies',
      description: sectionItems[0]?.descriptionTemplate
        ? sectionItems[0].descriptionTemplate.replace('{{count}}', String(caseStudies.length))
        : `${caseStudies.length} real-world projects with measurable results across healthcare, B2B services, and real estate.`,
      to: '/$locale/case-studies' as const,
      icon: IconBriefcase,
      color: 'bg-scit-purple/10 text-scit-purple',
    },
    {
      title: sectionItems[1]?.title ?? 'Blog & Insights',
      description: sectionItems[1]?.descriptionTemplate
        ? sectionItems[1].descriptionTemplate.replace('{{count}}', String(blogPosts.length))
        : `${blogPosts.length} articles on AI strategy, implementation, automation ROI, and digital transformation.`,
      to: '/$locale/blog' as const,
      icon: IconArticle,
      color: 'bg-scit-cyan/10 text-scit-cyan',
    },
    {
      title: sectionItems[2]?.title ?? 'AI ROI Calculator',
      description: sectionItems[2]?.description ?? 'Estimate the potential savings and return on investment from AI automation for your business.',
      to: '/$locale/tools/roi-calculator' as const,
      icon: IconCalculator,
      color: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
    },
    {
      title: sectionItems[3]?.title ?? 'AI Readiness Assessment',
      description: sectionItems[3]?.description ?? 'Answer 10 questions to discover how ready your organization is for AI adoption and get actionable recommendations.',
      to: '/$locale/tools/ai-readiness-assessment' as const,
      icon: IconClipboardCheck,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    },
  ]

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        path="/resources"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          title={t('sections.title')}
          subtitle={t('sections.subtitle')}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {resourceSections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.title}
                to={section.to}
                params={{ locale }}
                className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${section.color}`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-scit-purple transition-colors">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-scit-purple opacity-0 transition-opacity group-hover:opacity-100">
                    {t('sections.explore')}
                    <IconArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* Latest Blog Posts */}
      <Section className="bg-muted/30">
        <SectionHeading
          title={t('latestArticles.title')}
          subtitle={t('latestArticles.subtitle')}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to="/$locale/blog/$slug"
              params={{ locale, slug: post.slug }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
            >
              <p className="text-xs text-muted-foreground">{post.date}</p>
              <h3 className="mt-2 font-semibold group-hover:text-scit-purple transition-colors line-clamp-2">
                {tBlog(`posts.${post.slug}.title`, post.title)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {tBlog(`posts.${post.slug}.excerpt`, post.excerpt)}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/$locale/blog"
            params={{ locale }}
            className="inline-flex items-center text-sm font-medium text-scit-purple hover:underline"
          >
            {t('latestArticles.viewAll')}
            <IconArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </Section>
    </>
  )
}
