import { ActivitySquare } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="border-b border-line bg-white">
      <div className="container-page grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-clinical-100 bg-clinical-50 px-3 py-1 text-xs font-medium text-clinical-600">
            <ActivitySquare size={14} />
            Machine learning · clinical intake demo
          </span>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Estimate heart disease risk from a standard clinical profile
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
            Enter thirteen routine cardiovascular measurements and this tool sends them to a
            trained classification model, which returns a single prediction: disease detected
            or not detected.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#predict"
              className="rounded-lg bg-clinical-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-clinical-600"
            >
              Start a prediction
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink/75 transition-colors hover:bg-surface"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-medium text-ink/40">
            What the model looks at
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-ink/70">
            <li>Age &amp; sex</li>
            <li>Chest pain type</li>
            <li>Resting blood pressure</li>
            <li>Serum cholesterol</li>
            <li>Fasting blood sugar</li>
            <li>Resting ECG</li>
            <li>Max heart rate</li>
            <li>Exercise angina</li>
            <li>ST depression</li>
            <li>ST segment slope</li>
            <li>Major vessels</li>
            <li>Thalassemia</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
