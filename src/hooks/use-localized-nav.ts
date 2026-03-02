import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { mainNavItems, footerNavItems, type NavItem } from '@/data/navigation'
import { useLocale } from '@/hooks/use-locale'

export interface LocalizedNavItem {
  label: string
  href: string
  children?: LocalizedNavItem[]
}

function localizeItems(
  items: NavItem[],
  locale: string,
  t: (key: string) => string,
): LocalizedNavItem[] {
  return items.map((item) => ({
    label: t(item.labelKey),
    href: `/${locale}${item.href}`,
    children: item.children
      ? localizeItems(item.children, locale, t)
      : undefined,
  }))
}

export function useLocalizedMainNav() {
  const locale = useLocale()
  const { t } = useTranslation('common')
  return useMemo(() => localizeItems(mainNavItems, locale, t), [locale, t])
}

export function useLocalizedFooterNav() {
  const locale = useLocale()
  const { t } = useTranslation('common')
  return useMemo(
    () => ({
      services: footerNavItems.services.map((i) => ({
        label: t(i.labelKey),
        href: `/${locale}${i.href}`,
      })),
      company: footerNavItems.company.map((i) => ({
        label: t(i.labelKey),
        href: `/${locale}${i.href}`,
      })),
      legal: footerNavItems.legal.map((i) => ({
        label: t(i.labelKey),
        href: `/${locale}${i.href}`,
      })),
    }),
    [locale, t],
  )
}
