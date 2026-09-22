import { Brain, Server, LayoutPanelLeft, Blend } from 'lucide-react'

const ITEMS = [
  {
    icon: Brain,
    title: 'Machine learning prediction',
    body: 'A trained classification model estimates the presence of heart disease from the submitted values.',
  },
  {
    icon: Server,
    title: 'FastAPI backend',
    body: 'Requests are validated and served by a Python FastAPI application exposing a single /predict endpoint.',
  },
  {
    icon: LayoutPanelLeft,
    title: 'React frontend',
    body: 'This interface is built with React, Vite, and Tailwind CSS, and talks to the backend over HTTP.',
  },
  {
    icon: Blend,
    title: 'Preprocessing pipeline',
    body: 'Inputs are scaled and encoded to match the format the model was trained on before inference runs.',
  },
]

export default function ModelInfo() {
  return (
    <section id="model" className="bg-surface">
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl font-semibold text-ink">About the model</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            A quick look at what's actually running behind this interface.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-xl border border-line bg-white p-5">
                <Icon size={20} className="text-clinical-500" />
                <h3 className="mt-3 text-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{item.body}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 max-w-2xl rounded-xl border border-line bg-white px-5 py-4 text-sm leading-relaxed text-ink/60">
          This project is a demonstration of an ML-powered interface. It has not been
          clinically validated or certified as a medical device, and its output should not be
          used to make real health decisions.
        </div>
      </div>
    </section>
  )
}
