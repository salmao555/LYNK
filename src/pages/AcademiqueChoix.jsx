import { Link } from 'react-router-dom'
import { GraduationCap, Landmark, ArrowLeft } from 'lucide-react'

function AcademiqueChoix() {
  return (
    <div className="min-h-screen bg-cream flex flex-col relative overflow-hidden">
      {/* Subtle orange gradient - top-right corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />
      
      {/* Header simple avec logo */}
      <div className="bg-cream-white border-b border-cream-border px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-3xl">
          {/* Titre centré */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Vous êtes ici en tant que...
            </h1>
            <p className="text-slate-500 text-pretty">
              Choisissez votre profil pour accéder aux fonctionnalités adaptées à vos besoins.
            </p>
          </div>

          {/* Deux grandes cartes côte à côte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Étudiant */}
            <Link
              to="/onboarding/cv-upload"
              className="group bg-cream-white rounded-2xl border border-cream-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                <GraduationCap className="h-10 w-10 text-brand-primary" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Étudiant</h2>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                Trouvez le stage qui correspond à votre profil grâce à notre algorithme de matching intelligent.
              </p>
              <div className="mt-6 text-brand-primary font-semibold text-sm group-hover:underline">
                Commencer →
              </div>
            </Link>

            {/* Carte Établissement */}
            <Link
              to="/onboarding/etablissement/info"
              className="group bg-cream-white rounded-2xl border border-cream-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                <Landmark className="h-10 w-10 text-brand-primary" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Établissement</h2>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                Pilotez les stages de vos étudiants, suivez les conventions et accédez aux statistiques de votre établissement.
              </p>
              <div className="mt-6 text-brand-primary font-semibold text-sm group-hover:underline">
                Commencer →
              </div>
            </Link>
          </div>

          {/* Lien discret en bas */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-cream-white hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcademiqueChoix
