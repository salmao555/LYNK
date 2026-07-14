import { useState } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import OnboardingLayout from './OnboardingLayout'
import { useOnboarding } from '../../context/OnboardingContext'
import { useAuth } from '../../context/AuthContext'

export default function OnboardingConfirmation() {
  const { pendingEmail } = useOnboarding()
  const { sendMagicLink } = useAuth()
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const email = pendingEmail || 'votre adresse email'

  const handleResend = async () => {
    if (!pendingEmail) return
    setResending(true)
    setResent(false)
    try {
      await sendMagicLink(pendingEmail)
      setResent(true)
    } finally {
      setResending(false)
    }
  }

  return (
    <OnboardingLayout step={3}>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="h-8 w-8 text-brand-primary" />
        </div>

        <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">
          Vérifiez votre boîte mail
        </h1>

        <p className="text-slate-600 mb-2">
          Un lien de connexion a été envoyé à
        </p>
        <p className="font-semibold text-brand-primary text-lg mb-6">{email}</p>

        <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left">
          <p className="text-sm text-slate-600 leading-relaxed">
            Cliquez sur le lien dans l'email pour accéder à votre espace étudiant.
            Pas de mot de passe à créer — connexion 100% sécurisée par magic link.
          </p>
        </div>

        {resent && (
          <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm mb-4">
            <CheckCircle2 className="h-4 w-4" />
            Email renvoyé avec succès
          </div>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={resending || !pendingEmail}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors disabled:opacity-50"
        >
          {resending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Renvoyer l\'email'
          )}
        </button>

        <p className="mt-8 text-xs text-slate-400">
          En développement : utilisez le lien simulé ci-dessous pour tester le flow.
        </p>
        <DevMagicLinkHelper email={pendingEmail} />
      </div>
    </OnboardingLayout>
  )
}

function DevMagicLinkHelper({ email }) {
  const [token, setToken] = useState('')

  if (!email) return null

  const loadToken = () => {
    try {
      const pending = JSON.parse(localStorage.getItem('lynk_pending_users') || '{}')
      const entry = pending[email]
      if (entry?.token) setToken(entry.token)
    } catch { /* ignore */ }
  }

  if (!token) {
    return (
      <button
        type="button"
        onClick={loadToken}
        className="mt-2 text-xs text-brand-primary hover:underline"
      >
        Afficher le lien de test
      </button>
    )
  }

  return (
    <a
      href={`/etudiant/auth/verify/${token}`}
      className="mt-2 inline-block text-xs text-brand-primary hover:underline break-all"
    >
      Simuler le clic magic link →
    </a>
  )
}
