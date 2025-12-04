import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { applyPalette } from './theme/tokens'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: Theme
  applied: Exclude<Theme, 'system'>
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const getSystemTheme = (): Exclude<Theme, 'system'> => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.dataset.theme = resolved
  applyPalette(resolved)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [applied, setApplied] = useState<Exclude<Theme, 'system'>>(getSystemTheme())

  useEffect(() => {
    applyTheme(theme)
    setApplied(theme === 'system' ? getSystemTheme() : theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        applyTheme('system')
        setApplied(getSystemTheme())
      }
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      applied,
      setTheme,
    }),
    [theme, applied],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
