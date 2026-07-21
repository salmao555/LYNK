import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, GraduationCap, X, Plus } from 'lucide-react'
import Stepper from '../../../components/Stepper'
import { useOnboardingEtablissement } from '../../../context/OnboardingEtablissementContext'

function OnboardingEtablissementFilieres() {
  const navigate = useNavigate()
  const { formData, updateFormData, markStepVisited, canNavigateToStep } = useOnboardingEtablissement()

  const [newFiliere, setNewFiliere] = useState('')

  const etablissementSteps = [
    { label: 'Infos', path: '/onboarding/etablissement/info' },
    { label: 'Filières', path: '/onboarding/etablissement/filieres' },
    { label: 'Contact', path: '/onboarding/etablissement/contact' },
    { label: 'Découverte', path: '/onboarding/etablissement/discovery' },
    { label: 'Connexion', path: '/onboarding/etablissement/auth' },
  ]

  useEffect(() => {
    markStepVisited(2)
  }, [])

  const suggestedFilieres = [
    'Génie Informatique',
    'Génie Civil',
    'Génie Industriel',
    'Finance',
    'Marketing',
    'Commerce International',
    'Génie Électrique',
    'Data Science',
    'Design',
    'Gestion',
    'Droit',
    'Économie',
    'Médecine',
    'Biologie',
    'Architecture',
    'Autre'
  ]

  const toggleFiliere = (filiere) => {
    if (formData.filieres?.includes(filiere)) {
      updateFormData({
        filieres: formData.filieres.filter(f => f !== filiere)
      })
    } else {
      updateFormData({
        filieres: [...formData.filieres, filiere]
      })
    }
  }

  const addCustomFiliere = () => {
    if (newFiliere.trim() && !formData.filieres.includes(newFiliere.trim())) {
      updateFormData({
        filieres: [...formData.filieres, newFiliere.trim()]
      })
      setNewFiliere('')
    }
  }

  const removeFiliere = (filiere) => {
    updateFormData({
      filieres: formData.filieres.filter(f => f !== filiere)
    })
  }

  const handleFiliereKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomFiliere()
    }
  }

  const handleNext = () => {
    navigate('/onboarding/etablissement/contact')
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
      <div className="bg-cream-white border-b border-cream-border px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <Stepper steps={etablissementSteps} currentStep={2} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Quelles filières proposez-vous ?</h1>
            <p className="text-slate-500 mb-8">Ça nous aide à orienter les bonnes offres vers vos étudiants.</p>

            {/* Suggested Filières */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Filières suggérées (multi-sélection)
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedFilieres.map(filiere => (
                  <button
                    key={filiere}
                    onClick={() => toggleFiliere(filiere)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.filieres.includes(filiere)
                        ? 'bg-brand-primary text-white'
                        : 'bg-cream-white text-slate-700 hover:bg-cream-white'
                    }`}
                  >
                    {filiere}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Filiere Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Ajouter une filière non listée
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newFiliere}
                  onChange={(e) => setNewFiliere(e.target.value)}
                  onKeyDown={handleFiliereKeyDown}
                  placeholder="Ex: Génie Mécanique, Chimie..."
                  className="flex-1 px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
                <button
                  onClick={addCustomFiliere}
                  className="px-4 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-dark transition-colors"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Selected Filières Summary */}
            {formData.filieres.length > 0 && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-brand-primary">{formData.filieres.length}</span> filière(s) sélectionnée(s)
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.filieres.map((filiere) => (
                    <div
                      key={filiere}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-full text-sm font-medium"
                    >
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                      {filiere}
                      <button
                        onClick={() => removeFiliere(filiere)}
                        className="hover:text-cream-white transition-colors"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/etablissement/info"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
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

export default OnboardingEtablissementFilieres
