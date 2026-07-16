const API_URL = 'http://localhost:8000/api'

const ACCEPTED_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024

export const CV_SCHEMA = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  ecole: '',
  niveau: '',
  skills: [],
  experience: [],
}

export function validateCVFile(file) {
  if (!file) return 'Aucun fichier sélectionné.'
  const ext = ACCEPTED_TYPES[file.type]
  if (!ext && !/\.(pdf|docx)$/i.test(file.name)) {
    return 'Format non supporté. Utilisez PDF ou DOCX.'
  }
  if (file.size > MAX_SIZE_BYTES) {
    return 'Fichier trop volumineux (max 5 Mo).'
  }
  return null
}

export async function extractFromCV(file) {
  const validationError = validateCVFile(file)
  if (validationError) throw new Error(validationError)

  const formData = new FormData()
  formData.append('cv', file)

  const res = await fetch(`${API_URL}/cvs/extract/`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur lors de l\'extraction.' }))
    throw new Error(err.error || `Erreur ${res.status}`)
  }

  const extracted = await res.json()
  return { ...CV_SCHEMA, ...extracted }
}

/**
 * Mappe le schema d'extraction CV (prenom/nom/ecole/telephone/niveau)
 * vers les noms de champs attendus par OnboardingPersonalInfo.jsx
 * (firstName/lastName/school/phone/educationLevel).
 */
export function mapExtractedProfileToFormData(extracted) {
  return {
    firstName: extracted.prenom || '',
    lastName: extracted.nom || '',
    email: extracted.email || '',
    phone: extracted.telephone || '',
    school: extracted.ecole || '',
    educationLevel: mapNiveauToEducationLevel(extracted.niveau),
    skills: extracted.skills || [],
    experiences: mapExtractedExperiences(extracted.experience),
    projects: mapExtractedProjects(extracted.projets),
  }
}

/**
 * OnboardingProjectsSkills.jsx attend une cle "projects" avec la forme
 * {id, title, description, link} - le schema d'extraction CV renvoie desormais
 * un champ "projets" separe de "experience" avec {titre, description, lien}.
 */
function mapExtractedProjects(projetsArray) {
  if (!Array.isArray(projetsArray) || projetsArray.length === 0) return []

  return projetsArray.map((proj, index) => ({
    id: Date.now() + 1000 + index, // offset pour ne pas collisionner avec les ids d'experiences
    title: proj.titre || '',
    description: proj.description || '',
    link: proj.lien || '',
  }))
}

/**
 * OnboardingExperience.jsx attend une cle "experiences" (pluriel) avec la forme
 * {id, title, company, startDate, endDate, description} - differente du schema
 * d'extraction CV {titre, entreprise, periode, description}.
 *
 * "periode" (ex: "Juin - Aout 2025") ne peut pas etre decoupe de facon fiable en
 * dates exactes yyyy-mm-dd pour les <input type="date">, donc on le glisse dans
 * la description plutot que de deviner des dates fausses ; l'etudiant renseigne
 * les dates lui-meme.
 */
function mapExtractedExperiences(experienceArray) {
  if (!Array.isArray(experienceArray)) return []

  return experienceArray.map((exp, index) => ({
    id: Date.now() + index,
    title: exp.titre || '',
    company: exp.entreprise || '',
    startDate: '',
    endDate: '',
    description: exp.periode
      ? `(${exp.periode}) ${exp.description || ''}`.trim()
      : (exp.description || ''),
  }))
}

/**
 * Heuristique texte libre -> valeur du <select> educationLevel.
 * Ne devine pas au hasard : si aucun mot-clé ne matche, retourne ''
 * (le select affichera "Sélectionner", l'étudiant choisit lui-même).
 */
function mapNiveauToEducationLevel(niveau) {
  if (!niveau) return ''
  const n = niveau.toLowerCase()

  if (n.includes('doctorat') || n.includes('phd')) return 'doctorat'
  if (n.includes('master 2') || n.includes('m2') || n.includes('bac+5') || n.includes('bac +5')) return 'bac+5'
  if (n.includes('master 1') || n.includes('m1') || n.includes('bac+4') || n.includes('bac +4')) return 'bac+4'
  if (n.includes('licence') || n.includes('bac+3') || n.includes('bac +3') || n.includes('l3')) return 'bac+3'
  if (n.includes('bts') || n.includes('dut') || n.includes('bac+2') || n.includes('bac +2') || n.includes('l2')) return 'bac+2'
  if (n.includes('bac+1') || n.includes('bac +1') || n.includes('l1')) return 'bac+1'

  // Ecoles d'ingenieurs (cycle ingenieur / eleve ingenieur) : pas de correspondance directe
  // bac+X, on infere depuis l'annee mentionnee si presente.
  if (n.includes('ingenieur') || n.includes('ingénieur')) {
    if (n.includes('3eme') || n.includes('3ème') || n.includes('troisieme') || n.includes('troisième') || n.includes('derniere annee') || n.includes('dernière année')) {
      return 'bac+5'
    }
    if (n.includes('2eme') || n.includes('2ème') || n.includes('deuxieme') || n.includes('deuxième')) {
      return 'bac+4'
    }
    if (n.includes('1ere') || n.includes('1ère') || n.includes('premiere') || n.includes('première')) {
      return 'bac+3'
    }
    // Cycle ingenieur mentionne sans annee precise - approximation prudente,
    // l'etudiant peut corriger manuellement si besoin.
    return 'bac+3'
  }

  if (n.includes('bac')) return 'bac'

  return ''
}

export function emptyProfile() {
  return {
    ...CV_SCHEMA,
    skills: [],
    experience: [{ titre: '', entreprise: '', periode: '', description: '' }],
  }
}