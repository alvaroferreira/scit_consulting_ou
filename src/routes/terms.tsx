import { createFileRoute } from '@tanstack/react-router'
import { Section } from '@/components/shared/section'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-white/60 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      <Section>
        <div className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl">
          <h2 className="text-xl font-bold mt-8">1. Services</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            SCIT Consulting O&Uuml; provides AI consulting, implementation, and digital
            transformation services. All engagements are governed by individual service
            agreements that supplement these general terms.
          </p>

          <h2 className="text-xl font-bold mt-8">2. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            All content on this website, including text, graphics, logos, and code, is the
            property of SCIT Consulting O&Uuml; and is protected by intellectual property laws.
            Client deliverables are owned by the client upon full payment, unless otherwise
            specified in the service agreement.
          </p>

          <h2 className="text-xl font-bold mt-8">3. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            SCIT Consulting provides services on an &quot;as is&quot; basis. We make no warranties,
            express or implied, regarding the suitability of our services for any particular
            purpose. Our liability is limited to the fees paid for the specific engagement.
          </p>

          <h2 className="text-xl font-bold mt-8">4. Confidentiality</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Both parties agree to maintain the confidentiality of any proprietary information
            shared during the engagement. This obligation survives the termination of services.
          </p>

          <h2 className="text-xl font-bold mt-8">5. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            These terms are governed by the laws of the Republic of Estonia. Any disputes
            shall be resolved in the courts of Tallinn, Estonia.
          </p>

          <h2 className="text-xl font-bold mt-8">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            For questions about these terms, contact us at:<br />
            SCIT Consulting O&Uuml;<br />
            Email: hello@scitconsulting.eu
          </p>
        </div>
      </Section>
    </>
  )
}
