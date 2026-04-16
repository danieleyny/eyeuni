import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Send, Check, Loader2 } from 'lucide-react'
import { useIntakeForm } from './useIntakeForm'
import { STEPS } from './formConstants'
import StepBusinessInfo from './StepBusinessInfo'
import StepCurrentWebsite from './StepCurrentWebsite'
import StepGoals from './StepGoals'
import StepContentPages from './StepContentPages'
import StepDesign from './StepDesign'
import StepFeatures from './StepFeatures'
import StepBudgetTimeline from './StepBudgetTimeline'
import StepReview from './StepReview'
import IntakeSuccess from './IntakeSuccess'

const stepComponents = [
  StepBusinessInfo,
  StepCurrentWebsite,
  StepGoals,
  StepContentPages,
  StepDesign,
  StepFeatures,
  StepBudgetTimeline,
  null, // Review step handled separately
]

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -150 : 150,
    opacity: 0,
  }),
}

export default function IntakeForm({ onSubmitted }) {
  const {
    formData, currentStep, direction, errors,
    isSubmitting, isSubmitted,
    updateField, toggleArrayItem, next, prev, submit, goToStep,
  } = useIntakeForm()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  useEffect(() => {
    if (isSubmitted && onSubmitted) onSubmitted()
  }, [isSubmitted, onSubmitted])

  if (isSubmitted) {
    return <IntakeSuccess formData={formData} />
  }

  const isReviewStep = currentStep === STEPS.length - 1
  const isLastContentStep = currentStep === STEPS.length - 2
  const StepComponent = stepComponents[currentStep]
  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-10">
        {/* Step indicators - desktop */}
        <div className="hidden md:flex items-center justify-between mb-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const completed = i < currentStep
            const active = i === currentStep
            return (
              <div key={step.title} className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    completed
                      ? 'bg-green-500/20 text-green-400'
                      : active
                        ? 'bg-accent/20 text-primary ring-2 ring-accent/40'
                        : 'bg-dark-card border border-dark-border text-gray-600'
                  }`}
                >
                  {completed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  active ? 'text-primary' : completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step indicator - mobile */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className="text-sm text-primary font-medium">{STEPS[currentStep].title}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-dark-card/50 border border-dark-border rounded-2xl p-6 md:p-10 backdrop-blur-sm min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isReviewStep ? (
              <StepReview formData={formData} onGoToStep={goToStep} />
            ) : (
              <StepComponent
                formData={formData}
                updateField={updateField}
                toggleArrayItem={toggleArrayItem}
                errors={errors}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={prev}
          className={`flex items-center gap-2 px-6 py-3.5 border border-dark-border rounded-xl text-gray-300 font-medium transition-all duration-300 hover:border-primary/30 hover:text-primary ${
            currentStep === 0 ? 'invisible' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="text-sm text-gray-500 hidden sm:block">
          {currentStep + 1} / {STEPS.length}
        </span>

        {isReviewStep ? (
          <button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Confirm & Submit
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            {isLastContentStep ? 'Review Answers' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
