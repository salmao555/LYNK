import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Upload, FileText, ChevronDown, ChevronUp, Loader2, Sparkles } from 'lucide-react'
import { extractFromCV, mapExtractedProfileToFormData } from '../../services/cvExtraction'

const LOADING_MESSAGES = [
  'On lit votre CV...',
  'Extraction des informations...',
  'Analyse de votre profil...',
  'Presque terminé...',
]

// Reusable upload component
function UploadZone({ onFileSelect, file, onRemove }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

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
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      onFileSelect(droppedFile)
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />

      {file ? (
        <div className="border-2 border-dashed border-brand-primary bg-brand-primary/5 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-brand-primary" aria-hidden="true" />
            <div className="text-left">
              <p className="font-medium text-slate-900">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              onClick={onRemove}
              className="ml-auto text-slate-400 hover:text-red-500 transition-colors"
              aria-label="Supprimer le fichier"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-brand-primary bg-brand-primary/5'
              : 'border-slate-300 hover:border-brand-primary hover:bg-slate-50'
          }`}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" aria-hidden="true" />
          <p className="text-slate-700 mb-2">
            Glissez-déposez votre fichier ici
          </p>
          <p className="text-slate-500 text-sm mb-4">ou</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleBrowseClick()
            }}
            className="px-6 py-2 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Sélectionner un fichier
          </button>
          <p className="text-xs text-slate-400 mt-4">PDF ou DOCX, max 10 MB</p>
        </div>
      )}
    </div>
  )
}

// Boite affichee pendant l'extraction, remplace UploadZone le temps de l'analyse
function LoadingBox() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-2 border-dashed border-brand-primary/30 rounded-2xl py-14 text-center bg-brand-primary/5">
      <div className="relative w-14 h-14 mx-auto mb-4">
        <Loader2 className="h-14 w-14 text-brand-primary animate-spin" aria-hidden="true" />
        <Sparkles className="h-5 w-5 text-brand-primary absolute inset-0 m-auto" aria-hidden="true" />
      </div>
      <p className="font-semibold text-brand-primary mb-1 transition-all">
        {LOADING_MESSAGES[messageIndex]}
      </p>
      <p className="text-slate-400 text-sm">
        Cela peut prendre jusqu'à une minute
      </p>
    </div>
  )
}

function OnboardingCVUpload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [expandedOption, setExpandedOption] = useState('cv') // 'cv' or 'linkedin'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = (selectedFile) => {
    setError('')
    setFile(selectedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setError('')
  }

  const toggleLinkedIn = () => {
    setExpandedOption(expandedOption === 'linkedin' ? 'cv' : 'linkedin')
  }

  const handleContinue = async () => {
    if (!file) return
    setError('')
    setLoading(true)
    try {
      const extracted = await extractFromCV(file)
      const mapped = mapExtractedProfileToFormData(extracted)
      const existingData = JSON.parse(localStorage.getItem('lynk_onboarding_data') || '{}')
      localStorage.setItem('lynk_onboarding_data', JSON.stringify({ ...existingData, ...mapped }))
      navigate('/onboarding/personal-info')
    } catch (err) {
      setError(err.message || 'Erreur lors de la lecture du CV.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Subtle orange gradient - top-right corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 relative z-10">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-3 text-balance">
              Trouvez le stage qui vous correspond vraiment.
            </h1>
            <p className="text-slate-500 text-pretty">
              Notre algorithme calcule un score de compatibilité entre votre profil et chaque offre.
            </p>
          </div>

          {/* Accordion Options */}
          <div className="space-y-4">
            {/* Option A - Upload CV (expanded by default) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedOption('cv')}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold">
                    Recommandé
                  </span>
                  <h3 className="font-semibold text-slate-900">Uploader mon CV</h3>
                </div>
                {expandedOption === 'cv' ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
                )}
              </div>

              {expandedOption === 'cv' && (
                <div className="px-6 pb-6">
                  {loading ? <LoadingBox /> : (
                    <UploadZone onFileSelect={handleFileSelect} file={file} onRemove={handleRemoveFile} />
                  )}

                  {!loading && (
                    <button
                      onClick={toggleLinkedIn}
                      className="mt-4 text-sm text-slate-500 hover:text-brand-primary transition-colors"
                    >
                      Pas de CV ? Essayez avec LinkedIn →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Option B - LinkedIn (collapsed by default) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedOption('linkedin')}
              >
                <h3 className="font-semibold text-slate-900">Ajouter depuis LinkedIn</h3>
                {expandedOption === 'linkedin' ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
                )}
              </div>

              {expandedOption === 'linkedin' && (
                <div className="px-6 pb-6">
                  {/* Instructions */}
                  <div className="mb-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary text-white text-sm font-medium flex items-center justify-center">
                        1
                      </span>
                      <p className="text-slate-700">Allez sur votre profil LinkedIn</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary text-white text-sm font-medium flex items-center justify-center">
                        2
                      </span>
                      <p className="text-slate-700">Cliquez sur "Ressources" (ou "Plus" selon la version de l'interface)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary text-white text-sm font-medium flex items-center justify-center">
                        3
                      </span>
                      <p className="text-slate-700">Cliquez sur "Enregistrer au format PDF"</p>
                    </div>
                  </div>

                  {/* Same upload zone */}
                  {loading ? <LoadingBox /> : (
                    <UploadZone onFileSelect={handleFileSelect} file={file} onRemove={handleRemoveFile} />
                  )}
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Manual fill link */}
          <div className="mt-8 text-center">
            <Link
              to="/onboarding/personal-info"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Je préfère remplir manuellement
            </Link>
          </div>

          {/* Continue button */}
          {file && !loading && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleContinue}
                className="px-8 py-3 rounded-full font-medium bg-brand-primary hover:bg-brand-primary-dark text-white transition-colors inline-flex items-center gap-2"
              >
                Continuer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingCVUpload