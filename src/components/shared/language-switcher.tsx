import { useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconCheck } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SUPPORTED_LOCALES,
  LOCALE_FLAGS,
  LOCALE_NAMES,
  useLocaleStore,
  type Locale,
} from '@/stores/locale-store'
import { changeLocale } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'

export function LanguageSwitcher() {
  const currentLocale = useLocale()
  const setLocale = useLocaleStore((s) => s.setLocale)
  const router = useRouter()
  const { t } = useTranslation('common')

  async function handleSelect(locale: Locale) {
    if (locale === currentLocale) return

    // Update i18n instance language + load namespace
    await changeLocale(locale)

    // Update Zustand persisted store
    setLocale(locale)

    // Navigate to the same page under the new locale by replacing the
    // current locale segment in the pathname.
    const currentPath = router.state.location.pathname
    const newPath = currentPath.replace(
      new RegExp(`^/${currentLocale}(/|$)`),
      `/${locale}$1`
    )

    router.navigate({ to: newPath, replace: true })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="scale-95 rounded-full gap-1.5 px-2.5 font-medium text-sm"
          aria-label={t('language.switchLabel')}
        >
          <span aria-hidden="true">{LOCALE_FLAGS[currentLocale]}</span>
          <span className="uppercase">{currentLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleSelect(locale)}
            className="gap-2"
          >
            <span aria-hidden="true">{LOCALE_FLAGS[locale]}</span>
            <span>{LOCALE_NAMES[locale]}</span>
            <IconCheck
              size={14}
              className={cn('ml-auto', locale !== currentLocale && 'hidden')}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
