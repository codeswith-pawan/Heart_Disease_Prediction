// Isolated API layer. Nothing in here knows about React or the DOM —
// components call `predictHeartDisease(payload)` and handle the result.

const API_BASE_URL = 'https://heart-disease-prediction-api-k9yn.onrender.com'

export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

/**
 * Sends the patient feature payload to the FastAPI /predict endpoint.
 * @param {object} payload - matches the exact shape the backend expects.
 * @returns {Promise<{ Predicted_category: number }>}
 */
export async function predictHeartDisease(payload) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (networkError) {
    throw new ApiError(
      'Could not reach the prediction server. Confirm the FastAPI backend is running at ' +
        API_BASE_URL +
        ' and that CORS is enabled.',
      { status: 0, details: networkError.message }
    )
  }

  if (response.status === 422) {
    let details
    try {
      details = await response.json()
    } catch {
      details = null
    }
    throw new ApiError(
      'The backend rejected the submitted values as invalid.',
      { status: 422, details }
    )
  }

  if (response.status >= 500) {
    throw new ApiError(
      'The prediction server encountered an internal error. Try again shortly.',
      { status: response.status }
    )
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}.`, {
      status: response.status,
    })
  }

  const data = await response.json()

  if (typeof data.Predicted_category === 'undefined') {
    throw new ApiError(
      'The backend response did not include a Predicted_category field.',
      { status: response.status, details: data }
    )
  }

  return data
}

export { API_BASE_URL }
