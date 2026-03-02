import { createFileRoute, redirect } from '@tanstack/react-router'
import { detectLocale } from '@/lib/detect-locale'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const locale = await detectLocale()
    throw redirect({
      to: '/$locale',
      params: { locale },
      replace: true,
    })
  },
})
