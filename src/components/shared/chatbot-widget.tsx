import { useEffect } from 'react'

export function ChatbotWidget() {
  useEffect(() => {
    // Avoid loading twice
    if (document.getElementById('botpress-inject-script')) return

    const injectScript = document.createElement('script')
    injectScript.id = 'botpress-inject-script'
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js'
    document.body.appendChild(injectScript)

    const configScript = document.createElement('script')
    configScript.id = 'botpress-config-script'
    configScript.src =
      'https://files.bpcontent.cloud/2026/03/02/11/20260302112803-6V4SVWKB.js'
    configScript.defer = true
    document.body.appendChild(configScript)

    return () => {
      document.getElementById('botpress-inject-script')?.remove()
      document.getElementById('botpress-config-script')?.remove()
    }
  }, [])

  // Render nothing — Botpress injects its own UI
  return null
}
