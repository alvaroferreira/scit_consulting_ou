import { describe, it, expect } from 'vitest'
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_NAMES,
  LOCALE_FLAGS,
  isValidLocale,
} from '@/stores/locale-store'

describe('locale-store constants', () => {
  it('supports 4 locales', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(4)
    expect(SUPPORTED_LOCALES).toEqual(['en', 'pt', 'es', 'fr'])
  })

  it('defaults to English', () => {
    expect(DEFAULT_LOCALE).toBe('en')
  })

  it('has display names for every locale', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(LOCALE_NAMES[locale]).toBeTruthy()
    }
  })

  it('has flag emoji for every locale', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(LOCALE_FLAGS[locale]).toBeTruthy()
    }
  })
})

describe('isValidLocale', () => {
  it('returns true for supported locales', () => {
    expect(isValidLocale('en')).toBe(true)
    expect(isValidLocale('pt')).toBe(true)
    expect(isValidLocale('es')).toBe(true)
    expect(isValidLocale('fr')).toBe(true)
  })

  it('returns false for unsupported locales', () => {
    expect(isValidLocale('de')).toBe(false)
    expect(isValidLocale('ja')).toBe(false)
    expect(isValidLocale('')).toBe(false)
    expect(isValidLocale('english')).toBe(false)
  })
})
