import { Link } from 'react-router-dom'

const panels = [
  {
    id: 'etudiant',
    badge: '🎓 Pour les étudiants',
    badgeClass: 'bg-white/15 text-white',
    bg: 'bg-[#0a1038]',
    title: (
      <>
        Trouvez le stage qui vous correspond{' '}
        <span className="text-white/60">vraiment.</span>
      </>
    ),
    titleClass: 'text-white',
    text: 'Notre algorithme calcule un score de compatibilité entre votre profil et chaque offre.',
    textClass: 'text-white/80',
    cta: 'Je cherche un stage →',
    ctaClass: 'bg-white hover:bg-slate-100 text-[#F2643B]',
    to: '/signup/etudiant',
  },
  {
    id: 'entreprise',
    badge: '🏢 Pour les entreprises',
    badgeClass: 'bg-slate-100 text-slate-600',
    bg: 'bg-white',
    title: (
      <>
        Recrutez les meilleurs stagiaires,{' '}
        <span className="text-slate-400">sans friction.</span>
      </>
    ),
    titleClass: 'text-slate-900',
    text: 'Publiez vos offres, recevez uniquement les profils compatibles, pilotez votre pipeline.',
    textClass: 'text-slate-500',
    cta: 'Je recrute un stagiaire →',
    ctaClass: 'bg-[#0a1038] hover:bg-[#151b4d] text-[#F2643B]',
    to: '/signup/entreprise',
  },
  {
    id: 'universite',
    badge: '🏛️ Pour les établissements',
    badgeClass: 'bg-[#0a1038]/10 text-[#0a1038]',
    bg: 'bg-slate-100',
    title: (
      <>
        Pilotez les stages de vos étudiants,{' '}
        <span className="text-slate-400">en un seul endroit.</span>
      </>
    ),
    titleClass: 'text-slate-900',
    text: 'Suivez les conventions, validez les placements et accédez aux statistiques de votre établissement.',
    textClass: 'text-slate-500',
    cta: 'Espace établissement →',
    ctaClass: 'bg-[#F2643B] hover:bg-[#E8492E] text-white',
    to: '/signup/universite',
  },
]

function Hero() {
  return (
    <section className="flex flex-col md:flex-row md:min-h-[calc(100vh-73px)] md:overflow-visible">
      {panels.map((panel) => (
        <div
          key={panel.id}
          className={[
            'relative flex flex-1 flex-col justify-center px-8 py-16 md:px-12 md:py-20 lg:px-16',
            'transition-transform duration-300 ease-out',
            'md:hover:scale-[1.04] md:hover:z-10',
            panel.bg,
          ].join(' ')}
        >
          <span className={`inline-block w-fit text-sm px-4 py-1 rounded-full mb-6 font-medium ${panel.badgeClass}`}>
            {panel.badge}
          </span>

          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${panel.titleClass}`}>
            {panel.title}
          </h1>

          <p className={`text-base lg:text-lg mb-8 ${panel.textClass}`}>
            {panel.text}
          </p>

          <Link
            to={panel.to}
            className={`inline-block w-fit font-semibold px-6 py-3 rounded-full transition-colors ${panel.ctaClass}`}
          >
            {panel.cta}
          </Link>
        </div>
      ))}
    </section>
  )
}

export default Hero
