import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  IconCurrencyEuro,
  IconTrendingUp,
  IconClock,
  IconCalculator,
  IconArrowRight,
} from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { Button } from '@/components/ui/button'

const AUTOMATION_RATE = 0.65
const COST_PER_EMPLOYEE = 500

const formatCurrency = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const formatPercent = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

interface SliderFieldProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  prefix?: string
  onChange: (value: number) => void
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  prefix,
  onChange,
}: SliderFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="rounded-lg bg-scit-purple/10 px-3 py-1 text-sm font-semibold text-scit-purple">
          {prefix}
          {formatPercent.format(value)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {prefix}
          {formatPercent.format(min)}
          {unit}
        </span>
        <span>
          {prefix}
          {formatPercent.format(max)}
          {unit}
        </span>
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  sublabel?: string
}

function MetricCard({ icon, label, value, sublabel }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-scit-purple md:text-3xl">
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
      )}
    </div>
  )
}

export function RoiCalculator() {
  const [employees, setEmployees] = useState(25)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyCost, setHourlyCost] = useState(45)

  const results = useMemo(() => {
    const weeklyHoursWasted = employees * hoursPerWeek
    const annualCostManualWork = weeklyHoursWasted * hourlyCost * 52
    const estimatedSavings = annualCostManualWork * AUTOMATION_RATE
    const implementationCost = employees * COST_PER_EMPLOYEE
    const roiPercentage = (estimatedSavings / implementationCost) * 100
    const paybackMonths = implementationCost / (estimatedSavings / 12)

    return {
      annualCostManualWork,
      estimatedSavings,
      roiPercentage,
      paybackMonths,
      implementationCost,
    }
  }, [employees, hoursPerWeek, hourlyCost])

  const formatPayback = (months: number): string => {
    if (months < 1) return '< 1 month'
    if (months < 2) return '1 month'
    return `${formatPercent.format(months)} months`
  }

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        {/* Sliders Section */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-scit-purple/10">
              <IconCalculator size={20} className="text-scit-purple" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Configure Your Parameters
            </h2>
          </div>

          <div className="space-y-8">
            <SliderField
              label="Number of employees"
              value={employees}
              min={5}
              max={500}
              step={5}
              onChange={setEmployees}
            />
            <SliderField
              label="Hours spent on repetitive tasks per week (per employee)"
              value={hoursPerWeek}
              min={1}
              max={40}
              step={1}
              unit="h"
              onChange={setHoursPerWeek}
            />
            <SliderField
              label="Average hourly cost"
              value={hourlyCost}
              min={15}
              max={150}
              step={5}
              prefix="\u20AC"
              onChange={setHourlyCost}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <MetricCard
            icon={<IconCurrencyEuro size={18} />}
            label="Annual Cost of Manual Work"
            value={formatCurrency.format(results.annualCostManualWork)}
            sublabel={`${formatPercent.format(employees * hoursPerWeek)} hours wasted per week`}
          />
          <MetricCard
            icon={<IconTrendingUp size={18} />}
            label="Estimated Annual Savings"
            value={formatCurrency.format(results.estimatedSavings)}
            sublabel={`Based on ${(AUTOMATION_RATE * 100).toFixed(0)}% automation rate`}
          />
          <MetricCard
            icon={<IconTrendingUp size={18} />}
            label="Estimated ROI"
            value={`${formatPercent.format(results.roiPercentage)}%`}
            sublabel={`Implementation cost: ${formatCurrency.format(results.implementationCost)}`}
          />
          <MetricCard
            icon={<IconClock size={18} />}
            label="Payback Period"
            value={formatPayback(results.paybackMonths)}
            sublabel="Time to recover your investment"
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          These estimates are based on industry averages. Actual results may vary
          depending on your specific business processes and implementation scope.
        </p>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-border bg-gradient-to-br from-scit-purple/5 to-scit-cyan/5 p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground md:text-2xl">
            Want a precise ROI analysis for your business?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Our team will analyse your specific workflows and provide a detailed,
            customised assessment with actionable recommendations.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/contact">
                Get Your Custom Analysis
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
