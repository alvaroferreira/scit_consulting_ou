import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import { IconMessageCircle, IconCalendar } from '@tabler/icons-react'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { ContactForm } from '@/components/contact/contact-form'

export const Route = createFileRoute('/$locale/contact')({
  beforeLoad: async ({ params }) => {
    await loadNamespace(params.locale, 'contact')
  },
  component: ContactPage,
})

function ContactPage() {
  const { t } = useTranslation('contact')
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
        title={t('seo.title')}
        description={t('seo.description')}
        path="/contact"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('hero.subtitle')}
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
              {t('tabs.message')}
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
              {t('tabs.booking')}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'message' && <ContactForm />}

          {activeTab === 'booking' && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {bookingLoaded ? (
                <iframe
                  src="https://cal.eu/scitconsulting/consultation?embed=true"
                  title={t('booking.iframeTitle')}
                  className="w-full border-0"
                  style={{ height: '500px' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              ) : (
                <div className="flex items-center justify-center py-20 text-muted-foreground">
                  {t('booking.loading')}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 rounded-xl bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              {t('footer.responseTime')}
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
