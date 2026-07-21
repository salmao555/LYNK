import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, User, Calendar, Mail, MessageCircle, X, Check, Clock, XCircle, UserPlus, Eye } from 'lucide-react'

function EntrepriseCandidatures() {
  const [searchParams] = useSearchParams()
  const offreFilter = searchParams.get('offre')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOffer, setSelectedOffer] = useState(offreFilter || 'all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const offers = [
    { id: 1, titre: 'Développeur Web Full Stack' },
    { id: 2, titre: 'Data Analyst Junior' },
    { id: 3, titre: 'UX Designer' },
  ]

  const candidatures = [
    {
      id: 1,
      nom: 'Marie Dupont',
      avatar: 'MD',
      offre: 'Développeur Web Full Stack',
      offreId: 1,
      score: 92,
      date: 'Hier',
      statut: 'new',
      email: 'marie.dupont@email.com',
      ecole: 'ENSA Marrakech',
      niveau: '5ème année',
      competences: ['React', 'Node.js', 'MongoDB'],
      experiences: ['Stage développeur chez TechCorp - 3 mois'],
      projets: ['Application e-commerce en React', 'API REST avec Node.js'],
    },
    {
      id: 2,
      nom: 'Jean Martin',
      avatar: 'JM',
      offre: 'Data Analyst Junior',
      offreId: 2,
      score: 88,
      date: 'Hier',
      statut: 'new',
      email: 'jean.martin@email.com',
      ecole: 'EMI Casablanca',
      niveau: '4ème année',
      competences: ['Python', 'Machine Learning', 'SQL'],
      experiences: ['Stage data analyst chez DataMaroc - 2 mois'],
      projets: ['Dashboard analytics avec Tableau', 'Modèle prédiction ventes'],
    },
    {
      id: 3,
      nom: 'Sophie Bernard',
      avatar: 'SB',
      offre: 'UX Designer',
      offreId: 3,
      score: 95,
      date: '2 jours',
      statut: 'reviewed',
      email: 'sophie.bernard@email.com',
      ecole: 'ESAV Casablanca',
      niveau: '5ème année',
      competences: ['Figma', 'Adobe XD', 'User Research'],
      experiences: ['Stage UX designer chez DesignStudio - 4 mois'],
      projets: ['Redesign app mobile bancaire', 'Research étude utilisateurs'],
    },
    {
      id: 4,
      nom: 'Ahmed Benali',
      avatar: 'AB',
      offre: 'Développeur Web Full Stack',
      offreId: 1,
      score: 85,
      date: '3 jours',
      statut: 'interview',
      email: 'ahmed.benali@email.com',
      ecole: 'ENSA Tanger',
      niveau: '4ème année',
      competences: ['JavaScript', 'React', 'Express'],
      experiences: ['Freelance développeur web - 6 mois'],
      projets: ['Site vitrine entreprise', 'Application gestion stocks'],
    },
  ]

  const statusConfig = {
    all: { label: 'Tous', icon: Filter },
    new: { label: 'Nouveau', icon: Clock, color: 'bg-brand-orange text-white' },
    reviewed: { label: 'Vu', icon: Eye, color: 'bg-blue-100 text-blue-700' },
    interview: { label: 'Entretien', icon: Calendar, color: 'bg-purple-100 text-purple-700' },
    accepted: { label: 'Accepté', icon: Check, color: 'bg-emerald-100 text-emerald-700' },
    rejected: { label: 'Refusé', icon: XCircle, color: 'bg-red-100 text-red-700' },
  }

  const filteredCandidatures = candidatures.filter((cand) => {
    const matchesSearch = cand.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cand.offre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cand.statut === statusFilter
    const matchesOffer = selectedOffer === 'all' || cand.offreId === parseInt(selectedOffer)
    return matchesSearch && matchesStatus && matchesOffer
  })

  const handleStatusChange = (candidateId, newStatus) => {
    // In production, this would update the backend
    console.log(`Updating candidate ${candidateId} to status ${newStatus}`)
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
            CANDIDATURES
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Candidatures reçues</h1>
          <p className="text-slate-500 text-pretty">Gérez toutes les candidatures reçues sur vos offres.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-cream-white rounded-xl p-4 border border-cream-border shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-white" aria-hidden="true" />
            <input
              type="text"
              placeholder="Rechercher un candidat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedOffer}
              onChange={(e) => setSelectedOffer(e.target.value)}
              className="px-4 py-2 rounded-lg border border-cream-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
            >
              <option value="all">Toutes les offres</option>
              {offers.map((offer) => (
                <option key={offer.id} value={offer.id}>{offer.titre}</option>
              ))}
            </select>
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  statusFilter === key ? 'bg-brand-navy text-white' : 'bg-cream-white text-slate-600 hover:bg-cream-white'
                }`}
              >
                {config.icon && <config.icon className="h-4 w-4" aria-hidden="true" />}
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm overflow-hidden">
        {filteredCandidatures.length === 0 ? (
          <div className="p-12 text-center">
            <User className="h-12 w-12 text-cream-white mx-auto mb-4" aria-hidden="true" />
            <p className="text-slate-600">Aucune candidature trouvée</p>
          </div>
        ) : (
          <div className="divide-y divide-cream-border">
            {filteredCandidatures.map((cand) => (
              <div
                key={cand.id}
                className="p-6 hover:bg-cream transition-colors cursor-pointer"
                onClick={() => setSelectedCandidate(cand)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-semibold">
                    {cand.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-slate-900">{cand.nom}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[cand.statut].color}`}>
                        {statusConfig[cand.statut].label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{cand.offre}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                      <span>{cand.ecole}</span>
                      <span>•</span>
                      <span>{cand.niveau}</span>
                      <span>•</span>
                      <span>{cand.date}</span>
                      <span>•</span>
                      <span className="font-medium text-brand-primary">{cand.score}% compatibilité</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(cand.id, 'accepted')
                      }}
                      className="p-2 rounded-lg hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors"
                      title="Accepter"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(cand.id, 'rejected')
                      }}
                      className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                      title="Refuser"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(cand.id, 'interview')
                      }}
                      className="p-2 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors"
                      title="Demander entretien"
                    >
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="p-2 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      title="Message"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="p-2 rounded-lg hover:bg-brand-primary/10 text-slate-600 hover:text-brand-primary transition-colors"
                      title="Ajouter au réseau"
                    >
                      <UserPlus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Candidate Detail Panel */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-cream-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cream-border flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Profil du candidat</h2>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-lg hover:bg-cream transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xl">
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{selectedCandidate.nom}</h3>
                  <p className="text-slate-600">{selectedCandidate.ecole} • {selectedCandidate.niveau}</p>
                  <p className="text-sm text-slate-500">{selectedCandidate.email}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Score de compatibilité</span>
                  <span className="text-lg font-bold text-brand-primary">{selectedCandidate.score}%</span>
                </div>
                <div className="w-full bg-cream rounded-full h-2">
                  <div
                    className="bg-brand-primary h-2 rounded-full transition-all"
                    style={{ width: `${selectedCandidate.score}%` }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Compétences</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.competences.map((comp) => (
                    <span key={comp} className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Expériences</h4>
                <ul className="space-y-2">
                  {selectedCandidate.experiences.map((exp, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-brand-primary mt-1">•</span>
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Projets</h4>
                <ul className="space-y-2">
                  {selectedCandidate.projets.map((proj, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-brand-primary mt-1">•</span>
                      {proj}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4 border-t border-cream-border">
                <button
                  onClick={() => handleStatusChange(selectedCandidate.id, 'accepted')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Accepter
                </button>
                <button
                  onClick={() => handleStatusChange(selectedCandidate.id, 'interview')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Entretien
                </button>
                <button
                  onClick={() => handleStatusChange(selectedCandidate.id, 'rejected')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EntrepriseCandidatures
