import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import en from './i18n/en'
import fr from './i18n/fr'

type Locale = 'fr' | 'en'

type Translations = typeof fr

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: keyof Translations) => string
}

const translations: Record<Locale, Translations> = { fr, en }

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const browserLocale =
  (typeof navigator !== 'undefined' &&
    (navigator.language?.startsWith('fr') ? 'fr' : 'en')) ||
  'fr'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(browserLocale)

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale][key],
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}
