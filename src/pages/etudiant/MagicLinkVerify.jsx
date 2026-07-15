import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useOnboarding } from '../../context/OnboardingContext'

export default function MagicLinkVerify() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { verifyMagicLink } = useAuth()
  const { reset } = useOnboarding()
  const [error, setError] = useState('')

  useEffect(() => {
    async function run() {
      const result = await verifyMagicLink(token)
      if (result) {
        reset()
        navigate('/etudiant', { replace: true })
      } else {
        setError("Ce lien est invalide ou a expire.")
      }
    }
    run()
  }, [token, verifyMagicLink, navigate, reset])

  if (error) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/etudiant/onboarding" className="text-brand-primary font-medium hover:underline">
            Recommencer l'inscription
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 text-brand-primary animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Connexion en cours...</p>
      </div>
    </div>
  )
}