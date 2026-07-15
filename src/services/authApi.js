const API_URL = 'http://localhost:8000/api'

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Erreur inconnue' }))
    throw new Error(error.detail || `Erreur ${res.status}`)
  }

  return res.json()
}

export const registerStudentApi = (profile) =>
  apiFetch('/accounts/register-student/', {
    method: 'POST',
    body: JSON.stringify(profile),
  })

export const verifyMagicLinkApi = (token) =>
  apiFetch('/accounts/magic-link/verify/', {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
  