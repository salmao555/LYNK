import { Link } from 'react-router-dom'

function PublicNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-cream-border bg-cream">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>

        <div className="flex items-center gap-8 text-sm text-slate-600">
          <Link
            to="/onboarding/cv-upload"
            className="hover:text-slate-900 transition-colors"
          >
            Espace Étudiant
          </Link>
          <Link
            to="/onboarding/entreprise/info"
            className="hover:text-slate-900 transition-colors"
          >
            Espace Entreprise
          </Link>
          <Link
            to="/onboarding/etablissement/info"
            className="hover:text-slate-900 transition-colors"
          >
            Espace Établissement
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/login/etudiant"
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          Connexion
        </Link>
      </div>
    </nav>
  )
}

export default PublicNavbar
