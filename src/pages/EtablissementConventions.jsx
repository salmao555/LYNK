import { ClipboardList, CheckCircle, Clock, XCircle, FileText, Download } from 'lucide-react'

function EtablissementConventions() {
  const conventions = [
    {
      id: 1,
      etudiant: 'Marie Dupont',
      entreprise: 'TechCorp',
      titre: 'Développeur Web',
      dateDebut: '15/06/2026',
      dateFin: '15/09/2026',
      statut: 'validé',
    },
    {
      id: 2,
      etudiant: 'Jean Martin',
      entreprise: 'Innovation Labs',
      titre: 'Data Analyst',
      dateDebut: '01/07/2026',
      dateFin: '01/10/2026',
      statut: 'en_attente',
    },
    {
      id: 3,
      etudiant: 'Sophie Bernard',
      entreprise: 'StartUp Vision',
      titre: 'UX Designer',
      dateDebut: '20/06/2026',
      dateFin: '20/09/2026',
      statut: 'refusé',
    },
    {
      id: 4,
      etudiant: 'Pierre Leroy',
      entreprise: 'Digital Agency',
      titre: 'Marketing Digital',
      dateDebut: '10/07/2026',
      dateFin: '10/10/2026',
      statut: 'en_attente',
    },
  ]

  const statutConfig = {
    validé: {
      icon: CheckCircle,
      label: 'Validé',
      class: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    en_attente: {
      icon: Clock,
      label: 'En attente',
      class: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    refusé: {
      icon: XCircle,
      label: 'Refusé',
      class: 'bg-red-50 text-red-600 border-red-200',
    },
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
          GESTION DES STAGES
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Conventions de stage</h1>
        <p className="text-slate-500 text-pretty">Validez et suivez les conventions de stage des étudiants.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">12</span>
          </div>
          <p className="text-sm text-slate-500">Conventions validées</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">5</span>
          </div>
          <p className="text-sm text-slate-500">En attente de validation</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-brand-navy" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">17</span>
          </div>
          <p className="text-sm text-slate-500">Total cette année</p>
        </div>
      </div>

      {/* Conventions List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Étudiant</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Entreprise</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Poste</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Dates</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conventions.map((conv) => {
                const config = statutConfig[conv.statut]
                const StatusIcon = config.icon
                return (
                  <tr key={conv.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{conv.etudiant}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600">{conv.entreprise}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600">{conv.titre}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {conv.dateDebut} - {conv.dateFin}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}>
                        <StatusIcon className="h-3 w-3" aria-hidden="true" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors" aria-label="Voir la convention">
                          <FileText className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors" aria-label="Télécharger">
                          <Download className="h-4 w-4" aria-hidden="true" />
                        </button>
                        {conv.statut === 'en_attente' && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors" aria-label="Valider">
                              <CheckCircle className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors" aria-label="Refuser">
                              <XCircle className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </>
                        )}
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

export default EtablissementConventions
