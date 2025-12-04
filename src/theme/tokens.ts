export type ThemeMode = 'light' | 'dark'

type ThemePalette = {
  bg: string
  surface: string
  'surface-strong': string
  text: string
  muted: string
  accent: string
  'accent-strong': string
  border: string
}

export const themePalette: Record<ThemeMode, ThemePalette> = {
  dark: {
    bg: '7 9 15',
    surface: '20 16 6',
    'surface-strong': '26 20 10',
    text: '244 236 210',
    muted: '179 167 140',
    accent: '255 201 80',
    'accent-strong': '255 176 24',
    border: '120 100 70',
  },
  light: {
    bg: '255 252 245',
    surface: '255 255 250',
    'surface-strong': '252 247 232',
    text: '35 25 10',
    muted: '120 102 80',
    accent: '255 195 55',
    'accent-strong': '255 170 20',
    border: '230 212 170',
  },
}

export const applyPalette = (mode: ThemeMode) => {
  const root = document.documentElement
  const palette = themePalette[mode]
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  root.style.colorScheme = mode
}
