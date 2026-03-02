import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/shared/seo'
import { RoiCalculator } from '@/components/tools/roi-calculator'

export const Route = createFileRoute('/$locale/tools/roi-calculator')({
  component: RoiCalculatorPage,
})

function RoiCalculatorPage() {
  return (
    <>
      <SEO
        title="AI ROI Calculator"
        description="Calculate the potential return on investment from AI automation for your business. Free interactive tool by SCIT Consulting."
        path="/tools/roi-calculator"
      />
      {/* Purple gradient hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            AI ROI Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Estimate the potential savings and return on investment from
            implementing AI automation in your business.
          </p>
        </div>
      </section>
      <RoiCalculator />
    </>
  )
}
