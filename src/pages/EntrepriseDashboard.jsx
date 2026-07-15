import { BarChart3, Users, Briefcase, TrendingUp, Plus, ArrowRight, Calendar, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

function EntrepriseDashboard() {
  const stats = {
    views: {
      current: 1247,
      change: 12,
      trend: 'up',
    },
    applications: {
      current: 89,
      change: 8,
      trend: 'up',
    },
    interviews: {
      current: 23,
      change: 3,
      trend: 'up',
    },
    hired: {
      current: 5,
      change: 2,
      trend: 'up',
    },
  }

  const recentOffers = [
    {
      id: 1,
      titre: 'Développeur Web Full Stack',
      type: 'Stage',
      duree: '3 mois',
      candidatures: 24,
      statut: 'active',
      prime: 800,
    },
    {
      id: 2,
      titre: 'Data Analyst Junior',
      type: 'Stage',
      duree: '6 mois',
      candidatures: 18,
      statut: 'active',
      prime: 1200,
    },
    {
      id: 3,
      titre: 'UX Designer',
      type: 'Stage',
      duree: '4 mois',
      candidatures: 15,
      statut: 'active',
      prime: 600,
    },
  ]

  const recentApplications = [
    {
      id: 1,
      nom: 'Marie Dupont',
      offre: 'Développeur Web Full Stack',
      date: 'Hier',
      score: 92,
      statut: 'new',
    },
    {
      id: 2,
      nom: 'Jean Martin',
      offre: 'Data Analyst Junior',
      date: 'Hier',
      score: 88,
      statut: 'new',
    },
    {
      id: 3,
      nom: 'Sophie Bernard',
      offre: 'UX Designer',
      date: '2 jours',
      score: 95,
      statut: 'reviewed',
    },
  ]

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
            TABLEAU DE BORD
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Entreprise</h1>
          <p className="text-slate-500 text-pretty">Gérez vos offres et suivez vos recrutements.</p>
        </div>
        <Link
          to="/entreprise/publier"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-full transition-colors"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Publier une offre
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-brand-primary" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-emerald-600">+12%</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.views.current}</p>
          <p className="text-sm text-slate-500">Vues des offres</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-brand-orange" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-emerald-600">+8</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.applications.current}</p>
          <p className="text-sm text-slate-500">Candidatures</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-emerald-600">+3</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.interviews.current}</p>
          <p className="text-sm text-slate-500">Entretiens planifiés</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-brand-primary" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-emerald-600">+2</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.hired.current}</p>
          <p className="text-sm text-slate-500">Stagiaires recrutés</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Offers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-brand-primary" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Offres récentes</h2>
            </div>
            <Link to="/entreprise/offres" className="text-sm font-medium text-brand-orange hover:text-brand-orange-dark flex items-center gap-1">
              Voir tout
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentOffers.map((offer) => (
              <div key={offer.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 mb-1">{offer.titre}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {offer.duree}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" aria-hidden="true" />
                      {offer.prime}€ prime
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900">{offer.candidatures}</p>
                  <p className="text-xs text-slate-500">candidatures</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-brand-orange" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Candidatures récentes</h2>
            </div>
            <span className="text-sm font-medium text-emerald-600">3 nouvelles</span>
          </div>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-slate-900">{app.nom}</p>
                    {app.statut === 'new' && (
                      <span className="w-2 h-2 rounded-full bg-brand-orange" />
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{app.offre}</p>
                  <p className="text-xs text-slate-400 mt-1">{app.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-semibold text-slate-900">{app.score}</span>
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                  <p className="text-xs text-slate-500">score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntrepriseDashboard
