import { useCallback, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Upload, FileText, Loader2 } from 'lucide-react'
import OnboardingLayout from './OnboardingLayout'
import { useOnboarding } from '../../context/OnboardingContext'
import { extractFromCV } from '../../services/cvExtraction'

export default function OnboardingUpload() {
  const navigate = useNavigate()
  const { setProfile, setSource } = useOnboarding()
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    setError('')
    setLoading(true)
    try {
      const extracted = await extractFromCV(file)
      setProfile(extracted)
      setSource('cv')
      navigate('/etudiant/onboarding/verification')
    } catch (err) {
      setError(err.message || 'Erreur lors de la lecture du CV.')
    } finally {
      setLoading(false)
    }
  }, [navigate, setProfile, setSource])

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const onBrowse = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <OnboardingLayout step={1}>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
          Commençons par votre CV
        </h1>
        <p className="text-slate-500 mb-8">
          Déposez votre CV et notre IA remplira votre profil automatiquement.
        </p>

        {loading ? (
          <div className="border-2 border-dashed border-brand-primary/30 rounded-2xl py-16 text-center bg-brand-primary/5">
            <Loader2 className="h-10 w-10 text-brand-primary animate-spin mx-auto mb-4" />
            <p className="font-semibold text-brand-primary">On lit votre CV...</p>
            <p className="text-slate-400 text-sm mt-1">Extraction en cours, quelques secondes</p>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl py-14 text-center cursor-pointer transition-colors ${
              dragging
                ? 'border-brand-primary bg-brand-primary/10'
                : 'border-brand-primary/30 bg-brand-primary/5 hover:bg-brand-primary/10'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={onBrowse}
            />
            <Upload className="h-10 w-10 text-brand-primary mx-auto mb-4" />
            <p className="font-semibold text-brand-primary mb-1">
              Glissez votre CV ici
            </p>
            <p className="text-slate-400 text-sm mb-4">PDF ou DOCX · max 5 Mo</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold transition-colors"
            >
              <FileText className="h-4 w-4" />
              Parcourir
            </button>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/etudiant/onboarding/verification?manual=1"
            className="text-sm text-slate-400 hover:text-brand-primary transition-colors underline-offset-2 hover:underline"
          >
            Je préfère remplir manuellement
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  )
}
