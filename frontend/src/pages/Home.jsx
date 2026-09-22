import Hero from '../components/Hero'
import PredictionWorkspace from '../components/PredictionWorkspace'
import HowItWorks from '../components/HowItWorks'
import ModelInfo from '../components/ModelInfo'

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="predict" className="bg-surface">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink">Run a prediction</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              Fill in the three sections below with the patient's values. All fields are
              required.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <PredictionWorkspace />
          </div>
        </div>
      </section>

      <HowItWorks />
      <ModelInfo />
    </main>
  )
}
