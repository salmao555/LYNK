import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Target,
  FileText,
  Compass,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Briefcase,
} from 'lucide-react'
import OfferCard from '../../components/OfferCard'
import { offres } from '../../data/offres'

export default function EtudiantDashboard() {
  const { user } = useAuth()
  const profile = user?.profile
  const score = user?.profileScore ?? 0
  const prenom = profile?.prenom || user?.nom?.split(' ')[0] || 'Étudiant'

  const missingFields = []
  if (!profile?.telephone) missingFields.push('téléphone')
  if (!profile?.ecole) missingFields.push('école')
  if (!profile?.niveau) missingFields.push('niveau d\'études')
  if (!profile?.skills?.length) missingFields.push('compétences')
  if (!profile?.experience?.some((e) => e.titre)) missingFields.push('expériences')

  const showBanner = score < 100

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-200 px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {showBanner && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-white border border-brand-primary/20 px-5 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#331894"
                    strokeWidth="3"
                    strokeDasharray={`${score} ${100 - score}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-primary">
                  {score}%
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-brand-primary" />
                  Profil à {score}% — complétez pour de meilleurs matchs
                </p>
                <p className="text-sm text-slate-500">
                  {missingFields.length > 0
                    ? `Il manque : ${missingFields.join(', ')}`
                    : 'Ajoutez quelques détails pour optimiser vos candidatures.'}
                </p>
              </div>
            </div>
            <Link
              to="/mon-cv"
              className="shrink-0 inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold transition-colors"
            >
              Compléter
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-8">
          <span className="inline-block text-sm px-4 py-1.5 rounded-full font-medium mb-3 bg-brand-primary/10 text-brand-primary">
            Espace étudiant
          </span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-1">
            Bienvenue, {prenom}
          </h1>
          <p className="text-slate-600">
            Votre profil est prêt. Découvrez les stages qui vous correspondent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <ProfileSummary profile={profile} score={score} user={user} />

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icone: Target, titre: 'Mes offres', texte: 'Stages triés pour vous', lien: '/offres', cta: 'Explorer' },
              { icone: FileText, titre: 'Mon CV', texte: 'Modifier votre profil', lien: '/mon-cv', cta: 'Éditer' },
              { icone: Compass, titre: 'Mon Guide IA', texte: 'Coaching carrière', lien: '/mon-guide', cta: 'Découvrir' },
            ].map((card) => (
              <Link
                key={card.titre}
                to={card.lien}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:-translate-y-0.5 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                  <card.icone className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{card.titre}</h3>
                <p className="text-sm text-slate-500 mb-3">{card.texte}</p>
                <span className="text-sm font-medium text-brand-primary group-hover:underline">
                  {card.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-primary" />
              Offres recommandées
            </h2>
            <Link to="/offres" className="text-sm font-medium text-brand-primary hover:underline">
              Voir toutes les offres
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offres.slice(0, 4).map((offre) => (
              <OfferCard key={offre.id} offre={offre} />
            ))}
          </div>
        </section>

        <Link
          to="/messages"
          className="mt-8 flex items-center gap-3 bg-white rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-brand-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900">Messages</p>
            <p className="text-sm text-slate-500">2 nouvelles conversations</p>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </Link>
      </div>
    </div>
  )
}

function ProfileSummary({ profile, score, user }) {
  const initials = profile
    ? `${profile.prenom?.[0] || ''}${profile.nom?.[0] || ''}`
    : user?.nom?.[0] || 'E'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-brand-primary text-white text-lg font-semibold flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">
            {profile ? `${profile.prenom} ${profile.nom}` : user?.nom}
          </h3>
          <p className="text-sm text-slate-500">{profile?.niveau || 'Étudiant'}</p>
          <p className="text-xs text-slate-400 mt-0.5">{profile?.ecole}</p>
        </div>
      </div>

      {profile?.skills?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 tracking-wide mb-2">COMPÉTENCES</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.slice(0, 6).map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-sm text-slate-500">Profil complété</span>
        <span className="text-lg font-bold text-brand-primary">{score}%</span>
      </div>
    </div>
  )
}
