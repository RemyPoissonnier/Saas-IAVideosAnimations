import { useState } from 'react'
import { useI18n } from '../i18n'
import { inputBase, primaryButton } from '../theme/styles'

type PromptToolProps = {
  kind: 'cat' | 'dog'
}

export function PromptTool({ kind }: PromptToolProps) {
  const { t } = useI18n()
  const modelOptions = ['nanobanan', 'runway', 'pika', 'luma'] as const
  const generationModes = ['full', 'imageToVideo', 'textToVideo', 'character', 'extend'] as const
  const visualStyles = ['realistic', 'cartoon', 'anime', 'pixel', 'flat', 'stylized'] as const
  const cameraMoves = ['static', 'pan', 'zoom', 'travel', 'cinematic'] as const
  const animations = ['walk', 'talk', 'gesture', 'wave', 'type'] as const
  const [mode, setMode] = useState<'2d' | '3d'>('2d')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    model: 'nanobanan',
    generationMode: 'full',
    visualStyle: 'realistic',
    palette: '',
    character: '',
    appearance: '',
    renderStyle: '2d',
    expression: 'neutral',
    voice: '',
    scene: '',
    ambience: '',
    props: '',
    cameraMoves: [] as string[],
    script: '',
    animations: [] as string[],
    duration: '15s',
    voiceTone: 'neutral',
    accent: 'en',
    music: '',
    lipSync: true,
    resolution: '1080p',
    ratio: '9:16',
    length: '15s',
    framerate: '30',
    format: 'mp4',
  })

  const handleGenerate = () => {
    if (!confirmed) {
      setError(t('prompt.confirmRequired'))
      return
    }
    setError('')
    const sample =
      kind === 'cat'
        ? t('prompt.sample.cat')
        : t('prompt.sample.dog')
    const summary = [
      `${mode.toUpperCase()} · ${form.model} · ${t(`prompt.mode.${form.generationMode}` as any)}`,
      `${t('prompt.visualStyle')}: ${t(`prompt.style.${form.visualStyle}` as any)}`,
      `${t('prompt.resolution')}: ${form.resolution} ${form.ratio} @${form.framerate}fps (${form.format})`,
    ].join(' | ')
    setResult(`${summary} · ${prompt || sample}`)
  }

  const toggleInList = (key: 'cameraMoves' | 'animations', value: string) => {
    setForm((prev) => {
      const current = prev[key]
      const exists = current.includes(value)
      const next = exists ? current.filter((v) => v !== value) : [...current, value]
      return { ...prev, [key]: next }
    })
  }

  return (
    <section className="space-y-3 rounded-2xl bg-white/70 px-4 py-5 shadow-sm shadow-black/5 md:px-6">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            {t('prompt.title')}
          </div>
          <div className="text-sm text-slate-600">{t('prompt.simpleDesc')}</div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
          <button
            type="button"
            onClick={() => setMode('2d')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              mode === '2d' ? 'bg-accent text-bg shadow-sm shadow-accent/40' : 'text-slate-600'
            }`}
          >
            {t('prompt.mode.2d')}
          </button>
          <button
            type="button"
            onClick={() => setMode('3d')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              mode === '3d' ? 'bg-accent text-bg shadow-sm shadow-accent/40' : 'text-slate-600'
            }`}
          >
            {t('prompt.mode.3d')}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            kind === 'cat'
              ? t('prompt.placeholder.cat')
              : t('prompt.placeholder.dog')
          }
          className={`${inputBase} flex-1`}
        />
        <button type="button" className={primaryButton} onClick={handleGenerate}>
          {t('prompt.button')}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-600">
          {t('prompt.outputFormat')}: {form.resolution} · {form.ratio} · {form.format.toUpperCase()} @
          {form.framerate}fps
        </div>
        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          {t('prompt.confirmRun')}
        </label>
        {error ? <div className="text-xs text-red-600">{error}</div> : null}
      </div>
      <button
        type="button"
        onClick={() => setShowAdvanced((prev) => !prev)}
        className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
      >
        {showAdvanced ? t('prompt.toggleAdvanced.hide') : t('prompt.toggleAdvanced.show')}
      </button>
      {showAdvanced ? (
        <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">
            {t('prompt.model')}
          </label>
          <select
            className={inputBase}
            value={form.model}
            onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))}
          >
            {modelOptions.map((m) => (
              <option key={m} value={m}>
                {t(`prompt.model.${m}` as any)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">
            {t('prompt.generationMode')}
          </label>
          <select
            className={inputBase}
            value={form.generationMode}
            onChange={(e) => setForm((prev) => ({ ...prev, generationMode: e.target.value }))}
          >
            {generationModes.map((m) => (
              <option key={m} value={m}>
                {t(`prompt.mode.${m}` as any)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{t('prompt.visualStyle')}</label>
          <select
            className={inputBase}
            value={form.visualStyle}
            onChange={(e) => setForm((prev) => ({ ...prev, visualStyle: e.target.value }))}
          >
            {visualStyles.map((s) => (
              <option key={s} value={s}>
                {t(`prompt.style.${s}` as any)}
              </option>
            ))}
          </select>
          <input
            className={inputBase}
            placeholder={t('prompt.palette')}
            value={form.palette}
            onChange={(e) => setForm((prev) => ({ ...prev, palette: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{t('prompt.character')}</label>
          <input
            className={inputBase}
            placeholder={t('prompt.characterLibrary')}
            value={form.character}
            onChange={(e) => setForm((prev) => ({ ...prev, character: e.target.value }))}
          />
          <input
            className={inputBase}
            placeholder={t('prompt.appearance')}
            value={form.appearance}
            onChange={(e) => setForm((prev) => ({ ...prev, appearance: e.target.value }))}
          />
          <div className="flex gap-2">
            {['2d', '3d'].map((opt) => (
              <label key={opt} className="flex items-center gap-1 text-sm text-slate-700">
                <input
                  type="radio"
                  name="renderStyle"
                  value={opt}
                  checked={form.renderStyle === opt}
                  onChange={() => setForm((prev) => ({ ...prev, renderStyle: opt }))}
                />
                {opt.toUpperCase()}
              </label>
            ))}
          </div>
          <input
            className={inputBase}
            placeholder={t('prompt.expression')}
            value={form.expression}
            onChange={(e) => setForm((prev) => ({ ...prev, expression: e.target.value }))}
          />
          <input
            className={inputBase}
            placeholder={t('prompt.voice')}
            value={form.voice}
            onChange={(e) => setForm((prev) => ({ ...prev, voice: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{t('prompt.scene')}</label>
          <input
            className={inputBase}
            placeholder={t('prompt.scenePlaceholder')}
            value={form.scene}
            onChange={(e) => setForm((prev) => ({ ...prev, scene: e.target.value }))}
          />
          <input
            className={inputBase}
            placeholder={t('prompt.ambience')}
            value={form.ambience}
            onChange={(e) => setForm((prev) => ({ ...prev, ambience: e.target.value }))}
          />
          <input
            className={inputBase}
            placeholder={t('prompt.props')}
            value={form.props}
            onChange={(e) => setForm((prev) => ({ ...prev, props: e.target.value }))}
          />
          <div className="flex flex-wrap gap-2">
            {cameraMoves.map((move) => (
              <label key={move} className="flex items-center gap-1 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={form.cameraMoves.includes(move)}
                  onChange={() => toggleInList('cameraMoves', move)}
                />
                {t(`prompt.camera.${move}` as any)}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-900">{t('prompt.script')}</label>
          <textarea
            className={`${inputBase} min-h-[120px]`}
            placeholder={t('prompt.scriptPlaceholder')}
            value={form.script}
            onChange={(e) => setForm((prev) => ({ ...prev, script: e.target.value }))}
          />
          <div className="flex flex-wrap gap-2">
            {animations.map((anim) => (
              <label key={anim} className="flex items-center gap-1 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={form.animations.includes(anim)}
                  onChange={() => toggleInList('animations', anim)}
                />
                {t(`prompt.anim.${anim}` as any)}
              </label>
            ))}
          </div>
          <input
            className={inputBase}
            placeholder={t('prompt.duration')}
            value={form.duration}
            onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{t('prompt.audio')}</label>
          <input
            className={inputBase}
            placeholder={t('prompt.voiceTone')}
            value={form.voiceTone}
            onChange={(e) => setForm((prev) => ({ ...prev, voiceTone: e.target.value }))}
          />
          <input
            className={inputBase}
            placeholder={t('prompt.accent')}
            value={form.accent}
            onChange={(e) => setForm((prev) => ({ ...prev, accent: e.target.value }))}
          />
          <input
            className={inputBase}
            placeholder={t('prompt.music')}
            value={form.music}
            onChange={(e) => setForm((prev) => ({ ...prev, music: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={form.lipSync}
              onChange={(e) => setForm((prev) => ({ ...prev, lipSync: e.target.checked }))}
            />
            {t('prompt.lipsync')}
          </label>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{t('prompt.output')}</label>
          <div className="grid gap-2">
            <select
              className={inputBase}
              value={form.resolution}
              onChange={(e) => setForm((prev) => ({ ...prev, resolution: e.target.value }))}
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
            <select
              className={inputBase}
              value={form.ratio}
              onChange={(e) => setForm((prev) => ({ ...prev, ratio: e.target.value }))}
            >
              <option value="16:9">16:9</option>
              <option value="9:16">9:16</option>
              <option value="1:1">1:1</option>
              <option value="4:5">4:5</option>
            </select>
            <input
              className={inputBase}
              placeholder={t('prompt.length')}
              value={form.length}
              onChange={(e) => setForm((prev) => ({ ...prev, length: e.target.value }))}
            />
            <select
              className={inputBase}
              value={form.framerate}
              onChange={(e) => setForm((prev) => ({ ...prev, framerate: e.target.value }))}
            >
              <option value="24">24 fps</option>
              <option value="30">30 fps</option>
              <option value="60">60 fps</option>
            </select>
            <select
              className={inputBase}
              value={form.format}
              onChange={(e) => setForm((prev) => ({ ...prev, format: e.target.value }))}
            >
              <option value="mp4">MP4</option>
              <option value="mov">MOV</option>
              <option value="webm">WebM</option>
            </select>
          </div>
        </div>
        </div>
      ) : null}
      {result ? (
        <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-inner shadow-black/10">
          {t('prompt.resultTitle')}: {result}
        </div>
      ) : null}
    </section>
  )
}

export default PromptTool
