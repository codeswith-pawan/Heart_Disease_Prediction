// Every categorical field is defined as a list of { value, label, hint? }.
// `value` is the exact integer the FastAPI backend expects.
// `label` is the only thing ever shown to the user — raw integers never
// appear in the UI.

export const sexOptions = [
  { value: 1, label: 'Male' },
  { value: 0, label: 'Female' },
]

export const chestPainOptions = [
  {
    value: 0,
    label: 'Typical angina',
    hint: 'Classic exertional chest pain relieved by rest',
  },
  {
    value: 1,
    label: 'Atypical angina',
    hint: 'Chest pain with some but not all typical features',
  },
  {
    value: 2,
    label: 'Non-anginal pain',
    hint: 'Chest pain unlikely to be heart-related',
  },
  {
    value: 3,
    label: 'Asymptomatic',
    hint: 'No chest pain reported',
  },
]

export const fastingBloodSugarOptions = [
  { value: 0, label: 'No', hint: 'Fasting blood sugar ≤ 120 mg/dL' },
  { value: 1, label: 'Yes', hint: 'Fasting blood sugar > 120 mg/dL' },
]

export const restingEcgOptions = [
  { value: 0, label: 'Normal' },
  { value: 1, label: 'ST-T wave abnormality' },
  { value: 2, label: 'Left ventricular hypertrophy' },
]

export const exerciseAnginaOptions = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Yes' },
]

export const slopeOptions = [
  { value: 0, label: 'Upsloping' },
  { value: 1, label: 'Flat' },
  { value: 2, label: 'Downsloping' },
]

export const majorVesselsOptions = [
  { value: 0, label: '0 vessels' },
  { value: 1, label: '1 vessel' },
  { value: 2, label: '2 vessels' },
  { value: 3, label: '3 vessels' },
  { value: 4, label: '4 vessels' },
]

export const thalassemiaOptions = [
  { value: 0, label: 'Unknown / not tested' },
  { value: 1, label: 'Normal' },
  { value: 2, label: 'Fixed defect' },
  { value: 3, label: 'Reversible defect' },
]

// Numeric field constraints used for input validation.
export const numericFieldLimits = {
  age: { min: 29, max: 77, step: 1, unit: 'years' },
  trestbps: { min: 95, max: 199, step: 1, unit: 'mm Hg' },
  chol: { min: 126, max: 564, step: 1, unit: 'mg/dL' },
  thalach: { min: 71, max: 202, step: 1, unit: 'bpm' },
  oldpeak: { min: 0, max: 6.2, step: 0.1, unit: 'mm' },
}

// Default (empty) form state.
export const initialFormState = {
  age: '',
  sex: '',
  cp: '',
  trestbps: '',
  chol: '',
  fbs: '',
  restecg: '',
  thalach: '',
  exang: '',
  oldpeak: '',
  slope: '',
  ca: '',
  thal: '',
}
