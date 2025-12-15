/** @type {import('tailwindcss').Config} */
const colorVar = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: colorVar('bg'),
        surface: colorVar('surface'),
        'surface-strong': colorVar('surface-strong'),
        text: colorVar('text'),
        muted: colorVar('muted'),
        accent: colorVar('accent'),
        'accent-strong': colorVar('accent-strong'),
        border: colorVar('border'),
      },
      boxShadow: {
        card: '0 20px 80px rgba(0,0,0,0.35)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // --- AJOUTS POUR L'ANIMATION ---
      animation: {
        float: 'float 4s ease-in-out infinite',
        'text-gradient': 'text-gradient 4s linear infinite', // L'animation manquante
      },
      keyframes: {
        'text-gradient': {
         '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      // -------------------------------
    },
  },
  plugins: [],
}