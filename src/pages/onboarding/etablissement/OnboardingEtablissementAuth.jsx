import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Globe } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { useOnboardingEtablissement } from '../../../context/OnboardingEtablissementContext'

function OnboardingEtablissementAuth() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { formData, reset } = useOnboardingEtablissement()

  const handleOAuth = (provider) => {
    // Simulate OAuth success - in production this would be real OAuth
    // Build user object from onboarding data
    const user = {
      role: 'etablissement',
      nom: formData.etablissementName || 'Établissement',
      email: formData.contact.email || 'etablissement@lynk.ma',
      verified: true,
      profile: {
        etablissementName: formData.etablissementName || '',
        logo: formData.logo || null,
        logoPreview: formData.logoPreview || null,
        etablissementType: formData.etablissementType || '',
        cities: formData.cities || [],
        website: formData.website || '',
        filieres: formData.filieres || [],
        studentImport: formData.studentImport || {},
        contact: formData.contact || {},
      },
      provider, // 'google' or 'linkedin'
    }

    // Login the user
    login('etablissement', user.nom, user)

    // Clear onboarding data
    reset()

    // Redirect to establishment dashboard
    navigate('/etablissement')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Subtle orange gradient - top-right corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-bold text-slate-900 mb-2">Finalisez votre compte établissement</h1>
            <p className="text-slate-500 mb-8">Connectez-vous pour accéder à votre tableau de bord et commencer à gérer les stages de vos étudiants.</p>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleOAuth('google')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
                Continuer avec Google
              </button>

              <button
                onClick={() => handleOAuth('linkedin')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Globe className="h-5 w-5 text-[#0077B5]" aria-hidden="true" />
                Continuer avec LinkedIn
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-6">
              En continuant, vous acceptez nos Conditions d'utilisation et Politique de confidentialité.
            </p>

            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/onboarding/etablissement/discovery"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Retour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingEtablissementAuth
