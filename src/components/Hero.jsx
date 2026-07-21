import { Link } from "react-router-dom";

/**
 * Hero — landing en 2 blocs :
 *  - Bloc 1 : Académique (fond orange, CTA unique vers /academique/choix)
 *  - Bloc 2 : Entreprise (fond gris clair, CTA direct vers flow entreprise)
 */

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-5 p-5 min-h-[calc(100vh-73px)] font-sans">
      {/* Bloc 1 : Académique (fond orange, pas de toggle) */}
      <section className="flex flex-col justify-center gap-6 px-10 py-16 md:py-0 bg-brand-primary text-white rounded-3xl">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cream-white/10 px-3 py-1 text-sm font-semibold text-white/90">
          📋 Pour les étudiants
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
         Trouvez le stage qui vous correspond
          <br />
          vraiment.
        </h1>
        <p className="text-white/80 max-w-md font-light">
          Que vous cherchiez un stage ou que vous pilotiez les stages de votre établissement, tout se passe ici.
        </p>
        <Link
          to="/academique/choix"
          className="w-fit rounded-full bg-cream-white px-6 py-3 font-semibold text-slate-900 hover:bg-cream-white transition-colors"
        >
          Étudiant ou établissement ?  →
        </Link>
      </section>

      {/* Bloc 2 : Entreprise (direct, pas de toggle) */}
      <section className="flex flex-col justify-center gap-6 px-10 py-16 md:py-0 bg-cream-white rounded-3xl">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary">
          🏢 Pour les entreprises
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
          Recrutez les meilleurs stagiaires
          <br />
          sans friction. <span className="font-extralight text-cream-white">sans friction.</span>
        </h1>
        <p className="text-slate-500 max-w-md font-light">
          Publiez vos offres, recevez uniquement les profils compatibles,
          pilotez votre pipeline.
        </p>
        <Link
          to="/onboarding/entreprise/info"
          className="w-fit rounded-full bg-brand-primary px-6 py-3 font-semibold text-white hover:bg-brand-primary-dark transition-colors"
        >
          Je recrute un stagiaire →
        </Link>
      </section>
    </div>
  );
}