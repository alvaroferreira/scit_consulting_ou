import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface Market {
  country: string
  cities: string[]
  flag: string
}

const markets: Market[] = [
  { country: 'Portugal', cities: ['Lisbon'], flag: '🇵🇹' },
  { country: 'Germany', cities: ['Munich', 'Düsseldorf'], flag: '🇩🇪' },
  { country: 'Spain', cities: ['Madrid'], flag: '🇪🇸' },
  { country: 'Czech Republic', cities: ['Prague'], flag: '🇨🇿' },
  { country: 'Estonia', cities: ['Tallinn (HQ)'], flag: '🇪🇪' },
]

export function MarketsMap() {
  return (
    <Section>
      <SectionHeading
        title="Where We Operate"
        subtitle="Based in Estonia, delivering across Europe."
      />
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <div
              key={market.country}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <span className="text-2xl">{market.flag}</span>
              <div>
                <p className="font-semibold text-sm">{market.country}</p>
                <p className="text-xs text-muted-foreground">
                  {market.cities.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
