import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'
import Stepper from '../../components/Stepper'
import CitySelector from '../../components/CitySelector'
import SalarySlider from '../../components/SalarySlider'

function OnboardingPreferences() {
  const navigate = useNavigate()
  const [preferences, setPreferences] = useState({
    opportunityTypes: [],
    workMode: '',
    cities: [],
    salary: '',
    duration: '',
  })

  const studentSteps = [
    { label: 'CV', path: '/onboarding/cv-upload' },
    { label: 'Infos', path: '/onboarding/personal-info' },
    { label: 'Expériences', path: '/onboarding/experience' },
    { label: 'Projets', path: '/onboarding/projects-skills' },
    { label: 'Préférences', path: '/onboarding/preferences' },
    { label: 'Découverte', path: '/onboarding/matching-preview' },
    { label: 'Connexion', path: '/onboarding/auth' },
  ]

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    if (savedData.preferences) {
      setPreferences({
        ...savedData.preferences,
        cities: savedData.preferences.cities || []
      })
    }
  }, [])

  const toggleOpportunityType = (type) => {
    setPreferences({
      ...preferences,
      opportunityTypes: preferences.opportunityTypes.includes(type)
        ? preferences.opportunityTypes.filter(t => t !== type)
        : [...preferences.opportunityTypes, type]
    })
  }

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const handleCityToggle = (city, clearPrevious = false) => {
    if (clearPrevious) {
      setPreferences({ ...preferences, cities: [city] })
    } else {
      setPreferences({
        ...preferences,
        cities: preferences.cities.includes(city)
          ? preferences.cities.filter(c => c !== city)
          : [...preferences.cities, city]
      })
    }
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, preferences }))
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
          <Stepper steps={studentSteps} currentStep={5} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Préférences de carrière</h1>
            <p className="text-slate-500 mb-8">Définissez vos critères de recherche pour trouver l'opportunité idéale.</p>

            <div className="space-y-8">
              {/* Opportunity Types */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  Type d'opportunités recherchées
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Stage', 'Alternance', 'CDI', 'CDD', 'Freelance'].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleOpportunityType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        preferences.opportunityTypes.includes(type)
                          ? 'bg-brand-primary text-white'
                          : 'bg-cream-white text-slate-600 hover:bg-cream-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Mode de travail</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Présentiel', 'Remote', 'Hybride'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setPreferences({ ...preferences, workMode: mode })}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                        preferences.workMode === mode
                          ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                          : 'border-cream-border text-slate-600 hover:border-cream-border'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div>
                <CitySelector
                  selectedCities={preferences.cities}
                  onCityToggle={handleCityToggle}
                  label="Ville(s) de préférence"
                />
              </div>

              {/* Salary */}
              <SalarySlider
                value={preferences.salary || 0}
                onChange={(e) => setPreferences({ ...preferences, salary: e.target.value })}
                min={0}
                max={15000}
                step={100}
                label="Rémunération souhaitée"
                unit="MAD/mois"
                icon="dollar"
              />

              {/* Duration */}
              <SalarySlider
                value={parseInt(preferences.duration) || 0}
                onChange={(e) => setPreferences({ ...preferences, duration: e.target.value + ' mois' })}
                min={1}
                max={12}
                step={1}
                label="Durée souhaitée"
                unit="mois"
                icon="clock"
              />
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/projects-skills"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Link>
              <Link
                to="/onboarding/matching-preview"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors"
              >
                Suivant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPreferences
