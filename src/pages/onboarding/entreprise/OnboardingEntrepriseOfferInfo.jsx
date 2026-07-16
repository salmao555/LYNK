import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Calendar, Plus, X } from 'lucide-react'
import Stepper from '../../../components/Stepper'

function OnboardingEntrepriseOfferInfo() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    startDate: '',
    endDate: '',
    duration: '',
    deliverables: [''],
  })

  const entrepriseSteps = [
    { label: 'Infos', path: '/onboarding/entreprise/info' },
    { label: 'Offre', path: '/onboarding/entreprise/offer-info' },
    { label: 'Critères', path: '/onboarding/entreprise/requirements' },
    { label: 'Rémunération', path: '/onboarding/entreprise/compensation' },
    { label: 'Matching', path: '/onboarding/entreprise/matching' },
    { label: 'Connexion', path: '/onboarding/entreprise/auth' },
  ]

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    if (savedData.offerInfo) {
      setFormData(savedData.offerInfo)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addDeliverable = () => {
    setFormData({
      ...formData,
      deliverables: [...formData.deliverables, '']
    })
  }

  const removeDeliverable = (index) => {
    if (formData.deliverables.length > 1) {
      setFormData({
        ...formData,
        deliverables: formData.deliverables.filter((_, i) => i !== index)
      })
    }
  }

  const updateDeliverable = (index, value) => {
    const updated = [...formData.deliverables]
    updated[index] = value
    setFormData({ ...formData, deliverables: updated })
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    localStorage.setItem('lynk_entreprise_onboarding_data', JSON.stringify({ ...existingData, offerInfo: formData }))
  }

  const handleStepClick = (stepNumber) => {
    const step = entrepriseSteps[stepNumber - 1]
    if (step) {
      handleNext()
      navigate(step.path)
    }
  }

  const moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Meknès', 'Agadir', 'Oujda', 'Kénitra', 'Tétouan']

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
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <Stepper steps={entrepriseSteps} currentStep={2} onStepClick={handleStepClick} />

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Décrivez le stage que vous proposez
            </h1>
            <p className="text-slate-500 text-pretty">
              Ces informations aideront les candidats à comprendre le rôle et les attentes.
            </p>
          </div>

          {/* Form */}
          <div className="bg-cream-white rounded-2xl border border-cream-white shadow-sm p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Titre / thème du stage *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Développeur Web Full Stack"
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ville du poste *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              >
                <option value="">Sélectionnez...</option>
                {moroccanCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Dates / Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de début *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de fin *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Durée estimée
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Ex: 3 mois, 6 mois"
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Livrables attendus *
              </label>
              <div className="space-y-3">
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => updateDeliverable(index, e.target.value)}
                      placeholder={`Livrable ${index + 1}`}
                      className="flex-1 px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                    {formData.deliverables.length > 1 && (
                      <button
                        onClick={() => removeDeliverable(index)}
                        className="p-3 rounded-xl border border-cream-white text-cream-white hover:text-red-500 hover:border-red-300 transition-colors"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addDeliverable}
                  className="flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Ajouter un livrable
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/onboarding/entreprise/info"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Précédent
            </Link>
            <Link
              to="/onboarding/entreprise/requirements"
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
  )
}

export default OnboardingEntrepriseOfferInfo
