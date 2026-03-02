import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from './context/theme-context'
import i18n from './lib/i18n'
import './index.css'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
})

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme='light' storageKey='scit-theme'>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </StrictMode>
  )
}
