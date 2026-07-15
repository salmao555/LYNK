import { useNavigate, Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { GraduationCap, Building2, Landmark } from 'lucide-react'

function Signup() {
  const { role } = useParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const estEtudiant = role === 'etudiant'
  const estEntreprise = role === 'entreprise'
  const estUniversite = role === 'universite'

  const [nom, setNom] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const nomParDefaut = estEtudiant ? 'Étudiant' : estEntreprise ? 'Entreprise' : 'Établissement'
    login(role, nom || nomParDefaut)
    navigate('/bienvenue')
  }

  const roleConfig = {
    etudiant: {
      icon: GraduationCap,
      label: 'Étudiant',
      badgeClass: 'bg-brand-orange/10 text-brand-orange',
      title: 'Trouvez votre stage idéal',
    },
    entreprise: {
      icon: Building2,
      label: 'Entreprise',
      badgeClass: 'bg-slate-100 text-slate-600',
      title: 'Recrutez vos futurs talents',
    },
    universite: {
      icon: Landmark,
      label: 'Établissement',
      badgeClass: 'bg-brand-primary/10 text-brand-primary',
      title: 'Gérez les stages de vos étudiants',
    },
  }

  const config = roleConfig[role] || roleConfig.etudiant

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md border border-slate-200 shadow-sm">
        <p className="text-2xl font-bold text-brand-orange text-center mb-8">Lynk</p>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <config.icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span className={`inline-block text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full ${config.badgeClass}`}>
              {config.label}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 text-balance">
            {config.title}
          </h1>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 rounded-full py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <span>💼</span> Continuer avec LinkedIn
          </button>
          {estEtudiant && (
            <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 rounded-full py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <span>🐙</span> Continuer avec GitHub
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-xs text-slate-400">ou par email</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder={
              estEtudiant ? 'Nom complet' : estUniversite ? "Nom de l'établissement" : "Nom de l'entreprise"
            }
            required
            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange border border-slate-200 transition-all"
          />
          <input type="email" placeholder="Email" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange border border-slate-200 transition-all" />
          <input type="password" placeholder="Mot de passe" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange border border-slate-200 transition-all" />

          <button
            type="submit"
            className="font-semibold py-3 rounded-full transition-colors mt-2 text-white bg-brand-orange hover:bg-brand-orange-dark"
          >
            Créer mon compte
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Déjà un compte ?{' '}
          <Link to={`/login/${role}`} className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup