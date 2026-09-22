import { ClipboardList, ShieldCheck, Cpu, FlaskConical } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'User input',
    body: 'You enter thirteen clinical measurements through the form above, grouped into patient info, vitals, and diagnostic indicators.',
  },
  {
    icon: ShieldCheck,
    title: 'FastAPI validation',
    body: 'The backend checks that every field is present and correctly typed before it reaches the model.',
  },
  {
    icon: Cpu,
    title: 'ML pipeline',
    body: 'A preprocessing pipeline scales and encodes the values, then passes them to the trained classifier.',
  },
  {
    icon: FlaskConical,
    title: 'Prediction',
    body: 'The model returns a single category — disease detected or not — which is shown back in the result card.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line bg-white">
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl font-semibold text-ink">How a prediction is made</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Every submission moves through the same four stages, from your browser to the
            model and back.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="relative rounded-xl border border-line bg-surface p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clinical-500 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <Icon size={18} className="text-clinical-500" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{step.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
