import { useI18n } from '../i18n'
import { ghostButton, primaryButton } from '../theme/styles'

type LandingProps = {
  onGoCat: () => void
  onGoDog: () => void
}

export function Landing({ onGoCat, onGoDog }: LandingProps) {
  const { t } = useI18n()

  return (
    <div className="space-y-10 px-4 md:px-6">
      <section className="text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-700">
          <span className="rounded-full bg-white/70 px-4 py-1.5 shadow-sm">IA Banana</span>
          <span className="text-slate-600">{t('landing.tagline')}</span>
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
          {t('landing.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-700">{t('landing.desc')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className={primaryButton} type="button" onClick={onGoCat}>
            {t('landing.ctaCat')}
          </button>
          <button className={primaryButton} type="button" onClick={onGoDog}>
            {t('landing.ctaDog')}
          </button>
          <button className={ghostButton} type="button">
            {t('landing.ctaLearn')}
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white/80 p-5 text-left shadow-sm shadow-black/5">
          <h2 className="text-xl font-semibold text-slate-900">{t('landing.cards.cat.title')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('landing.cards.cat.desc')}</p>
          <button className={`${ghostButton} mt-3 rounded-full px-4`} type="button" onClick={onGoCat}>
            {t('landing.cards.cat.cta')}
          </button>
        </div>
        <div className="rounded-2xl bg-white/80 p-5 text-left shadow-sm shadow-black/5">
          <h2 className="text-xl font-semibold text-slate-900">{t('landing.cards.dog.title')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('landing.cards.dog.desc')}</p>
          <button className={`${ghostButton} mt-3 rounded-full px-4`} type="button" onClick={onGoDog}>
            {t('landing.cards.dog.cta')}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Landing
