import { useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IconSend, IconCheck } from '@tabler/icons-react'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA' // test key fallback

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

export function ContactForm() {
  const { t } = useTranslation('contact')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetId = useRef<string | null>(null)

  const contactSchema = useMemo(() => z.object({
    name: z.string().min(1, t('form.errors.nameRequired')).max(100, t('form.errors.nameMax')),
    email: z.string().min(1, t('form.errors.emailRequired')).email(t('form.errors.emailInvalid')),
    phone: z.string().optional(),
    message: z.string().min(1, t('form.errors.messageRequired')).max(500, t('form.errors.messageMax')),
  }), [t])

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
    setFieldErrors({})
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const raw = {
      name: (formData.get('name') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      phone: (formData.get('phone') as string) ?? '',
      message: (formData.get('message') as string) ?? '',
    }

    const result = contactSchema.safeParse(raw)
    if (!result.success) {
      const errs: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors
        if (!errs[field]) errs[field] = issue.message
      }
      setFieldErrors(errs)
      setLoading(false)
      return
    }

    const payload = {
      ...result.data,
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
        setError(data.error || t('form.errors.generic'))
        // Reset Turnstile for retry
        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current)
          setTurnstileToken(null)
        }
      } else {
        setSubmitted(true)
      }
    } catch {
      setError(t('form.errors.network'))
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div aria-live="polite" className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <IconCheck size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold">{t('form.success.title')}</h3>
        <p className="mt-2 text-muted-foreground">
          {t('form.success.description')}
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
            <Label htmlFor="name">{t('form.fields.name.label')}</Label>
            <Input id="name" name="name" required placeholder={t('form.fields.name.placeholder')} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'name-error' : undefined} />
            {fieldErrors.name && <p id="name-error" className="text-xs text-red-600 dark:text-red-400">{fieldErrors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('form.fields.email.label')}</Label>
            <Input id="email" name="email" type="email" required placeholder={t('form.fields.email.placeholder')} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'email-error' : undefined} />
            {fieldErrors.email && <p id="email-error" className="text-xs text-red-600 dark:text-red-400">{fieldErrors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t('form.fields.phone.label')}</Label>
          <Input id="phone" name="phone" type="tel" placeholder={t('form.fields.phone.placeholder')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t('form.fields.message.label')}</Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder={t('form.fields.message.placeholder')}
            rows={5}
            maxLength={500}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : 'message-hint'}
          />
          {fieldErrors.message
            ? <p id="message-error" className="text-xs text-red-600 dark:text-red-400">{fieldErrors.message}</p>
            : <p id="message-hint" className="text-xs text-muted-foreground">{t('form.fields.message.maxLengthHint')}</p>
          }
        </div>

        {/* Cloudflare Turnstile widget */}
        <div ref={turnstileRef} className="flex justify-center" />

        {error && (
          <p role="alert" aria-live="assertive" className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full bg-scit-purple hover:bg-scit-violet text-white"
          disabled={loading}
        >
          {loading ? (
            t('form.submit.loading')
          ) : (
            <>
              {t('form.submit.idle')}
              <IconSend size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
