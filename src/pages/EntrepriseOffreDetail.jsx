import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Copy, X, Calendar, MapPin, DollarSign, Briefcase, Users, Eye, Trash2 } from 'lucide-react'

function EntrepriseOffreDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock offer data - in production this would come from an API
  const offer = {
    id: parseInt(id),
    titre: 'Développeur Web Full Stack',
    description: 'Nous recherchons un développeur web full stack passionné pour rejoindre notre équipe. Vous travaillerez sur le développement de nos plateformes e-commerce et participerez à l\'amélioration continue de nos produits.',
    projet: 'Création d\'une plateforme e-commerce moderne avec React et Node.js',
    duree: '3 mois',
    dateDebut: '2026-07-01',
    lieu: 'Paris avec possibilité de télétravail',
    prime: 800,
    competences: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Git'],
    statut: 'active',
    datePublication: '15/05/2026',
    vues: 1247,
    candidatures: 24,
    entretiens: 8,
  }

  const candidatures = [
    {
      id: 1,
      nom: 'Marie Dupont',
      avatar: 'MD',
      score: 92,
      date: 'Hier',
      statut: 'new',
    },
    {
      id: 2,
      nom: 'Jean Martin',
      avatar: 'JM',
      score: 88,
      date: 'Hier',
      statut: 'new',
    },
    {
      id: 3,
      nom: 'Sophie Bernard',
      avatar: 'SB',
      score: 95,
      date: '2 jours',
      statut: 'reviewed',
    },
    {
      id: 4,
      nom: 'Ahmed Benali',
      avatar: 'AB',
      score: 85,
      date: '3 jours',
      statut: 'interview',
    },
  ]

  const statutConfig = {
    active: {
      label: 'Active',
      class: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    closed: {
      label: 'Clôturée',
      class: 'bg-cream-white text-slate-600 border-cream-border',
    },
    draft: {
      label: 'Brouillon',
      class: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  }

  const statusConfig = {
    new: { label: 'Nouveau', color: 'bg-brand-orange text-white' },
    reviewed: { label: 'Vu', color: 'bg-blue-100 text-blue-700' },
    interview: { label: 'Entretien', color: 'bg-purple-100 text-purple-700' },
    accepted: { label: 'Accepté', color: 'bg-emerald-100 text-emerald-700' },
    rejected: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
  }

  const handleCloseOffer = () => {
    // In production, this would update the backend
    console.log(`Closing offer ${id}`)
    navigate('/entreprise/offres')
  }

  const handleDuplicate = () => {
    // In production, this would duplicate the offer
    console.log(`Duplicating offer ${id}`)
    navigate('/entreprise/publier')
  }

  const handleEdit = () => {
    navigate(`/entreprise/publier?edit=${id}`)
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link
          to="/entreprise/offres"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour aux offres
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
              DÉTAIL DE L'OFFRE
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">{offer.titre}</h1>
            <p className="text-slate-500">Publié le {offer.datePublication}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-cream hover:bg-cream-white border border-cream-border rounded-lg text-sm font-medium text-slate-700 transition-colors"
            >
              <Edit className="h-4 w-4" aria-hidden="true" />
              Modifier
            </button>
            <button
              onClick={handleDuplicate}
              className="flex items-center gap-2 px-4 py-2 bg-cream hover:bg-cream-white border border-cream-border rounded-lg text-sm font-medium text-slate-700 transition-colors"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              Dupliquer
            </button>
            {offer.statut === 'active' && (
              <button
                onClick={handleCloseOffer}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium text-red-700 transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clôturer
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Offer Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-cream-white rounded-2xl p-6 border border-cream-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-brand-primary" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Informations de l'offre</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Description du poste</h3>
                <p className="text-slate-600">{offer.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-slate-900 mb-2">Description du projet</h3>
                <p className="text-slate-600">{offer.projet}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4 text-cream-white" aria-hidden="true" />
                  <span>Durée: {offer.duree}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4 text-cream-white" aria-hidden="true" />
                  <span>{offer.lieu}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="h-4 w-4 text-cream-white" aria-hidden="true" />
                  <span>Prime: {offer.prime}€</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Eye className="h-4 w-4 text-cream-white" aria-hidden="true" />
                  <span>{offer.vues} vues</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-900 mb-2">Compétences requises</h3>
                <div className="flex flex-wrap gap-2">
                  {offer.competences.map((comp) => (
                    <span key={comp} className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Statut:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statutConfig[offer.statut].class}`}>
                  {statutConfig[offer.statut].label}
                </span>
              </div>
            </div>
          </div>

          {/* Candidatures */}
          <div className="bg-cream-white rounded-2xl p-6 border border-cream-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Candidatures ({candidatures.length})</h2>
              </div>
              <Link
                to={`/entreprise/candidatures?offre=${offer.id}`}
                className="text-sm font-medium text-brand-orange hover:text-brand-orange-dark"
              >
                Voir tout
              </Link>
            </div>

            <div className="space-y-3">
              {candidatures.map((cand) => (
                <div
                  key={cand.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-cream-border hover:bg-cream transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-semibold">
                      {cand.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{cand.nom}</p>
                      <p className="text-xs text-slate-500">{cand.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm font-semibold text-brand-primary">{cand.score}%</span>
                      <p className="text-xs text-slate-500">score</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[cand.statut].color}`}>
                      {statusConfig[cand.statut].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-cream-white rounded-2xl p-6 border border-cream-border shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Vues</span>
                <span className="font-semibold text-slate-900">{offer.vues}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Candidatures</span>
                <span className="font-semibold text-slate-900">{offer.candidatures}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Entretiens</span>
                <span className="font-semibold text-slate-900">{offer.entretiens}</span>
              </div>
              <div className="pt-4 border-t border-cream-border">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Taux de conversion</span>
                  <span className="font-semibold text-brand-primary">
                    {Math.round((offer.entretiens / offer.candidatures) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <Link
                to={`/entreprise/candidatures?offre=${offer.id}`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                Gérer les candidatures
              </Link>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors w-full text-left"
              >
                <Edit className="h-4 w-4" aria-hidden="true" />
                Modifier l'offre
              </button>
              <button
                onClick={handleDuplicate}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors w-full text-left"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                Dupliquer l'offre
              </button>
              {offer.statut === 'active' && (
                <button
                  onClick={handleCloseOffer}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors w-full text-left"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Clôturer l'offre
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntrepriseOffreDetail
