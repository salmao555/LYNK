import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Hero — landing en 2 sections (au lieu de 3) :
 *  - Gauche : toggle Étudiants / Entreprises (les deux profils individuels)
 *  - Droite : Établissements (gestion institutionnelle, seule et fixe)
 *
 * Feedback encadrant intégré : moins de blocs visuels simultanés,
 * on garde la richesse (3 audiences) mais on la range dans 2 colonnes,
 * dans le même ordre que le Figma d'origine (Étudiants → Entreprises → Établissements).
 */

const LEFT_CONTENT = {
  etudiants: {
    badge: "Étudiants",
    title: (
      <>
        Trouvez le stage qui vous
        <br />
        correspond <span className="font-extralight text-white/70">vraiment.</span>
      </>
    ),
    text: "Notre algorithme calcule un score de compatibilité entre votre profil et chaque offre.",
    cta: "Je cherche un stage",
    to: "/etudiant/onboarding",
  },
  etablissements: {
    badge: "Établissements",
    title: (
      <>
        Pilotez les stages de vos
        <br />
        étudiants, <span className="font-extralight text-white/70">en un seul endroit.</span>
      </>
    ),
    text: "Suivez les conventions, validez les placements et accédez aux statistiques de votre établissement.",
    cta: "Espace établissement",
    to: "/login/universite",
  },
};

function Toggle({ active, onChange }) {
  return (
    <div className="inline-flex rounded-full bg-white/10 p-1 mb-6">
      {["etudiants", "etablissements"].map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === key
              ? "bg-white text-slate-900"
              : "text-white/70 hover:text-white"
          }`}
        >
          {key === "etudiants" ? "Étudiants" : "Établissements"}
        </button>
      ))}
    </div>
  );
}

export default function Hero() {
  const [leftView, setLeftView] = useState("etudiants");
  const content = LEFT_CONTENT[leftView];

  return (
    <div className="grid md:grid-cols-2 min-h-[600px] font-sans">
      {/* Colonne gauche : toggle Étudiants / Établissements */}
      <section className="flex flex-col justify-center gap-6 px-10 py-16 md:py-0 bg-[#331894] text-white">
        <Toggle active={leftView} onChange={setLeftView} />
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          {content.title}
        </h1>
        <p className="text-white/80 max-w-md font-light">{content.text}</p>
        <Link
          to={content.to}
          className="w-fit rounded-full bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
        >
          {content.cta} →
        </Link>
      </section>

      {/* Colonne droite : Entreprises (fixe, pas de toggle) */}
      <section className="flex flex-col justify-center gap-6 px-10 py-16 md:py-0 bg-slate-200">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          Entreprises
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
          to="/login/entreprise"
          className="w-fit rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Je recrute un stagiaire →
        </Link>
      </section>
    </div>
  );
}