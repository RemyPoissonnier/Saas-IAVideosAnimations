import { useI18n } from '../../i18n'
import { BaseInput } from '../ui/BaseInput'
import Button from '../ui/Button'
import { Select } from '../ui/Select'

// On reprend ton type
type VideoFormType = {
  topic: string
  catType: string
  tone: string
  duration: number
  language: string
}

type Props = {
  formData: VideoFormType
  setFormData: React.Dispatch<React.SetStateAction<VideoFormType>>
  onSubmit: (e: React.FormEvent) => void
}

export function VideoForm({ formData, setFormData, onSubmit }: Props) {
  const { t } = useI18n()

  const handleChange = (field: keyof VideoFormType, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
      <BaseInput
        id="topic"
        type="textarea"
        label={t('form.title')}
        placeholder={t('placeholder.topic')}
        value={formData.topic}
        onChange={(v : string) => handleChange('topic', v)}
        required
        className="md:col-span-2"
      />
      
      <BaseInput
        id="catType"
        label={t('form.catType')}
        placeholder="Sphynx, Scottish Fold, Bengal..."
        value={formData.catType}
        onChange={(v : string) => handleChange('catType', v)}
      />

      <BaseInput
        id="tone"
        label={t('form.tone')}
        placeholder={t('placeholder.tone')}
        value={formData.tone}
        onChange={(v:string) => handleChange('tone', v)}
      />

      <BaseInput
        id="duration"
        type="number"
        label={t('form.duration')}
        value={formData.duration}
        onChange={(v:string) => handleChange('duration', parseInt(v) || 10)}
        min={6}
        max={45}
      />

      <Select
        id="language"
        label={t('form.language')}
        value={formData.language}
        onChange={(v:string) => handleChange('language', v)}
        options={[
          { label: 'Français', value: 'fr' },
          { label: 'English', value: 'en' }
        ]}
      />

      <div className="flex items-end justify-end md:col-span-2 mt-2">
        <Button type="submit">
          {t('form.generate')}
        </Button>
      </div>
    </form>
  )
}