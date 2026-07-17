import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, DollarSign } from 'lucide-react'
import Stepper from '../../../components/Stepper'
import SalarySlider from '../../../components/SalarySlider'

function OnboardingEntrepriseCompensation() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    minSalary: 2000,
    maxSalary: 6000,
    isUnpaid: false,
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
    if (savedData.compensation) {
      setFormData(savedData.compensation)
    }
  }, [])

  const handleMinSalaryChange = (e) => {
    const value = parseInt(e.target.value)
    setFormData({
      ...formData,
      minSalary: Math.min(value, formData.maxSalary - 500)
    })
  }

  const handleMaxSalaryChange = (e) => {
    const value = parseInt(e.target.value)
    setFormData({
      ...formData,
      maxSalary: Math.max(value, formData.minSalary + 500)
    })
  }

  const toggleUnpaid = () => {
    setFormData({
      ...formData,
      isUnpaid: !formData.isUnpaid
    })
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    localStorage.setItem('lynk_entreprise_onboarding_data', JSON.stringify({ ...existingData, compensation: formData }))
  }

  const handleStepClick = (stepNumber) => {
    const step = entrepriseSteps[stepNumber - 1]
    if (step) {
      handleNext()
      navigate(step.path)
    }
  }

  const salaryRange = formData.isUnpaid ? 'Non rémunéré' : `${formData.minSalary} - ${formData.maxSalary} MAD/mois`

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
          <Stepper steps={entrepriseSteps} currentStep={4} onStepClick={handleStepClick} />

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Rémunération proposée
            </h1>
            <p className="text-slate-500 text-pretty">
              Soyez transparent sur la rémunération pour attirer les meilleurs candidats.
            </p>
          </div>

          {/* Form */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8 space-y-8">
            {/* Unpaid Toggle */}
            <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
              <div>
                <h3 className="font-semibold text-slate-900">Stage non rémunéré</h3>
                <p className="text-sm text-slate-500">Cochez si le stage n'est pas rémunéré</p>
              </div>
              <button
                onClick={toggleUnpaid}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  formData.isUnpaid ? 'bg-brand-primary' : 'bg-cream-white'
                }`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-cream-white rounded-full transition-transform ${
                    formData.isUnpaid ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Salary Sliders */}
            {!formData.isUnpaid && (
              <div className="space-y-6">
                <SalarySlider
                  value={formData.minSalary}
                  onChange={handleMinSalaryChange}
                  min={1000}
                  max={15000}
                  step={100}
                  label="Salaire minimum"
                  unit="MAD/mois"
                  icon="dollar"
                />

                <SalarySlider
                  value={formData.maxSalary}
                  onChange={handleMaxSalaryChange}
                  min={1000}
                  max={15000}
                  step={100}
                  label="Salaire maximum"
                  unit="MAD/mois"
                  icon="dollar"
                />
              </div>
            )}

            {/* Summary */}
            <div className="p-6 bg-brand-primary/5 rounded-xl border border-brand-primary/20">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-brand-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm text-slate-600">Rémunération affichée</p>
                  <p className="text-xl font-bold text-slate-900">{salaryRange}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/onboarding/entreprise/requirements"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Précédent
            </Link>
            <Link
              to="/onboarding/entreprise/matching"
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

export default OnboardingEntrepriseCompensation
