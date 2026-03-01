import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/shared/seo'
import { Hero } from '@/components/home/hero'
import { Pillars } from '@/components/home/pillars'
import { ServicesGrid } from '@/components/home/services-grid'
import { ProcessSteps } from '@/components/home/process-steps'
import { Stats } from '@/components/home/stats'
import { TechStack } from '@/components/home/tech-stack'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/home/cta-banner'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <SEO
        title="SCIT Consulting - AI-First Digital Transformation"
        description="We implement AI tools, automate processes and build intelligent agents. From strategy to execution, SCIT Consulting transforms your business with artificial intelligence."
        path="/"
      />
      <Hero />
      <Pillars />
      <ServicesGrid />
      <ProcessSteps />
      <Stats />
      <TechStack />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
