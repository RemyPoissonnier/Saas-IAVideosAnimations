import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import en from './i18n/en'
import fr from './i18n/fr'

type Locale = 'fr' | 'en'
type Translations = typeof fr

// ... (Your RecursiveKeyOf and getNestedValue helpers remain here) ...
// (I will paste the full file below for copy-pasting)

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & (string | number)]

type TxKeyPath = RecursiveKeyOf<Translations>

type TranslationOptions = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // Modification ici : on ajoute le paramètre 'options'
  t: (key: TxKeyPath, options?: TranslationOptions) => string;
}

const translations: Record<Locale, Translations> = { fr, en }

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

// Helper function to safely get browser language
function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en' // Default for Server

  const lang = navigator.language // Returns 'en-US', 'fr-FR', etc.
  return lang.startsWith('fr') ? 'fr' : 'en'
}

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // 1. Initialize with a static default (e.g. 'fr') to match Server Side Rendering
  // If you don't use SSR, you can initialize with getBrowserLocale() directly.
  const [locale, setLocale] = useState<Locale>('fr')

  // 2. Detect real browser language once the component has mounted
  useEffect(() => {
    const detected = getBrowserLocale()
    // Only update if different to avoid unnecessary re-renders
    if (detected !== locale) {
      setLocale(detected)
    }
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, options) => {
        // 1. On récupère le texte brut (ex: "Bonjour {{name}}")
        const translation = getNestedValue(translations[locale], key);

        // 2. Si pas d'options, on renvoie le texte tel quel pour gagner en perf
        if (!options) return translation;

        // 3. Interpolation : On remplace tout ce qui est entre {{ et }}
        return translation.replace(/{{([^}]+)}}/g, (_, match) => {
          const variableKey = match.trim(); // nettoie les espaces
          const value = options[variableKey];
          
          // Si la valeur existe, on remplace, sinon on laisse le {{variable}} visible (pour le debug)
          return value !== undefined ? String(value) : `{{${variableKey}}}`;
        });
      },
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