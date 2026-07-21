import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, Clock, Calendar, FileText, Download, ChevronRight, Bookmark, CheckCircle, XCircle, AlertCircle, Edit3 } from 'lucide-react'

function EtudiantCandidatures() {
  const [activeTab, setActiveTab] = useState('sauvegardees')

  // Mock data for saved offers
  const savedOffers = [
    {
      id: 1,
      entreprise: 'Attijariwafa Bank',
      logo: '🏦',
      titre: 'Stage Data Analyst',
      secteur: 'Finance',
      compatibilite: 85,
      lieu: 'Casablanca',
      duree: '6 mois',
      mode: 'Présentiel',
      salaire: '4000 DH/mois',
      tags: ['Python', 'SQL', 'Machine Learning']
    },
    {
      id: 2,
      entreprise: 'Maroc Telecom',
      logo: '📡',
      titre: 'Stage Développement Web',
      secteur: 'Tech',
      compatibilite: 78,
      lieu: 'Rabat',
      duree: '3 mois',
      mode: 'Hybride',
      salaire: '3500 DH/mois',
      tags: ['React', 'Node.js', 'TypeScript']
    }
  ]

  // Mock data for active applications
  const activeApplications = [
    {
      id: 1,
      offre: {
        id: 101,
        entreprise: 'OCP Group',
        logo: '⚗️',
        titre: 'Stage Ingénieur Chimiste',
        secteur: 'Industrie'
      },
      statut: 'en_attente',
      dateCandidature: '2024-01-15',
      statutLabel: 'En attente',
      statutColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 2,
      offre: {
        id: 102,
        entreprise: 'Inwi',
        logo: '📱',
        titre: 'Stage Marketing Digital',
        secteur: 'Marketing'
      },
      statut: 'acceptee_fiche',
      dateCandidature: '2024-01-10',
      statutLabel: 'Acceptée — fiche à remplir',
      statutColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      offre: {
        id: 103,
        entreprise: 'BMCE Bank',
        logo: '🏛️',
        titre: 'Stage Finance',
        secteur: 'Finance'
      },
      statut: 'convention_signature',
      dateCandidature: '2024-01-05',
      statutLabel: 'Convention en signature',
      statutColor: 'bg-purple-100 text-purple-800',
      aSigne: true
    },
    {
      id: 4,
      offre: {
        id: 104,
        entreprise: 'Cosumar',
        logo: '🏭',
        titre: 'Stage Génie Industriel',
        secteur: 'Industrie'
      },
      statut: 'stage_confirme',
      dateCandidature: '2023-12-20',
      statutLabel: 'Stage confirmé',
      statutColor: 'bg-green-100 text-green-800'
    }
  ]

  // Mock data for history
  const historyApplications = [
    {
      id: 1,
      offre: {
        id: 201,
        entreprise: 'Technopolis',
        logo: '💻',
        titre: 'Stage IT Support',
        secteur: 'Tech'
      },
      statut: 'refusee',
      dateCandidature: '2023-11-15',
      statutLabel: 'Refusée',
      statutColor: 'bg-red-100 text-red-800'
    }
  ]

  const getActionButton = (application) => {
    switch (application.statut) {
      case 'acceptee_fiche':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-full text-sm font-medium hover:bg-brand-primary-dark transition-colors">
            <Edit3 className="h-4 w-4" />
            Remplir ma fiche de stage
          </button>
        )
      case 'convention_signature':
        if (application.aSigne) {
          return (
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-500 rounded-full text-sm font-medium cursor-not-allowed">
              <Clock className="h-4 w-4" />
              En attente des autres signatures
            </button>
          )
        }
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-full text-sm font-medium hover:bg-brand-primary-dark transition-colors">
            <FileText className="h-4 w-4" />
            Signer la convention
          </button>
        )
      case 'stage_confirme':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            Télécharger la convention
          </button>
        )
      default:
        return null
    }
  }

  const tabs = [
    { id: 'sauvegardees', label: 'Sauvegardées', count: savedOffers.length },
    { id: 'encours', label: 'En cours', count: activeApplications.length },
    { id: 'historique', label: 'Historique', count: historyApplications.length }
  ]

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream-white px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Mes candidatures</h1>
          <p className="text-slate-600">Suivez l'état de vos candidatures et gérez vos stages.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-cream-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-brand-primary'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-cream text-slate-600">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'sauvegardees' && (
          <div className="space-y-4">
            {savedOffers.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucune offre sauvegardée pour le moment.</p>
                <Link to="/offres" className="inline-block mt-4 text-brand-primary font-medium hover:underline">
                  Découvrir les offres
                </Link>
              </div>
            ) : (
              savedOffers.map((offre) => (
                <div
                  key={offre.id}
                  className="bg-cream-white rounded-2xl border border-cream-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-2xl">
                      {offre.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{offre.titre}</h3>
                          <p className="text-sm text-slate-500">{offre.entreprise} · {offre.secteur}</p>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-brand-primary/10 rounded-full">
                          <span className="text-sm font-semibold text-brand-primary">{offre.compatibilite}%</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {offre.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-cream text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {offre.lieu}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {offre.duree}
                        </span>
                        <span>{offre.mode}</span>
                        <span className="font-medium text-slate-900">{offre.salaire}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          to={`/offres/${offre.id}`}
                          className="text-sm font-medium text-brand-primary hover:underline flex items-center gap-1"
                        >
                          Voir le détail <ChevronRight className="h-4 w-4" />
                        </Link>
                        <button className="px-4 py-2 bg-brand-primary text-white rounded-full text-sm font-medium hover:bg-brand-primary-dark transition-colors">
                          Postuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'encours' && (
          <div className="space-y-4">
            {activeApplications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucune candidature en cours.</p>
              </div>
            ) : (
              activeApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-cream-white rounded-2xl border border-cream-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-2xl">
                      {application.offre.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{application.offre.titre}</h3>
                          <p className="text-sm text-slate-500">{application.offre.entreprise} · {application.offre.secteur}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.statutColor}`}>
                          {application.statutLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Candidature envoyée le {new Date(application.dateCandidature).toLocaleDateString('fr-FR')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          to={`/offres/${application.offre.id}`}
                          className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                        >
                          Voir l'offre <ChevronRight className="h-4 w-4" />
                        </Link>
                        {getActionButton(application)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'historique' && (
          <div className="space-y-4">
            {historyApplications.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucune candidature dans l'historique.</p>
              </div>
            ) : (
              historyApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-cream-white rounded-2xl border border-cream-border p-6 opacity-75"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-2xl">
                      {application.offre.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{application.offre.titre}</h3>
                          <p className="text-sm text-slate-500">{application.offre.entreprise} · {application.offre.secteur}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.statutColor}`}>
                          {application.statutLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Candidature envoyée le {new Date(application.dateCandidature).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EtudiantCandidatures
