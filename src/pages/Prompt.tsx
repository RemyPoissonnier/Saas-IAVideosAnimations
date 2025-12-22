import { useMemo } from 'react'
import { useI18n } from '../i18n'
import PromptTool from '../components/PromptTool'
import { ghostButton, primaryButton } from '../theme/styles'

type PromptProps = {
  onOpenAuth: () => void
}

export function Prompt({ onOpenAuth }: PromptProps) {
  const { t } = useI18n()

  return (
    <div className="space-y-8">

      <PromptTool kind="cat" />


    </div>
  )
}

export default Prompt
