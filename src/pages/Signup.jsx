import { useNavigate, Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md border border-slate-200">
        <p className="text-2xl font-bold text-[#F2643B] text-center mb-8">Lynk</p>

        <div className="text-center mb-6">
          <span className={`inline-block text-sm px-4 py-1.5 rounded-full font-medium mb-3 ${
            estEtudiant ? 'bg-[#F2643B]/10 text-[#F2643B]' : estUniversite ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {estEtudiant ? '🎓 Étudiant' : estUniversite ? '🏛️ Établissement' : '🏢 Entreprise'}
          </span>
          <h1 className="text-xl font-bold text-slate-900">
            {estEtudiant ? 'Trouvez votre stage idéal' : estUniversite ? 'Gérez les stages de vos étudiants' : 'Recrutez vos futurs talents'}
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
            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30"
          />
          <input type="email" placeholder="Email" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30" />
          <input type="password" placeholder="Mot de passe" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30" />

          <button
            type="submit"
            className={`font-semibold py-3 rounded-full transition-colors mt-2 text-white ${
              estEtudiant
                ? 'bg-[#F2643B] hover:bg-[#E8492E]'
                : estUniversite
                  ? 'bg-[#0a1038] hover:bg-[#151b4d]'
                  : 'bg-slate-900 hover:bg-black'
            }`}
          >
            Créer mon compte
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-[#F2643B] font-medium">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup