import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'

function OnboardingPreferences() {
  const [preferences, setPreferences] = useState({
    opportunityTypes: [],
    workMode: '',
    cities: '',
    salary: '',
    duration: '',
  })

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    if (savedData.preferences) {
      setPreferences(savedData.preferences)
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

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, preferences }))
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Étape 5 sur 6</span>
              <span className="text-sm font-medium text-brand-primary">83%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-brand-primary rounded-full h-2 transition-all" style={{ width: '83%' }} />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
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
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  Ville(s) de préférence
                </label>
                <input
                  type="text"
                  name="cities"
                  value={preferences.cities}
                  onChange={handleChange}
                  placeholder="Ex: Casablanca, Rabat, Tanger..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
                <p className="text-xs text-slate-400 mt-1">Séparez les villes par des virgules</p>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  Rémunération souhaitée (MAD/mois)
                </label>
                <input
                  type="number"
                  name="salary"
                  value={preferences.salary}
                  onChange={handleChange}
                  placeholder="Ex: 5000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  Durée souhaitée
                </label>
                <select
                  name="duration"
                  value={preferences.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-white"
                >
                  <option value="">Sélectionner</option>
                  <option value="2 mois">2 mois</option>
                  <option value="3 mois">3 mois</option>
                  <option value="3-6 mois">3-6 mois</option>
                  <option value="6+ mois">6+ mois</option>
                  <option value="1 an">1 an</option>
                </select>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/projects-skills"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
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
