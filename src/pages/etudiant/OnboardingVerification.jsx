import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import OnboardingLayout from './OnboardingLayout'
import { useOnboarding } from '../../context/OnboardingContext'
import { useAuth } from '../../context/AuthContext'
import { emptyProfile } from '../../services/cvExtraction'

const inputClass =
  'w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none border border-cream-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all'

export default function OnboardingVerification() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { profile, setProfile, setPendingEmail, setSource } = useOnboarding()
  const { registerStudent } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    if (searchParams.get('manual') === '1') {
      setSource('manual')
      setProfile(emptyProfile())
    }
  }, [searchParams, setProfile, setSource])

  const update = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed || profile.skills.includes(trimmed)) return
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }))
    setSkillInput('')
  }

  const removeSkill = (skill) => {
    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const updateExperience = (index, field, value) => {
    setProfile((prev) => {
      const experience = [...prev.experience]
      experience[index] = { ...experience[index], [field]: value }
      return { ...prev, experience }
    })
  }

  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { titre: '', entreprise: '', periode: '', description: '' }],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!profile.email || !profile.prenom || !profile.nom) return

    setSubmitting(true)
    try {
      await registerStudent(profile)
      setPendingEmail(profile.email)
      navigate('/etudiant/onboarding/confirmation')
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <OnboardingLayout step={2}>
      <div className="bg-cream-white rounded-3xl border border-cream-white shadow-sm p-8 md:p-10">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
          Vérifiez que tout est correct
        </h1>
        <p className="text-slate-500 mb-8">
          Corrigez les informations extraites de votre CV si nécessaire.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-600 block mb-1.5">Prénom</label>
              <input
                required
                value={profile.prenom}
                onChange={(e) => update('prenom', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 block mb-1.5">Nom</label>
              <input
                required
                value={profile.nom}
                onChange={(e) => update('nom', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/5 p-4">
            <label className="text-sm font-medium text-brand-primary block mb-1.5">
              Email — On vous enverra un lien de connexion ici
            </label>
            <input
              required
              type="email"
              value={profile.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-1.5">Téléphone</label>
            <input
              value={profile.telephone}
              onChange={(e) => update('telephone', e.target.value)}
              className={inputClass}
              placeholder="+33 6 00 00 00 00"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-600 block mb-1.5">École / formation</label>
              <input
                value={profile.ecole}
                onChange={(e) => update('ecole', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 block mb-1.5">Niveau d'études</label>
              <input
                value={profile.niveau}
                onChange={(e) => update('niveau', e.target.value)}
                className={inputClass}
                placeholder="Master 2, Licence 3..."
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-1.5">Compétences</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-brand-primary-dark">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
                className={inputClass}
                placeholder="Ajouter une compétence"
              />
              <button
                type="button"
                onClick={addSkill}
                className="shrink-0 px-4 rounded-xl border border-cream-white hover:bg-cream text-slate-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-3">Expériences précédentes</label>
            <div className="space-y-4">
              {profile.experience.map((exp, i) => (
                <div key={i} className="rounded-xl border border-cream-white p-4 space-y-3">
                  <input
                    value={exp.titre}
                    onChange={(e) => updateExperience(i, 'titre', e.target.value)}
                    className={inputClass}
                    placeholder="Intitulé du poste"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={exp.entreprise}
                      onChange={(e) => updateExperience(i, 'entreprise', e.target.value)}
                      className={inputClass}
                      placeholder="Entreprise"
                    />
                    <input
                      value={exp.periode}
                      onChange={(e) => updateExperience(i, 'periode', e.target.value)}
                      className={inputClass}
                      placeholder="Période"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(i, 'description', e.target.value)}
                    className={`${inputClass} resize-none`}
                    rows={2}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addExperience}
              className="mt-3 text-sm text-brand-primary hover:text-brand-primary-dark font-medium flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Ajouter une expérience
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold transition-colors disabled:opacity-60"
          >
            {submitting ? 'Création du compte...' : 'Confirmer et créer mon compte'}
          </button>
        </form>
      </div>
    </OnboardingLayout>
  )
}
