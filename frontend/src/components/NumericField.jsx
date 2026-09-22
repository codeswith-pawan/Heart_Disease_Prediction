import { Info } from 'lucide-react'

export default function NumericField({
  id,
  label,
  hint,
  unit,
  min,
  max,
  step,
  value,
  onChange,
  error,
  required = true,
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-0.5 text-risk-500">*</span>}
        </span>
        {unit && <span className="text-xs text-ink/50">{unit}</span>}
      </label>

      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        required={required}
        className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-ink/30 ${
          error
            ? 'border-risk-500 focus:border-risk-500'
            : 'border-line focus:border-clinical-500'
        } focus:outline-none focus:ring-2 focus:ring-clinical-500/20`}
        placeholder={`${min}–${max}`}
      />

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-risk-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 flex items-start gap-1 text-xs text-ink/50">
          <Info size={13} className="mt-[1px] shrink-0" />
          {hint}
        </p>
      ) : null}
    </div>
  )
}
