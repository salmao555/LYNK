import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Building2, MapPin, Briefcase } from 'lucide-react'
import Stepper from '../../../components/Stepper'
import { useOnboardingEtablissement } from '../../../context/OnboardingEtablissementContext'

function OnboardingEtablissementDiscovery() {
  const navigate = useNavigate()
  const { formData, markStepVisited, canNavigateToStep } = useOnboardingEtablissement()

  const etablissementSteps = [
    { label: 'Infos', path: '/onboarding/etablissement/info' },
    { label: 'Filières', path: '/onboarding/etablissement/filieres' },
    { label: 'Étudiants', path: '/onboarding/etablissement/etudiants' },
    { label: 'Contact', path: '/onboarding/etablissement/contact' },
    { label: 'Découverte', path: '/onboarding/etablissement/discovery' },
    { label: 'Connexion', path: '/onboarding/etablissement/auth' },
  ]

  useEffect(() => {
    markStepVisited(5)
  }, [])

  // Sample enterprises - filtered based on filieres
  const sampleEnterprises = [
    {
      id: 1,
      name: 'Attijariwafa Bank',
      sector: 'Finance',
      logo: '🏦',
      activeOffers: 12,
      cities: ['Casablanca', 'Rabat'],
      relevantFilieres: ['Finance', 'Gestion', 'Économie']
    },
    {
      id: 2,
      name: 'OCP Group',
      sector: 'Industrie',
      logo: '⚗️',
      activeOffers: 8,
      cities: ['Casablanca', 'Jorf Lasfar'],
      relevantFilieres: ['Génie Chimique', 'Génie Civil', 'Génie Industriel']
    },
    {
      id: 3,
      name: 'Maroc Telecom',
      sector: 'Tech',
      logo: '📡',
      activeOffers: 15,
      cities: ['Rabat', 'Casablanca'],
      relevantFilieres: ['Génie Informatique', 'Génie Électrique', 'Data Science']
    },
    {
      id: 4,
      name: 'BMCE Bank',
      sector: 'Finance',
      logo: '🏛️',
      activeOffers: 6,
      cities: ['Casablanca'],
      relevantFilieres: ['Finance', 'Commerce International', 'Marketing']
    },
    {
      id: 5,
      name: 'Inwi',
      sector: 'Tech',
      logo: '📱',
      activeOffers: 9,
      cities: ['Casablanca', 'Marrakech'],
      relevantFilieres: ['Génie Informatique', 'Data Science', 'Marketing']
    },
    {
      id: 6,
      name: 'Cosumar',
      sector: 'Industrie',
      logo: '🏭',
      activeOffers: 5,
      cities: ['Casablanca', 'Meknès'],
      relevantFilieres: ['Génie Industriel', 'Génie Civil', 'Biologie']
    },
  ]

  // Filter enterprises based on selected filieres
  const filteredEnterprises = formData.filieres.length > 0
    ? sampleEnterprises.filter(enterprise =>
        enterprise.relevantFilieres.some(filiere =>
          formData.filieres.some(selected =>
            selected.toLowerCase().includes(filiere.toLowerCase()) ||
            filiere.toLowerCase().includes(selected.toLowerCase())
          )
        )
      )
    : sampleEnterprises

  const handleNext = () => {
    navigate('/onboarding/etablissement/auth')
  }

  const handleStepClick = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      const step = etablissementSteps[stepNumber - 1]
      if (step) {
        navigate(step.path)
      }
    }
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
      <div className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Stepper */}
          <Stepper steps={etablissementSteps} currentStep={5} onStepClick={handleStepClick} />

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Des entreprises actives dans vos secteurs</h1>
            <p className="text-slate-500">Aperçu des opportunités déjà disponibles pour vos étudiants.</p>
          </div>

          {/* Enterprise Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredEnterprises.map((enterprise) => (
              <div
                key={enterprise.id}
                className="bg-cream-white rounded-2xl border border-cream-white shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-cream-white flex items-center justify-center text-2xl">
                    {enterprise.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{enterprise.name}</h3>
                    <p className="text-sm text-slate-500">{enterprise.sector}</p>
                  </div>
                </div>

                {/* Cities */}
                <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{enterprise.cities.join(', ')}</span>
                </div>

                {/* Active Offers */}
                <div className="flex items-center gap-2 p-3 bg-brand-primary/5 rounded-lg">
                  <Briefcase className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-700">
                    {enterprise.activeOffers} offre(s) active(s)
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mb-8 p-4 bg-cream-white rounded-xl border border-cream-white">
            <p className="text-sm text-slate-600">
              <span className="font-semibold">💡 Astuce :</span> Ces entreprises sont déjà actives sur Lynk et publient régulièrement des offres de stage. Une fois votre compte créé, vous pourrez voir toutes les opportunités correspondant aux filières de votre établissement.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link
              to="/onboarding/etablissement/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Précédent
            </Link>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors"
            >
              Continuer vers l'authentification
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingEtablissementDiscovery
