import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { isValidLocale, DEFAULT_LOCALE } from '@/stores/locale-store'
import { changeLocale } from '@/lib/i18n'
import { loadNamespace } from '@/lib/i18n'

export const Route = createFileRoute('/$locale')({
  beforeLoad: async ({ params }) => {
    const { locale } = params

    // Redirect invalid locales to EN equivalent
    if (!isValidLocale(locale)) {
      throw redirect({
        to: '/$locale',
        params: { locale: DEFAULT_LOCALE },
        replace: true,
      })
    }

    // Load shared namespaces; page-specific ones are loaded per-route
    await Promise.all([
      loadNamespace(locale, 'common'),
      loadNamespace(locale, 'seo'),
    ])
    await changeLocale(locale)
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  return <Outlet />
}
