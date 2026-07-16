function HowItWorks() {
  const steps = [
    {
      icon: "✎𓂃",
      title: "Créez votre profil",
      text: "Renseignez vos compétences, expériences et votre courte vidéo de présentation. Notre IA analyse vos points forts.",
    },
    {
      icon: "꩜",
      title: "Découvrez vos matchs",
      text: "Recevez des offres triées par compatibilité. Chaque carte affiche un score calculé selon votre profil.",
    },
    {
      icon: "ᯓ➤",
      title: "Postulez en 1 clic",
      text: "Candidatez directement depuis la plateforme. Suivez vos candidatures et échangez avec les recruteurs.",
    },
  ]

  return (
    <section className="px-16 py-20 text-center">
      <p className="text-cream-white text-sm font-medium tracking-wide mb-3">
        COMMENT ÇA MARCHE
      </p>
      <h2 className="text-4xl font-bold text-slate-900 mb-16">
        Du profil au stage, en 3 étapes.
      </h2>

      <div className="grid grid-cols-3 gap-10 text-left">
        {steps.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-primary text-white text-xl mb-5">
              {step.icon}
            </div>
            <span className="absolute top-0 right-0 text-6xl font-bold text-cream-white -z-10">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
