import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import PublicNavbar from './components/PublicNavbar'
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
import EntreprisePublier from './pages/EntreprisePublier'
import EntrepriseProfil from './pages/EntrepriseProfil'
import EntrepriseOffres from './pages/EntrepriseOffres'
import EntrepriseOffreDetail from './pages/EntrepriseOffreDetail'
import EntrepriseCandidatures from './pages/EntrepriseCandidatures'
import EntrepriseMatches from './pages/EntrepriseMatches'
import EntrepriseReseau from './pages/EntrepriseReseau'
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
import OnboardingEntrepriseInfo from './pages/onboarding/entreprise/OnboardingEntrepriseInfo'
import OnboardingEntrepriseOfferInfo from './pages/onboarding/entreprise/OnboardingEntrepriseOfferInfo'
import OnboardingEntrepriseRequirements from './pages/onboarding/entreprise/OnboardingEntrepriseRequirements'
import OnboardingEntrepriseCompensation from './pages/onboarding/entreprise/OnboardingEntrepriseCompensation'
import OnboardingEntrepriseMatching from './pages/onboarding/entreprise/OnboardingEntrepriseMatching'
import OnboardingEntrepriseAuth from './pages/onboarding/entreprise/OnboardingEntrepriseAuth'
import OnboardingEtablissementInfo from './pages/onboarding/etablissement/OnboardingEtablissementInfo'
import OnboardingEtablissementFilieres from './pages/onboarding/etablissement/OnboardingEtablissementFilieres'
import OnboardingEtablissementContact from './pages/onboarding/etablissement/OnboardingEtablissementContact'
import OnboardingEtablissementDiscovery from './pages/onboarding/etablissement/OnboardingEtablissementDiscovery'
import OnboardingEtablissementAuth from './pages/onboarding/etablissement/OnboardingEtablissementAuth'
import EtablissementDashboard from './pages/EtablissementDashboard'
import EtudiantDashboard from './pages/etudiant/EtudiantDashboard'
import EtudiantCandidatures from './pages/etudiant/EtudiantCandidatures'
import EtudiantOffreDetail from './pages/etudiant/EtudiantOffreDetail'
import { OnboardingEtablissementProvider } from './context/OnboardingEtablissementContext'
import { useAuth } from './context/AuthContext'

function LandingPage() {
  return (
    <div>
      <PublicNavbar />
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

function PageAvecPublicNavbar({ children }) {
  return (
    <div>
      <PublicNavbar />
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
        <Route path="/academique/choix" element={<PageAvecPublicNavbar><AcademiqueChoix /></PageAvecPublicNavbar>} />
        <Route path="/login/:role" element={<PageAvecPublicNavbar><Login /></PageAvecPublicNavbar>} />
        <Route path="/signup/:role" element={<PageAvecPublicNavbar><Signup /></PageAvecPublicNavbar>} />

        {/* New onboarding flow - OAuth based */}
        <Route path="/onboarding/cv-upload" element={<PageAvecPublicNavbar><OnboardingCVUpload /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/personal-info" element={<PageAvecPublicNavbar><OnboardingPersonalInfo /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/experience" element={<PageAvecPublicNavbar><OnboardingExperience /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/projects-skills" element={<PageAvecPublicNavbar><OnboardingProjectsSkills /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/preferences" element={<PageAvecPublicNavbar><OnboardingPreferences /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/matching-preview" element={<PageAvecPublicNavbar><OnboardingMatchingPreview /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/auth" element={<PageAvecPublicNavbar><OnboardingAuth /></PageAvecPublicNavbar>} />

        {/* Enterprise onboarding flow */}
        <Route path="/onboarding/entreprise/info" element={<PageAvecPublicNavbar><OnboardingEntrepriseInfo /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/entreprise/offer-info" element={<PageAvecPublicNavbar><OnboardingEntrepriseOfferInfo /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/entreprise/requirements" element={<PageAvecPublicNavbar><OnboardingEntrepriseRequirements /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/entreprise/compensation" element={<PageAvecPublicNavbar><OnboardingEntrepriseCompensation /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/entreprise/matching" element={<PageAvecPublicNavbar><OnboardingEntrepriseMatching /></PageAvecPublicNavbar>} />
        <Route path="/onboarding/entreprise/auth" element={<PageAvecPublicNavbar><OnboardingEntrepriseAuth /></PageAvecPublicNavbar>} />

        {/* Establishment onboarding flow */}
        <Route path="/onboarding/etablissement/*" element={
          <OnboardingEtablissementProvider>
            <PageAvecPublicNavbar>
              <Routes>
                <Route path="info" element={<OnboardingEtablissementInfo />} />
                <Route path="filieres" element={<OnboardingEtablissementFilieres />} />
                <Route path="contact" element={<OnboardingEtablissementContact />} />
                <Route path="discovery" element={<OnboardingEtablissementDiscovery />} />
                <Route path="auth" element={<OnboardingEtablissementAuth />} />
              </Routes>
            </PageAvecPublicNavbar>
          </OnboardingEtablissementProvider>
        } />

        <Route path="/bienvenue" element={<PageAvecNavbar><Welcome /></PageAvecNavbar>} />
        <Route path="/etudiant" element={<Navigate to="/offres" replace />} />
        <Route path="/offres" element={<PageAvecNavbar><Offres /></PageAvecNavbar>} />
        <Route path="/offres/:id" element={<PageAvecNavbar><EtudiantOffreDetail /></PageAvecNavbar>} />
        <Route path="/etudiant/candidatures" element={<PageAvecNavbar><EtudiantCandidatures /></PageAvecNavbar>} />
        <Route path="/mon-cv" element={<PageAvecNavbar><MonCV /></PageAvecNavbar>} />
        <Route path="/mon-guide" element={<PageAvecNavbar><MonGuide /></PageAvecNavbar>} />
        <Route path="/messages" element={<PageAvecNavbar><Messages /></PageAvecNavbar>} />
        <Route path="/entreprise" element={<Navigate to="/entreprise/offres" replace />} />
        <Route path="/entreprise/publier" element={<PageAvecNavbar><EntreprisePublier /></PageAvecNavbar>} />
        <Route path="/entreprise/profil" element={<PageAvecNavbar><EntrepriseProfil /></PageAvecNavbar>} />
        <Route path="/entreprise/offres" element={<PageAvecNavbar><EntrepriseOffres /></PageAvecNavbar>} />
        <Route path="/entreprise/offres/:id" element={<PageAvecNavbar><EntrepriseOffreDetail /></PageAvecNavbar>} />
        <Route path="/entreprise/candidatures" element={<PageAvecNavbar><EntrepriseCandidatures /></PageAvecNavbar>} />
        <Route path="/entreprise/matches" element={<PageAvecNavbar><EntrepriseMatches /></PageAvecNavbar>} />
        <Route path="/entreprise/reseau" element={<PageAvecNavbar><EntrepriseReseau /></PageAvecNavbar>} />
        <Route path="/etablissement" element={<PageAvecNavbar><EtablissementDashboard /></PageAvecNavbar>} />
        <Route path="/etablissement/conventions" element={<PageAvecNavbar><EtablissementConventions /></PageAvecNavbar>} />
        <Route path="/etablissement/etudiants" element={<PageAvecNavbar><EtablissementEtudiants /></PageAvecNavbar>} />
        <Route path="/etablissement/statistiques" element={<PageAvecNavbar><EtablissementStatistiques /></PageAvecNavbar>} />
      </Routes>
      <Chatbot />
    </>
  )
}

export default App
