import { Briefcase, Calendar, MapPin, DollarSign, Users, Plus, Edit, Trash2, Eye, MoreVertical, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function EntrepriseOffres() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const offres = [
    {
      id: 1,
      titre: 'Développeur Web Full Stack',
      projet: 'Création d\'une plateforme e-commerce',
      duree: '3 mois',
      lieu: 'Paris',
      prime: 800,
      candidatures: 24,
      entretiens: 8,
      statut: 'active',
      datePublication: '15/05/2026',
    },
    {
      id: 2,
      titre: 'Data Analyst Junior',
      projet: 'Analyse des données clients et reporting',
      duree: '6 mois',
      lieu: 'Télétravail',
      prime: 1200,
      candidatures: 18,
      entretiens: 5,
      statut: 'active',
      datePublication: '10/05/2026',
    },
    {
      id: 3,
      titre: 'UX Designer',
      projet: 'Refonte de l\'application mobile',
      duree: '4 mois',
      lieu: 'Lyon',
      prime: 600,
      candidatures: 15,
      entretiens: 3,
      statut: 'active',
      datePublication: '05/05/2026',
    },
    {
      id: 4,
      titre: 'Marketing Digital',
      projet: 'Campagne de lancement produit',
      duree: '3 mois',
      lieu: 'Paris',
      prime: 500,
      candidatures: 32,
      entretiens: 12,
      statut: 'closed',
      datePublication: '01/04/2026',
    },
    {
      id: 5,
      titre: 'DevOps Engineer',
      projet: 'Mise en place CI/CD',
      duree: '6 mois',
      lieu: 'Télétravail',
      prime: 1500,
      candidatures: 8,
      entretiens: 2,
      statut: 'draft',
      datePublication: '-',
    },
  ]

  const statutConfig = {
    active: {
      label: 'Active',
      class: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    closed: {
      label: 'Clôturée',
      class: 'bg-cream-white text-slate-600 border-cream-white',
    },
    draft: {
      label: 'Brouillon',
      class: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  }

  const filteredOffres = offres.filter((offre) => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.projet.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || offre.statut === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
            GESTION DES OFFRES
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Mes offres</h1>
          <p className="text-slate-500 text-pretty">Gérez vos offres de stage et suivez les candidatures.</p>
        </div>
        <Link
          to="/entreprise/publier"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-full transition-colors"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle offre
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-brand-primary" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{offres.length}</span>
          </div>
          <p className="text-sm text-slate-500">Total offres</p>
        </div>
        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{offres.filter(o => o.statut === 'active').length}</span>
          </div>
          <p className="text-sm text-slate-500">Actives</p>
        </div>
        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-brand-orange" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{offres.reduce((acc, o) => acc + o.candidatures, 0)}</span>
          </div>
          <p className="text-sm text-slate-500">Candidatures</p>
        </div>
        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{offres.reduce((acc, o) => acc + o.entretiens, 0)}</span>
          </div>
          <p className="text-sm text-slate-500">Entretiens</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-cream-white rounded-xl p-4 border border-cream-white shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-white" aria-hidden="true" />
            <input
              type="text"
              placeholder="Rechercher une offre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-brand-navy text-white' : 'bg-cream-white text-slate-600 hover:bg-cream-white'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'active' ? 'bg-brand-navy text-white' : 'bg-cream-white text-slate-600 hover:bg-cream-white'
              }`}
            >
              Actives
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'closed' ? 'bg-brand-navy text-white' : 'bg-cream-white text-slate-600 hover:bg-cream-white'
              }`}
            >
              Clôturées
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'draft' ? 'bg-brand-navy text-white' : 'bg-cream-white text-slate-600 hover:bg-cream-white'
              }`}
            >
              Brouillons
            </button>
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="bg-cream-white rounded-2xl border border-cream-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream border-b border-cream-white">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Offre</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Projet</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Détails</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Candidatures</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffres.map((offre) => {
                const config = statutConfig[offre.statut]
                return (
                  <tr key={offre.id} className="border-b border-cream-white hover:bg-cream transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{offre.titre}</p>
                      <p className="text-xs text-slate-500 mt-1">Publié le {offre.datePublication}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 text-sm">{offre.projet}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="h-3 w-3 text-cream-white" aria-hidden="true" />
                          {offre.duree}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="h-3 w-3 text-cream-white" aria-hidden="true" />
                          {offre.lieu}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <DollarSign className="h-3 w-3 text-cream-white" aria-hidden="true" />
                          {offre.prime}€ prime
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{offre.candidatures}</p>
                          <p className="text-xs text-slate-500">candidatures</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{offre.entretiens}</p>
                          <p className="text-xs text-slate-500">entretiens</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-cream-white text-slate-600 transition-colors" aria-label="Voir">
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-cream-white text-slate-600 transition-colors" aria-label="Modifier">
                          <Edit className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors" aria-label="Supprimer">
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EntrepriseOffres
