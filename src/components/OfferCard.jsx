function OfferCard({ offre }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${offre.couleur} text-white font-medium flex items-center justify-center`}>
            {offre.initiale}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{offre.entreprise}</p>
            <p className="text-sm text-slate-400">{offre.secteur}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full border-2 border-emerald-400 flex items-center justify-center text-xs font-semibold text-emerald-600">
            {offre.score}%
          </div>
          <button className="text-slate-300 hover:text-slate-500">🔖</button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">{offre.titre}</h3>

      <div className="flex gap-2 text-xs text-slate-500 mb-3">
        <span>📍 {offre.lieu}</span>
        <span>🕐 {offre.duree}</span>
        <span>🏢 {offre.mode}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {offre.tags.map((tag) => (
          <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-[#F2643B] font-semibold">{offre.salaire}</span>
        <span className="text-slate-400 text-sm">👁 {offre.vues}</span>
      </div>
    </div>
  )
}

export default OfferCard
