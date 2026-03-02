import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLocalizedFooterNav } from '@/hooks/use-localized-nav'
import { useLocale } from '@/hooks/use-locale'

export function Footer() {
  const locale = useLocale()
  const navItems = useLocalizedFooterNav()
  const { t } = useTranslation('common')

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/$locale" params={{ locale }} className="flex items-center">
              <img
                src="/images/logo-black.png"
                alt="SCIT Consulting"
                className="h-8 dark:hidden"
              />
              <img
                src="/images/logo-white.png"
                alt="SCIT Consulting"
                className="hidden h-8 dark:block"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {t('footer.company')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-2">
              {navItems.services.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.companyTitle')}</h3>
            <ul className="space-y-2">
              {navItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.legalTitle')}</h3>
            <ul className="space-y-2">
              {navItems.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
