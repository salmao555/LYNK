import { Link } from 'react-router-dom'

function CTA() {
  return (
    <section className="bg-[#F2643B] px-16 py-20 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">
        Prêt à trouver votre stage idéal ?
      </h2>
      <p className="text-white/80 text-lg mb-8">
        Rejoignez 8 400 étudiants déjà sur Lynk. C'est gratuit.
      </p>
      <Link
        to="/signup/etudiant"
        className="inline-block bg-white text-[#F2643B] font-semibold px-8 py-3 rounded-full hover:bg-slate-50 transition-colors"
      >
        Commencer gratuitement →
      </Link>
    </section>
  )
}

export default CTA