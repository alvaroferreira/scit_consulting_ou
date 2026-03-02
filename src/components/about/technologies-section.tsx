import { useTranslation } from 'react-i18next'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface TechCategory {
  label: string
  items: string[]
}

export function TechnologiesSection() {
  const { t } = useTranslation('about')

  const techCategories = t('technologies.categories', { returnObjects: true }) as TechCategory[]

  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title={t('technologies.title')}
        subtitle={t('technologies.subtitle')}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {techCategories.map((category) => (
          <div key={category.label} className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-scit-purple">{category.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
