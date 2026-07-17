import { FileText, Compass, MessageSquare, TrendingUp } from 'lucide-react'

function MonGuide() {
  const features = [
    {
      id: 1,
      title: 'Évaluation de CV',
      description: 'Reçois un score et des suggestions concrètes pour améliorer ton CV.',
      button: 'Analyser mon CV',
      icon: FileText,
    },
    {
      id: 2,
      title: 'Roadmap de compétences',
      description: "Vois ce qu'il te manque pour matcher à 90% avec les offres qui t'intéressent.",
      button: 'Voir ma roadmap',
      icon: Compass,
    },
    {
      id: 3,
      title: "Simulateur d'entretien",
      description: 'Entraîne-toi avec un recruteur IA adapté à l\'entreprise visée.',
      button: 'Lancer la simulation',
      icon: MessageSquare,
    },
    {
      id: 4,
      title: 'Parcours de carrière',
      description: 'Découvre les trajectoires typiques après ce type de stage.',
      button: 'Explorer les parcours',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-3">
          INTELLIGENCE ARTIFICIELLE
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 text-balance">Mon Guide</h1>
        <p className="text-slate-500 text-pretty">Ton copilote IA pour réussir ta recherche de stage.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col bg-cream-white border border-cream-border rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 text-pretty">{feature.description}</p>

            <button className="w-full py-3 rounded-full text-sm font-medium bg-brand-primary hover:bg-brand-primary-light text-white transition-colors">
              {feature.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonGuide