import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FileText, Target, Compass, Megaphone, Building2, Briefcase, ClipboardList, Users, TrendingUp } from 'lucide-react'

function Welcome() {
  const { user } = useAuth()
  const estEtudiant = user?.role === 'etudiant'
  const estEtablissement = user?.role === 'universite'

  const cartesEtudiant = [
    {
      icone: FileText,
      titre: 'Complète ton profil',
      texte: 'Importe ton CV pour que l\'IA remplisse ton profil automatiquement.',
      lien: '/mon-cv',
      cta: 'Compléter mon CV',
    },
    {
      icone: Target,
      titre: 'Découvre tes offres',
      texte: 'Consulte les stages déjà triés selon ton profil et ton domaine.',
      lien: '/offres',
      cta: 'Voir mes offres',
    },
    {
      icone: Compass,
      titre: 'Mon Guide IA',
      texte: 'Évalue ton CV, génère une roadmap, entraîne-toi à l\'entretien.',
      lien: '/mon-guide',
      cta: 'Explorer Mon Guide',
    },
  ]

  const cartesEntreprise = [
    {
      icone: Megaphone,
      titre: 'Publie ta première offre',
      texte: 'Décris le poste, les compétences recherchées, et reçois des candidatures ciblées.',
      lien: '/entreprise/publier',
      cta: 'Publier une offre',
    },
    {
      icone: Building2,
      titre: 'Complète ton profil entreprise',
      texte: 'Ajoute ton logo, ta description et ta culture pour attirer les meilleurs profils.',
      lien: '/entreprise/profil',
      cta: 'Compléter le profil',
    },
    {
      icone: Briefcase,
      titre: 'Gère tes offres',
      texte: 'Consulte tes offres publiées, tes candidatures et tes statistiques de recrutement.',
      lien: '/entreprise/offres',
      cta: 'Voir mes offres',
    },
  ]

  const cartesEtablissement = [
    {
      icone: ClipboardList,
      titre: 'Gérer les conventions',
      texte: 'Validez les conventions de stage et suivez leur progression.',
      lien: '/etablissement/conventions',
      cta: 'Voir les conventions',
    },
    {
      icone: Users,
      titre: 'Suivre les étudiants',
      texte: 'Accédez à la liste des étudiants et suivez leurs recherches de stage.',
      lien: '/etablissement/etudiants',
      cta: 'Voir les étudiants',
    },
    {
      icone: TrendingUp,
      titre: 'Statistiques de l\'établissement',
      texte: 'Consultez les statistiques de placement et les indicateurs de réussite.',
      lien: '/etablissement/statistiques',
      cta: 'Voir les statistiques',
    },
  ]

  const cartes = estEtudiant ? cartesEtudiant : estEtablissement ? cartesEtablissement : cartesEntreprise

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className={`inline-block text-sm px-4 py-1.5 rounded-full font-medium mb-4 ${
            estEtudiant ? 'bg-brand-orange/10 text-brand-orange' : estEtablissement ? 'bg-brand-primary/10 text-brand-primary' : 'bg-cream-white text-slate-600'
          }`}>
            {estEtudiant ? 'Espace étudiant' : estEtablissement ? 'Espace établissement' : 'Espace entreprise'}
          </span>

          <h1 className="text-4xl font-bold text-slate-900 mb-3 text-balance">
            Bienvenue, {user?.nom || 'utilisateur'}
          </h1>
          <p className="text-slate-600 text-lg text-pretty">
            {estEtudiant
              ? "Voici comment démarrer ta recherche de stage sur Lynk."
              : estEtablissement
              ? "Voici comment gérer les stages de votre établissement sur Lynk."
              : "Voici comment démarrer ton recrutement sur Lynk."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cartes.map((carte) => (
            <Link
              key={carte.titre}
              to={carte.lien}
              className="group flex flex-col bg-cream-white rounded-2xl p-8 border border-cream-border shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                <carte.icone className="h-6 w-6" aria-hidden="true" />
              </div>
              
              <h3 className="font-bold text-slate-900 mb-3 text-lg">{carte.titre}</h3>
              <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed text-pretty">{carte.texte}</p>
              
              <span className="inline-block text-center py-3 px-4 rounded-xl font-semibold bg-brand-primary text-white group-hover:bg-brand-primary-dark transition-colors">
                {carte.cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Welcome
