import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import { SEO } from '@/components/shared/seo'
import { Hero } from '@/components/home/hero'
import { TechPartners } from '@/components/home/tech-partners'
import { Pillars } from '@/components/home/pillars'
import { ServicesGrid } from '@/components/home/services-grid'
import { NeedsNavigation } from '@/components/home/needs-navigation'
import { ProcessSteps } from '@/components/home/process-steps'
import { Stats } from '@/components/home/stats'
import { Industries } from '@/components/home/industries'
import { TechStack } from '@/components/home/tech-stack'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/home/cta-banner'

export const Route = createFileRoute('/$locale/')({
  beforeLoad: async ({ params }) => {
    await loadNamespace(params.locale, 'home')
  },
  component: HomePage,
})

function HomePage() {
  const { t } = useTranslation('seo')
  return (
    <>
      <SEO
        title={t('home.title')}
        description={t('home.description')}
        path="/"
      />
      <Hero />
      <TechPartners />
      <Pillars />
      <ServicesGrid />
      <NeedsNavigation />
      <ProcessSteps />
      <Stats />
      <Industries />
      <TechStack />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
