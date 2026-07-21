import { MapPin, Clock, Building2, DollarSign, Eye, Bookmark, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

function OfferCard({ offre, isBookmarked = false, onBookmarkToggle, onClick }) {
  const handleBookmarkClick = (e) => {
    e.stopPropagation()
    if (onBookmarkToggle) {
      onBookmarkToggle(offre.id)
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(offre.id)
    }
  }

  return (
    <Link
      to={`/offres/${offre.id}`}
      className="block bg-cream-white border border-cream-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-medium flex items-center justify-center">
            {offre.initiale}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{offre.entreprise}</p>
            <p className="text-sm text-slate-500">{offre.secteur}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full border-2 border-emerald-400 flex items-center justify-center text-xs font-semibold text-emerald-600">
            {offre.score}%
          </div>
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? 'text-brand-primary bg-brand-primary/10'
                : 'text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10'
            }`}
            aria-label={isBookmarked ? "Retirer des sauvegardés" : "Sauvegarder"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">{offre.titre}</h3>

      {offre.projet && (
        <div className="flex items-start gap-2 mb-3">
          <Briefcase className="h-4 w-4 text-brand-orange mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-slate-600">{offre.projet}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {offre.lieu}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {offre.duree}
        </span>
        <span className="flex items-center gap-1">
          <Building2 className="h-3 w-3" aria-hidden="true" />
          {offre.mode}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {offre.tags.map((tag) => (
          <span key={tag} className="bg-cream-white text-slate-600 text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-cream-border">
        <div className="flex items-center gap-3">
          <span className="text-brand-orange font-semibold">{offre.salaire}</span>
          {offre.prime && (
            <span className="flex items-center gap-1 text-xs text-slate-600">
              <DollarSign className="h-3 w-3" aria-hidden="true" />
              {offre.prime}€ prime
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-cream-white text-sm">
          <Eye className="h-3 w-3" aria-hidden="true" />
          {offre.vues}
        </span>
      </div>
    </Link>
  )
}

export default OfferCard
