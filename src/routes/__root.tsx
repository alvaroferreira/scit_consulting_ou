import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

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
      </>
    )
  },
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">Page not found</p>
      <a href="/" className="mt-4 text-sm text-scit-purple hover:underline">
        Back to home
      </a>
    </div>
  ),
})
