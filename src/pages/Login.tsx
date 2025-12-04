import AuthPanel from '../components/AuthPanel'
import { useI18n } from '../i18n'
import { badge, ghostButton, subText } from '../theme/styles'

type LoginProps = {
  onBackHome: () => void
}

export function Login({ onBackHome }: LoginProps) {
  const { t } = useI18n()

  return (
    <div className="grid min-h-[70vh] grid-cols-1 gap-6 lg:grid-cols-[1.1fr,1fr]">
      <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-accent/20 via-surface to-surface p-6 shadow-card">
        <div className="absolute inset-0 opacity-40" />
        <div className="flex items-center gap-3">
          <div className={`${badge} w-fit bg-surface/80 text-accent-strong`}>
            {t('authPage.tagline')}
          </div>
          <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-strong">
            Trusted preview
          </span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
          {t('authPage.title')}
        </h1>
        <p className={`${subText} max-w-xl text-text/90`}>{t('authPage.subtitle')}</p>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface-strong shadow-lg shadow-black/30">
          <video
            className="h-full w-full min-h-[260px] object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            src="/login-preview.mp4"
            poster="/login-poster.jpg"
          >
            {t('authPage.videoFallback')}
          </video>
        </div>
        <p className="text-xs text-text/80">{t('authPage.videoHint')}</p>
        <div className="mt-auto flex">
          <button className={ghostButton} type="button" onClick={onBackHome}>
            {t('nav.backHome')}
          </button>
        </div>
      </div>
      <div className="flex items-stretch justify-center">
        <div className="flex w-full max-w-lg items-center justify-center rounded-2xl border border-border/60 bg-surface p-4 shadow-card">
          <AuthPanel compact onAuthComplete={onBackHome} />
        </div>
      </div>
    </div>
  )
}

export default Login
