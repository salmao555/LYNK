export const stats = [
  { icone: "👥", valeur: "71", label: "Candidatures reçues", delta: "+12 cette semaine" },
  { icone: "👁", valeur: "2 872", label: "Vues des offres", delta: "+8% vs semaine passée" },
  { icone: "📈", valeur: "94%", label: "Taux de réponse", delta: "Excellent !" },
  { icone: "💬", valeur: "7", label: "Entretiens planifiés", delta: "3 cette semaine" },
]

export const pipeline = {
  "Candidatures": [
    { nom: "Léa Moreau", ecole: "Sciences Po", score: 91, couleur: "bg-rose-500", initiales: "LM" },
    { nom: "Thomas Petit", ecole: "HEC Paris", score: 84, couleur: "bg-violet-500", initiales: "TP" },
    { nom: "Inès Durand", ecole: "Polytechnique", score: 78, couleur: "bg-emerald-500", initiales: "ID" },
    { nom: "Romain Favre", ecole: "EDHEC", score: 71, couleur: "bg-blue-500", initiales: "RF" },
  ],
  "Profils vus": [
    { nom: "Maxime Bernard", ecole: "ESSEC", score: 88, couleur: "bg-amber-500", initiales: "MB" },
    { nom: "Camille Leroy", ecole: "CentraleSupélec", score: 75, couleur: "bg-sky-500", initiales: "CL" },
  ],
  "Entretiens": [
    { nom: "Hugo Martin", ecole: "ESCP", score: 95, couleur: "bg-indigo-500", initiales: "HM" },
  ],
  "Acceptés": [
    { nom: "Yasmine Khalil", ecole: "Dauphine", score: 92, couleur: "bg-orange-500", initiales: "YK" },
  ],
}

export const offres = [
  { titre: "Stage UX/UI Designer", statut: "Actif", date: "12 jan 2025", candidatures: 48, vues: 1240, reponse: "94%", booste: false },
  { titre: "Stage Data Analyst", statut: "Actif", date: "18 jan 2025", candidatures: 23, vues: 678, reponse: "78%", booste: true },
  { titre: "Stage Marketing Growth", statut: "Fermé", date: "5 jan 2025", candidatures: 31, vues: 954, reponse: "88%", booste: false },
]