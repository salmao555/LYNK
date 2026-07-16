function StatsBar() {
  const stats = [
    { value: "8 400+", label: "Étudiants inscrits" },
    { value: "1 200+", label: "Entreprises partenaires" },
    { value: "94%", label: "Taux de satisfaction" },
    { value: "3 min", label: "Pour postuler" },
  ]

  return (
    <section className="bg-cream-white px-16 py-10">
      <div className="grid grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold text-brand-navy">{stat.value}</p>
            <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar
