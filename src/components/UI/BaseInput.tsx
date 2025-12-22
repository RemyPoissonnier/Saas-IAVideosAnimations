import { inputBase } from '../../theme/styles'

type BaseInputProps = {
  label: string
  id: string
  type?: 'text' | 'number' | 'textarea'
  value: string | number
  onChange: (val: string) => void
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
  rows?: number
  className?: string
}

export function BaseInput({ 
  label, id, type = 'text', value, onChange, className = '', ...props 
}: BaseInputProps) {
  const isTextarea = type === 'textarea'
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-semibold text-text" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          className={`${inputBase} min-h-[120px]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props as any}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={inputBase}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props as any}
        />
      )}
    </div>
  )
}