import { Link } from 'react-router-dom'

const STEPS = [
  { num: 1, label: 'CV' },
  { num: 2, label: 'Vérification' },
  { num: 3, label: 'Email' },
  { num: 4, label: 'Bienvenue' },
]

export default function OnboardingLayout({ step, children }) {
  return (
    <div className="min-h-screen bg-slate-200 font-sans flex flex-col">
      <header className="px-8 py-5 flex items-center justify-between bg-white border-b border-slate-200">
        <Link to="/" className="font-display text-2xl font-bold text-brand-primary">
          Lynk
        </Link>
        <div className="flex items-center gap-2">
          {STEPS.map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  s.num === step
                    ? 'bg-brand-primary text-white'
                    : s.num < step
                    ? 'bg-brand-primary/20 text-brand-primary'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {s.num}
              </div>
              <span
                className={`text-xs hidden sm:inline ${
                  s.num === step ? 'text-brand-primary font-medium' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
              {s.num < 4 && <div className="w-6 h-px bg-slate-200 hidden sm:block" />}
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  )
}
