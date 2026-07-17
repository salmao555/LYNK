import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Heart, Building2, MapPin, DollarSign } from 'lucide-react'
import Stepper from '../../components/Stepper'

function OnboardingMatchingPreview() {
  const navigate = useNavigate()
  const [selectedOffers, setSelectedOffers] = useState([])

  const studentSteps = [
    { label: 'CV', path: '/onboarding/cv-upload' },
    { label: 'Infos', path: '/onboarding/personal-info' },
    { label: 'Expériences', path: '/onboarding/experience' },
    { label: 'Projets', path: '/onboarding/projects-skills' },
    { label: 'Préférences', path: '/onboarding/preferences' },
    { label: 'Découverte', path: '/onboarding/matching-preview' },
    { label: 'Connexion', path: '/onboarding/auth' },
  ]

  const sampleOffers = [
    {
      id: 1,
      company: 'TechCorp',
      title: 'Développeur Web Full Stack',
      location: 'Casablanca',
      salary: '6000-8000 MAD',
      match: 92,
      selected: false,
    },
    {
      id: 2,
      company: 'Innovation Labs',
      title: 'Data Analyst Junior',
      location: 'Rabat',
      salary: '5000-7000 MAD',
      match: 88,
      selected: false,
    },
    {
      id: 3,
      company: 'StartUp Vision',
      title: 'UX Designer',
      location: 'Tanger',
      salary: '5500-7500 MAD',
      match: 85,
      selected: false,
    },
    {
      id: 4,
      company: 'Digital Agency',
      title: 'Marketing Digital',
      location: 'Casablanca',
      salary: '4500-6500 MAD',
      match: 82,
      selected: false,
    },
    {
      id: 5,
      company: 'Data Corp',
      title: 'DevOps Engineer',
      location: 'Remote',
      salary: '7000-9000 MAD',
      match: 79,
      selected: false,
    },
    {
      id: 6,
      company: 'Creative Studio',
      title: 'Frontend Developer',
      location: 'Marrakech',
      salary: '5000-7000 MAD',
      match: 76,
      selected: false,
    },
  ]

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    if (savedData.selectedOffers && savedData.selectedOffers.length > 0) {
      setSelectedOffers(savedData.selectedOffers)
    }
  }, [])

  const toggleOffer = (id) => {
    setSelectedOffers(selectedOffers.includes(id)
      ? selectedOffers.filter(offerId => offerId !== id)
      : [...selectedOffers, id]
    )
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, selectedOffers }))
  }

  const handleStepClick = (stepNumber) => {
    const step = studentSteps[stepNumber - 1]
    if (step) {
      handleNext()
      navigate(step.path)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col relative overflow-hidden">
      {/* Subtle orange gradient - top-right corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="bg-cream-white border-b border-cream-border px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <Stepper steps={studentSteps} currentStep={6} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Découverte</h1>
            <p className="text-slate-500 mb-8">Voici des opportunités qui correspondent à votre profil. Sélectionnez celles qui vous intéressent pour affiner votre matching.</p>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {sampleOffers.map((offer) => (
                <div
                  key={offer.id}
                  onClick={() => toggleOffer(offer.id)}
                  className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedOffers.includes(offer.id)
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-cream-border hover:border-brand-primary/50'
                  }`}
                >
                  {/* Match Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-bold">
                    {offer.match}%
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cream-white flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-slate-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{offer.company}</p>
                      <p className="text-xs text-slate-500">{offer.title}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {offer.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" aria-hidden="true" />
                      {offer.salary}
                    </div>
                  </div>

                  {selectedOffers.includes(offer.id) && (
                    <div className="absolute top-4 left-4">
                      <Heart className="h-5 w-5 text-brand-primary fill-brand-primary" aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selection Summary */}
            {selectedOffers.length > 0 && (
              <div className="bg-brand-primary/10 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-brand-primary">
                  {selectedOffers.length} offre{selectedOffers.length > 1 ? 's' : ''} sélectionnée{selectedOffers.length > 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Link
                to="/onboarding/preferences"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Link>
              <Link
                to="/onboarding/auth"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors"
              >
                Continuer vers l'authentification
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingMatchingPreview
