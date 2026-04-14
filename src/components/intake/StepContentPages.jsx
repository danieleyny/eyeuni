import { motion } from 'framer-motion'
import { Layout, Check } from 'lucide-react'
import { PAGES_OPTIONS, EXISTING_CONTENT_OPTIONS } from './formConstants'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepContentPages({ formData, updateField, toggleArrayItem, errors }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Layout className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Content & Pages</h3>
        </div>
        <p className="text-gray-400">What pages and content does your site need?</p>
      </div>

      <div className="space-y-6">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>
            Which pages do you need? <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PAGES_OPTIONS.map((page) => {
              const selected = formData.pagesNeeded.includes(page)
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => toggleArrayItem('pagesNeeded', page)}
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
                  {page}
                </button>
              )
            })}
          </div>
          {errors.pagesNeeded && <p className="text-red-400 text-xs mt-2">{errors.pagesNeeded}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>Other pages not listed above?</label>
          <input
            type="text"
            placeholder="e.g. Careers, Events, Resources..."
            className={inputClasses}
            value={formData.otherPages}
            onChange={(e) => updateField('otherPages', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={2}>
          <label className={labelClasses}>
            Main services or products <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="List your main services or products, one per line..."
            className={`${inputClasses} resize-none ${errors.mainServicesProducts ? 'border-red-400/50' : ''}`}
            value={formData.mainServicesProducts}
            onChange={(e) => updateField('mainServicesProducts', e.target.value)}
          />
          {errors.mainServicesProducts && <p className="text-red-400 text-xs mt-1">{errors.mainServicesProducts}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={3}>
          <label className={labelClasses}>What about your existing content?</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {EXISTING_CONTENT_OPTIONS.map((option) => {
              const selected = formData.existingContent === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField('existingContent', option)}
                  className={`px-4 py-3.5 rounded-xl border text-sm text-center transition-all duration-300 ${
                    selected
                      ? 'border-primary/50 bg-primary/5 text-white'
                      : 'border-dark-border bg-dark-card/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
