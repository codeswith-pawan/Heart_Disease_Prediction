# Heart Disease Risk Predictor — Frontend

A React + Vite + Tailwind frontend for a heart disease prediction FastAPI backend.

## 1. Install

```bash
npm install
```

## 2. Run

```bash
npm run dev
```

Opens at `http://localhost:5173`. Make sure your FastAPI backend is running at
`http://127.0.0.1:8000` first (see the CORS note below).

## 3. Build for production

```bash
npm run build
npm run preview
```

## CORS requirement (backend, not modified here)

The frontend (port 5173) and FastAPI backend (port 8000) run on different origins,
so the browser will block the request unless the backend allows it. Add this to your
FastAPI app — it's the minimal change needed, nothing else in your backend has to
change:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)
```

Place it right after `app = FastAPI()` in your existing file.

## Project structure

```
src/
  components/       UI components (form fields, sections, result card, etc.)
  pages/            Home.jsx composes the full page
  services/         api.js (fetch logic) and validateForm.js (validation + payload building)
  data/             formOptions.js — the only place categorical label→integer maps live
  App.jsx
  main.jsx
```

## How categorical fields are handled

`src/data/formOptions.js` defines every dropdown as a list of
`{ value: <integer for the API>, label: <text shown to the user> }`.
Components only ever render `label`. On submit, `services/validateForm.js`
builds the payload from the stored `value`s, so the API always receives the
integers your backend expects, and the user never sees a raw 0/1/2/3.

## End-to-end flow

Form → `validateForm.js` (client-side validation) → `services/api.js`
(`POST http://127.0.0.1:8000/predict`) → FastAPI → your ML model → JSON
response → `PredictionWorkspace.jsx` reads `Predicted_category` → `ResultCard.jsx`.

No prediction value is ever hardcoded — the result card only renders after a real
response comes back from your backend. 422 (validation), 5xx (server), and network
errors (backend not running) are each caught in `services/api.js` and shown in the UI.
