import { Link } from 'react-router-dom'

function OnboardingLayout({ children, showStepper = true, stepperProps }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-brand-primary">Lynk</Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default OnboardingLayout
