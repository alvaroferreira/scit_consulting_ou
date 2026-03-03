import { useState, useEffect, useRef, useCallback } from 'react'
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
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  // Focus trap + Escape for mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const nav = mobileNavRef.current
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (e.key === 'Tab' && nav) {
        const focusable = nav.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    // Move focus into the mobile menu
    const firstLink = nav?.querySelector<HTMLElement>('a[href], button')
    firstLink?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  // Close dropdown on Escape (desktop)
  useEffect(() => {
    if (!openDropdown) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openDropdown])

  const openDropdownWithDelay = useCallback((href: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
    setOpenDropdown(href)
  }, [])

  const closeDropdownWithDelay = useCallback(() => {
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }, [])

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
              onMouseEnter={() => item.children && openDropdownWithDelay(item.href)}
              onMouseLeave={closeDropdownWithDelay}
              onFocusCapture={() => item.children && openDropdownWithDelay(item.href)}
              onBlurCapture={closeDropdownWithDelay}
            >
              <Link
                to={item.href}
                aria-expanded={item.children ? openDropdown === item.href : undefined}
                aria-haspopup={item.children ? 'true' : undefined}
                className={cn(
                  'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-scit-purple',
                  pathname.startsWith(item.href)
                    ? 'text-scit-purple'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
                {item.children && (
                  <IconChevronDown
                    size={14}
                    className={cn(
                      'transition-transform',
                      openDropdown === item.href && 'rotate-180'
                    )}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === item.href && (
                <div
                  role="menu"
                  className="absolute top-full left-0 z-50 mt-1 w-64 rounded-lg border border-border bg-background p-2 shadow-lg"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      role="menuitem"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-scit-purple focus-visible:bg-muted focus-visible:text-scit-purple focus-visible:outline-none"
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
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div ref={mobileNavRef} className="border-t border-border bg-background md:hidden">
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
