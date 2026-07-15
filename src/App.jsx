import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Logos from './components/Logos'
import StatsBar from './components/StatsBar'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Chatbot from './components/Chatbot'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Offres from './pages/Offres'
import MonCV from './pages/MonCV'
import EntrepriseDashboard from './pages/EntrepriseDashboard'
import EntreprisePublier from './pages/EntreprisePublier'
import EntrepriseProfil from './pages/EntrepriseProfil'
import EntrepriseOffres from './pages/EntrepriseOffres'
import Welcome from './pages/Welcome'
import MonGuide from './pages/MonGuide'
import Messages from './pages/Messages'
import EtablissementConventions from './pages/EtablissementConventions'
import EtablissementEtudiants from './pages/EtablissementEtudiants'
import EtablissementStatistiques from './pages/EtablissementStatistiques'
import AcademiqueChoix from './pages/AcademiqueChoix'
import OnboardingCVUpload from './pages/onboarding/OnboardingCVUpload'
import OnboardingPersonalInfo from './pages/onboarding/OnboardingPersonalInfo'
import OnboardingExperience from './pages/onboarding/OnboardingExperience'
import OnboardingProjectsSkills from './pages/onboarding/OnboardingProjectsSkills'
import OnboardingPreferences from './pages/onboarding/OnboardingPreferences'
import OnboardingMatchingPreview from './pages/onboarding/OnboardingMatchingPreview'
import OnboardingAuth from './pages/onboarding/OnboardingAuth'
import { useAuth } from './context/AuthContext'

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Logos />
      <StatsBar />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  )
}

function PageAvecNavbar({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

function EtudiantRoute({ children }) {
  const { user } = useAuth()
  if (!user || user.role !== 'etudiant' || !user.verified) {
    return <Navigate to="/onboarding/cv-upload" replace />
  }
  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/academique/choix" element={<AcademiqueChoix />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />

        {/* New onboarding flow - OAuth based */}
        <Route path="/onboarding/cv-upload" element={<OnboardingCVUpload />} />
        <Route path="/onboarding/personal-info" element={<OnboardingPersonalInfo />} />
        <Route path="/onboarding/experience" element={<OnboardingExperience />} />
        <Route path="/onboarding/projects-skills" element={<OnboardingProjectsSkills />} />
        <Route path="/onboarding/preferences" element={<OnboardingPreferences />} />
        <Route path="/onboarding/matching-preview" element={<OnboardingMatchingPreview />} />
        <Route path="/onboarding/auth" element={<OnboardingAuth />} />

        <Route path="/bienvenue" element={<PageAvecNavbar><Welcome /></PageAvecNavbar>} />

        <Route path="/offres" element={<PageAvecNavbar><Offres /></PageAvecNavbar>} />
        <Route path="/mon-cv" element={<PageAvecNavbar><MonCV /></PageAvecNavbar>} />
        <Route path="/mon-guide" element={<PageAvecNavbar><MonGuide /></PageAvecNavbar>} />
        <Route path="/messages" element={<PageAvecNavbar><Messages /></PageAvecNavbar>} />
        <Route path="/entreprise" element={<PageAvecNavbar><EntrepriseDashboard /></PageAvecNavbar>} />
        <Route path="/entreprise/publier" element={<PageAvecNavbar><EntreprisePublier /></PageAvecNavbar>} />
        <Route path="/entreprise/profil" element={<PageAvecNavbar><EntrepriseProfil /></PageAvecNavbar>} />
        <Route path="/entreprise/offres" element={<PageAvecNavbar><EntrepriseOffres /></PageAvecNavbar>} />
        <Route path="/etablissement/conventions" element={<PageAvecNavbar><EtablissementConventions /></PageAvecNavbar>} />
        <Route path="/etablissement/etudiants" element={<PageAvecNavbar><EtablissementEtudiants /></PageAvecNavbar>} />
        <Route path="/etablissement/statistiques" element={<PageAvecNavbar><EtablissementStatistiques /></PageAvecNavbar>} />
      </Routes>
      <Chatbot />
    </>
  )
}

export default App
