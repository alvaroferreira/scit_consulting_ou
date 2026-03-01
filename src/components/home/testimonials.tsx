import { IconQuote } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        title="What Our Clients Say"
        subtitle="Real results from real partnerships."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-6"
          >
            <IconQuote size={24} className="text-scit-purple/30 mb-4" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-sm font-semibold">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
