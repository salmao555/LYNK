import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function MonCV() {
  const { user, updateProfile, calculateProfileScore } = useAuth()
  const [ongletActif, setOngletActif] = useState('Profil')

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [titre, setTitre] = useState('')
  const [apropos, setApropos] = useState('')

  useEffect(() => {
    if (user?.profile) {
      const p = user.profile
      setPrenom(p.prenom || '')
      setNom(p.nom || '')
      setEmail(p.email || '')
      setTelephone(p.telephone || '')
      setTitre(p.niveau || '')
      setApropos(p.ecole || '')
    } else if (!user) {
      setPrenom('Théo')
      setNom('Dumont')
      setEmail('theo.dumont@gmail.com')
      setTelephone('+33 6 12 34 56 78')
      setTitre('Master Design Numérique · ENSAD Paris')
      setApropos("Passionné par le design d'expérience utilisateur et l'accessibilité numérique. Disponible pour un stage de 6 mois dès mars 2025.")
    }
  }, [user])

  const score = user?.profile
    ? calculateProfileScore({ ...user.profile, prenom, nom, email, telephone, niveau: titre, ecole: apropos })
    : 100

  const handleSave = () => {
    if (user?.profile) {
      updateProfile({ prenom, nom, email, telephone, niveau: titre, ecole: apropos })
    }
  }

  const onglets = ['Profil', 'Formation', 'Expérience', 'Compétences', 'Langues', 'Certifications']
  const inputFocus = 'focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary'

  return (
    <div className="px-16 py-8 bg-cream-white min-h-[calc(100vh-73px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-900">Mon CV</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-cream-border bg-cream-white px-4 py-2 rounded-full text-sm text-slate-600 hover:bg-cream">
            ⬇ CV PDF
          </button>
          <button
            onClick={handleSave}
            className="bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand-primary-dark transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="bg-cream-white border border-cream-border rounded-2xl p-6 mb-5 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-primary text-white text-xl font-medium flex items-center justify-center">
                {(prenom[0] || '?')}{(nom[0] || '?')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{prenom} {nom}</h2>
                <p className="text-slate-500 text-sm mb-2">{titre}</p>
                <div className="flex gap-2">
                  <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full">
                    Disponible dès Mars 2025
                  </span>
                  <span className="bg-cream-white text-slate-600 text-xs px-3 py-1 rounded-full">
                    6 mois · Paris · Hybride
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-brand-primary">{score}%</p>
              <p className="text-cream-white text-xs">Profil complété</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-brand-primary/30 rounded-2xl py-10 mb-5 text-center bg-brand-primary/5">
            <p className="text-2xl mb-2">⬆</p>
            <p className="text-brand-primary font-semibold mb-1">Importer mon CV (PDF / DOCX)</p>
            <p className="text-cream-white text-sm">L'IA extrait automatiquement toutes tes informations · Glisse ou clique</p>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {onglets.map((onglet) => (
              <button
                key={onglet}
                onClick={() => setOngletActif(onglet)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  ongletActif === onglet
                    ? 'bg-brand-primary text-white'
                    : 'bg-cream-white border border-cream-border text-slate-600 hover:bg-cream'
                }`}
              >
                {onglet}
              </button>
            ))}
          </div>

          {ongletActif === 'Profil' && (
            <div className="bg-cream-white border border-cream-border rounded-2xl p-6">
              <p className="text-xs font-semibold text-cream-white tracking-wide mb-4">
                INFORMATIONS PERSONNELLES
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Prénom</label>
                  <input
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className={`w-full bg-cream rounded-lg px-4 py-2.5 text-sm outline-none border border-cream-border ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Nom</label>
                  <input
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className={`w-full bg-cream rounded-lg px-4 py-2.5 text-sm outline-none border border-cream-border ${inputFocus}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-cream rounded-lg px-4 py-2.5 text-sm outline-none border border-cream-border ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Téléphone</label>
                  <input
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className={`w-full bg-cream rounded-lg px-4 py-2.5 text-sm outline-none border border-cream-border ${inputFocus}`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-slate-600 block mb-1">Titre professionnel</label>
                <input
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className={`w-full bg-cream rounded-lg px-4 py-2.5 text-sm outline-none border border-cream-border ${inputFocus}`}
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 block mb-1">À propos</label>
                <textarea
                  value={apropos}
                  onChange={(e) => setApropos(e.target.value)}
                  rows={3}
                  className={`w-full bg-cream rounded-lg px-4 py-2.5 text-sm outline-none border border-cream-border resize-none ${inputFocus}`}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-96 shrink-0">
          <div className="bg-cream-white border border-cream-border rounded-2xl overflow-hidden sticky top-24">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-cream-border">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <p className="text-xs text-cream-white ml-2">Aperçu CV en temps réel</p>
            </div>

            <div className="bg-brand-primary text-white px-5 py-5">
              <p className="font-bold">{prenom} {nom}</p>
              <p className="text-white/80 text-sm">{titre}</p>
              <p className="text-white/70 text-xs mt-1">{email} · {telephone}</p>
            </div>

            <div className="px-5 py-5 text-sm">
              <p className="text-xs font-semibold text-brand-primary tracking-wide mb-1">À PROPOS</p>
              <p className="text-slate-600 text-xs mb-4">{apropos}</p>

              {user?.profile?.experience?.[0] && (
                <>
                  <p className="text-xs font-semibold text-brand-primary tracking-wide mb-1">EXPÉRIENCE</p>
                  <p className="text-slate-700 text-xs">{user.profile.experience[0].titre}</p>
                  <p className="text-cream-white text-xs mb-3">{user.profile.experience[0].entreprise}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonCV
