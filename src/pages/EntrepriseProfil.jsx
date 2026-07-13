import { useState } from 'react'
import { Building2, MapPin, Globe, Mail, Phone, Users, Briefcase, Camera, Save, X } from 'lucide-react'

function EntrepriseProfil() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nom: 'TechCorp',
    description: 'TechCorp est une entreprise innovante spécialisée dans le développement de solutions technologiques pour les entreprises. Nous accompagnons nos clients dans leur transformation digitale avec des équipes passionnées et expertes.',
    secteur: 'Technologie',
    taille: '50-100 employés',
    siteWeb: 'https://techcorp.com',
    email: 'contact@techcorp.com',
    telephone: '+33 1 23 45 67 89',
    adresse: '123 Rue de la Tech, 75001 Paris',
    culture: 'Innovation, Collaboration, Excellence',
    avantages: 'Télétravail flexible, Assurance maladie, Tickets restaurant, Formation continue',
  })

  const handleSave = () => {
    // Handle save
    setIsEditing(false)
  }

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-brand-orange mb-2">
            PROFIL ENTREPRISE
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Mon profil</h1>
          <p className="text-slate-500 text-pretty">Gérez les informations de votre entreprise.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-navy-light text-white font-semibold rounded-full transition-colors"
          >
            Modifier
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-full transition-colors"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-brand-navy to-brand-navy-light relative">
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors">
                  <Camera className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Logo */}
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-brand-navy" aria-hidden="true" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-brand-orange hover:bg-brand-orange-dark rounded-lg text-white transition-colors">
                    <Camera className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1">{formData.nom}</h2>
              <p className="text-sm text-slate-500 mb-4">{formData.secteur}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {formData.taille}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {formData.adresse}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Globe className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <a href={formData.siteWeb} target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">
                    {formData.siteWeb}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mt-6">
            <h3 className="font-semibold text-slate-900 mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Offres publiées</span>
                <span className="font-semibold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Candidatures reçues</span>
                <span className="font-semibold text-slate-900">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Stagiaires recrutés</span>
                <span className="font-semibold text-slate-900">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Description</h3>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none"
              />
            ) : (
              <p className="text-slate-600 leading-relaxed">{formData.description}</p>
            )}
          </div>

          {/* Culture & Avantages */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Culture d'entreprise & Avantages</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Valeurs</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.culture}
                    onChange={(e) => setFormData({ ...formData, culture: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                  />
                ) : (
                  <p className="text-slate-600">{formData.culture}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Avantages</label>
                {isEditing ? (
                  <textarea
                    value={formData.avantages}
                    onChange={(e) => setFormData({ ...formData, avantages: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none"
                  />
                ) : (
                  <p className="text-slate-600">{formData.avantages}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Informations de contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                {isEditing ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    {formData.email}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                {isEditing ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    {formData.telephone}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Adresse</label>
                {isEditing ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <input
                      type="text"
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    {formData.adresse}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntrepriseProfil
