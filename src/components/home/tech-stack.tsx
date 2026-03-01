import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { techStack } from '@/data/tech-stack'

export function TechStack() {
  return (
    <Section className="bg-muted/30">
      <SectionHeading
        title="Built with Modern Technology"
        subtitle="We leverage the best tools and platforms to build robust, scalable AI solutions."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {techStack.map((category) => (
          <div
            key={category.name}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-4 text-sm font-semibold text-scit-purple">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
