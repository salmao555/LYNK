import { TrendingUp, Users, Briefcase, GraduationCap, BarChart3, Calendar, ArrowUp, ArrowDown } from 'lucide-react'

function EtablissementStatistiques() {
  const stats = {
    placement: {
      current: 67,
      previous: 58,
      change: 9,
      trend: 'up',
    },
    students: {
      current: 156,
      previous: 142,
      change: 14,
      trend: 'up',
    },
    companies: {
      current: 89,
      previous: 76,
      change: 13,
      trend: 'up',
    },
    avgDuration: {
      current: 12,
      previous: 18,
      change: 6,
      trend: 'down',
    },
  }

  const filiereStats = [
    { filiere: 'Informatique', etudiants: 45, places: 38, taux: 84 },
    { filiere: 'Marketing', etudiants: 38, places: 24, taux: 63 },
    { filiere: 'Design', etudiants: 32, places: 20, taux: 62 },
    { filiere: 'Data Science', etudiants: 28, places: 18, taux: 64 },
    { filiere: 'Communication', etudiants: 13, places: 8, taux: 61 },
  ]

  const monthlyData = [
    { mois: 'Sept', places: 12, etudiants: 45 },
    { mois: 'Oct', places: 18, etudiants: 48 },
    { mois: 'Nov', places: 15, etudiants: 50 },
    { mois: 'Déc', places: 22, etudiants: 52 },
    { mois: 'Jan', places: 28, etudiants: 55 },
    { mois: 'Fév', places: 35, etudiants: 58 },
  ]

  const topCompanies = [
    { nom: 'TechCorp', stages: 8, satisfaction: 4.8 },
    { nom: 'Innovation Labs', stages: 6, satisfaction: 4.7 },
    { nom: 'Digital Agency', stages: 5, satisfaction: 4.6 },
    { nom: 'StartUp Vision', stages: 4, satisfaction: 4.5 },
    { nom: 'Data Corp', stages: 3, satisfaction: 4.4 },
  ]

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
          ANALYSE ET PERFORMANCE
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Statistiques</h1>
        <p className="text-slate-500 text-pretty">Suivez les indicateurs de performance de votre établissement.</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-brand-orange" aria-hidden="true" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stats.placement.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stats.placement.trend === 'up' ? (
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              )}
              {stats.placement.change}%
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.placement.current}%</p>
          <p className="text-sm text-slate-500">Taux de placement</p>
        </div>

        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-brand-primary" aria-hidden="true" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stats.students.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stats.students.trend === 'up' ? (
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              )}
              {stats.students.change}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.students.current}</p>
          <p className="text-sm text-slate-500">Étudiants actifs</p>
        </div>

        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stats.companies.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stats.companies.trend === 'up' ? (
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              )}
              {stats.companies.change}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.companies.current}</p>
          <p className="text-sm text-slate-500">Entreprises partenaires</p>
        </div>

        <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-600" aria-hidden="true" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stats.avgDuration.trend === 'down' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stats.avgDuration.trend === 'down' ? (
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              )}
              {stats.avgDuration.change}j
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.avgDuration.current}j</p>
          <p className="text-sm text-slate-500">Durée moyenne recherche</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Par Filière */}
        <div className="bg-cream-white rounded-2xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Taux de placement par filière</h2>
          </div>
          <div className="space-y-4">
            {filiereStats.map((filiere) => (
              <div key={filiere.filiere}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{filiere.filiere}</span>
                  <span className="text-sm text-slate-500">{filiere.places}/{filiere.etudiants} ({filiere.taux}%)</span>
                </div>
                <div className="w-full bg-cream-white rounded-full h-2">
                  <div
                    className="bg-brand-primary rounded-full h-2 transition-all"
                    style={{ width: `${filiere.taux}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Entreprises */}
        <div className="bg-cream-white rounded-2xl p-6 border border-cream-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-brand-orange" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Top entreprises partenaires</h2>
          </div>
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={company.nom} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-cream-white flex items-center justify-center text-xs font-semibold text-slate-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{company.nom}</p>
                    <p className="text-xs text-slate-500">{company.stages} stages</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-slate-900">{company.satisfaction}</span>
                  <span className="text-xs text-cream-white">/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Évolution mensuelle */}
      <div className="bg-cream-white rounded-2xl p-6 border border-cream-white shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Évolution mensuelle</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="flex items-end gap-4 min-w-[600px] h-48">
            {monthlyData.map((data) => {
              const maxHeight = 160
              const placesHeight = (data.places / 40) * maxHeight
              const etudiantsHeight = (data.etudiants / 60) * maxHeight
              return (
                <div key={data.mois} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 h-full">
                    <div
                      className="w-8 bg-brand-primary rounded-t transition-all"
                      style={{ height: `${placesHeight}px` }}
                      title={`${data.places} places`}
                    />
                    <div
                      className="w-8 bg-brand-orange rounded-t transition-all"
                      style={{ height: `${etudiantsHeight}px` }}
                      title={`${data.etudiants} étudiants`}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{data.mois}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-brand-primary" />
              <span className="text-xs text-slate-600">Stages validés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-brand-orange" />
              <span className="text-xs text-slate-600">Étudiants actifs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EtablissementStatistiques
