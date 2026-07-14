/**
 * CV extraction pipeline (frontend mock).
 * Production: pdf-parse / mammoth for text → LLM with structured JSON prompt.
 */

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

async function parseFileText(file) {
  const name = file.name.toLowerCase()
  if (name.endsWith('.pdf')) {
    // pdf-parse côté serveur en production
    return `[PDF] ${file.name}`
  }
  if (name.endsWith('.docx')) {
    // mammoth côté serveur en production
    return `[DOCX] ${file.name}`
  }
  return file.name
}

async function extractWithLLM(_rawText, fileName) {
  await new Promise((r) => setTimeout(r, 1800))

  const base = fileName.replace(/\.(pdf|docx)$/i, '').replace(/[_-]/g, ' ')
  const parts = base.split(' ').filter(Boolean)

  return {
    prenom: parts[0] ? capitalize(parts[0]) : 'Marie',
    nom: parts[1] ? capitalize(parts[1]) : 'Dupont',
    email: `${(parts[0] || 'marie').toLowerCase()}.${(parts[1] || 'dupont').toLowerCase()}@email.com`,
    telephone: '+33 6 12 34 56 78',
    ecole: 'Université Paris-Saclay',
    niveau: 'Master 2 — Informatique',
    skills: ['React', 'TypeScript', 'Node.js', 'Git', 'Agile'],
    experience: [
      {
        titre: 'Stage développeur front-end',
        entreprise: 'Startup Tech',
        periode: 'Juin — Août 2025',
        description: 'Développement de composants React et intégration API REST.',
      },
      {
        titre: 'Projet associatif — Trésorière',
        entreprise: 'BDE Informatique',
        periode: '2024 — 2025',
        description: 'Gestion budgétaire et organisation d\'événements étudiants.',
      },
    ],
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export async function extractFromCV(file) {
  const error = validateCVFile(file)
  if (error) throw new Error(error)

  const rawText = await parseFileText(file)
  const extracted = await extractWithLLM(rawText, file.name)
  return { ...CV_SCHEMA, ...extracted }
}

export function emptyProfile() {
  return {
    ...CV_SCHEMA,
    skills: [],
    experience: [{ titre: '', entreprise: '', periode: '', description: '' }],
  }
}
