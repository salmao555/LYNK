import { stats, pipeline, offres } from '../data/dashboardEntreprise'
import PipelineColumn from '../components/PipelineColumn'

function DashboardEntreprise() {
  const couleursBadges = ["bg-cream0", "bg-amber-500", "bg-teal-500", "bg-orange-500"]

  return (
    <div className="px-16 py-8">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord — Doctolib</h1>
          <p className="text-slate-500 text-sm">Bienvenue, Marie-Claire · Responsable RH</p>
        </div>
        <button className="bg-[#F2643B] hover:bg-[#E8492E] text-white font-medium px-5 py-2.5 rounded-full text-sm transition-colors">
          + Publier une offre
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-cream-white border border-cream-border rounded-2xl p-5">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg">{s.icone}</span>
              <span className="text-xs text-cream-white">{s.delta}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{s.valeur}</p>
            <p className="text-slate-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div className="bg-cream-white border border-cream-border rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Pipeline des candidatures</h2>

        <div className="grid grid-cols-4 gap-6">
          {Object.entries(pipeline).map(([titre, candidats], index) => (
            <PipelineColumn
              key={titre}
              titre={titre}
              candidats={candidats}
              couleurBadge={couleursBadges[index]}
            />
          ))}
        </div>
      </div>

      {/* Mes offres */}
      <div className="bg-cream-white border border-cream-border rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-slate-900">Mes offres</h2>
          <span className="text-sm text-cream-white cursor-pointer">Voir tout</span>
        </div>

        <div className="flex flex-col divide-y divide-cream-white">
          {offres.map((offre) => (
            <div key={offre.titre} className="flex items-center justify-between py-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900">{offre.titre}</p>
                  {offre.booste && (
                    <span className="bg-amber-50 text-amber-600 text-xs px-2 py-0.5 rounded-full">
                      ⚡ Boosté
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    offre.statut === 'Actif' ? 'bg-emerald-50 text-emerald-600' : 'bg-cream-white text-slate-500'
                  }`}>
                    {offre.statut}
                  </span>
                </div>
                <p className="text-cream-white text-sm">Publiée le {offre.date}</p>
              </div>

              <div className="flex items-center gap-8 text-center">
                <div>
                  <p className="font-bold text-slate-900">{offre.candidatures}</p>
                  <p className="text-cream-white text-xs">candidatures</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">{offre.vues}</p>
                  <p className="text-cream-white text-xs">vues</p>
                </div>
                <div>
                  <p className="font-bold text-emerald-600">{offre.reponse}</p>
                  <p className="text-cream-white text-xs">réponse</p>
                </div>
                {!offre.booste && offre.statut === 'Actif' && (
                  <button className="border border-cream-border rounded-full px-4 py-1.5 text-sm text-slate-600 hover:bg-cream">
                    ⚡ Booster
                  </button>
                )}
                <button className="text-cream-white">⋯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardEntreprise

