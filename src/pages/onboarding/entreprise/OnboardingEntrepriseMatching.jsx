import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Heart, GraduationCap, MapPin, Building2, ExternalLink } from 'lucide-react'
import Stepper from '../../../components/Stepper'

function OnboardingEntrepriseMatching() {
  const navigate = useNavigate()
  const [selectedInterns, setSelectedInterns] = useState([])

  const entrepriseSteps = [
    { label: 'Infos', path: '/onboarding/entreprise/info' },
    { label: 'Offre', path: '/onboarding/entreprise/offer-info' },
    { label: 'Critères', path: '/onboarding/entreprise/requirements' },
    { label: 'Rémunération', path: '/onboarding/entreprise/compensation' },
    { label: 'Matching', path: '/onboarding/entreprise/matching' },
    { label: 'Connexion', path: '/onboarding/entreprise/auth' },
  ]

  const sampleInterns = [
    {
      id: 1,
      name: 'Youssef Amrani',
      school: 'ENSIAS',
      level: 'Master 2',
      skills: ['React', 'Python', 'Machine Learning'],
      match: 94,
      selected: false,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef',
      linkedin: 'https://linkedin.com/in/youssef-amrani',
    },
    {
      id: 2,
      name: 'Sara Benjelloun',
      school: 'EMI',
      level: '3ème année',
      skills: ['Java', 'Spring', 'DevOps'],
      match: 91,
      selected: false,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      linkedin: 'https://linkedin.com/in/sara-benjelloun',
    },
    {
      id: 3,
      name: 'Karim Tazi',
      school: 'UM6P',
      level: 'Master 1',
      skills: ['Data Science', 'SQL', 'Python'],
      match: 88,
      selected: false,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
      linkedin: 'https://linkedin.com/in/karim-tazi',
    },
    {
      id: 4,
      name: 'Nour El Houda',
      school: 'ENSA',
      level: '2ème année',
      skills: ['UI/UX', 'Figma', 'JavaScript'],
      match: 85,
      selected: false,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nour',
      linkedin: 'https://linkedin.com/in/nour-el-houda',
    },
    {
      id: 5,
      name: 'Omar Kabbaj',
      school: 'UIR',
      level: 'Master 2',
      skills: ['Full Stack', 'Node.js', 'MongoDB'],
      match: 82,
      selected: false,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      linkedin: 'https://linkedin.com/in/omar-kabbaj',
    },
    {
      id: 6,
      name: 'Fatima Zahra',
      school: 'ENCG',
      level: '3ème année',
      skills: ['Marketing', 'SEO', 'Analytics'],
      match: 79,
      selected: false,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      linkedin: 'https://linkedin.com/in/fatima-zahra',
    },
  ]

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    if (savedData.selectedInterns && savedData.selectedInterns.length > 0) {
      setSelectedInterns(savedData.selectedInterns)
    }
  }, [])

  const toggleIntern = (id) => {
    setSelectedInterns(selectedInterns.includes(id)
      ? selectedInterns.filter(internId => internId !== id)
      : [...selectedInterns, id]
    )
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_entreprise_onboarding_data') || '{}')
    localStorage.setItem('lynk_entreprise_onboarding_data', JSON.stringify({ ...existingData, selectedInterns }))
  }

  const handleStepClick = (stepNumber) => {
    const step = entrepriseSteps[stepNumber - 1]
    if (step) {
      handleNext()
      navigate(step.path)
    }
  }

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
          <Stepper steps={entrepriseSteps} currentStep={5} onStepClick={handleStepClick} />

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Voici des profils qui correspondent à votre offre
            </h1>
            <p className="text-slate-500 text-pretty">
              Sélectionnez ceux qui vous intéressent — ça nous aide à affiner nos recommandations.
            </p>
          </div>

          {/* Intern Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sampleInterns.map((intern) => (
              <div
                key={intern.id}
                className={`bg-cream-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedInterns.includes(intern.id)
                    ? 'border-brand-primary shadow-md'
                    : 'border-cream-white'
                }`}
                onClick={() => toggleIntern(intern.id)}
              >
                {/* Header with Photo */}
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={intern.photo}
                    alt={intern.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cream-white"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{intern.name}</h3>
                      <a
                        href={intern.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0077B5] hover:text-[#005885] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                      {intern.school}
                    </div>
                  </div>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      selectedInterns.includes(intern.id)
                        ? 'bg-brand-primary text-white'
                        : 'bg-cream-white text-cream-white hover:bg-cream-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleIntern(intern.id)
                    }}
                  >
                    <Heart className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Level */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
                    {intern.level}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {intern.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md bg-cream-white text-slate-600 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between pt-4 border-t border-cream-white">
                  <span className="text-sm text-slate-500">Score de compatibilité</span>
                  <span className="text-lg font-bold text-brand-primary">{intern.match}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Count */}
          {selectedInterns.length > 0 && (
            <div className="mb-8 p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/20">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-brand-primary">{selectedInterns.length}</span> stagiaire(s) sélectionné(s)
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Link
              to="/onboarding/entreprise/compensation"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Précédent
            </Link>
            <Link
              to="/onboarding/entreprise/auth"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors"
            >
              Continuer vers l'authentification
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingEntrepriseMatching
