import { inputBase } from '../../theme/styles'

type Option = { label: string; value: string }

type SelectProps = {
  label: string
  id: string
  value: string
  onChange: (val: string) => void
  options: Option[]
}

export function Select({ label, id, value, onChange, options }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-text" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}