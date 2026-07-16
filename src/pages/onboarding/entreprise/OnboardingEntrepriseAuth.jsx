import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Globe } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

function OnboardingEntrepriseAuth() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleOAuth = (provider) => {
    // Simulate OAuth success - in production this would be real OAuth
    // For now, we collect the onboarding data from localStorage and create the user
    
    // Get onboarding data from localStorage (simulated - in real app this would be collected during the flow)
    const onboardingData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    
    // Build user object from onboarding data
    const user = {
      role: 'entreprise',
      nom: onboardingData.companyName || 'Entreprise',
      email: onboardingData.website ? `contact@${onboardingData.website.replace('https://', '').replace('http://', '').split('/')[0]}` : 'entreprise@lynk.ma',
      verified: true,
      profile: {
        companyName: onboardingData.companyName || '',
        logo: onboardingData.logo || null,
        logoPreview: onboardingData.logoPreview || null,
        employeeCount: onboardingData.employeeCount || '',
        sector: onboardingData.sector || '',
        cities: onboardingData.cities || [],
        website: onboardingData.website || '',
        offerInfo: onboardingData.offerInfo || {},
        requirements: onboardingData.requirements || {},
        compensation: onboardingData.compensation || {},
        selectedInterns: onboardingData.selectedInterns || [],
      },
      provider, // 'google' or 'linkedin'
    }

    // Login the user
    login('entreprise', user.nom, user)

    // Clear onboarding data from localStorage
    localStorage.removeItem('lynk_entreprise_onboarding_data')

    // Redirect to enterprise dashboard
    navigate('/entreprise')
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col relative overflow-hidden">
      {/* Subtle orange gradient - top-right corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="bg-cream-white border-b border-cream-white px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-white shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-bold text-slate-900 mb-2">Finalisez votre compte entreprise</h1>
            <p className="text-slate-500 mb-8">Connectez-vous pour publier votre offre et accéder à votre tableau de bord.</p>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleOAuth('google')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-cream-white border border-cream-white rounded-xl font-medium text-slate-700 hover:bg-cream hover:border-cream-white transition-all"
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
                Continuer avec Google
              </button>

              <button
                onClick={() => handleOAuth('linkedin')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-cream-white border border-cream-white rounded-xl font-medium text-slate-700 hover:bg-cream hover:border-cream-white transition-all"
              >
                <Globe className="h-5 w-5 text-[#0077B5]" aria-hidden="true" />
                Continuer avec LinkedIn
              </button>
            </div>

            <p className="text-xs text-cream-white mt-6">
              En continuant, vous acceptez nos Conditions d'utilisation et Politique de confidentialité.
            </p>

            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/onboarding/entreprise/matching"
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

export default OnboardingEntrepriseAuth
