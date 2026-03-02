import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IconSend, IconCheck } from '@tabler/icons-react'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA' // test key fallback

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetId = useRef<string | null>(null)

  useEffect(() => {
    // Load Turnstile script if not already loaded
    if (!document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
      script.onload = renderTurnstile
    } else if (window.turnstile) {
      renderTurnstile()
    } else {
      // Script loaded but turnstile not ready yet — wait for it
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          renderTurnstile()
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [])

  function renderTurnstile() {
    if (!turnstileRef.current || turnstileWidgetId.current) return
    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(null),
      'error-callback': () => setTurnstileToken(null),
      theme: 'auto',
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      'cf-turnstile-response': turnstileToken || '',
      _gotcha: formData.get('_gotcha') as string, // honeypot
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        setError(data.error || 'Something went wrong. Please try again.')
        // Reset Turnstile for retry
        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current)
          setTurnstileToken(null)
        }
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <IconCheck size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold">Message Sent!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for your interest. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-6">
        {/* Honeypot — hidden from humans, bots fill it */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" required placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="you@company.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">How can we help? *</Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Tell us about your project, goals, and challenges..."
            rows={5}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">Max 500 characters</p>
        </div>

        {/* Cloudflare Turnstile widget */}
        <div ref={turnstileRef} className="flex justify-center" />

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full bg-scit-purple hover:bg-scit-violet text-white"
          disabled={loading}
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              Send Message
              <IconSend size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
