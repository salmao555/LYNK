import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [role, setRole] = useState('etudiant')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(role, role === 'etudiant' ? 'Étudiant' : 'Entreprise')
    navigate('/bienvenue')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md border border-slate-200">
        <p className="text-2xl font-bold text-[#F2643B] text-center mb-8">Lynk</p>
        <h1 className="text-xl font-bold text-slate-900 text-center mb-6">Se connecter</h1>

        <div className="flex gap-3 mb-6">
          <button type="button" onClick={() => setRole('etudiant')}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium border-2 transition-colors ${
              role === 'etudiant' ? 'border-[#F2643B] bg-[#F2643B]/5 text-[#F2643B]' : 'border-slate-200 text-slate-500'
            }`}>
            🎓 Étudiant
          </button>
          <button type="button" onClick={() => setRole('entreprise')}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium border-2 transition-colors ${
              role === 'entreprise' ? 'border-slate-900 bg-slate-50 text-slate-900' : 'border-slate-200 text-slate-500'
            }`}>
            🏢 Entreprise
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30" />
          <input type="password" placeholder="Mot de passe" required className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30" />
          <p className="text-right text-sm text-[#F2643B] cursor-pointer">Mot de passe oublié ?</p>
          <button type="submit" className="bg-[#F2643B] hover:bg-[#E8492E] text-white font-semibold py-3 rounded-full transition-colors">
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Pas encore de compte ?{' '}
          <Link to="/signup/etudiant" className="text-[#F2643B] font-medium">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}

export default Login