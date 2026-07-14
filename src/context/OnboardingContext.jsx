import { createContext, useContext, useState, useEffect } from 'react'
import { emptyProfile } from '../services/cvExtraction'

const OnboardingContext = createContext()
const EMAIL_KEY = 'lynk_onboarding_email'

export function OnboardingProvider({ children }) {
  const [profile, setProfile] = useState(emptyProfile())
  const [pendingEmail, setPendingEmailState] = useState(() => sessionStorage.getItem(EMAIL_KEY) || '')
  const [source, setSource] = useState('cv')

  const setPendingEmail = (email) => {
    setPendingEmailState(email)
    if (email) sessionStorage.setItem(EMAIL_KEY, email)
    else sessionStorage.removeItem(EMAIL_KEY)
  }

  useEffect(() => {
    if (pendingEmail) sessionStorage.setItem(EMAIL_KEY, pendingEmail)
  }, [pendingEmail])

  const reset = () => {
    setProfile(emptyProfile())
    setPendingEmail('')
    setSource('cv')
  }

  return (
    <OnboardingContext.Provider value={{
      profile,
      setProfile,
      pendingEmail,
      setPendingEmail,
      source,
      setSource,
      reset,
    }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
