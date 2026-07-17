import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, Trash2, X, FolderTree, Tag } from 'lucide-react'
import Stepper from '../../components/Stepper'

function OnboardingProjectsSkills() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([
    { id: 1, title: '', description: '', link: '' }
  ])
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')

  const studentSteps = [
    { label: 'CV', path: '/onboarding/cv-upload' },
    { label: 'Infos', path: '/onboarding/personal-info' },
    { label: 'Expériences', path: '/onboarding/experience' },
    { label: 'Projets', path: '/onboarding/projects-skills' },
    { label: 'Préférences', path: '/onboarding/preferences' },
    { label: 'Découverte', path: '/onboarding/matching-preview' },
    { label: 'Connexion', path: '/onboarding/auth' },
  ]

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    if (savedData.projects && savedData.projects.length > 0) {
      setProjects(savedData.projects)
    }
    if (savedData.skills && savedData.skills.length > 0) {
      setSkills(savedData.skills)
    }
  }, [])

  const addProject = () => {
    setProjects([...projects, { id: Date.now(), title: '', description: '', link: '' }])
  }

  const removeProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id))
  }

  const updateProject = (id, field, value) => {
    setProjects(projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  // Save data to localStorage when navigating away
  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
    localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, projects, skills }))
  }

  const handleStepClick = (stepNumber) => {
    const step = studentSteps[stepNumber - 1]
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
      <div className="bg-cream-white border-b border-cream-border px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <Stepper steps={studentSteps} currentStep={4} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Projets & Compétences</h1>
            <p className="text-slate-500 mb-8">Mettez en valeur vos projets et vos compétences techniques.</p>

            {/* Projects Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                Projets
              </h2>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id} className="border border-cream-border rounded-xl p-6 relative">
                    {projects.length > 1 && (
                      <button
                        onClick={() => removeProject(project.id)}
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-50 text-cream-white hover:text-red-600 transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Titre du projet</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        placeholder="Ex: Application e-commerce"
                        className="w-full px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        placeholder="Décrivez le projet, votre rôle et les technologies utilisées..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Lien (optionnel)</label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-3 rounded-xl border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addProject}
                  className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-cream-border rounded-xl text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Ajouter un projet
                </button>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                Compétences
              </h2>

              <div className="mb-4">
                <div className="flex gap-2">
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
                    className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-medium rounded-xl transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="p-1 rounded-full hover:bg-brand-primary/20 transition-colors"
                        aria-label="Supprimer"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/experience"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Link>
              <Link
                to="/onboarding/preferences"
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

export default OnboardingProjectsSkills
