import { useEffect } from 'react'

const CHATBASE_BOT_ID = import.meta.env.VITE_CHATBASE_BOT_ID || ''

export function ChatbotWidget() {
  useEffect(() => {
    // Only load if bot ID is configured
    if (!CHATBASE_BOT_ID) return

    // Avoid loading twice
    if (document.getElementById('chatbase-script')) return

    const script = document.createElement('script')
    script.id = 'chatbase-script'
    script.src = 'https://www.chatbase.co/embed.min.js'
    script.defer = true
    script.setAttribute('chatbotId', CHATBASE_BOT_ID)
    document.body.appendChild(script)

    return () => {
      const existing = document.getElementById('chatbase-script')
      if (existing) existing.remove()
    }
  }, [])

  // Render nothing — Chatbase injects its own UI
  return null
}
