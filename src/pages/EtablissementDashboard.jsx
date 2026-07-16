import { Link } from 'react-router-dom'
import { Users, GraduationCap, ClipboardList, TrendingUp, ArrowRight, Plus, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function EtablissementDashboard() {
  const { user } = useAuth()

  // Get data from user profile if available
  const etablissementName = user?.profile?.etablissementName || 'Votre établissement'
  const filieres = user?.profile?.filieres || []
  const studentCount = user?.profile?.studentImport?.studentCount || 0
  const emailDomain = user?.profile?.studentImport?.emailDomain || ''

  const stats = [
    {
      label: 'Étudiants importés',
      value: studentCount,
      icon: Users,
      color: 'bg-brand-primary/10 text-brand-primary',
      link: '/etablissement/etudiants'
    },
    {
      label: 'Filières actives',
      value: filieres.length,
      icon: GraduationCap,
      color: 'bg-brand-orange/10 text-brand-orange',
      link: '/etablissement/statistiques'
    },
    {
      label: 'Conventions en attente',
      value: 0,
      icon: ClipboardList,
      color: 'bg-amber-50 text-amber-600',
      link: '/etablissement/conventions'
    },
    {
      label: 'Taux de placement',
      value: 'N/A',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-600',
      link: '/etablissement/statistiques'
    }
  ]

  const quickActions = [
    {
      title: 'Importer des étudiants',
      description: 'Ajoutez vos étudiants via CSV ou domaine email',
      icon: Users,
      link: '/etablissement/etudiants',
      primary: true
    },
    {
      title: 'Voir les conventions',
      description: 'Validez et suivez les conventions de stage',
      icon: ClipboardList,
      link: '/etablissement/conventions',
      primary: false
    },
    {
      title: 'Consulter les statistiques',
      description: 'Analysez les performances de votre établissement',
      icon: TrendingUp,
      link: '/etablissement/statistiques',
      primary: false
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream-white border-b border-cream-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
            <span className="text-cream-white">|</span>
            <span className="text-slate-600 font-medium">{etablissementName}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-cream-white text-slate-600 transition-colors" aria-label="Paramètres">
              <Settings className="h-5 w-5" aria-hidden="true" />
            </button>
            <button className="p-2 rounded-lg hover:bg-cream-white text-slate-600 transition-colors" aria-label="Déconnexion">
              <LogOut className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Bienvenue sur votre espace établissement
            </h1>
            <p className="text-slate-500">
              Gérez les stages de vos étudiants et suivez leurs progrès.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => {
              const StatIcon = stat.icon
              return (
                <Link
                  key={stat.label}
                  to={stat.link}
                  className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <StatIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </Link>
              )
            })}
          </div>

          {/* Setup Status */}
          {studentCount === 0 && !emailDomain && (
            <div className="mb-10 p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-amber-600" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">Configurez vos étudiants</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Importez vos étudiants via CSV ou configurez un domaine email pour permettre le rattachement automatique.
                  </p>
                  <Link
                    to="/etablissement/etudiants"
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
                  >
                    Configurer maintenant
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const ActionIcon = action.icon
                return (
                  <Link
                    key={action.title}
                    to={action.link}
                    className={`group bg-cream-white rounded-xl p-6 border ${
                      action.primary ? 'border-brand-primary/30 shadow-sm' : 'border-cream-white'
                    } hover:shadow-md transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                      action.primary ? 'bg-brand-primary/10' : 'bg-cream-white group-hover:bg-cream-white'
                    } transition-colors`}>
                      <ActionIcon className={`h-6 w-6 ${action.primary ? 'text-brand-primary' : 'text-slate-600'}`} aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-slate-500">{action.description}</p>
                    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                      action.primary ? 'text-brand-primary' : 'text-slate-600 group-hover:text-slate-900'
                    }`}>
                      Accéder
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Active Filières */}
          {filieres.length > 0 && (
            <div className="bg-cream-white rounded-xl p-6 border border-cream-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Filières configurées</h2>
                <Link
                  to="/etablissement/statistiques"
                  className="text-sm font-medium text-brand-primary hover:text-brand-primary-dark"
                >
                  Voir détails
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {filieres.map((filiere) => (
                  <span
                    key={filiere}
                    className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm"
                  >
                    {filiere}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EtablissementDashboard
