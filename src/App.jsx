import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Logos from './components/Logos'
import StatsBar from './components/StatsBar'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Offres from './pages/Offres'
import MonCV from './pages/MonCV'
import DashboardEntreprise from './pages/DashboardEntreprise'
import Welcome from './pages/Welcome'


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
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/:role" element={<Signup />} />

      <Route path="/bienvenue" element={<PageAvecNavbar><Welcome /></PageAvecNavbar>} />

      <Route path="/offres" element={<PageAvecNavbar><Offres /></PageAvecNavbar>} />
      <Route path="/mon-cv" element={<PageAvecNavbar><MonCV /></PageAvecNavbar>} />
      <Route path="/entreprise" element={<PageAvecNavbar><DashboardEntreprise /></PageAvecNavbar>} />
    </Routes>
  )
}

export default App