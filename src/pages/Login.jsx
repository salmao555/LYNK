import { useParams } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { role } = useParams()
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const roleDisplayNames = {
      etudiant: 'Étudiant',
      entreprise: 'Entreprise',
      universite: 'Établissement'
    }
    login(role, roleDisplayNames[role] || role)
    navigate('/bienvenue')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md border border-slate-200 shadow-sm">
        <p className="text-2xl font-bold text-brand-orange text-center mb-8">Lynk</p>
        <h1 className="text-xl font-bold text-slate-900 text-center mb-6">Se connecter</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange border border-slate-200 transition-all" />
          <input type="password" placeholder="Mot de passe" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange border border-slate-200 transition-all" />
          <p className="text-right text-sm text-brand-orange cursor-pointer hover:text-brand-orange-dark transition-colors">Mot de passe oublié ?</p>
          <button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded-full transition-colors">
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Pas encore de compte ?{' '}
          <Link to={`/signup/${role}`} className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}

export default Login