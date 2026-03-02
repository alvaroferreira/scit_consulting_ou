import { createFileRoute, Link } from '@tanstack/react-router'
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

export const Route = createFileRoute('/resources')({
  component: ResourcesPage,
})

const resourceSections = [
  {
    title: 'Case Studies',
    description: `${caseStudies.length} real-world projects with measurable results across healthcare, B2B services, and real estate.`,
    href: '/case-studies',
    icon: IconBriefcase,
    color: 'bg-scit-purple/10 text-scit-purple',
  },
  {
    title: 'Blog & Insights',
    description: `${blogPosts.length} articles on AI strategy, implementation, automation ROI, and digital transformation.`,
    href: '/blog',
    icon: IconArticle,
    color: 'bg-scit-cyan/10 text-scit-cyan',
  },
  {
    title: 'AI ROI Calculator',
    description:
      'Estimate the potential savings and return on investment from AI automation for your business.',
    href: '/tools/roi-calculator',
    icon: IconCalculator,
    color: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
  },
  {
    title: 'AI Readiness Assessment',
    description:
      'Answer 10 questions to discover how ready your organization is for AI adoption and get actionable recommendations.',
    href: '/tools/ai-readiness-assessment',
    icon: IconClipboardCheck,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  },
]

function ResourcesPage() {
  return (
    <>
      <SEO
        title="Resources"
        description="Free AI resources: case studies, blog articles, ROI calculator, and AI readiness assessment. Everything you need to plan your AI journey."
        path="/resources"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Resources
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Case studies, articles, and free tools to help you plan and succeed with AI.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          title="Explore Our Resources"
          subtitle="Everything you need to understand, evaluate, and implement AI in your business."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {resourceSections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.title}
                to={section.href}
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
                    Explore
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
          title="Latest Articles"
          subtitle="Stay up to date with the latest insights on AI and digital transformation."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
            >
              <p className="text-xs text-muted-foreground">{post.date}</p>
              <h3 className="mt-2 font-semibold group-hover:text-scit-purple transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-medium text-scit-purple hover:underline"
          >
            View all articles
            <IconArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </Section>
    </>
  )
}
