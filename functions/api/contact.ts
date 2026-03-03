interface Env {
  TURNSTILE_SECRET_KEY: string
  RESEND_API_KEY: string
}

interface ContactBody {
  name: string
  email: string
  phone?: string
  message: string
  'cf-turnstile-response': string
  _gotcha?: string // honeypot
}

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://scitconsulting.eu',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const body = (await context.request.json()) as ContactBody

    // Honeypot check — bots fill hidden fields
    if (body._gotcha) {
      // Silently accept to not reveal the trap
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Validate Turnstile token
    const turnstileToken = body['cf-turnstile-response']
    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: 'Human verification required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: context.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: context.request.headers.get('CF-Connecting-IP') || '',
      }),
    })

    const turnstileData = (await turnstileResult.json()) as TurnstileResponse
    if (!turnstileData.success) {
      return new Response(JSON.stringify({ error: 'Human verification failed. Please try again.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Build email HTML
    const emailHtml = `
<h2>New Contact Request — SCIT Consulting</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(body.name)}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>
  ${body.phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(body.phone)}</td></tr>` : ''}
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;" colspan="2">Message</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;" colspan="2">${escapeHtml(body.message).replace(/\n/g, '<br>')}</td></tr>
</table>
`

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SCIT Consulting <noreply@scitconsulting.eu>',
        to: ['alvaroferreira@scitconsulting.eu'],
        reply_to: body.email,
        subject: `New Contact: ${body.name}`,
        html: emailHtml,
      }),
    })

    if (!resendResponse.ok) {
      const err = await resendResponse.text()
      console.error('Resend API error:', err)
      return new Response(JSON.stringify({ error: 'Failed to send message. Please try again later.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (err) {
    console.error('Contact form error:', err)
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://scitconsulting.eu',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
