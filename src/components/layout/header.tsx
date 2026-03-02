import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconMenu2, IconX, IconChevronDown } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLocalizedMainNav } from '@/hooks/use-localized-nav'
import { useLocale } from '@/hooks/use-locale'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/shared/language-switcher'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const router = useRouter()
  const pathname = router.state.location.pathname
  const locale = useLocale()
  const navItems = useLocalizedMainNav()
  const { t } = useTranslation('common')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav aria-label={t('header.mainNavigation')} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-scit-purple',
                  pathname.startsWith(item.href)
                    ? 'text-scit-purple'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
                {item.children && <IconChevronDown size={14} />}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === item.href && (
                <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-lg border border-border bg-background p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-scit-purple"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitch />
          <LanguageSwitcher />
          <Button asChild className="bg-scit-purple hover:bg-scit-violet text-white">
            <Link to="/$locale/contact" params={{ locale }}>{t('header.bookConsultation')}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitch />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label={t('header.toggleMenu')}
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav aria-label={t('header.mobileNavigation')} className="container mx-auto py-4">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => !item.children && setMobileOpen(false)}
                  className={cn(
                    'block py-2 text-sm font-medium',
                    pathname.startsWith(item.href)
                      ? 'text-scit-purple'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 pl-4 text-sm text-muted-foreground"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-start">
                <LanguageSwitcher />
              </div>
              <Button asChild className="w-full bg-scit-purple hover:bg-scit-violet text-white">
                <Link to="/$locale/contact" params={{ locale }} onClick={() => setMobileOpen(false)}>
                  {t('header.bookConsultation')}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
