import { createContext, useContext, useState, useEffect } from 'react'

const OnboardingEtablissementContext = createContext()
const STORAGE_KEY = 'lynk_etablissement_onboarding_data'

export function OnboardingEtablissementProvider({ children }) {
  const [formData, setFormData] = useState({
    // Step 1: General information
    etablissementName: '',
    logo: null,
    logoPreview: null,
    etablissementType: '',
    cities: [],
    website: '',

    // Step 2: Filières
    filieres: [],

    // Step 3: Contact person
    contact: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phone: '',
    },

    // Step 4: Discovery (liked enterprises)
    likedEnterprises: [],

    // Step 5: Auth (handled by OAuth)
  })

  const [visitedSteps, setVisitedSteps] = useState([1])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error('Error loading onboarding data:', e)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const markStepVisited = (stepNumber) => {
    setVisitedSteps(prev => {
      if (!prev.includes(stepNumber)) {
        return [...prev, stepNumber].sort((a, b) => a - b)
      }
      return prev
    })
  }

  const canNavigateToStep = (stepNumber) => {
    return visitedSteps.includes(stepNumber) || stepNumber === 1
  }

  const reset = () => {
    setFormData({
      etablissementName: '',
      logo: null,
      logoPreview: null,
      etablissementType: '',
      cities: [],
      website: '',
      filieres: [],
      contact: {
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        phone: '',
      },
      likedEnterprises: [],
    })
    setVisitedSteps([1])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <OnboardingEtablissementContext.Provider value={{
      formData,
      updateFormData,
      visitedSteps,
      markStepVisited,
      canNavigateToStep,
      reset,
    }}>
      {children}
    </OnboardingEtablissementContext.Provider>
  )
}

export function useOnboardingEtablissement() {
  return useContext(OnboardingEtablissementContext)
}
