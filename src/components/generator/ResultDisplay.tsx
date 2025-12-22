import { useI18n } from '../../i18n'
import type { GenerationRecord } from '../../services/localDb'
import { label } from '../../theme/styles'

type Props = {
  record: GenerationRecord | null
}

export function ResultDisplay({ record }: Props) {
  const { t } = useI18n()
  
  if (!record) return null

  // Petits helpers pour le style des tags
  const Tag = ({ text }: { text: string | number }) => (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm text-muted">
      {text}
    </div>
  )

  return (
    <div className="grid gap-3 md:grid-cols-3 animate-in fade-in duration-500">
      {/* Colonne Script */}
      <div className="rounded-xl border border-border/60 bg-surface-strong p-4">
        <div className={label}>{t('output.script')}</div>
        <div className="mt-2 flex flex-col gap-2 text-sm text-text">
          {record.scriptBeats.map((line, idx) => (
            <div key={idx} className="rounded-lg border border-border/60 bg-surface px-3 py-2">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Colonne Shots/Détails */}
      <div className="rounded-xl border border-border/60 bg-surface-strong p-4">
        <div className={label}>{t('output.shots')}</div>
        <div className="mt-2 flex flex-col gap-2">
          <Tag text="9:16 vertical" />
          <Tag text={record.tone || 'dynamic'} />
          <Tag text={`${t('status.ready')} · ${record.duration}s`} />
        </div>
      </div>

      {/* Colonne Hashtags */}
      <div className="rounded-xl border border-border/60 bg-surface-strong p-4">
        <div className={label}>{t('output.hashtags')}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {record.hashtags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          {t('output.meta')}: {record.overlay}
        </p>
      </div>
    </div>
  )
}