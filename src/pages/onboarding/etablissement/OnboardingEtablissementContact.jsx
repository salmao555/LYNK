import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, User } from 'lucide-react'
import Stepper from '../../../components/Stepper'
import { useOnboardingEtablissement } from '../../../context/OnboardingEtablissementContext'

function OnboardingEtablissementContact() {
  const navigate = useNavigate()
  const { formData, updateFormData, markStepVisited, canNavigateToStep } = useOnboardingEtablissement()

  const etablissementSteps = [
    { label: 'Infos', path: '/onboarding/etablissement/info' },
    { label: 'Filières', path: '/onboarding/etablissement/filieres' },
    { label: 'Étudiants', path: '/onboarding/etablissement/etudiants' },
    { label: 'Contact', path: '/onboarding/etablissement/contact' },
    { label: 'Découverte', path: '/onboarding/etablissement/discovery' },
    { label: 'Connexion', path: '/onboarding/etablissement/auth' },
  ]

  useEffect(() => {
    markStepVisited(4)
  }, [])

  const handleChange = (e) => {
    updateFormData({
      contact: {
        ...formData.contact,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleRoleSelect = (role) => {
    updateFormData({
      contact: {
        ...formData.contact,
        role
      }
    })
  }

  const handleNext = () => {
    navigate('/onboarding/etablissement/discovery')
  }

  const handleStepClick = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      const step = etablissementSteps[stepNumber - 1]
      if (step) {
        navigate(step.path)
      }
    }
  }

  const contactRoles = ['Responsable des stages', 'Direction des études', 'Scolarité', 'Autre']

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
          <Stepper steps={etablissementSteps} currentStep={4} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-white shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Qui gère ce compte ?</h1>
            <p className="text-slate-500 mb-8">Les informations du contact principal pour la gestion des stages.</p>

            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.contact.firstName}
                    onChange={handleChange}
                    placeholder="Jean"
                    className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.contact.lastName}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Rôle *
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactRoles.map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleSelect(role)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.contact.role === role
                          ? 'bg-brand-primary text-white'
                          : 'bg-cream-white text-slate-700 hover:bg-cream-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.contact.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@etablissement.ma"
                  className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                  placeholder="+212 6 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/etablissement/etudiants"
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

export default OnboardingEtablissementContact
