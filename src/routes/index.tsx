import { createFileRoute } from '@tanstack/react-router'
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
