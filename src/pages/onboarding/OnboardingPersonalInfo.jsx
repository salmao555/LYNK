import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function OnboardingPersonalInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    educationLevel: '',
  })

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    if (savedData.firstName || savedData.lastName) {
      setFormData({
        firstName: savedData.firstName || '',
        lastName: savedData.lastName || '',
        email: savedData.email || '',
        phone: savedData.phone || '',
        school: savedData.school || '',
        educationLevel: savedData.educationLevel || '',
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, ...formData }))
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Étape 2 sur 6</span>
              <span className="text-sm font-medium text-brand-primary">33%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-brand-primary rounded-full h-2 transition-all" style={{ width: '33%' }} />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Informations personnelles</h1>
            <p className="text-slate-500 mb-8">Commençons par en savoir plus sur vous.</p>

            <div className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jean"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* School */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">École / Formation *</label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Université Paris-Saclay"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* Education Level */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Niveau d'études *</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-white"
                >
                  <option value="">Sélectionner</option>
                  <option value="bac">Baccalauréat</option>
                  <option value="bac+1">Bac + 1</option>
                  <option value="bac+2">Bac + 2</option>
                  <option value="bac+3">Bac + 3 (Licence)</option>
                  <option value="bac+4">Bac + 4 (Master 1)</option>
                  <option value="bac+5">Bac + 5 (Master 2)</option>
                  <option value="doctorat">Doctorat</option>
                </select>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/cv-upload"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Link>
              <Link
                to="/onboarding/experience"
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

export default OnboardingPersonalInfo
