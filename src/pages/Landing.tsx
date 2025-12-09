import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { ghostButton, primaryButton } from '../theme/styles'
import catAndDogVideo from '../assets/videos/CatAndDog.mp4'
import catWorkVideo from '../assets/videos/catWork.mp4'

const PLAYLIST = [catAndDogVideo, catWorkVideo]

type LandingProps = {
  onGoCat: () => void
  onGoDog: () => void
}

export function Landing({ onGoCat, onGoDog }: LandingProps) {
  const { t } = useI18n()
  const [videoIdx, setVideoIdx] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return
    videoEl.currentTime = 0
    const playPromise = videoEl.play()
    // Autoplay might be blocked if not muted; we keep muted and ignore errors.
    if (playPromise !== undefined) {
      playPromise.catch(() => {})
    }
  }, [videoIdx])

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


        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-slate-900">{t('home.carousel.title')}</h3>
          <p className="text-sm text-slate-600">{t('home.carousel.caption')}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-lg shadow-black/10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,196,112,0.6),rgba(255,222,160,0.4))]" />
          <div className="relative">
            <video
              key={videoIdx}
              ref={videoRef}
              src={PLAYLIST[videoIdx]}
              autoPlay
              muted
              controls={false}
              playsInline
              loop={false}
              onEnded={() => setVideoIdx((prev) => (prev + 1) % PLAYLIST.length)}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.25))]" />
          </div>
          <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,201,80,0.35),transparent_60%)]" />
          <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,170,20,0.35),transparent_60%)]" />
        </div>

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
