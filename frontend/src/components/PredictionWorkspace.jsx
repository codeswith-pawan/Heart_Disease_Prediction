import { useState } from 'react'
import { Loader2, ServerCrash, TriangleAlert } from 'lucide-react'
import FormSection from './FormSection'
import NumericField from './NumericField'
import SelectField from './SelectField'
import ResultCard from './ResultCard'
import { predictHeartDisease, ApiError } from '../services/api'
import { validateForm, buildPredictionPayload } from '../services/validateForm'
import {
  sexOptions,
  chestPainOptions,
  fastingBloodSugarOptions,
  restingEcgOptions,
  exerciseAnginaOptions,
  slopeOptions,
  majorVesselsOptions,
  thalassemiaOptions,
  numericFieldLimits,
  initialFormState,
} from '../data/formOptions'

export default function PredictionWorkspace() {
  const [values, setValues] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | error | success
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [result, setResult] = useState(null)

  function updateField(field, newValue) {
    setValues((prev) => ({ ...prev, [field]: newValue }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function handleReset() {
    setValues(initialFormState)
    setErrors({})
    setStatus('idle')
    setApiErrorMessage('')
    setResult(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstField = Object.keys(validationErrors)[0]
      document.getElementById(firstField)?.focus()
      return
    }

    setStatus('loading')
    setApiErrorMessage('')

    try {
      const payload = buildPredictionPayload(values)
      const response = await predictHeartDisease(payload)
      setResult(response.Predicted_category)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      if (err instanceof ApiError) {
        setApiErrorMessage(err.message)
      } else {
        setApiErrorMessage('Something unexpected went wrong. Please try again.')
      }
    }
  }

  if (status === 'success') {
    return <ResultCard predictedCategory={result} onReset={handleReset} />
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-9">
      {status === 'error' && (
        <div className="mb-7 flex items-start gap-3 rounded-lg border border-risk-300 bg-risk-50 px-4 py-3.5">
          <ServerCrash size={18} className="mt-0.5 shrink-0 text-risk-600" />
          <div>
            <p className="text-sm font-medium text-risk-600">Prediction request failed</p>
            <p className="mt-0.5 text-sm text-risk-600/80">{apiErrorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormSection
          number={1}
          title="Patient information"
          description="Basic identifying details"
        >
          <NumericField
            id="age"
            label="Age"
            hint="Patient age in years"
            {...numericFieldLimits.age}
            value={values.age}
            onChange={(v) => updateField('age', v)}
            error={errors.age}
          />
          <SelectField
            id="sex"
            label="Sex"
            options={sexOptions}
            value={values.sex}
            onChange={(v) => updateField('sex', v)}
            error={errors.sex}
          />
        </FormSection>

        <FormSection
          number={2}
          title="Cardiovascular measurements"
          description="Recorded vitals and test readings"
        >
          <NumericField
            id="trestbps"
            label="Resting blood pressure"
            hint="Measured on admission"
            {...numericFieldLimits.trestbps}
            value={values.trestbps}
            onChange={(v) => updateField('trestbps', v)}
            error={errors.trestbps}
          />
          <NumericField
            id="chol"
            label="Serum cholesterol"
            hint="Total serum cholesterol level"
            {...numericFieldLimits.chol}
            value={values.chol}
            onChange={(v) => updateField('chol', v)}
            error={errors.chol}
          />
          <NumericField
            id="thalach"
            label="Maximum heart rate"
            hint="Highest heart rate achieved during exercise"
            {...numericFieldLimits.thalach}
            value={values.thalach}
            onChange={(v) => updateField('thalach', v)}
            error={errors.thalach}
          />
          <NumericField
            id="oldpeak"
            label="ST depression"
            hint="ST depression induced by exercise relative to rest"
            {...numericFieldLimits.oldpeak}
            value={values.oldpeak}
            onChange={(v) => updateField('oldpeak', v)}
            error={errors.oldpeak}
          />
        </FormSection>

        <FormSection
          number={3}
          title="Clinical information"
          description="Diagnostic and test-derived indicators"
        >
          <SelectField
            id="cp"
            label="Chest pain type"
            options={chestPainOptions}
            value={values.cp}
            onChange={(v) => updateField('cp', v)}
            error={errors.cp}
          />
          <SelectField
            id="fbs"
            label="Fasting blood sugar > 120 mg/dL"
            options={fastingBloodSugarOptions}
            value={values.fbs}
            onChange={(v) => updateField('fbs', v)}
            error={errors.fbs}
          />
          <SelectField
            id="restecg"
            label="Resting ECG results"
            options={restingEcgOptions}
            value={values.restecg}
            onChange={(v) => updateField('restecg', v)}
            error={errors.restecg}
          />
          <SelectField
            id="exang"
            label="Exercise induced angina"
            options={exerciseAnginaOptions}
            value={values.exang}
            onChange={(v) => updateField('exang', v)}
            error={errors.exang}
          />
          <SelectField
            id="slope"
            label="Slope of peak exercise ST segment"
            options={slopeOptions}
            value={values.slope}
            onChange={(v) => updateField('slope', v)}
            error={errors.slope}
          />
          <SelectField
            id="ca"
            label="Number of major vessels"
            hint="Colored by fluoroscopy"
            options={majorVesselsOptions}
            value={values.ca}
            onChange={(v) => updateField('ca', v)}
            error={errors.ca}
          />
          <SelectField
            id="thal"
            label="Thalassemia"
            options={thalassemiaOptions}
            value={values.thal}
            onChange={(v) => updateField('thal', v)}
            error={errors.thal}
          />
        </FormSection>

        {Object.keys(errors).length > 0 && (
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-risk-300 bg-risk-50 px-4 py-3 text-sm text-risk-600">
            <TriangleAlert size={16} className="shrink-0" />
            Please fix the highlighted fields before submitting.
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            disabled={status === 'loading'}
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-surface disabled:opacity-50"
          >
            Reset form
          </button>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex items-center justify-center gap-2 rounded-lg bg-clinical-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-clinical-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
            {status === 'loading' ? 'Analyzing…' : 'Predict'}
          </button>
        </div>
      </form>
    </div>
  )
}
