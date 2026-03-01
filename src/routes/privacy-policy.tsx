import { createFileRoute } from '@tanstack/react-router'
import { Section } from '@/components/shared/section'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-white/60 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      <Section>
        <div className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl">
          <h2 className="text-xl font-bold mt-8">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            SCIT Consulting O&Uuml; (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your personal
            information when you visit our website at scitconsulting.eu.
          </p>

          <h2 className="text-xl font-bold mt-8">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We collect information you voluntarily provide through our contact form,
            including your name, email address, company name, phone number, and project details.
            We also collect anonymized analytics data about how you use our website.
          </p>

          <h2 className="text-xl font-bold mt-8">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We use your information to respond to your inquiries, provide our consulting
            services, send relevant communications, and improve our website. We will never
            sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-bold mt-8">4. Data Storage & Security</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Your data is stored securely using industry-standard encryption. We use
            Cloudflare for hosting, which provides enterprise-grade security. We retain
            your data only as long as necessary to fulfill the purposes described in this policy.
          </p>

          <h2 className="text-xl font-bold mt-8">5. Your Rights (GDPR)</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Under the GDPR, you have the right to access, rectify, erase, restrict processing,
            and port your personal data. You also have the right to object to processing and
            to withdraw consent at any time. To exercise these rights, contact us at
            privacy@scitconsulting.eu.
          </p>

          <h2 className="text-xl font-bold mt-8">6. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We use essential cookies for website functionality and privacy-friendly analytics.
            We do not use tracking cookies or share data with advertising networks.
          </p>

          <h2 className="text-xl font-bold mt-8">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">
            For privacy-related inquiries, contact us at:<br />
            SCIT Consulting O&Uuml;<br />
            Email: privacy@scitconsulting.eu
          </p>
        </div>
      </Section>
    </>
  )
}
