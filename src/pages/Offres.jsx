import { useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import OfferCard from '../components/OfferCard'
import { offres } from '../data/offres'

function Offres() {
  const [vue, setVue] = useState('grille')
  const [indexActuel, setIndexActuel] = useState(0)

  const offreActuelle = offres[indexActuel]

  return (
    <div className="px-16 py-8">
      {/* Barre de recherche + toggle */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Chercher un stage, une entreprise..."
          className="flex-1 bg-cream-white rounded-full px-5 py-3 text-sm outline-none"
        />
        <div className="flex bg-cream-white rounded-full p-1">
          <button
            onClick={() => setVue('grille')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              vue === 'grille' ? 'bg-brand-primary text-white' : 'text-slate-500'
            }`}
          >
            Grille
          </button>
          <button
            onClick={() => setVue('swipe')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              vue === 'swipe' ? 'bg-brand-primary text-white' : 'text-slate-500'
            }`}
          >
            Swipe
          </button>
        </div>
      </div>

      <div className="flex gap-10">
        <FilterSidebar />

        <div className="flex-1">
          {vue === 'grille' ? (
            <>
              <div className="flex justify-between items-center mb-5">
                <p className="text-slate-600 text-sm">
                  {offres.length} offres correspondant à votre profil
                </p>
                <p className="text-cream-white text-sm">Trié par compatibilité ↓</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {offres.map((offre) => (
                  <OfferCard key={offre.id} offre={offre} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-cream-white text-sm mb-6">
                {indexActuel + 1} / {offres.length}
              </p>

              <div className="w-full max-w-md">
                <OfferCard offre={offreActuelle} />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setIndexActuel(Math.max(0, indexActuel - 1))}
                  className="w-12 h-12 rounded-full bg-cream-white border border-cream-white flex items-center justify-center hover:bg-cream"
                >
                  ✕
                </button>
                <button className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center text-xl hover:bg-brand-primary-dark">
                  ✓
                </button>
                <button
                  onClick={() => setIndexActuel(Math.min(offres.length - 1, indexActuel + 1))}
                  className="w-12 h-12 rounded-full bg-cream-white border border-cream-white flex items-center justify-center hover:bg-cream"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Offres
