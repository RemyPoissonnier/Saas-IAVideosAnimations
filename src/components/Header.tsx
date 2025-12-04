import { useAuth } from '../auth'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { pill, primaryButton } from '../theme/styles'
import logoZoom from '../assets/logoZoom.png'

const themeLabels: Record<string, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark',
  system: '🖥️ Auto',
}

type HeaderProps = {
  onOpenAuth: () => void
  onBackHome?: () => void
  isAuthPage?: boolean
  activeAnimal?: 'cat' | 'dog'
  onSelectAnimal?: (animal: 'cat' | 'dog') => void
  tokensHref?: string
}

export function Header({
  onOpenAuth,
  onBackHome,
  isAuthPage,
  activeAnimal = 'cat',
  onSelectAnimal,
  tokensHref = '/tokens',
}: HeaderProps) {
  const { locale, setLocale, t } = useI18n()
  const { theme, applied, setTheme } = useTheme()
  const { user, signOut } = useAuth()

  const cycleTheme = () => {
    const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'
    setTheme(next)
  }

  const handleAnimalChange = (next: 'cat' | 'dog') => {
    onSelectAnimal?.(next)
  }

  return (
    <header className="relative flex items-center justify-between gap-4 overflow-hidden rounded-full border border-border/60 bg-surface/70 px-6 py-3 shadow-card backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,240,193,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,161,255,0.08),transparent_42%)]" />
      <div className="flex items-center gap-3">
        <a href="/home" className="relative z-10">
            <img src={logoZoom} alt="Logo" className='grid h-11 w-11 place-items-center rounded-full'/>
        </a>
        <div>
          <div className="text-base font-bold leading-tight text-text">{t('brand.name')}</div>
          <div className="text-xs font-medium text-muted">{t('nav.generator')}</div>
        </div>
        <div className="ml-3 relative z-10">
          <select
            aria-label={t('nav.selectAnimal')}
            value={activeAnimal}
            onChange={(e) => handleAnimalChange(e.target.value as 'cat' | 'dog')}
            className="rounded-full border border-border/60 bg-surface px-3 py-2 text-xs font-semibold text-text shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="cat">{t('nav.catPage')}</option>
            <option value="dog">{t('nav.dogPage')}</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={tokensHref}
          className={`${pill} px-4 text-sm font-semibold text-text hover:border-accent`}
        >
          {t('nav.tokens')}
        </a>
        <select
          aria-label="Switch language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as typeof locale)}
          className="flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-text shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <option value="fr">🇫🇷 FR</option>
          <option value="en">🇬🇧 EN</option>
        </select>
        <button onClick={cycleTheme} className={`${pill} px-4`} type="button">
          {themeLabels[theme]} · {applied}
        </button>
        {isAuthPage && onBackHome ? (
          <button className={`${pill} px-4`} type="button" onClick={onBackHome}>
            {t('nav.backHome')}
          </button>
        ) : null}
        {user ? (
          <div className="flex items-center gap-2">
            <span className={pill}>
              <span className="text-accent">●</span>
              {`${t('auth.signedIn')}: ${user.name}`}
            </span>
            <button className={`${pill} px-4`} type="button" onClick={signOut}>
              {t('auth.signout')}
            </button>
          </div>
        ) : (
          <button className={`${primaryButton} rounded-full px-5`} type="button" onClick={onOpenAuth}>
            {t('nav.login')}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
