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
    surface: '17 22 37',
    'surface-strong': '20 28 46',
    text: '232 236 245',
    muted: '154 164 181',
    accent: '124 240 193',
    'accent-strong': '61 228 160',
    border: '75 85 105',
  },
  light: {
    bg: '245 247 251',
    surface: '255 255 255',
    'surface-strong': '242 244 248',
    text: '15 23 42',
    muted: '71 85 105',
    accent: '28 141 100',
    'accent-strong': '12 122 85',
    border: '203 213 225',
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
