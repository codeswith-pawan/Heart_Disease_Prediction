import { AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react'

export default function ResultCard({ predictedCategory, onReset }) {
  const isPositive = predictedCategory === 1

  const palette = isPositive
    ? {
        bg: 'bg-risk-50',
        border: 'border-risk-300',
        icon: 'bg-risk-500 text-white',
        heading: 'text-risk-600',
      }
    : {
        bg: 'bg-clear-50',
        border: 'border-clear-300',
        icon: 'bg-clear-500 text-white',
        heading: 'text-clear-600',
      }

  return (
    <div className={`rounded-2xl border ${palette.border} ${palette.bg} p-8 text-center shadow-card sm:p-10`}>
      <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${palette.icon}`}>
        {isPositive ? <AlertTriangle size={26} /> : <CheckCircle2 size={26} />}
      </div>

      <h3 className={`mt-5 font-display text-2xl font-semibold sm:text-3xl ${palette.heading}`}>
        {isPositive ? 'Heart Disease Detected' : 'No Heart Disease Detected'}
      </h3>

      <p className="mx-auto mt-3 max-w-prose text-sm text-ink/70">
        {isPositive
          ? 'The model classified the submitted values as consistent with the presence of heart disease.'
          : 'The model classified the submitted values as consistent with the absence of heart disease.'}
      </p>

      <div className="mx-auto mt-6 max-w-md rounded-lg border border-line bg-white/70 px-4 py-3 text-xs text-ink/60">
        This is an automated machine learning prediction based on the values you entered.
        It is not a medical diagnosis and should not replace evaluation by a qualified
        healthcare professional.
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mx-auto mt-7 flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/85 focus:outline-none focus:ring-2 focus:ring-ink/30"
      >
        <RotateCcw size={15} />
        Run another prediction
      </button>
    </div>
  )
}
