import { useEffect, useState, type FormEvent } from 'react'
import { useI18n } from '../i18n'
import { listGenerations, saveGeneration } from '../services/localDb'
import type { GenerationRecord } from '../services/localDb'
import { card, subText } from '../theme/styles'
import { useAuth } from '../context/AuthContext'
import { VideoForm } from './generator/VideoForm' // Ajuste le chemin selon ta structure
import { ResultDisplay } from './generator/ResultDisplay' // Ajuste le chemin selon ta structure

// Définition des types et defaults (Tu peux aussi mettre ça dans un fichier types.ts)
type VideoFormType = {
  topic: string
  catType: string
  tone: string
  duration: number
  language: string
}

const defaultHashtags = ['#chat', '#ai', '#tiktok', '#viral', '#catslover']

const baseForm: VideoFormType = {
  topic: '',
  catType: 'British Shorthair',
  tone: '',
  duration: 18,
  language: 'fr',
}

// Fonction utilitaire déplacée ou gardée ici si utilisée uniquement par ce composant
const buildRecord = (payload: VideoFormType, userEmail: string): GenerationRecord => {
    // ... (Ta logique existante buildRecord, inchangée pour économiser l'espace ici)
    const now = new Date().toISOString()
    const randomId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `gen-${Date.now()}`
    
    // Simuler la logique des scriptBeats pour l'exemple
    const scriptBeats = [
      `Hook: ${payload.topic} (${payload.duration}s)`,
      `Plan 1: ${payload.catType} close-up`,
    ]
  
    return {
      id: randomId,
      userEmail,
      createdAt: now,
      topic: payload.topic,
      catType: payload.catType,
      tone: payload.tone,
      duration: payload.duration,
      language: payload.language,
      overlay: `${payload.duration}s · ${payload.tone} · vertical`,
      scriptBeats,
      hashtags: defaultHashtags,
      platform: 'tiktok',
      status: 'ready',
    }
}

export function Generator() {
  const { t } = useI18n()
  const { currentUser } = useAuth()
  
  // États
  const [form, setForm] = useState<VideoFormType>({
    ...baseForm,
    topic: t('placeholder.topic'),
    tone: t('placeholder.tone'),
  })
  
  const [preview, setPreview] = useState<GenerationRecord | null>(null)
  const [history, setHistory] = useState<GenerationRecord[]>([])
  const [message, setMessage] = useState<string>('')

  // Effets
  useEffect(() => {
    setHistory(listGenerations(currentUser?.email))
  }, [currentUser])

  // Handlers
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const email = currentUser?.email ?? 'invite@local'
    const record = buildRecord(form, email)
    
    saveGeneration(record)
    setPreview(record)
    setHistory(listGenerations(currentUser?.email)) // Refresh history
    setMessage(currentUser ? t('status.saved') : 'Connectez-vous pour sauvegarder.')
  }

  // Sélectionner quoi afficher : la prévisualisation actuelle OU le dernier élément de l'historique
  const recordToDisplay = preview || history[0] || null

  return (
    <div className={`${card} space-y-6`}>
      {/* En-tête */}
      <div className="space-y-1 border-b border-border/40 pb-4">
        <h2 className="text-2xl font-semibold text-text">{t('nav.generator')}</h2>
        <p className={subText}>{t('form.notes')}</p>
      </div>

      {/* Formulaire */}
      <VideoForm 
        formData={form} 
        setFormData={setForm} 
        onSubmit={handleSubmit} 
      />

      {/* Messages système */}
      {message && (
        <div className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-text animate-pulse">
          {message}
        </div>
      )}

      {/* Résultats (Séparateur visuel inclus si on a un résultat) */}
      {recordToDisplay && (
        <>
          <div className="h-px w-full bg-border/60" />
          <ResultDisplay record={recordToDisplay} />
        </>
      )}
    </div>
  )
}

export default Generator