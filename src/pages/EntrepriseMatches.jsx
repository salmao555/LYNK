import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Sparkles, Calendar, MessageCircle, UserPlus, X, MapPin, GraduationCap } from 'lucide-react'

function EntrepriseMatches() {
  const [selectedOffer, setSelectedOffer] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const offers = [
    { id: 1, titre: 'Développeur Web Full Stack' },
    { id: 2, titre: 'Data Analyst Junior' },
    { id: 3, titre: 'UX Designer' },
  ]

  const matches = [
    {
      id: 1,
      nom: 'Ahmed Benali',
      photo: null,
      ecole: 'ENSA Marrakech',
      niveau: '5ème année',
      score: 95,
      competences: ['React', 'Node.js', 'MongoDB'],
      ville: 'Marrakech',
      disponibilite: 'Immédiate',
      offreCompatible: 'Développeur Web Full Stack',
    },
    {
      id: 2,
      nom: 'Fatima Zahra',
      photo: null,
      ecole: 'EMI Casablanca',
      niveau: '4ème année',
      score: 92,
      competences: ['Python', 'Machine Learning', 'SQL'],
      ville: 'Casablanca',
      disponibilite: 'À partir de juillet',
      offreCompatible: 'Data Analyst Junior',
    },
    {
      id: 3,
      nom: 'Karim El Fassi',
      photo: null,
      ecole: 'ENSA Tanger',
      niveau: '5ème année',
      score: 89,
      competences: ['JavaScript', 'TypeScript', 'React'],
      ville: 'Tanger',
      disponibilite: 'Immédiate',
      offreCompatible: 'Développeur Web Full Stack',
    },
    {
      id: 4,
      nom: 'Sarah Benjelloun',
      photo: null,
      ecole: 'ESAV Casablanca',
      niveau: '4ème année',
      score: 87,
      competences: ['Figma', 'Adobe XD', 'Prototyping'],
      ville: 'Casablanca',
      disponibilite: 'À partir de septembre',
      offreCompatible: 'UX Designer',
    },
    {
      id: 5,
      nom: 'Omar Tazi',
      photo: null,
      ecole: 'ENSA Agadir',
      niveau: '5ème année',
      score: 85,
      competences: ['Python', 'Django', 'PostgreSQL'],
      ville: 'Agadir',
      disponibilite: 'Immédiate',
      offreCompatible: 'Data Analyst Junior',
    },
    {
      id: 6,
      nom: 'Lina Mansouri',
      photo: null,
      ecole: 'INPT Rabat',
      niveau: '4ème année',
      score: 83,
      competences: ['Vue.js', 'Node.js', 'MongoDB'],
      ville: 'Rabat',
      disponibilite: 'À partir d\'août',
      offreCompatible: 'Développeur Web Full Stack',
    },
  ]

  const filteredMatches = matches.filter((match) => {
    const matchesSearch = match.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.ecole.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.competences.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesOffer = selectedOffer === 'all' || match.offreCompatible === offers.find(o => o.id === parseInt(selectedOffer))?.titre
    return matchesSearch && matchesOffer
  })

  const handleInvite = (candidateId, offerId) => {
    // In production, this would send an interview invitation
    console.log(`Inviting candidate ${candidateId} for offer ${offerId}`)
  }

  const handleSkip = (candidateId) => {
    // In production, this would hide the candidate from future suggestions
    console.log(`Skipping candidate ${candidateId}`)
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
            DÉCOUVERTE
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Mes Matches</h1>
          <p className="text-slate-500 text-pretty">Découvrez des profils compatibles suggérés par notre algorithme.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-cream-white rounded-xl p-4 border border-cream-border shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-white" aria-hidden="true" />
            <input
              type="text"
              placeholder="Rechercher par nom, école, compétence..."
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
          </div>
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-12 text-center">
          <Sparkles className="h-12 w-12 text-cream-white mx-auto mb-4" aria-hidden="true" />
          <p className="text-slate-600">Aucun match trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-6 hover:border-cream-border transition-all hover:shadow-md"
            >
              {/* Header with score */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-lg">
                    {match.nom.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{match.nom}</h3>
                    <p className="text-sm text-slate-600">{match.ecole}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-brand-primary">{match.score}%</span>
                  <span className="text-xs text-slate-500">match</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <GraduationCap className="h-4 w-4 text-cream-white" aria-hidden="true" />
                  {match.niveau}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-cream-white" aria-hidden="true" />
                  {match.ville}
                </div>
                <div className="text-sm text-slate-600">
                  <span className="text-slate-500">Disponible:</span> {match.disponibilite}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {match.competences.slice(0, 3).map((comp) => (
                    <span key={comp} className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatible offer */}
              <div className="mb-4 p-2 bg-brand-primary/5 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Compatible avec:</p>
                <p className="text-sm font-medium text-brand-primary">{match.offreCompatible}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCandidate(match)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Voir profil
                </button>
                <button
                  onClick={() => handleInvite(match.id, offers.find(o => o.titre === match.offreCompatible)?.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Inviter
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg bg-cream hover:bg-cream-white text-slate-600 hover:text-blue-600 transition-colors"
                  title="Message"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg bg-cream hover:bg-cream-white text-slate-600 hover:text-brand-primary transition-colors"
                  title="Ajouter au réseau"
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleSkip(match.id)}
                  className="p-2 rounded-lg bg-cream hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                  title="Passer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-cream-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cream-border flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Profil détaillé</h2>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-lg hover:bg-cream transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-2xl">
                  {selectedCandidate.nom.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">{selectedCandidate.nom}</h3>
                  <p className="text-slate-600">{selectedCandidate.ecole} • {selectedCandidate.niveau}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {selectedCandidate.ville}
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-brand-primary/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Score de compatibilité</span>
                  <span className="text-2xl font-bold text-brand-primary">{selectedCandidate.score}%</span>
                </div>
                <div className="w-full bg-cream rounded-full h-3">
                  <div
                    className="bg-brand-primary h-3 rounded-full transition-all"
                    style={{ width: `${selectedCandidate.score}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-2">Compatible avec: {selectedCandidate.offreCompatible}</p>
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
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Disponibilité</h4>
                <p className="text-slate-600">{selectedCandidate.disponibilite}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-cream-border">
                <button
                  onClick={() => handleInvite(selectedCandidate.id, offers.find(o => o.titre === selectedCandidate.offreCompatible)?.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Inviter à un entretien
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Message
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Ajouter au réseau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EntrepriseMatches
