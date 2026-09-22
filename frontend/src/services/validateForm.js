import { numericFieldLimits } from '../data/formOptions'

const CATEGORICAL_FIELDS = ['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal']
const NUMERIC_FIELDS = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']

const FIELD_LABELS = {
  age: 'Age',
  sex: 'Sex',
  cp: 'Chest pain type',
  trestbps: 'Resting blood pressure',
  chol: 'Serum cholesterol',
  fbs: 'Fasting blood sugar',
  restecg: 'Resting ECG',
  thalach: 'Maximum heart rate',
  exang: 'Exercise induced angina',
  oldpeak: 'ST depression',
  slope: 'Slope',
  ca: 'Number of major vessels',
  thal: 'Thalassemia',
}

/**
 * Validates the raw form state. Returns a map of fieldName -> error message.
 * An empty object means the form is valid and ready to submit.
 */
export function validateForm(values) {
  const errors = {}

  for (const field of NUMERIC_FIELDS) {
    const raw = values[field]
    const limits = numericFieldLimits[field]

    if (raw === '' || raw === null || raw === undefined) {
      errors[field] = `${FIELD_LABELS[field]} is required.`
      continue
    }

    const num = Number(raw)
    if (Number.isNaN(num)) {
      errors[field] = `${FIELD_LABELS[field]} must be a number.`
    } else if (num < limits.min || num > limits.max) {
      errors[field] = `${FIELD_LABELS[field]} must be between ${limits.min} and ${limits.max}.`
    }
  }

  for (const field of CATEGORICAL_FIELDS) {
    const raw = values[field]
    if (raw === '' || raw === null || raw === undefined) {
      errors[field] = `${FIELD_LABELS[field]} is required.`
    }
  }

  return errors
}

/**
 * Converts validated form state into the exact JSON payload the
 * FastAPI /predict endpoint expects.
 */
export function buildPredictionPayload(values) {
  return {
    age: Number(values.age),
    sex: Number(values.sex),
    cp: Number(values.cp),
    trestbps: Number(values.trestbps),
    chol: Number(values.chol),
    fbs: Number(values.fbs),
    restecg: Number(values.restecg),
    thalach: Number(values.thalach),
    exang: Number(values.exang),
    oldpeak: Number(values.oldpeak),
    slope: Number(values.slope),
    ca: Number(values.ca),
    thal: Number(values.thal),
  }
}
