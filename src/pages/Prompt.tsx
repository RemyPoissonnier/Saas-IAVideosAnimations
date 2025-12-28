import { useI18n } from '../i18n'
import Generator from '../components/Generator'
import ResultVideo from '../components/generator/ResultVideo'
import { useState } from 'react'

type PromptProps = {
  onOpenAuth: () => void
}

export function Prompt({ onOpenAuth }: PromptProps) {
  const { t } = useI18n()
  const [isGenerate, setIsGenerate] = useState(true)

  return (
    <div className="flex gap-2">
      <Generator isGenerate={isGenerate} setIsGenerate={setIsGenerate} />
      <ResultVideo isActive={isGenerate} />


    </div>
  )
}

export default Prompt
