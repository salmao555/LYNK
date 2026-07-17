import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, GraduationCap, Building2, Tag, Plus, X } from 'lucide-react'
import Stepper from '../../../components/Stepper'

function OnboardingEntrepriseRequirements() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    educationLevels: [],
    targetSchools: [],
    allSchools: false,
    skills: [],
    otherPreferences: '',
  })

  const [newSkill, setNewSkill] = useState('')
  const [newSchool, setNewSchool] = useState('')

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
    if (savedData.requirements) {
      setFormData(savedData.requirements)
    }
  }, [])

  const toggleEducationLevel = (level) => {
    setFormData({
      ...formData,
      educationLevels: formData.educationLevels.includes(level)
        ? formData.educationLevels.filter(l => l !== level)
        : [...formData.educationLevels, level]
    })
  }

  const toggleAllSchools = () => {
    setFormData({
      ...formData,
      allSchools: !formData.allSchools,
      targetSchools: !formData.allSchools ? [] : formData.targetSchools
    })
  }

  const addSchool = () => {
    if (newSchool.trim() && !formData.targetSchools.includes(newSchool.trim()) && !formData.allSchools) {
      setFormData({
        ...formData,
        targetSchools: [...formData.targetSchools, newSchool.trim()]
      })
      setNewSchool('')
    }
  }

  const removeSchool = (school) => {
    setFormData({
      ...formData,
      targetSchools: formData.targetSchools.filter(s => s !== school)
    })
  }

  const handleSchoolKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSchool()
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    })
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    localStorage.setItem('lynk_entreprise_onboarding_data', JSON.stringify({ ...existingData, requirements: formData }))
  }

  const handleStepClick = (stepNumber) => {
    const step = entrepriseSteps[stepNumber - 1]
    if (step) {
      handleNext()
      navigate(step.path)
    }
  }

  const educationLevels = ['1ère année', '2ème année', '3ème année', 'Master 1', 'Master 2', 'Indifférent']
  const suggestedSchools = ['EMI', 'ENSIAS', 'UM6P', 'UIR', 'ENSA', 'ENA', 'ENCG', 'FST', 'EST']

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
          <Stepper steps={entrepriseSteps} currentStep={3} onStepClick={handleStepClick} />

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Qui recherchez-vous ?
            </h1>
            <p className="text-slate-500 text-pretty">
              Ces critères filtrent automatiquement les candidatures compatibles.
            </p>
          </div>

          {/* Form */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8 space-y-8">
            {/* Education Levels */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Niveau d'études requis *
              </label>
              <div className="flex flex-wrap gap-2">
                {educationLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => toggleEducationLevel(level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.educationLevels.includes(level)
                        ? 'bg-brand-primary text-white'
                        : 'bg-cream-white text-slate-700 hover:bg-cream-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Schools */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                École(s) ciblée(s) (optionnel)
              </label>
              <div className="flex items-center gap-2 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allSchools}
                    onChange={toggleAllSchools}
                    className="w-4 h-4 rounded border-cream-border text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="text-sm text-slate-700">Toutes écoles</span>
                </label>
              </div>
              {!formData.allSchools && (
                <>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSchool}
                      onChange={(e) => setNewSchool(e.target.value)}
                      onKeyDown={handleSchoolKeyDown}
                      placeholder="Ajouter une école..."
                      list="suggested-schools"
                      className="flex-1 px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                    <datalist id="suggested-schools">
                      {suggestedSchools.map(school => (
                        <option key={school} value={school} />
                      ))}
                    </datalist>
                    <button
                      onClick={addSchool}
                      className="px-4 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-dark transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.targetSchools.map(school => (
                      <span
                        key={school}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm"
                      >
                        {school}
                        <button
                          onClick={() => removeSchool(school)}
                          className="hover:text-brand-primary-dark"
                        >
                          <X className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Compétences/skills recherchés *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Ex: React, Python, Communication..."
                  className="flex-1 px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-dark transition-colors"
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-brand-primary-dark"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Other Preferences */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Autres préférences (optionnel)
              </label>
              <textarea
                name="otherPreferences"
                value={formData.otherPreferences}
                onChange={handleChange}
                placeholder="Ex: Anglais courant, disponible immédiatement, mobilité..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/onboarding/entreprise/offer-info"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Précédent
            </Link>
            <Link
              to="/onboarding/entreprise/compensation"
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

export default OnboardingEntrepriseRequirements
