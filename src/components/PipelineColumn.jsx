function PipelineColumn({ titre, candidats, couleurBadge }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-semibold text-cream-white tracking-wide">
          {titre.toUpperCase()}
        </p>
        <span className={`w-5 h-5 rounded-full ${couleurBadge} text-white text-xs flex items-center justify-center font-medium`}>
          {candidats.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {candidats.map((c) => (
          <div key={c.nom} className="bg-cream rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${c.couleur} text-white text-xs font-medium flex items-center justify-center`}>
                {c.initiales}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{c.nom}</p>
                <p className="text-xs text-cream-white">{c.ecole}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-emerald-600">{c.score}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PipelineColumn

