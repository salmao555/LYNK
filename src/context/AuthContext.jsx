import { createContext, useContext, useState, useCallback } from 'react'
import { registerStudentApi, verifyMagicLinkApi } from '../services/authApi'

const AuthContext = createContext()

const STORAGE_KEY = 'lynk_user'

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
    await registerStudentApi(profile)
    return true
  }, [])

  const verifyMagicLink = useCallback(async (token) => {
    try {
      const data = await verifyMagicLinkApi(token)
      const { access, refresh, user: apiUser } = data

      localStorage.setItem('lynk_access_token', access)
      localStorage.setItem('lynk_refresh_token', refresh)

      const profile = apiUser.profile || {}
      const nom = `${profile.prenom || ''} ${profile.nom || ''}`.trim()
      const score = calculateProfileScore(profile)

      persistUser({
        role: apiUser.role,
        nom,
        email: apiUser.email,
        verified: apiUser.email_verified,
        profile,
        profileScore: score,
      })

      return true
    } catch {
      return null
    }
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
