import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timeline: TimelineEvent[] = [
  {
    year: '2010',
    title: 'Consulting Roots',
    description: 'Started in enterprise consulting, leading digital transformation projects across Europe.',
  },
  {
    year: '2018',
    title: 'AI Focus',
    description: 'Shifted focus to artificial intelligence, building early automation and chatbot solutions.',
  },
  {
    year: '2023',
    title: 'SCIT Consulting Founded',
    description: 'Established SCIT Consulting in Estonia as an AI-native consultancy for European businesses.',
  },
  {
    year: '2024',
    title: 'AI Agents & LLMs',
    description: 'Expanded into custom AI agents, LLM integrations, and advanced automation using Claude, GPT, and Gemini.',
  },
  {
    year: '2025',
    title: '35+ Projects Milestone',
    description: 'Surpassed 35 projects across 6 industries with a 95% client satisfaction rate.',
  },
]

export function CompanyTimeline() {
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title="Our Journey"
        subtitle="From enterprise consulting to AI-native solutions."
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
