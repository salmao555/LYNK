function Testimonials() {
  const testimonials = [
    {
      text: "J'ai trouvé mon stage chez Doctolib en 4 jours. Le score de compatibilité était parfait — 91%. Bien mieux que LinkedIn.",
      name: "Manon R.",
      school: "Sciences Po Paris",
      initials: "MR",
      color: "bg-rose-500",
      score: "91%",
    },
    {
      text: "La vidéo de présentation fait vraiment la différence. J'ai eu 3 entretiens dès la première semaine sur Lynk.",
      name: "Antoine B.",
      school: "HEC Paris",
      initials: "AB",
      color: "bg-violet-500",
      score: "87%",
    },
    {
      text: "Bien plus efficace que LinkedIn. Les offres sont vraiment ciblées selon mon profil technique. Je recommande à tous mes profs.",
      name: "Sofia K.",
      school: "INSA Lyon",
      initials: "SK",
      color: "bg-emerald-500",
      score: "84%",
    },
  ]

  return (
    <section className="px-16 py-20 text-center">
      <h2 className="text-4xl font-bold text-slate-900 mb-14">
        Ce qu'ils en disent
      </h2>

      <div className="grid grid-cols-3 gap-6 text-left">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-brand-primary mb-4">★★★★★</p>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              "{t.text}"
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} text-white text-xs font-medium flex items-center justify-center`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.school}</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-xs font-medium px-2.5 py-1 rounded-full">
                {t.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
