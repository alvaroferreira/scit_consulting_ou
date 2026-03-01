import { createFileRoute } from '@tanstack/react-router'
import { IconMail, IconBrandWhatsapp, IconCalendar } from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { ContactForm } from '@/components/contact/contact-form'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Ready to transform your business with AI? Tell us about your project and we&apos;ll
            get back to you within 24 hours.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">Let&apos;s Talk</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose your preferred way to reach us. We respond to all inquiries within one business day.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:hello@scitconsulting.eu"
                className="flex items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-scit-purple/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scit-purple/10 text-scit-purple">
                  <IconMail size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">hello@scitconsulting.eu</p>
                </div>
              </a>

              <a
                href="https://wa.me/message/SCITCONSULTING"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-scit-purple/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30">
                  <IconBrandWhatsapp size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Quick message or call</p>
                </div>
              </a>

              <div className="rounded-xl border border-border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scit-cyan/10 text-scit-cyan">
                    <IconCalendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Book a Call</p>
                    <p className="text-sm text-muted-foreground">
                      Schedule a 30-min consultation call
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                <strong>SCIT Consulting O&Uuml;</strong><br />
                Estonia, European Union<br />
                <br />
                We typically respond within 24 hours on business days.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}
