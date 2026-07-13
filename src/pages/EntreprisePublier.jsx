import { useState } from 'react'
import { Briefcase, MapPin, Calendar, DollarSign, Building2, Plus, X, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function EntreprisePublier() {
  const navigate = useNavigate()
  const [competences, setCompetences] = useState([''])
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    projet: '',
    prime: '',
    duree: '',
    dateDebut: '',
    lieu: '',
    competencesRequises: '',
  })

  const addCompetence = () => {
    setCompetences([...competences, ''])
  }

  const removeCompetence = (index) => {
    setCompetences(competences.filter((_, i) => i !== index))
  }

  const updateCompetence = (index, value) => {
    const newCompetences = [...competences]
    newCompetences[index] = value
    setCompetences(newCompetences)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log({ ...formData, competences })
    navigate('/entreprise')
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
          PUBLICATION
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Publier une offre de stage</h1>
        <p className="text-slate-500 text-pretty">Créez une offre de stage et recevez des candidatures qualifiées.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-brand-navy" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Informations générales</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Titre du poste *
                  </label>
                  <input
                    type="text"
                    value={formData.titre}
                    onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    placeholder="Ex: Développeur Web Full Stack"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description du poste *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez les missions et responsabilités du stagiaire..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description du projet *
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.projet}
                      onChange={(e) => setFormData({ ...formData, projet: e.target.value })}
                      placeholder="Décrivez le projet spécifique sur lequel le stagiaire travaillera..."
                      rows={3}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none pr-10"
                    />
                    <div className="absolute right-3 top-3">
                      <Info className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Le stagiaire recevra une prime pour la réalisation de ce projet.
                  </p>
                </div>
              </div>
            </div>

            {/* Détails du stage */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Détails du stage</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Durée *
                  </label>
                  <select
                    value={formData.duree}
                    onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all bg-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="2 mois">2 mois</option>
                    <option value="3 mois">3 mois</option>
                    <option value="4 mois">4 mois</option>
                    <option value="6 mois">6 mois</option>
                    <option value="1 an">1 an</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date de début souhaitée *
                  </label>
                  <input
                    type="date"
                    value={formData.dateDebut}
                    onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lieu *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <input
                      type="text"
                      value={formData.lieu}
                      onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                      placeholder="Ex: Paris, Télétravail possible"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Prime du projet (€) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <input
                      type="number"
                      value={formData.prime}
                      onChange={(e) => setFormData({ ...formData, prime: e.target.value })}
                      placeholder="Ex: 800"
                      required
                      min="0"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Montant versé au stagiaire à la fin du projet
                  </p>
                </div>
              </div>
            </div>

            {/* Compétences */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Compétences requises</h2>
              </div>

              <div className="space-y-3">
                {competences.map((comp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={comp}
                      onChange={(e) => updateCompetence(index, e.target.value)}
                      placeholder="Ex: React, Python, Communication..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                    {competences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCompetence(index)}
                        className="p-3 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-400 hover:text-red-600 transition-colors"
                        aria-label="Supprimer"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCompetence}
                  className="flex items-center gap-2 text-sm font-medium text-brand-orange hover:text-brand-orange-dark transition-colors"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Ajouter une compétence
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-brand-navy rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Conseils pour attirer les meilleurs profils</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange">•</span>
                  Soyez précis sur le projet et les livrables attendus
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange">•</span>
                  Mentionnez les technologies ou outils utilisés
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange">•</span>
                  Décrivez l'équipe et l'environnement de travail
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange">•</span>
                  Une prime attractive augmente la qualité des candidatures
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Résumé</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Prime du projet</span>
                  <span className="font-medium text-slate-900">{formData.prime || '0'}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Durée</span>
                  <span className="font-medium text-slate-900">{formData.duree || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Compétences</span>
                  <span className="font-medium text-slate-900">{competences.filter(c => c).length}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors"
            >
              Publier l'offre
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EntreprisePublier
