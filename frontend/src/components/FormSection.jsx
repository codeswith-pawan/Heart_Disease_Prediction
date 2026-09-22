export default function FormSection({ number, title, description, children }) {
  return (
    <div className="border-b border-line py-7 first:pt-0 last:border-b-0 last:pb-0">
      <div className="mb-5 flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clinical-500 text-[13px] font-semibold text-white">
          {number}
        </span>
        <div>
          <h3 className="text-base font-semibold text-ink">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-ink/55">{description}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </div>
  )
}
