import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import {
  IconArrowRight,
  IconCalculator,
  IconClipboardCheck,
} from '@tabler/icons-react'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { useLocale } from '@/hooks/use-locale'

export const Route = createFileRoute('/$locale/tools/')({
  beforeLoad: async ({ params }) => {
    await Promise.all([
      loadNamespace(params.locale, 'tools'),
      loadNamespace(params.locale, 'resources'),
    ])
  },
  component: ToolsPage,
})

function ToolsPage() {
  const { t } = useTranslation('tools')
  const { t: tResources } = useTranslation('resources')
  const locale = useLocale()

  const tools = [
    {
      title: tResources('sections.items.2.title', 'AI ROI Calculator'),
      description: tResources(
        'sections.items.2.description',
        'Estimate the potential savings and return on investment from AI automation for your business.'
      ),
      to: '/$locale/tools/roi-calculator' as const,
      icon: IconCalculator,
      color: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
    },
    {
      title: tResources('sections.items.3.title', 'AI Readiness Assessment'),
      description: tResources(
        'sections.items.3.description',
        'Answer 10 questions to discover how ready your organization is for AI adoption and get actionable recommendations.'
      ),
      to: '/$locale/tools/ai-readiness-assessment' as const,
      icon: IconClipboardCheck,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    },
  ]

  return (
    <>
      <SEO
        title={t('index.seo.title', 'Free AI Tools')}
        description={t(
          'index.seo.description',
          'Free interactive AI tools: ROI Calculator and AI Readiness Assessment. Evaluate your business potential with AI.'
        )}
        path="/tools"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('index.hero.title', 'Free AI Tools')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t(
              'index.hero.subtitle',
              'Interactive tools to help you evaluate AI opportunities and measure potential impact on your business.'
            )}
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          title={t('index.sections.title', 'Choose a Tool')}
          subtitle={t(
            'index.sections.subtitle',
            'Select a tool to get started with your AI evaluation.'
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.title}
                to={tool.to}
                params={{ locale }}
                className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tool.color}`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-scit-purple transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-scit-purple opacity-0 transition-opacity group-hover:opacity-100">
                    {tResources('sections.explore', 'Explore')}
                    <IconArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}
