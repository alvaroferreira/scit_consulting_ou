import { Link } from '@tanstack/react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { industries } from '@/data/industries'

export function Industries() {
  return (
    <Section>
      <SectionHeading
        title="Industries We Serve"
        subtitle="Tailored AI solutions for the challenges specific to your industry."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <div
            key={industry.id}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
          >
            <div className="mb-3 text-3xl">{industry.icon}</div>
            <h3 className="font-semibold">{industry.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {industry.description}
            </p>
            {industry.caseStudySlugs.length > 0 && (
              <Link
                to="/case-studies"
                className="mt-4 inline-flex items-center text-sm font-medium text-scit-purple hover:underline"
              >
                View case studies
                <IconArrowRight size={14} className="ml-1" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
