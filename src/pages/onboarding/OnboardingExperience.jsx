import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, Trash2, Building2 } from 'lucide-react'

function OnboardingExperience() {
  const [experiences, setExperiences] = useState([
    { id: 1, title: '', company: '', startDate: '', endDate: '', description: '' }
  ])

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    if (savedData.experiences && savedData.experiences.length > 0) {
      setExperiences(savedData.experiences)
    }
  }, [])

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '' }])
  }

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id))
  }

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp))
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, experiences }))
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
              <span className="text-sm font-medium text-slate-600">Étape 3 sur 6</span>
              <span className="text-sm font-medium text-brand-primary">50%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-brand-primary rounded-full h-2 transition-all" style={{ width: '50%' }} />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Expériences précédentes</h1>
            <p className="text-slate-500 mb-8">Ajoutez vos expériences professionnelles ou académiques.</p>

            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={experience.id} className="border border-slate-200 rounded-xl p-6 relative">
                  {experiences.length > 1 && (
                    <button
                      onClick={() => removeExperience(experience.id)}
                      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Expérience {index + 1}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Titre du poste</label>
                      <input
                        type="text"
                        value={experience.title}
                        onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                        placeholder="Ex: Développeur Web"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Entreprise</label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                        placeholder="Ex: TechCorp"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date de début</label>
                      <input
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date de fin</label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                      placeholder="Décrivez vos responsabilités et réalisations..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addExperience}
                className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Ajouter une expérience
              </button>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/personal-info"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Link>
              <Link
                to="/onboarding/projects-skills"
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

export default OnboardingExperience
