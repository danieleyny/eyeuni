import { motion } from 'framer-motion'
import { Wrench, Check } from 'lucide-react'
import { FEATURES_OPTIONS } from './formConstants'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepFeatures({ formData, toggleArrayItem, updateField, errors }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Features & Functionality</h3>
        </div>
        <p className="text-gray-400">What functionality does your website need?</p>
      </div>

      <div className="space-y-6">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>
            Features you need <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {FEATURES_OPTIONS.map((feature) => {
              const selected = formData.featuresNeeded.includes(feature)
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleArrayItem('featuresNeeded', feature)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-300 ${
                    selected
                      ? 'border-primary/50 bg-primary/5 text-white'
                      : 'border-dark-border bg-dark-card/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-4.5 h-4.5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                    selected ? 'bg-accent' : 'border border-gray-600'
                  }`}>
                    {selected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  {feature}
                </button>
              )
            })}
          </div>
          {errors.featuresNeeded && <p className="text-red-400 text-xs mt-2">{errors.featuresNeeded}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>Any other features not listed above?</label>
          <input
            type="text"
            placeholder="e.g. Custom calculator, appointment scheduler..."
            className={inputClasses}
            value={formData.otherFeatures}
            onChange={(e) => updateField('otherFeatures', e.target.value)}
          />
        </motion.div>
      </div>
    </div>
  )
}
