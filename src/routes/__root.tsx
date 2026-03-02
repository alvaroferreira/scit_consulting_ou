import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/shared/chatbot-widget'
import { useLocaleStore } from '@/stores/locale-store'

function NotFound() {
  const { t } = useTranslation('common')
  const locale = useLocaleStore((s) => s.locale)
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('notFound.message')}</p>
      <a href={`/${locale}`} className="mt-4 text-sm text-scit-purple hover:underline">
        {t('notFound.backHome')}
      </a>
    </div>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Toaster />
        <ChatbotWidget />
      </>
    )
  },
  notFoundComponent: NotFound,
})
