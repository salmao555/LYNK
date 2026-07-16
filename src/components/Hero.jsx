import { Link } from "react-router-dom";

/**
 * Hero — landing en 2 blocs :
 *  - Bloc 1 : Académique (fond orange, CTA unique vers /academique/choix)
 *  - Bloc 2 : Entreprise (fond gris clair, CTA direct vers flow entreprise)
 */

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 min-h-[600px] font-sans">
      {/* Bloc 1 : Académique (fond orange, pas de toggle) */}
      <section className="flex flex-col justify-center gap-6 px-10 py-16 md:py-0 bg-brand-primary text-white">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/90">
          Académique
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Votre parcours commence
          <br />
          ici.
        </h1>
        <p className="text-white/80 max-w-md font-light">
          Que vous cherchiez un stage ou que vous pilotiez les stages de votre établissement, tout se passe ici.
        </p>
        <Link
          to="/academique/choix"
          className="w-fit rounded-full bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
        >
          Étudiant ou établissement ?  →
        </Link>
      </section>

      {/* Bloc 2 : Entreprise (direct, pas de toggle) */}
      <section className="flex flex-col justify-center gap-6 px-10 py-16 md:py-0 bg-slate-100">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary">
          Entreprise
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
          Recrutez les meilleurs
          <br />
          stagiaires, <span className="font-extralight text-slate-400">sans friction.</span>
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