import { useTranslation } from 'react-i18next'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

export function CompanyTimeline() {
  const { t } = useTranslation('about')

  const timeline = t('timeline.events', { returnObjects: true }) as TimelineEvent[]

  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title={t('timeline.title')}
        subtitle={t('timeline.subtitle')}
      />
      <div className="mx-auto max-w-2xl">
        <div className="relative border-l-2 border-scit-purple/20 pl-8">
          {timeline.map((event, i) => (
            <div key={event.year} className={`relative ${i < timeline.length - 1 ? 'pb-10' : ''}`}>
              {/* Dot */}
              <div className="absolute -left-[calc(2rem+5px)] flex h-3 w-3 items-center justify-center rounded-full bg-scit-purple ring-4 ring-background" />
              <span className="inline-block rounded-full bg-scit-purple/10 px-3 py-1 text-xs font-bold text-scit-purple">
                {event.year}
              </span>
              <h3 className="mt-2 font-semibold">{event.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
