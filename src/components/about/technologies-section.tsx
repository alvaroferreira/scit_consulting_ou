import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'

interface TechCategory {
  label: string
  items: string[]
}

const techCategories: TechCategory[] = [
  {
    label: 'AI Models',
    items: ['Claude (Anthropic)', 'GPT-4o (OpenAI)', 'Gemini (Google)', 'LLaMA', 'Mistral', 'Open-source LLMs'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'Backend & APIs',
    items: ['Node.js', 'Python', 'FastAPI', 'REST', 'GraphQL', 'WebSockets'],
  },
  {
    label: 'Infrastructure',
    items: ['Cloudflare', 'AWS', 'Google Cloud', 'Vercel', 'Supabase', 'Docker'],
  },
  {
    label: 'Data & AI Tools',
    items: ['LangChain', 'Vector DBs', 'RAG Pipelines', 'Hugging Face', 'n8n', 'Make'],
  },
]

export function TechnologiesSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title="Our Technology Stack"
        subtitle="We choose the right tools for each project — never locked into a single vendor."
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
