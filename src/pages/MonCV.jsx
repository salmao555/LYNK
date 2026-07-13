import { useState } from 'react'

function MonCV() {
  const [ongletActif, setOngletActif] = useState('Profil')

  const [prenom, setPrenom] = useState('Théo')
  const [nom, setNom] = useState('Dumont')
  const [email, setEmail] = useState('theo.dumont@gmail.com')
  const [telephone, setTelephone] = useState('+33 6 12 34 56 78')
  const [titre, setTitre] = useState('Master Design Numérique · ENSAD Paris')
  const [apropos, setApropos] = useState(
    "Passionné par le design d'expérience utilisateur et l'accessibilité numérique. Disponible pour un stage de 6 mois dès mars 2025."
  )

  const onglets = ['Profil', 'Formation', 'Expérience', 'Compétences', 'Langues', 'Certifications']

  return (
    <div className="px-16 py-8">
      {/* En-tête de page */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Mon CV</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-full text-sm text-slate-600 hover:bg-slate-50">
            ⬇ CV PDF
          </button>
          <button className="bg-[#F2643B] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#E8492E]">
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Colonne gauche */}
        <div className="flex-1">
          {/* Carte résumé de profil */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F2643B] text-white text-xl font-medium flex items-center justify-center">
                {prenom[0]}{nom[0]}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{prenom} {nom}</h2>
                <p className="text-slate-500 text-sm mb-2">{titre}</p>
                <div className="flex gap-2">
                  <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full">
                    Disponible dès Mars 2025
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                    6 mois · Paris · Hybride
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-[#F2643B]">100%</p>
              <p className="text-slate-400 text-xs">Profil complété</p>
            </div>
          </div>

          {/* Zone d'import */}
          <div className="border-2 border-dashed border-[#F2643B]/30 rounded-2xl py-10 mb-5 text-center bg-[#F2643B]/5">
            <p className="text-2xl mb-2">⬆</p>
            <p className="text-[#F2643B] font-semibold mb-1">Importer mon CV (PDF / DOCX)</p>
            <p className="text-slate-400 text-sm">L'IA extrait automatiquement toutes tes informations · Glisse ou clique</p>
          </div>

          {/* Onglets */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {onglets.map((onglet) => (
              <button
                key={onglet}
                onClick={() => setOngletActif(onglet)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  ongletActif === onglet
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {onglet}
              </button>
            ))}
          </div>

          {/* Contenu de l'onglet Profil */}
          {ongletActif === 'Profil' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-semibold text-slate-400 tracking-wide mb-4">
                INFORMATIONS PERSONNELLES
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Prénom</label>
                  <input
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Nom</label>
                  <input
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Téléphone</label>
                  <input
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-slate-600 block mb-1">Titre professionnel</label>
                <input
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 block mb-1">À propos</label>
                <textarea
                  value={apropos}
                  onChange={(e) => setApropos(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F2643B]/30 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Colonne droite — Aperçu en direct */}
        <div className="w-96 shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden sticky top-24">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <p className="text-xs text-slate-400 ml-2">Aperçu CV en temps réel</p>
            </div>

            <div className="bg-teal-600 text-white px-5 py-5">
              <p className="font-bold">{prenom} {nom}</p>
              <p className="text-teal-100 text-sm">{titre}</p>
              <p className="text-teal-100 text-xs mt-1">{email} · {telephone}</p>
            </div>

            <div className="px-5 py-5 text-sm">
              <p className="text-xs font-semibold text-teal-600 tracking-wide mb-1">À PROPOS</p>
              <p className="text-slate-600 text-xs mb-4">{apropos}</p>

              <p className="text-xs font-semibold text-teal-600 tracking-wide mb-1">FORMATION</p>
              <p className="text-slate-700 text-xs">ENSAD Paris — Master Design Numérique</p>
              <p className="text-slate-400 text-xs mb-3">2023 — présent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonCV
