export default function SelectField({
  id,
  label,
  hint,
  options,
  value,
  onChange,
  error,
  required = true,
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-risk-500">*</span>}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value === '' ? '' : Number(event.target.value))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        required={required}
        className={`mt-1.5 w-full appearance-none rounded-lg border bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%230F2621" opacity="0.45"><path d="M5.5 7.5l4.5 5 4.5-5z"/></svg>')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat px-3.5 py-2.5 pr-9 text-sm text-ink shadow-sm transition-colors ${
          error
            ? 'border-risk-500 focus:border-risk-500'
            : 'border-line focus:border-clinical-500'
        } focus:outline-none focus:ring-2 focus:ring-clinical-500/20`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-risk-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink/50">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
