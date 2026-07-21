import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, DollarSign, Bookmark, Building2, Users, Calendar, Check } from 'lucide-react'

function EtudiantOffreDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  // Mock offer data
  const offre = {
    id: parseInt(id),
    entreprise: 'Attijariwafa Bank',
    logo: '🏦',
    titre: 'Stage Data Analyst',
    secteur: 'Finance',
    compatibilite: 85,
    lieu: 'Casablanca',
    duree: '6 mois',
    mode: 'Présentiel',
    salaire: '4000 DH/mois',
    tags: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'],
    description: `Vous rejoindrez notre équipe Data Analytics pour travailler sur des projets concrets d'analyse de données et de modélisation statistique. Vous serez amené à collaborer avec différentes équipes métier pour comprendre leurs besoins et transformer les données en insights actionnables.

Vos missions principales :
- Collecter et nettoyer les données provenant de diverses sources
- Développer des modèles d'analyse et de prédiction
- Créer des dashboards et visualisations pour la direction
- Participer à l'amélioration continue de nos processus data

Ce stage est une excellente opportunité pour acquérir une expérience pratique dans un environnement bancaire de premier plan.`,
    entrepriseDetails: {
      secteur: 'Banque et Finance',
      effectifs: '10 000+',
      fondation: '1903',
      siege: 'Casablanca, Maroc',
      description: 'Attijariwafa Bank est la première banque du Maroc, leader dans les services financiers et bancaires. Nous nous engageons à offrir des solutions innovantes à nos clients et à contribuer au développement économique du pays.'
    }
  }

  const toggleBookmark = (e) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleApply = () => {
    // Simulate application
    setHasApplied(true)
    // Navigate to candidatures after a short delay
    setTimeout(() => {
      navigate('/etudiant/candidatures')
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream-white px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/offres"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux offres
        </Link>

        {/* Header */}
        <div className="bg-cream-white rounded-2xl border border-cream-border p-8 mb-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-cream flex items-center justify-center text-4xl">
              {offre.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">{offre.titre}</h1>
                  <p className="text-slate-600">{offre.entreprise} · {offre.secteur}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 px-4 py-2 bg-brand-primary/10 rounded-full">
                    <span className="text-lg font-bold text-brand-primary">{offre.compatibilite}%</span>
                    <span className="text-sm text-brand-primary">compatible</span>
                  </div>
                  <button
                    onClick={toggleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked ? 'text-brand-primary bg-brand-primary/10' : 'text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10'
                    }`}
                    title={isBookmarked ? "Retirer des sauvegardés" : "Sauvegarder"}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {offre.tags.map((tag) => (
                  <span key={tag} className="text-sm px-3 py-1 rounded-full bg-cream text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-cream-border">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4" />
              {offre.lieu}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="h-4 w-4" />
              {offre.duree}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="px-2 py-1 rounded-full bg-cream">{offre.mode}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <DollarSign className="h-4 w-4" />
              {offre.salaire}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mb-6">
          {!hasApplied ? (
            <button
              onClick={handleApply}
              className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold rounded-2xl transition-colors"
            >
              Postuler en 1 clic
            </button>
          ) : (
            <button
              disabled
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="h-5 w-5" />
              Candidature envoyée ✓
            </button>
          )}
          {!hasApplied && (
            <p className="text-center text-sm text-slate-500 mt-2">
              Votre profil sera directement transmis aux recruteurs de {offre.entreprise}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="bg-cream-white rounded-2xl border border-cream-border p-8 mb-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Description du stage</h2>
          <div className="text-slate-600 whitespace-pre-line leading-relaxed">
            {offre.description}
          </div>
        </div>

        {/* About Company */}
        <div className="bg-cream-white rounded-2xl border border-cream-border p-8">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">À propos de {offre.entreprise}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-cream rounded-xl">
              <Building2 className="h-5 w-5 text-brand-primary mb-2" />
              <p className="text-xs text-slate-500 mb-1">Secteur</p>
              <p className="text-sm font-medium text-slate-900">{offre.entrepriseDetails.secteur}</p>
            </div>
            <div className="p-4 bg-cream rounded-xl">
              <Users className="h-5 w-5 text-brand-primary mb-2" />
              <p className="text-xs text-slate-500 mb-1">Effectifs</p>
              <p className="text-sm font-medium text-slate-900">{offre.entrepriseDetails.effectifs}</p>
            </div>
            <div className="p-4 bg-cream rounded-xl">
              <Calendar className="h-5 w-5 text-brand-primary mb-2" />
              <p className="text-xs text-slate-500 mb-1">Fondation</p>
              <p className="text-sm font-medium text-slate-900">{offre.entrepriseDetails.fondation}</p>
            </div>
            <div className="p-4 bg-cream rounded-xl">
              <MapPin className="h-5 w-5 text-brand-primary mb-2" />
              <p className="text-xs text-slate-500 mb-1">Siège</p>
              <p className="text-sm font-medium text-slate-900">{offre.entrepriseDetails.siege}</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed">
            {offre.entrepriseDetails.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EtudiantOffreDetail
