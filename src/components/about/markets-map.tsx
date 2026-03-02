import { useTranslation } from 'react-i18next'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface MarketItem {
  country: string
  cities: string
}

const flags: Record<string, string> = {
  Portugal: '\u{1F1F5}\u{1F1F9}',
  Germany: '\u{1F1E9}\u{1F1EA}',
  Spain: '\u{1F1EA}\u{1F1F8}',
  'Czech Republic': '\u{1F1E8}\u{1F1FF}',
  Estonia: '\u{1F1EA}\u{1F1EA}',
}

export function MarketsMap() {
  const { t } = useTranslation('about')

  const markets = t('markets.items', { returnObjects: true }) as MarketItem[]

  return (
    <Section>
      <SectionHeading
        title={t('markets.title')}
        subtitle={t('markets.subtitle')}
      />
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <div
              key={market.country}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <span className="text-2xl">{flags[market.country] ?? ''}</span>
              <div>
                <p className="font-semibold text-sm">{market.country}</p>
                <p className="text-xs text-muted-foreground">
                  {market.cities}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
