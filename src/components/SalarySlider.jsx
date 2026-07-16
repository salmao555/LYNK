import { DollarSign, Clock } from 'lucide-react'

function SalarySlider({ 
  value, 
  onChange, 
  min = 0, 
  max = 15000, 
  step = 100, 
  label, 
  unit = 'MAD/mois',
  icon = 'dollar'
}) {
  const Icon = icon === 'clock' ? Clock : DollarSign

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="space-y-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{min} {unit.split('/')[0]}</span>
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-lg">
            <Icon className="h-4 w-4 text-brand-primary" aria-hidden="true" />
            <span className="font-semibold text-brand-primary">{value} {unit}</span>
          </div>
          <span className="text-sm text-slate-500">{max} {unit.split('/')[0]}</span>
        </div>
      </div>
    </div>
  )
}

export default SalarySlider
