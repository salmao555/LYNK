import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Welcome() {
  const { user } = useAuth()
  const estEtudiant = user?.role === 'etudiant'

  const cartesEtudiant = [
    {
      icone: '📄',
      titre: 'Complète ton profil',
      texte: 'Importe ton CV pour que l\'IA remplisse ton profil automatiquement.',
      lien: '/mon-cv',
      cta: 'Compléter mon CV',
    },
    {
      icone: '🎯',
      titre: 'Découvre tes offres',
      texte: 'Consulte les stages déjà triés selon ton profil et ton domaine.',
      lien: '/offres',
      cta: 'Voir mes offres',
    },
    {
      icone: '🧭',
      titre: 'Mon Guide IA',
      texte: 'Évalue ton CV, génère une roadmap, entraîne-toi à l\'entretien.',
      lien: '/mon-guide',
      cta: 'Explorer Mon Guide',
    },
  ]

  const cartesEntreprise = [
    {
      icone: '📢',
      titre: 'Publie ta première offre',
      texte: 'Décris le poste, les compétences recherchées, et reçois des candidatures ciblées.',
      lien: '/entreprise/publier',
      cta: 'Publier une offre',
    },
    {
      icone: '🏢',
      titre: 'Complète ton profil entreprise',
      texte: 'Ajoute ton logo, ta description et ta culture pour attirer les meilleurs profils.',
      lien: '/entreprise/profil',
      cta: 'Compléter le profil',
    },
    {
      icone: '📊',
      titre: 'Ton tableau de bord',
      texte: 'Suis tes candidatures, ton pipeline et tes statistiques de recrutement.',
      lien: '/entreprise',
      cta: 'Voir le dashboard',
    },
  ]

  const cartes = estEtudiant ? cartesEtudiant : cartesEntreprise

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 px-16 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className={`inline-block text-sm px-4 py-1.5 rounded-full font-medium mb-4 ${
          estEtudiant ? 'bg-[#F2643B]/10 text-[#F2643B]' : 'bg-slate-100 text-slate-600'
        }`}>
          {estEtudiant ? '🎓 Espace étudiant' : '🏢 Espace entreprise'}
        </span>

        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          BIENVENUE {user?.nom} 
        </h1>
        <p className="text-slate-500 text-lg">
          {estEtudiant
            ? "Voici comment démarrer ta recherche de stage sur Lynk."
            : "Voici comment démarrer ton recrutement sur Lynk."}
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-5">
        {cartes.map((carte) => (
          <div key={carte.titre} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col">
            <span className="text-2xl mb-4">{carte.icone}</span>
            <h3 className="font-bold text-slate-900 mb-2">{carte.titre}</h3>
            <p className="text-slate-500 text-sm mb-6 flex-1">{carte.texte}</p>
            <Link
              to={carte.lien}
              className={`text-center text-sm font-medium py-2.5 rounded-full transition-colors ${
                estEtudiant
                  ? 'bg-[#F2643B] text-white hover:bg-[#E8492E]'
                  : 'bg-slate-900 text-white hover:bg-black'
              }`}
            >
              {carte.cta} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Welcome
