import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext()

const STORAGE_KEY = 'lynk_user'
const PENDING_KEY = 'lynk_pending_users'
const MAGIC_PREFIX = 'lynk_magic_'

function loadPendingUsers() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || '{}')
  } catch {
    return {}
  }
}

function savePendingUsers(data) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(data))
}

export function calculateProfileScore(profile) {
  if (!profile) return 0
  const fields = [
    profile.prenom,
    profile.nom,
    profile.email,
    profile.telephone,
    profile.ecole,
    profile.niveau,
  ]
  const filled = fields.filter(Boolean).length
  const skillsScore = Math.min((profile.skills?.length || 0) / 5, 1)
  const expScore = profile.experience?.some((e) => e.titre && e.entreprise) ? 1 : 0
  return Math.round(((filled / 6) * 0.6 + skillsScore * 0.25 + expScore * 0.15) * 100)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const persistUser = useCallback((next) => {
    setUser(next)
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback((role, nom, extra = {}) => {
    persistUser({ role, nom, verified: true, ...extra })
  }, [persistUser])

  const logout = useCallback(() => {
    persistUser(null)
  }, [persistUser])

  const registerStudent = useCallback(async (profile) => {
    const pending = loadPendingUsers()
    const token = crypto.randomUUID()
    pending[profile.email] = {
      profile,
      token,
      verified: false,
      createdAt: Date.now(),
    }
    savePendingUsers(pending)
    localStorage.setItem(`${MAGIC_PREFIX}${token}`, profile.email)
    return token
  }, [])

  const sendMagicLink = useCallback(async (email) => {
    await new Promise((r) => setTimeout(r, 800))
    const pending = loadPendingUsers()
    const entry = pending[email]
    if (!entry) throw new Error('Compte introuvable.')
    localStorage.setItem(`${MAGIC_PREFIX}${entry.token}`, email)
    return entry.token
  }, [])

  const verifyMagicLink = useCallback((token) => {
    const email = localStorage.getItem(`${MAGIC_PREFIX}${token}`)
    if (!email) return null

    const pending = loadPendingUsers()
    const entry = pending[email]
    if (!entry) return null

    pending[email] = { ...entry, verified: true }
    savePendingUsers(pending)
    localStorage.removeItem(`${MAGIC_PREFIX}${token}`)

    const { profile } = entry
    const nom = `${profile.prenom} ${profile.nom}`.trim()
    const score = calculateProfileScore(profile)

    persistUser({
      role: 'etudiant',
      nom,
      email: profile.email,
      verified: true,
      profile,
      profileScore: score,
    })

    return { nom, email, profile, profileScore: score }
  }, [persistUser])

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev
      const profile = { ...prev.profile, ...updates }
      const next = {
        ...prev,
        profile,
        profileScore: calculateProfileScore(profile),
        nom: `${profile.prenom || ''} ${profile.nom || ''}`.trim() || prev.nom,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      registerStudent,
      sendMagicLink,
      verifyMagicLink,
      updateProfile,
      calculateProfileScore,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
