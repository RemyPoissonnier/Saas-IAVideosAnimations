import { useI18n } from '../i18n'
import { ghostButton, primaryButton } from '../theme/styles'

export function Tokens() {
  const { t } = useI18n()

  return (
    <div className="space-y-8 px-4 md:px-6">
      <section className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">{t('pricing.title')}</h1>
        <p className="text-sm text-slate-600">{t('pricing.subtitle')}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/80 p-5 text-left shadow-sm shadow-black/5">
          <div className="text-lg font-semibold text-slate-900">{t('pricing.tokens.title')}</div>
          <p className="mt-1 text-sm text-slate-600">{t('pricing.tokens.desc')}</p>
          <div className="mt-3 space-y-2 text-sm text-slate-800">
            <div>{t('pricing.tokens.starter')}</div>
            <div>{t('pricing.tokens.pro')}</div>
            <div>{t('pricing.tokens.studio')}</div>
          </div>
          <button className={`${primaryButton} mt-3`} type="button">
            {t('pricing.cta.buy')}
          </button>
        </div>
        <div className="rounded-2xl bg-white/80 p-5 text-left shadow-sm shadow-black/5">
          <div className="text-lg font-semibold text-slate-900">{t('pricing.sub.title')}</div>
          <p className="mt-1 text-sm text-slate-600">{t('pricing.sub.desc')}</p>
          <div className="mt-3 space-y-2 text-sm text-slate-800">
            <div>{t('pricing.sub.monthly')}</div>
            <div>{t('pricing.sub.yearly')}</div>
          </div>
          <button className={`${ghostButton} mt-3 rounded-full px-4`} type="button">
            {t('pricing.cta.subscribe')}
          </button>
        </div>
        <div className="rounded-2xl bg-white/80 p-5 text-left shadow-sm shadow-black/5">
          <div className="text-lg font-semibold text-slate-900">FAQ</div>
          <p className="mt-1 text-sm text-slate-600">{t('pricing.note')}</p>
        </div>
      </section>
    </div>
  )
}

export default Tokens
