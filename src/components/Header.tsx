import { useAuth } from '../auth'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { ghostButton, pill, primaryButton } from '../theme/styles'

const themeLabels: Record<string, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark',
  system: '🖥️ Auto',
}

type HeaderProps = {
  onOpenAuth: () => void
  onBackHome?: () => void
  isAuthPage?: boolean
}

export function Header({ onOpenAuth, onBackHome, isAuthPage }: HeaderProps) {
  const { locale, setLocale, t } = useI18n()
  const { theme, applied, setTheme } = useTheme()
  const { user } = useAuth()

  const cycleTheme = () => {
    const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'
    setTheme(next)
  }

  return (
    <header className="sticky top-4 z-10 flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-surface/80 px-4 py-3 shadow-card backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-strong text-lg font-bold text-bg shadow-lg shadow-accent/30">
          🐾
        </div>
        <div>
          <div className="text-base font-bold leading-tight text-text">{t('brand.name')}</div>
          <div className="text-xs font-medium text-muted">{t('nav.generator')}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          aria-label="Switch language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as typeof locale)}
          className="rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm text-text shadow-sm focus:border-accent focus:outline-none"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        <button onClick={cycleTheme} className={ghostButton} type="button">
          {themeLabels[theme]} · {applied}
        </button>
        {isAuthPage && onBackHome ? (
          <button className={ghostButton} type="button" onClick={onBackHome}>
            {t('nav.backHome')}
          </button>
        ) : null}
        {user ? (
          <span className={pill}>
            <span className="text-accent">●</span>
            {`${t('auth.signedIn')}: ${user.name}`}
          </span>
        ) : (
          <button className={primaryButton} type="button" onClick={onOpenAuth}>
            {t('nav.login')}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
