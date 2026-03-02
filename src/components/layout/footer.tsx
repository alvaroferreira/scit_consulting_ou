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
      <div className="container mx-auto py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/$locale" params={{ locale }} className="flex items-center">
              <img
                src="/images/logo-black.png"
                alt="SCIT Consulting"
                className="h-7 dark:hidden"
              />
              <img
                src="/images/logo-white.png"
                alt="SCIT Consulting"
                className="hidden h-7 dark:block"
              />
            </Link>
            <p className="mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed">
              {t('footer.description')}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t('footer.company')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-1">
              {navItems.services.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider">{t('footer.companyTitle')}</h3>
            <ul className="space-y-1">
              {navItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider">{t('footer.legalTitle')}</h3>
            <ul className="space-y-1">
              {navItems.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
