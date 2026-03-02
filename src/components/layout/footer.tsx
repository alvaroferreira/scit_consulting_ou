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
      <div className="container mx-auto px-4 py-5">
        {/* Top row: logo + all nav columns */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          {/* Brand — compact */}
          <div className="shrink-0">
            <Link to="/$locale" params={{ locale }} className="inline-flex items-center">
              <img
                src="/images/logo-black.png"
                alt="SCIT Consulting"
                className="h-6 dark:hidden"
              />
              <img
                src="/images/logo-white.png"
                alt="SCIT Consulting"
                className="hidden h-6 dark:block"
              />
            </Link>
            <p className="mt-1.5 max-w-[220px] text-[11px] leading-snug text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider">
                {t('footer.servicesTitle')}
              </h3>
              <ul className="space-y-0.5">
                {navItems.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-scit-purple"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider">
                {t('footer.companyTitle')}
              </h3>
              <ul className="space-y-0.5">
                {navItems.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-scit-purple"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider">
                {t('footer.legalTitle')}
              </h3>
              <ul className="space-y-0.5">
                {navItems.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-scit-purple"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar — centred with dot separator */}
        <div className="mt-4 border-t border-border pt-3 text-center">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-foreground/40 align-middle" />
            <span className="font-semibold text-foreground">
              {t('footer.tagline')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
