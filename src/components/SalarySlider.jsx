import { useState } from 'react'
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
  const [manualInput, setManualInput] = useState(value.toString())

  const Icon = icon === 'clock' ? Clock : DollarSign

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value)
    setManualInput(newValue.toString())
    onChange(e)
  }

  const handleManualChange = (e) => {
    const inputValue = e.target.value
    setManualInput(inputValue)
    
    const numValue = parseInt(inputValue)
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange({ target: { value: numValue } })
    }
  }

  const handleManualBlur = () => {
    const numValue = parseInt(manualInput)
    if (isNaN(numValue) || numValue < min) {
      setManualInput(min.toString())
      onChange({ target: { value: min } })
    } else if (numValue > max) {
      setManualInput(max.toString())
      onChange({ target: { value: max } })
    }
  }

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
          onChange={handleSliderChange}
          className="w-full h-2 bg-cream-white rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-500 whitespace-nowrap">{min} {unit.split('/')[0]}</span>
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-lg flex-1">
            <Icon className="h-4 w-4 text-brand-primary flex-shrink-0" aria-hidden="true" />
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={manualInput}
              onChange={handleManualChange}
              onBlur={handleManualBlur}
              className="w-24 bg-transparent font-semibold text-brand-primary focus:outline-none text-right"
            />
            <span className="text-brand-primary text-sm whitespace-nowrap">{unit}</span>
          </div>
          <span className="text-sm text-slate-500 whitespace-nowrap">{max} {unit.split('/')[0]}</span>
        </div>
      </div>
    </div>
  )
}

export default SalarySlider
