import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Upload, Download, Mail, Users, FileText } from 'lucide-react'
import Stepper from '../../../components/Stepper'
import { useOnboardingEtablissement } from '../../../context/OnboardingEtablissementContext'

function OnboardingEtablissementEtudiants() {
  const navigate = useNavigate()
  const { formData, updateFormData, markStepVisited, canNavigateToStep } = useOnboardingEtablissement()
  
  const [isDragging, setIsDragging] = useState(false)
  const [csvPreview, setCsvPreview] = useState(null)

  const etablissementSteps = [
    { label: 'Infos', path: '/onboarding/etablissement/info' },
    { label: 'Filières', path: '/onboarding/etablissement/filieres' },
    { label: 'Étudiants', path: '/onboarding/etablissement/etudiants' },
    { label: 'Contact', path: '/onboarding/etablissement/contact' },
    { label: 'Découverte', path: '/onboarding/etablissement/discovery' },
    { label: 'Connexion', path: '/onboarding/etablissement/auth' },
  ]

  useEffect(() => {
    markStepVisited(3)
  }, [])

  const handleDownloadTemplate = () => {
    // Create a simple CSV template
    const headers = ['nom', 'prénom', 'email', 'filière', 'année']
    const csvContent = headers.join(',') + '\n'
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'modele_import_etudiants.csv'
    link.click()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      handleFileUpload(file)
    }
  }

  const handleFileUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      const lines = content.split('\n').filter(line => line.trim())
      const studentCount = Math.max(0, lines.length - 1) // Subtract header row
      
      updateFormData({
        studentImport: {
          ...formData.studentImport,
          csvFile: file,
          csvPreview: content,
          studentCount
        }
      })
      setCsvPreview(studentCount)
    }
    reader.readAsText(file)
  }

  const handleEmailDomainChange = (e) => {
    updateFormData({
      studentImport: {
        ...formData.studentImport,
        emailDomain: e.target.value
      }
    })
  }

  const handleNext = () => {
    navigate('/onboarding/etablissement/contact')
  }

  const handleStepClick = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      const step = etablissementSteps[stepNumber - 1]
      if (step) {
        navigate(step.path)
      }
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col relative overflow-hidden">
      {/* Subtle orange gradient - top-right corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="bg-cream-white border-b border-cream-border px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Stepper */}
          <Stepper steps={etablissementSteps} currentStep={3} onStepClick={handleStepClick} />

          {/* Main Card */}
          <div className="bg-cream-white rounded-2xl border border-cream-border shadow-sm p-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Ajoutez vos étudiants</h1>
            <p className="text-slate-500 mb-8">Deux façons de faire, vous pouvez utiliser les deux. Cette étape est optionnelle — vous pourrez compléter plus tard depuis votre dashboard.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Block A: CSV Import (Recommended) */}
              <div className="border-2 border-brand-primary/20 rounded-2xl p-6 bg-brand-primary/5 relative">
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-semibold">
                    Recommandé
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-brand-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Import en masse</h3>
                    <p className="text-sm text-slate-500">Téléchargez et remplissez le modèle CSV</p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadTemplate}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-cream-border bg-cream-white hover:bg-cream transition-colors text-sm font-medium text-slate-700"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Télécharger le modèle
                </button>

                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                    isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-cream-border hover:border-cream-border'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-cream-white mb-2" aria-hidden="true" />
                    <p className="text-sm text-slate-600 mb-1">
                      {formData.studentImport.csvFile ? 'Fichier chargé' : 'Glissez-déposez ou cliquez pour uploader'}
                    </p>
                    <p className="text-xs text-cream-white">Format CSV uniquement</p>
                  </label>
                </div>

                {csvPreview !== null && (
                  <div className="mt-4 p-3 bg-cream-white rounded-lg border border-cream-border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-700">
                        {csvPreview} étudiant(s) détecté(s)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Block B: Email Domain */}
              <div className="border-2 border-cream-border rounded-2xl p-6 bg-cream">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cream-white flex items-center justify-center">
                    <Mail className="h-6 w-6 text-slate-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Domaine email institutionnel</h3>
                    <p className="text-sm text-slate-500">Rattachement automatique</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">
                  Tout étudiant s'inscrivant avec un email @votredomaine sera automatiquement rattaché à votre établissement, sans import manuel.
                </p>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Domaine de vos emails étudiants
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-cream-white border border-cream-border rounded-l-xl text-slate-600 text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      value={formData.studentImport.emailDomain}
                      onChange={handleEmailDomainChange}
                      placeholder="emi.ac.ma"
                      className="flex-1 px-4 py-3 border border-l-0 border-cream-border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Utile en continu, pas seulement au moment de l'onboarding
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/onboarding/etablissement/filieres"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-cream-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Link>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors"
              >
                Suivant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingEtablissementEtudiants
