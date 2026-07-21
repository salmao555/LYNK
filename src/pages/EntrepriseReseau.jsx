import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MessageCircle, UserPlus, X, Eye, Edit2, Trash2, GraduationCap, MapPin } from 'lucide-react'

function EntrepriseReseau() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [noteText, setNoteText] = useState('')

  const network = [
    {
      id: 1,
      nom: 'Ahmed Benali',
      avatar: 'AB',
      ecole: 'ENSA Marrakech',
      niveau: '5ème année',
      ville: 'Marrakech',
      competences: ['React', 'Node.js', 'MongoDB'],
      note: 'Bon profil, recontacter l\'été prochain',
      dateAjout: '15/05/2026',
      source: 'Candidatures',
    },
    {
      id: 2,
      nom: 'Fatima Zahra',
      avatar: 'FZ',
      ecole: 'EMI Casablanca',
      niveau: '4ème année',
      ville: 'Casablanca',
      competences: ['Python', 'Machine Learning', 'SQL'],
      note: 'Profil très intéressant pour projets data',
      dateAjout: '10/05/2026',
      source: 'Matches',
    },
    {
      id: 3,
      nom: 'Karim El Fassi',
      avatar: 'KE',
      ecole: 'ENSA Tanger',
      niveau: '5ème année',
      ville: 'Tanger',
      competences: ['JavaScript', 'TypeScript', 'React'],
      note: '',
      dateAjout: '08/05/2026',
      source: 'Candidatures',
    },
    {
      id: 4,
      nom: 'Sarah Benjelloun',
      avatar: 'SB',
      ecole: 'ESAV Casablanca',
      niveau: '4ème année',
      ville: 'Casablanca',
      competences: ['Figma', 'Adobe XD', 'Prototyping'],
      note: 'Designer talentueuse, garder pour futurs projets',
      dateAjout: '05/05/2026',
      source: 'Matches',
    },
  ]

  const filteredNetwork = network.filter((profile) => {
    return profile.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
           profile.ecole.toLowerCase().includes(searchTerm.toLowerCase()) ||
           profile.competences.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const handleUpdateNote = (profileId) => {
    // In production, this would update the backend
    console.log(`Updating note for profile ${profileId}: ${noteText}`)
    setEditingNote(null)
    setNoteText('')
  }

  const handleRemove = (profileId) => {
    // In production, this would remove from network
    console.log(`Removing profile ${profileId} from network`)
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
            VIVIER
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Mon Réseau</h1>
          <p className="text-slate-500 text-pretty">Gérez vos profils sauvegardés depuis les candidatures et les matches.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-cream-white rounded-xl p-4 border border-cream-border shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-white" aria-hidden="true" />
          <input
            type="text"
            placeholder="Rechercher dans votre réseau..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm"
          />
        </div>
      </div>

      {/* Network List */}
      {filteredNetwork.length === 0 ? (
        <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-12 text-center">
          <UserPlus className="h-12 w-12 text-cream-white mx-auto mb-4" aria-hidden="true" />
          <p className="text-slate-600">Aucun profil dans votre réseau</p>
          <p className="text-sm text-slate-500 mt-2">Ajoutez des profils depuis les candidatures ou les matches</p>
        </div>
      ) : (
        <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm overflow-hidden">
          <div className="divide-y divide-cream-border">
            {filteredNetwork.map((profile) => (
              <div key={profile.id} className="p-6 hover:bg-cream transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-semibold text-lg flex-shrink-0">
                    {profile.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{profile.nom}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">
                        {profile.source}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" aria-hidden="true" />
                        {profile.ecole}
                      </span>
                      <span>•</span>
                      <span>{profile.niveau}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {profile.ville}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {profile.competences.map((comp) => (
                        <span key={comp} className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
                          {comp}
                        </span>
                      ))}
                    </div>
                    
                    {/* Note section */}
                    {editingNote === profile.id ? (
                      <div className="mb-3">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Ajoutez une note privée..."
                          className="w-full px-3 py-2 rounded-lg border border-cream-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange resize-none"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleUpdateNote(profile.id)}
                            className="px-3 py-1 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            Sauvegarder
                          </button>
                          <button
                            onClick={() => {
                              setEditingNote(null)
                              setNoteText('')
                            }}
                            className="px-3 py-1 bg-cream hover:bg-cream-white text-slate-600 text-xs font-medium rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3">
                        {profile.note ? (
                          <div className="p-2 bg-cream rounded-lg text-sm text-slate-600">
                            <span className="font-medium text-slate-700">Note:</span> {profile.note}
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingNote(profile.id)
                              setNoteText(profile.note || '')
                            }}
                            className="text-xs text-brand-primary hover:text-brand-primary-dark"
                          >
                            + Ajouter une note
                          </button>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Ajouté le {profile.dateAjout}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedCandidate(profile)}
                          className="p-2 rounded-lg hover:bg-cream-white text-slate-600 hover:text-brand-primary transition-colors"
                          title="Voir profil"
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingNote(profile.id)
                            setNoteText(profile.note || '')
                          }}
                          className="p-2 rounded-lg hover:bg-cream-white text-slate-600 hover:text-brand-primary transition-colors"
                          title="Modifier la note"
                        >
                          <Edit2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-2 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                          title="Message"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleRemove(profile.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                          title="Retirer du réseau"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Detail Modal */}
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
                  {selectedCandidate.avatar}
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

              {selectedCandidate.note && (
                <div className="mb-6 p-4 bg-cream rounded-xl">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Votre note</h4>
                  <p className="text-slate-600">{selectedCandidate.note}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-cream-border">
                <button
                  onClick={() => {}}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Message
                </button>
                <button
                  onClick={() => {
                    setEditingNote(selectedCandidate.id)
                    setNoteText(selectedCandidate.note || '')
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" aria-hidden="true" />
                  Modifier la note
                </button>
                <button
                  onClick={() => handleRemove(selectedCandidate.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Retirer du réseau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EntrepriseReseau
