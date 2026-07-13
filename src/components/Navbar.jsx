import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()

  const liensEtudiant = [
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

  const liens = user?.role === 'entreprise' ? liensEntreprise : liensEtudiant

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-200">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-bold text-[#F2643B]">Lynk</Link>

        {user && (
          <div className="flex items-center gap-8 text-sm text-slate-600">
            {liens.map((lien) => (
              <Link key={lien.to} to={lien.to} className="hover:text-slate-900 transition-colors relative">
                {lien.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100">🌙</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100"> 🔔 </button>
            <button
              onClick={logout}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F2643B] text-white text-sm font-medium"
              title="Se déconnecter"
            >
              {user.nom?.[0] || 'U'}
            </button>
          </>
        ) : (
          <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Se connecter
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar