import { Users, Search, Filter, Mail, Phone, MapPin, GraduationCap, Briefcase } from 'lucide-react'

function EtablissementEtudiants() {
  const etudiants = [
    {
      id: 1,
      nom: 'Marie Dupont',
      email: 'marie.dupont@email.com',
      telephone: '06 12 34 56 78',
      filiere: 'Informatique',
      annee: '3ème année',
      statut: 'en_recherche',
      entreprisesContactees: 5,
      entretiens: 2,
    },
    {
      id: 2,
      nom: 'Jean Martin',
      email: 'jean.martin@email.com',
      telephone: '06 23 45 67 89',
      filiere: 'Marketing',
      annee: '3ème année',
      statut: 'stage_trouve',
      entreprise: 'Innovation Labs',
    },
    {
      id: 3,
      nom: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      telephone: '06 34 56 78 90',
      filiere: 'Design',
      annee: '2ème année',
      statut: 'en_recherche',
      entreprisesContactees: 3,
      entretiens: 1,
    },
    {
      id: 4,
      nom: 'Pierre Leroy',
      email: 'pierre.leroy@email.com',
      telephone: '06 45 67 89 01',
      filiere: 'Data Science',
      annee: '3ème année',
      statut: 'en_recherche',
      entreprisesContactees: 8,
      entretiens: 4,
    },
    {
      id: 5,
      nom: 'Claire Moreau',
      email: 'claire.moreau@email.com',
      telephone: '06 56 78 90 12',
      filiere: 'Communication',
      annee: '3ème année',
      statut: 'stage_trouve',
      entreprise: 'Digital Agency',
    },
  ]

  const statutConfig = {
    en_recherche: {
      label: 'En recherche',
      class: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    stage_trouve: {
      label: 'Stage trouvé',
      class: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
          SUIVI DES ÉTUDIANTS
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Étudiants</h1>
        <p className="text-slate-500 text-pretty">Suivez la progression de recherche de stage de vos étudiants.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-cream-white rounded-xl p-6 border border-cream-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-brand-primary" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">156</span>
          </div>
          <p className="text-sm text-slate-500">Total étudiants</p>
        </div>
        <div className="bg-cream-white rounded-xl p-6 border border-cream-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Search className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">89</span>
          </div>
          <p className="text-sm text-slate-500">En recherche</p>
        </div>
        <div className="bg-cream-white rounded-xl p-6 border border-cream-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">67</span>
          </div>
          <p className="text-sm text-slate-500">Stage trouvé</p>
        </div>
        <div className="bg-cream-white rounded-xl p-6 border border-cream-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-brand-orange" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">43%</span>
          </div>
          <p className="text-sm text-slate-500">Taux de placement</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-cream-white rounded-xl p-4 border border-cream-border shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-white" aria-hidden="true" />
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm bg-cream-white">
            <option value="">Toutes les filières</option>
            <option value="informatique">Informatique</option>
            <option value="marketing">Marketing</option>
            <option value="design">Design</option>
            <option value="data">Data Science</option>
          </select>
          <select className="px-4 py-2 rounded-lg border border-cream-border focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm bg-cream-white">
            <option value="">Tous les statuts</option>
            <option value="en_recherche">En recherche</option>
            <option value="stage_trouve">Stage trouvé</option>
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream border-b border-cream-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Étudiant</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Filière</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Progression</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etudiant) => {
                const config = statutConfig[etudiant.statut]
                return (
                  <tr key={etudiant.id} className="border-b border-cream-border hover:bg-cream transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{etudiant.nom}</p>
                      <p className="text-sm text-slate-500">{etudiant.annee}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-3 w-3 text-cream-white" aria-hidden="true" />
                          {etudiant.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-3 w-3 text-cream-white" aria-hidden="true" />
                          {etudiant.telephone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600">{etudiant.filiere}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}>
                        {config.label}
                      </span>
                      {etudiant.entreprise && (
                        <p className="text-xs text-slate-500 mt-1">{etudiant.entreprise}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {etudiant.statut === 'en_recherche' ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Briefcase className="h-3 w-3 text-cream-white" aria-hidden="true" />
                            {etudiant.entreprisesContactees} entreprises contactées
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users className="h-3 w-3 text-cream-white" aria-hidden="true" />
                            {etudiant.entretiens} entretiens
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-emerald-600 font-medium">Convention validée</p>
                      )}
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

export default EtablissementEtudiants
