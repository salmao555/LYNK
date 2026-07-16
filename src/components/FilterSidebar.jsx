function FilterSidebar() {
  const secteurs = ["Tous", "HealthTech", "Mobility", "E-commerce", "LegalTech", "SaaS B2B", "InsurTech"]
  const durees = ["Toutes", "4 mois", "5 mois", "6 mois"]
  const modes = ["Tous", "Présentiel", "Hybride", "Full remote"]

  return (
    <aside className="w-64 shrink-0">
      <div className="flex items-center gap-2 font-semibold text-slate-900 mb-6">
        <span>🔽</span> Filtres
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-cream-white tracking-wide mb-3">SECTEUR</p>
        <div className="flex flex-col gap-1">
          {secteurs.map((s, i) => (
            <button
              key={s}
              className={`text-left px-3 py-1.5 rounded-lg text-sm ${
                i === 0 ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-slate-600 hover:bg-cream'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-cream-white tracking-wide mb-3">DURÉE</p>
        <div className="flex flex-col gap-1">
          {durees.map((d, i) => (
            <button
              key={d}
              className={`text-left px-3 py-1.5 rounded-lg text-sm ${
                i === 0 ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-slate-600 hover:bg-cream'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-cream-white tracking-wide mb-3">MODE</p>
        <div className="flex flex-col gap-1">
          {modes.map((m, i) => (
            <button
              key={m}
              className={`text-left px-3 py-1.5 rounded-lg text-sm ${
                i === 0 ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-slate-600 hover:bg-cream'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar

