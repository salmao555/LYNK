import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Heart, GraduationCap, MapPin, Building2 } from 'lucide-react'

function OnboardingEntrepriseMatching() {
  const [selectedInterns, setSelectedInterns] = useState([])

  const sampleInterns = [
    {
      id: 1,
      name: 'Youssef Amrani',
      school: 'ENSIAS',
      level: 'Master 2',
      skills: ['React', 'Python', 'Machine Learning'],
      match: 94,
      selected: false,
    },
    {
      id: 2,
      name: 'Sara Benjelloun',
      school: 'EMI',
      level: '3ème année',
      skills: ['Java', 'Spring', 'DevOps'],
      match: 91,
      selected: false,
    },
    {
      id: 3,
      name: 'Karim Tazi',
      school: 'UM6P',
      level: 'Master 1',
      skills: ['Data Science', 'SQL', 'Python'],
      match: 88,
      selected: false,
    },
    {
      id: 4,
      name: 'Nour El Houda',
      school: 'ENSA',
      level: '2ème année',
      skills: ['UI/UX', 'Figma', 'JavaScript'],
      match: 85,
      selected: false,
    },
    {
      id: 5,
      name: 'Omar Kabbaj',
      school: 'UIR',
      level: 'Master 2',
      skills: ['Full Stack', 'Node.js', 'MongoDB'],
      match: 82,
      selected: false,
    },
    {
      id: 6,
      name: 'Fatima Zahra',
      school: 'ENCG',
      level: '3ème année',
      skills: ['Marketing', 'SEO', 'Analytics'],
      match: 79,
      selected: false,
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
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
                className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedInterns.includes(intern.id)
                    ? 'border-brand-primary shadow-md'
                    : 'border-slate-200'
                }`}
                onClick={() => toggleIntern(intern.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{intern.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                      {intern.school}
                    </div>
                  </div>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      selectedInterns.includes(intern.id)
                        ? 'bg-brand-primary text-white'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
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
                      className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
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
