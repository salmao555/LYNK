import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // user sera soit null (pas connecté), soit { role: 'etudiant' | 'entreprise', nom: '...' }

  const login = (role, nom) => {
    setUser({ role, nom })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personnalisé pour utiliser facilement ce context ailleurs
export function useAuth() {
  return useContext(AuthContext)
}
