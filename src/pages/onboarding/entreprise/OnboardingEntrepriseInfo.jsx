import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Building2, Upload, X } from 'lucide-react'
import Stepper from '../../../components/Stepper'

function OnboardingEntrepriseInfo() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    logo: null,
    logoPreview: null,
    employeeCount: '',
    sector: '',
    cities: [],
    website: '',
  })

  const [newCity, setNewCity] = useState('')

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
    if (savedData.companyName || savedData.sector) {
      setFormData({
        companyName: savedData.companyName || '',
        logo: savedData.logo || null,
        logoPreview: savedData.logoPreview || null,
        employeeCount: savedData.employeeCount || '',
        sector: savedData.sector || '',
        cities: savedData.cities || [],
        website: savedData.website || '',
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: file,
          logoPreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setFormData({
      ...formData,
      logo: null,
      logoPreview: null
    })
  }

  const addCity = () => {
    if (newCity.trim() && !formData.cities.includes(newCity.trim())) {
      setFormData({
        ...formData,
        cities: [...formData.cities, newCity.trim()]
      })
      setNewCity('')
    }
  }

  const removeCity = (city) => {
    setFormData({
      ...formData,
      cities: formData.cities.filter(c => c !== city)
    })
  }

  const handleCityKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCity()
    }
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    localStorage.setItem('lynk_entreprise_onboarding_data', JSON.stringify({ ...existingData, ...formData }))
  }

  const handleStepClick = (stepNumber) => {
    const step = entrepriseSteps[stepNumber - 1]
    if (step) {
      handleNext()
      navigate(step.path)
    }
  }

  const moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Meknès', 'Agadir', 'Oujda', 'Kénitra', 'Tétouan']
  const sectors = ['Tech', 'Finance', 'Industrie', 'Conseil', 'Marketing', 'Santé', 'Éducation', 'Commerce', 'Autre']
  const employeeRanges = ['1-10', '11-50', '51-200', '201-500', '500+']

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
          <Stepper steps={entrepriseSteps} currentStep={1} onStepClick={handleStepClick} />

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Parlez-nous de votre entreprise
            </h1>
            <p className="text-slate-500 text-pretty">
              Ces informations apparaîtront sur votre profil, visible par les candidats.
            </p>
          </div>

          {/* Form */}
          <div className="bg-cream-white rounded-2xl border border-cream-white shadow-sm p-8 space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ex: TechCorp Maroc"
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
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
                      className="w-20 h-20 rounded-full object-cover border-2 border-cream-white"
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <label className="w-20 h-20 rounded-full border-2 border-dashed border-cream-white flex items-center justify-center cursor-pointer hover:border-brand-primary hover:bg-cream transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Upload className="h-8 w-8 text-cream-white" aria-hidden="true" />
                  </label>
                )}
                <p className="text-sm text-slate-500">Format carré, max 5MB</p>
              </div>
            </div>

            {/* Employee Count */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre d'employés *
              </label>
              <select
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              >
                <option value="">Sélectionnez...</option>
                {employeeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Sector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Secteur d'activité *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              >
                <option value="">Sélectionnez...</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            {/* Cities */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ville(s) où l'entreprise opère *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  onKeyDown={handleCityKeyDown}
                  placeholder="Ajouter une ville..."
                  list="moroccan-cities"
                  className="flex-1 px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
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
                placeholder="https://www.votre-entreprise.ma"
                className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour
            </Link>
            <Link
              to="/onboarding/entreprise/offer-info"
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

export default OnboardingEntrepriseInfo
