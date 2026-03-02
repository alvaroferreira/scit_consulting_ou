import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/hooks/use-locale'
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
  const { t } = useTranslation('tools')
  const locale = useLocale()
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
    if (months < 1) return t('roiCalculator.payback.lessThanOneMonth')
    if (months < 2) return t('roiCalculator.payback.oneMonth')
    return t('roiCalculator.payback.months', { count: Math.round(months) })
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
              {t('roiCalculator.sectionTitle')}
            </h2>
          </div>

          <div className="space-y-8">
            <SliderField
              label={t('roiCalculator.sliders.employees.label')}
              value={employees}
              min={5}
              max={500}
              step={5}
              onChange={setEmployees}
            />
            <SliderField
              label={t('roiCalculator.sliders.hoursPerWeek.label')}
              value={hoursPerWeek}
              min={1}
              max={40}
              step={1}
              unit="h"
              onChange={setHoursPerWeek}
            />
            <SliderField
              label={t('roiCalculator.sliders.hourlyCost.label')}
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
            label={t('roiCalculator.metrics.annualCostManualWork.label')}
            value={formatCurrency.format(results.annualCostManualWork)}
            sublabel={`${formatPercent.format(employees * hoursPerWeek)} ${t('roiCalculator.metrics.annualCostManualWork.sublabel')}`}
          />
          <MetricCard
            icon={<IconTrendingUp size={18} />}
            label={t('roiCalculator.metrics.estimatedSavings.label')}
            value={formatCurrency.format(results.estimatedSavings)}
            sublabel={t('roiCalculator.metrics.estimatedSavings.sublabel', { rate: (AUTOMATION_RATE * 100).toFixed(0) })}
          />
          <MetricCard
            icon={<IconTrendingUp size={18} />}
            label={t('roiCalculator.metrics.estimatedRoi.label')}
            value={`${formatPercent.format(results.roiPercentage)}%`}
            sublabel={t('roiCalculator.metrics.estimatedRoi.sublabel', { cost: formatCurrency.format(results.implementationCost) })}
          />
          <MetricCard
            icon={<IconClock size={18} />}
            label={t('roiCalculator.metrics.paybackPeriod.label')}
            value={formatPayback(results.paybackMonths)}
            sublabel={t('roiCalculator.metrics.paybackPeriod.sublabel')}
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t('roiCalculator.disclaimer')}
        </p>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-border bg-gradient-to-br from-scit-purple/5 to-scit-cyan/5 p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground md:text-2xl">
            {t('roiCalculator.cta.title')}
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            {t('roiCalculator.cta.subtitle')}
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/$locale/contact" params={{ locale }}>
                {t('roiCalculator.cta.button')}
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
