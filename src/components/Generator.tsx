import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useI18n } from '../i18n'
import { listGenerations, saveGeneration } from '../services/localDb'
import type { GenerationRecord } from '../services/localDb'
import { card, inputBase, label, primaryButton, subText } from '../theme/styles'
import { useAuth } from '../context/AuthContext'

type VideoForm = {
  topic: string
  catType: string
  tone: string
  callToAction: string
  duration: number
  language: string
}

const baseForm: VideoForm = {
  topic: '',
  catType: 'British Shorthair',
  tone: '',
  callToAction: '',
  duration: 18,
  language: 'fr',
}

const defaultHashtags = ['#chat', '#ai', '#tiktok', '#viral', '#catslover']

const buildRecord = (payload: VideoForm, userEmail: string): GenerationRecord => {
  const now = new Date().toISOString()
  const randomId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `gen-${Date.now()}`

  const scriptBeats = [
    `Hook: ${payload.topic || 'Chat curieux'} en ${payload.duration}s avec un cadrage vertical 9:16.`,
    `Plan 1: Gros plan sur ${payload.catType}, lumière douce, regard caméra.`,
    `Plan 2: Mouvement latéral, interaction avec un objet (laser, plume).`,
    `Plan 3: Close-up patte/yeux pour l'émotion, texte overlay "${payload.callToAction || 'Abonne-toi'}".`,
    `Outro: Cut rapide + CTA vocal "${payload.callToAction || 'Suis pour plus'}".`,
  ]

  return {
    id: randomId,
    userEmail,
    createdAt: now,
    topic: payload.topic,
    catType: payload.catType,
    tone: payload.tone,
    callToAction: payload.callToAction,
    duration: payload.duration,
    language: payload.language,
    overlay: `${payload.duration}s · ${payload.tone || 'tone libre'} · vertical`,
    scriptBeats,
    hashtags: defaultHashtags,
    platform: 'tiktok',
    status: 'ready',
  }
}

export function Generator() {
  const { t } = useI18n()
  const { currentUser } = useAuth()
  const [form, setForm] = useState<VideoForm>(() => ({
    ...baseForm,
    topic: t('placeholder.topic'),
    tone: t('placeholder.tone'),
    callToAction: t('placeholder.cta'),
  }))
  const [preview, setPreview] = useState<GenerationRecord | null>(null)
  const [history, setHistory] = useState<GenerationRecord[]>([])
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    setHistory(listGenerations(currentUser?.email))
  }, [currentUser])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = currentUser?.email ?? 'invite@local'
    const record = buildRecord(form, email)
    saveGeneration(record)
    setPreview(record)
    setHistory(listGenerations(currentUser?.email))
    setMessage(currentUser ? t('status.saved') : 'Connectez-vous pour garder un historique associé.')
  }

  const hasPreview = useMemo(() => Boolean(preview || history.length > 0), [preview, history])

  return (
    <div className={`${card} space-y-4`}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-text">{t('nav.generator')}</h2>
        <p className={subText}>{t('form.notes')}</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-semibold text-text" htmlFor="topic">
            {t('form.title')}
          </label>
          <textarea
            id="topic"
            required
            rows={3}
            placeholder={t('placeholder.topic')}
            value={form.topic}
            onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
            className={`${inputBase} min-h-[120px]`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text" htmlFor="catType">
            {t('form.catType')}
          </label>
          <input
            id="catType"
            placeholder="Sphynx, Scottish Fold, Bengal..."
            value={form.catType}
            onChange={(e) => setForm((prev) => ({ ...prev, catType: e.target.value }))}
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text" htmlFor="tone">
            {t('form.tone')}
          </label>
          <input
            id="tone"
            placeholder={t('placeholder.tone')}
            value={form.tone}
            onChange={(e) => setForm((prev) => ({ ...prev, tone: e.target.value }))}
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text" htmlFor="cta">
            {t('form.cta')}
          </label>
          <input
            id="cta"
            placeholder={t('placeholder.cta')}
            value={form.callToAction}
            onChange={(e) => setForm((prev) => ({ ...prev, callToAction: e.target.value }))}
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text" htmlFor="duration">
            {t('form.duration')}
          </label>
          <input
            id="duration"
            type="number"
            min={6}
            max={45}
            value={form.duration}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, duration: Number.parseInt(e.target.value, 10) || 10 }))
            }
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text" htmlFor="language">
            {t('form.language')}
          </label>
          <select
            id="language"
            value={form.language}
            onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
            className={inputBase}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="flex items-end justify-end">
          <button type="submit" className={primaryButton}>
            {t('form.generate')}
          </button>
        </div>
      </form>
      {message ? (
        <div className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-text">
          {message}
        </div>
      ) : null}

      <div className="h-px w-full bg-border/60" />
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-surface-strong p-4">
          <div className={label}>{t('output.script')}</div>
          <div className="mt-2 flex flex-col gap-2 text-sm text-text">
            {(preview?.scriptBeats ?? history[0]?.scriptBeats ?? []).map((line) => (
              <div key={line} className="rounded-lg border border-border/60 bg-surface px-3 py-2">
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-surface-strong p-4">
          <div className={label}>{t('output.shots')}</div>
          <div className="mt-2 flex flex-col gap-2">
            {(preview ?? history[0]) ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-muted">
                  9:16 vertical
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-muted">
                  {preview?.tone || history[0]?.tone || 'dynamic'}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-muted">
                  CTA: {preview?.callToAction || history[0]?.callToAction}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-muted">
                  {t('status.ready')} · {(preview ?? history[0])?.duration || 0}s
                </div>
              </>
            ) : (
              <div className="text-sm text-muted">{t('panel.empty')}</div>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-surface-strong p-4">
          <div className={label}>{t('output.hashtags')}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(preview?.hashtags ?? history[0]?.hashtags ?? defaultHashtags).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          {hasPreview ? (
            <p className="mt-3 text-xs text-muted">
              {t('output.meta')}: {preview?.overlay || history[0]?.overlay || ''}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Generator
