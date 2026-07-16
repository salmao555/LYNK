import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isFuture = stepNumber > currentStep
          const isClickable = isCompleted && onStepClick

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1 relative">
              <button
                onClick={() => isClickable && onStepClick(stepNumber)}
                disabled={!isClickable}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                  isCurrent
                    ? 'bg-brand-primary text-white'
                    : isCompleted
                    ? 'bg-brand-primary text-white'
                    : 'bg-slate-200 text-slate-400'
                } ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  stepNumber
                )}
              </button>
              
              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  isCurrent
                    ? 'text-brand-primary'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>

              {/* Connector line (except for last step) */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 z-0">
                  <div
                    className={`h-full transition-all ${
                      isCompleted ? 'bg-brand-primary' : 'bg-slate-200'
                    }`}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stepper
