import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />

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