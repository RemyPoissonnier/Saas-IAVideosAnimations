import { useMemo } from 'react'
import { useI18n } from '../i18n'
import PromptTool from '../components/PromptTool'
import { ghostButton, primaryButton } from '../theme/styles'

type CatHomeProps = {
  onOpenAuth: () => void
}

export function CatHome({ onOpenAuth }: CatHomeProps) {
  const { t } = useI18n()
  const stats = useMemo(
    () => [
      { value: '10.6x', label: t('home.stats.1.label') },
      { value: '37%', label: t('home.stats.2.label') },
      { value: '4.8x', label: t('home.stats.3.label') },
    ],
    [t],
  )

  const features = useMemo(
    () => [
      {
        title: t('home.features.1.title'),
        desc: t('home.features.1.desc'),
      },
      {
        title: t('home.features.2.title'),
        desc: t('home.features.2.desc'),
      },
      {
        title: t('home.features.3.title'),
        desc: t('home.features.3.desc'),
      },
    ],
    [t],
  )

  const logos = ['Qonto', 'Mews', 'Stripe', 'seQura', 'Swan', 'Sage']

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 px-4">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
          <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm">{t('home.badge.brand')}</span>
          <span className="text-slate-600">{t('home.badge.tagline')}</span>
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
          {t('home.hero.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-700">
          {t('home.hero.desc')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className={primaryButton} type="button">
            {t('home.hero.cta')}
          </button>
          <button className={ghostButton} type="button" onClick={onOpenAuth}>
            {t('nav.login')}
          </button>
        </div>
      </section>

      <PromptTool kind="cat" />

      <section className="grid grid-cols-1 gap-6 px-4 text-center md:grid-cols-3 md:px-6">
        {stats.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="text-3xl font-semibold text-slate-900">{item.value}</div>
            <div className="text-sm text-slate-500">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="space-y-6 px-4 md:px-6">
        <div className="space-y-2 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            {t('home.convert.eyebrow')}
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">{t('home.convert.title')}</h2>
          <p className="text-sm text-slate-600">{t('home.convert.desc')}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white/70 px-4 py-5 text-left shadow-sm shadow-black/5"
            >
              <div className="text-lg font-semibold text-slate-900">{feature.title}</div>
              <p className="mt-2 text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 px-4 md:px-6">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-slate-900">{t('home.trusted.title')}</h3>
          <p className="text-sm text-slate-600">{t('home.trusted.desc')}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex h-16 items-center justify-center rounded-xl bg-white/70 text-sm font-semibold text-slate-700 shadow-sm shadow-black/5"
            >
              {logo}
            </div>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white/70 p-4 text-left shadow-sm shadow-black/5">
            <div className="text-sm font-semibold text-slate-900">Qonto</div>
            <p className="mt-2 text-sm text-slate-600">{t('home.trusted.quote1')}</p>
          </div>
          <div className="rounded-2xl bg-slate-900 p-4 text-left shadow-sm shadow-black/5">
            <div className="text-sm font-semibold text-white">Stripe</div>
            <p className="mt-2 text-sm text-slate-100">{t('home.trusted.quote2')}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4 text-left shadow-sm shadow-black/5">
            <div className="text-sm font-semibold text-slate-900">seQura</div>
            <p className="mt-2 text-sm text-slate-600">{t('home.trusted.quote3')}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4 px-4 py-10 text-center md:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
          {t('home.policy.eyebrow')}
        </div>
        <h3 className="text-3xl font-semibold text-slate-900">{t('home.policy.title')}</h3>
        <p className="text-sm text-slate-600">
          {t('home.policy.desc')}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button className={ghostButton} type="button">
            {t('home.policy.explore')}
          </button>
          <button className={ghostButton} type="button">
            {t('nav.login')}
          </button>
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-lg font-semibold text-slate-900 shadow-sm">
            {t('home.policy.title')}
          </div>
          <button className={`${ghostButton} rounded-full px-6`} type="button">
            {t('home.policy.explore')}
          </button>
        </div>
      </section>
    </div>
  )
}

export default CatHome
