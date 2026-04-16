import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { TIMELINE_OPTIONS } from './formConstants'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepBudgetTimeline({ formData, updateField }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Timeline & Final Notes</h3>
        </div>
        <p className="text-gray-400">Almost done! Let us know your timeline and anything else.</p>
      </div>

      <div className="space-y-6">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>Timeline</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TIMELINE_OPTIONS.map((option) => {
              const selected = formData.timeline === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField('timeline', option)}
                  className={`px-4 py-3.5 rounded-xl border text-sm text-center transition-all duration-300 ${
                    selected
                      ? 'border-primary/50 bg-primary/5 text-white shadow-lg shadow-accent/10'
                      : 'border-dark-border bg-dark-card/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>Anything else we should know?</label>
          <textarea
            rows={4}
            placeholder="Any additional details, special requirements, or questions..."
            className={`${inputClasses} resize-none`}
            value={formData.anythingElse}
            onChange={(e) => updateField('anythingElse', e.target.value)}
          />
        </motion.div>
      </div>
    </div>
  )
}
