type Option = { label: string; value: string };

type SelectProps = {
  label: string;
  id: string;
  value: string;
  onChange: (val: any) => void;
  options: Option[];
};

export function Select({ label, id, value, onChange, options }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-text" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        className=" rounded-xl p-2"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
