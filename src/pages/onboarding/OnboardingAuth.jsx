import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function OnboardingAuth() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleOAuth = (provider) => {
    // Simulate OAuth success - in production this would be real OAuth
    // For now, we collect the onboarding data from localStorage and create the user
    
    // Get onboarding data from localStorage (simulated - in real app this would be collected during the flow)
    const onboardingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    
    // Build user object from onboarding data
    const user = {
      role: 'etudiant',
      nom: onboardingData.firstName && onboardingData.lastName 
        ? `${onboardingData.firstName} ${onboardingData.lastName}` 
        : 'Étudiant',
      email: onboardingData.email || 'etudiant@lynk.ma',
      verified: true,
      profile: {
        prenom: onboardingData.firstName || '',
        nom: onboardingData.lastName || '',
        email: onboardingData.email || '',
        telephone: onboardingData.phone || '',
        ecole: onboardingData.school || '',
        niveau: onboardingData.educationLevel || '',
        experience: onboardingData.experiences || [],
        projects: onboardingData.projects || [],
        skills: onboardingData.skills || [],
        preferences: onboardingData.preferences || {},
        selectedOffers: onboardingData.selectedOffers || [],
      },
      provider, // 'google' or 'linkedin'
    }

    // Login the user
    login('etudiant', user.nom, user)

    // Clear onboarding data from localStorage
    localStorage.removeItem('lynk_onboarding_data')

    // Redirect to welcome page
    navigate('/bienvenue')
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-bold text-slate-900 mb-2">Finalisez votre compte</h1>
            <p className="text-slate-500 mb-8">Connectez-vous pour sauvegarder votre profil et accéder à toutes les fonctionnalités.</p>

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
                to="/onboarding/matching-preview"
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

export default OnboardingAuth
