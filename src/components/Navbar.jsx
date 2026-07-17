import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Moon, Bell } from 'lucide-react'

function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const liensEtudiant = [
    { label: 'Accueil', to: '/etudiant' },
    { label: 'Offres', to: '/offres' },
    { label: 'Mon CV', to: '/mon-cv' },
    { label: 'Mon Guide', to: '/mon-guide' },
    { label: 'Messages', to: '/messages' },
  ]

  const liensEntreprise = [
    { label: 'Entreprise', to: '/entreprise' },
    { label: 'Mes offres', to: '/entreprise/offres' },
    { label: 'Messages', to: '/messages' },
  ]

  const liensEtablissement = [
    { label: 'Conventions', to: '/etablissement/conventions' },
    { label: 'Étudiants', to: '/etablissement/etudiants' },
    { label: 'Statistiques', to: '/etablissement/statistiques' },
  ]

  const liens = user?.role === 'entreprise' ? liensEntreprise : user?.role === 'universite' ? liensEtablissement : liensEtudiant

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-cream-border bg-cream">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>

        {user && (
          <div className="flex items-center gap-8 text-sm text-slate-600">
            {liens.map((lien) => (
              <Link
                key={lien.to}
                to={lien.to}
                className={`hover:text-slate-900 transition-colors relative ${
                  isActive(lien.to) ? 'text-brand-primary font-semibold' : ''
                }`}
              >
                {lien.label}
                {isActive(lien.to) && (
                  <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-white hover:bg-cream-white transition-colors text-slate-600">
              <Moon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-white hover:bg-cream-white transition-colors text-slate-600 relative">
              <Bell className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={logout}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-medium transition-colors"
              title="Se déconnecter"
            >
              {user.nom?.[0] || 'U'}
            </button>
          </>
        ) : (
          <Link to="/login/etudiant" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Se connecter
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar