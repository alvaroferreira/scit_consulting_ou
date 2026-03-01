import { createFileRoute, Link } from '@tanstack/react-router'
import { IconArrowRight, IconBuildingSkyscraper, IconUsers, IconCertificate, IconWorld } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Stats } from '@/components/home/stats'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            About SCIT Consulting
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            A boutique AI consultancy helping businesses transform with artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              AI-First Digital Transformation
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              SCIT Consulting is a boutique digital transformation consultancy.
              We specialize in helping businesses leverage artificial intelligence
              to automate processes, build intelligent systems, and transform
              their operations.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team brings 15+ years of hands-on experience in executive consulting
              and organizational transformation across multiple European markets &mdash;
              including Portugal, Germany, Spain, and Czech Republic. We&apos;ve worked
              in cities like Lisbon, Munich, D&uuml;sseldorf, Madrid, and Prague,
              giving us a deep understanding of diverse business cultures and needs.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              With over 35 projects delivered across industries such as IT &amp; Technology,
              Financial Services, Retail &amp; E-commerce, Manufacturing, Healthcare,
              and Telecommunications, we bring real-world expertise in AI agents,
              automation systems, conversational AI, and strategic consulting.
              Our boutique approach means every client gets senior-level attention
              and customized solutions.
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1">
            {[
              {
                icon: IconWorld,
                title: 'Multi-Market Experience',
                description: 'Projects delivered across Lisbon, Munich, Düsseldorf, Madrid, and Prague.',
              },
              {
                icon: IconBuildingSkyscraper,
                title: '6+ Industries',
                description: 'IT, Financial Services, Retail, Manufacturing, Healthcare, and Telecom.',
              },
              {
                icon: IconCertificate,
                title: 'Certified Agile Practices',
                description: 'PSM II, PSPO II, and Kanban System Design certified team.',
              },
              {
                icon: IconUsers,
                title: 'Boutique Approach',
                description: 'Senior-level expertise on every project, every time.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Stats />

      {/* Values */}
      <Section>
        <SectionHeading
          title="What Drives Us"
          subtitle="Our values shape how we work and the results we deliver."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Impact Over Hype',
              description: 'We focus on real business outcomes, not trendy tech demos.',
            },
            {
              title: 'Quality Over Speed',
              description: 'We build solutions that work reliably and scale sustainably.',
            },
            {
              title: 'Partnership Over Projects',
              description: 'We invest in long-term relationships, not one-off engagements.',
            },
            {
              title: 'Transparency Over Promises',
              description: 'We communicate honestly about what AI can and cannot do.',
            },
          ].map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Let&apos;s Build Something Great
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Ready to explore how AI can transform your business?
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/contact">
                Get in Touch
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
