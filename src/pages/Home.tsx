import Generator from '../components/Generator'
import { useI18n } from '../i18n'
import { badge, ghostButton, pill, primaryButton, subText } from '../theme/styles'

type HomeProps = {
  onOpenAuth: () => void
}

export function Home({ onOpenAuth }: HomeProps) {
  const { t } = useI18n()

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 via-surface to-surface p-8 shadow-card">
        <span className={badge}>{t('hero.badge')}</span>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl">
          {t('hero.title')}
        </h1>
        <p className={`${subText} mt-2 max-w-2xl`}>{t('hero.lede')}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href="#generator" className={primaryButton}>
            {t('hero.button')}
          </a>
          <span className={pill}>TikTok • Vertical • IA script + hashtags</span>
          <button className={ghostButton} type="button" onClick={onOpenAuth}>
            {t('nav.login')}
          </button>
        </div>
      </section>

      <section id="generator" className="grid grid-cols-1">
        <Generator />
      </section>
    </>
  )
}

export default Home
