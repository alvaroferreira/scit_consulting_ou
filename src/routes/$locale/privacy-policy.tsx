import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'

export const Route = createFileRoute('/$locale/privacy-policy')({
  beforeLoad: async ({ params }) => {
    await loadNamespace(params.locale, 'legal')
  },
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const { t } = useTranslation('legal')

  const sections = t('privacy.sections', { returnObjects: true }) as Array<{
    heading: string
    body: string
  }>

  return (
    <>
      <SEO
        title={t('privacy.seo.title')}
        description={t('privacy.seo.description')}
        path="/privacy-policy"
      />
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{t('privacy.hero.title')}</h1>
          <p className="mt-2 text-white/60 text-sm">{t('privacy.hero.lastUpdated')}</p>
        </div>
      </section>

      <Section>
        <div className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold mt-8">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed mt-3 whitespace-pre-line">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
