import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Upload, X, Landmark } from 'lucide-react'
import Stepper from '../../../components/Stepper'
import { useOnboardingEtablissement } from '../../../context/OnboardingEtablissementContext'

function OnboardingEtablissementInfo() {
  const navigate = useNavigate()
  const { formData, updateFormData, markStepVisited, canNavigateToStep } = useOnboardingEtablissement()
  
  const [newCity, setNewCity] = useState('')

  const etablissementSteps = [
    { label: 'Infos', path: '/onboarding/etablissement/info' },
    { label: 'Filières', path: '/onboarding/etablissement/filieres' },
    { label: 'Étudiants', path: '/onboarding/etablissement/etudiants' },
    { label: 'Contact', path: '/onboarding/etablissement/contact' },
    { label: 'Découverte', path: '/onboarding/etablissement/discovery' },
    { label: 'Connexion', path: '/onboarding/etablissement/auth' },
  ]

  useEffect(() => {
    markStepVisited(1)
  }, [])

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFormData({
          logo: file,
          logoPreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    updateFormData({
      logo: null,
      logoPreview: null
    })
  }

  const handleEtablissementTypeSelect = (type) => {
    updateFormData({ etablissementType: type })
  }

  const addCity = () => {
    if (newCity.trim() && !formData.cities.includes(newCity.trim())) {
      updateFormData({
        cities: [...formData.cities, newCity.trim()]
      })
      setNewCity('')
    }
  }

  const removeCity = (city) => {
    updateFormData({
      cities: formData.cities.filter(c => c !== city)
    })
  }

  const handleCityKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCity()
    }
  }

  const handleNext = () => {
    navigate('/onboarding/etablissement/filieres')
  }

  const handleStepClick = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      const step = etablissementSteps[stepNumber - 1]
      if (step) {
        navigate(step.path)
      }
    }
  }

  const moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Meknès', 'Agadir', 'Oujda', 'Kénitra', 'Tétouan']
  const etablissementTypes = ['Université', 'École d\'ingénieur', 'École de commerce', 'Institut spécialisé', 'Autre']

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <Stepper steps={etablissementSteps} currentStep={1} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Parlez-nous de votre établissement</h1>
            <p className="text-slate-500 mb-8">Ces informations apparaîtront sur votre profil, visible par les entreprises.</p>

            <div className="space-y-6">
              {/* Etablissement Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nom de l'établissement *
                </label>
                <input
                  type="text"
                  name="etablissementName"
                  value={formData.etablissementName}
                  onChange={handleChange}
                  placeholder="Ex: Université Mohammed V"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Logo (optionnel)
                </label>
                <div className="flex items-center gap-4">
                  {formData.logoPreview ? (
                    <div className="relative">
                      <img
                        src={formData.logoPreview}
                        alt="Logo preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                      />
                      <button
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-brand-primary hover:bg-slate-50 transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Upload className="h-8 w-8 text-slate-400" aria-hidden="true" />
                    </label>
                  )}
                  <p className="text-sm text-slate-500">Format carré, max 5MB</p>
                </div>
              </div>

              {/* Etablissement Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Type d'établissement *
                </label>
                <div className="flex flex-wrap gap-2">
                  {etablissementTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleEtablissementTypeSelect(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.etablissementType === type
                          ? 'bg-brand-primary text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ville(s) / campus *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    onKeyDown={handleCityKeyDown}
                    placeholder="Ajouter une ville..."
                    list="moroccan-cities"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                  <datalist id="moroccan-cities">
                    {moroccanCities.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  <button
                    onClick={addCity}
                    className="px-4 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-dark transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.cities.map(city => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm"
                    >
                      {city}
                      <button
                        onClick={() => removeCity(city)}
                        className="hover:text-brand-primary-dark"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Site web (optionnel)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.votre-etablissement.ma"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/academique/choix"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Retour
              </Link>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors"
              >
                Suivant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingEtablissementInfo
