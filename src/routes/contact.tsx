import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { IconMessageCircle, IconCalendar } from '@tabler/icons-react'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { ContactForm } from '@/components/contact/contact-form'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const [activeTab, setActiveTab] = useState<'message' | 'booking'>('message')
  const [bookingLoaded, setBookingLoaded] = useState(false)

  function selectTab(tab: 'message' | 'booking') {
    setActiveTab(tab)
    if (tab === 'booking' && !bookingLoaded) {
      setBookingLoaded(true)
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Ready to transform your business with AI? Get in touch with SCIT Consulting. Book a free consultation or send us a message."
        path="/contact"
      />
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
        <div className="mx-auto max-w-3xl">
          {/* Tab Buttons */}
          <div className="mb-8 grid grid-cols-2 rounded-lg bg-muted p-1">
            <button
              onClick={() => selectTab('message')}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === 'message'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconMessageCircle size={18} />
              Send a Message
            </button>
            <button
              onClick={() => selectTab('booking')}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === 'booking'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconCalendar size={18} />
              Book a Call
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'message' && <ContactForm />}

          {activeTab === 'booking' && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {bookingLoaded ? (
                <iframe
                  src="https://cal.eu/scitconsulting/consultation?embed=true"
                  title="Book a Consultation Call"
                  className="w-full border-0"
                  style={{ height: '500px' }}
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center py-20 text-muted-foreground">
                  Loading booking calendar...
                </div>
              )}
            </div>
          )}

          <div className="mt-6 rounded-xl bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              We typically respond within 24 hours on business days.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
