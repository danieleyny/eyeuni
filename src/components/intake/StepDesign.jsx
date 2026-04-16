import { motion } from 'framer-motion'
import { Palette, Check } from 'lucide-react'
import { DESIGN_STYLES, LOGO_OPTIONS } from './formConstants'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepDesign({ formData, toggleArrayItem, updateField, errors }) {
  const handleStyleToggle = (label) => {
    const current = formData.designStyles || []
    if (current.includes(label)) {
      // Always allow deselecting
      toggleArrayItem('designStyles', label)
    } else if (current.length < 2) {
      // Only allow selecting if under 2
      toggleArrayItem('designStyles', label)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Design Preferences</h3>
        </div>
        <p className="text-gray-400">How should your website look and feel?</p>
      </div>

      <div className="space-y-6">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>
            Design Style <span className="text-gray-500">(pick up to 2)</span> <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DESIGN_STYLES.map((style) => {
              const selected = (formData.designStyles || []).includes(style.label)
              const atMax = (formData.designStyles || []).length >= 2 && !selected
              return (
                <button
                  key={style.label}
                  type="button"
                  onClick={() => handleStyleToggle(style.label)}
                  className={`flex flex-col items-start px-4 py-4 rounded-xl border text-left transition-all duration-300 ${
                    selected
                      ? 'border-primary/50 bg-primary/5 text-white shadow-lg shadow-accent/10'
                      : atMax
                        ? 'border-dark-border bg-dark-card/30 text-gray-600 cursor-not-allowed opacity-50'
                        : 'border-dark-border bg-dark-card/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                      selected ? 'bg-accent' : 'border border-gray-600'
                    }`}>
                      {selected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-medium text-sm">{style.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 ml-6">{style.desc}</span>
                </button>
              )
            })}
          </div>
          {errors.designStyles && <p className="text-red-400 text-xs mt-2">{errors.designStyles}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>Brand Colors</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Primary', field: 'primaryColor' },
              { label: 'Secondary', field: 'secondaryColor' },
              { label: 'Accent', field: 'accentColor' },
            ].map((color) => (
              <div key={color.field} className="flex flex-col items-center gap-2">
                <input
                  type="color"
                  value={formData[color.field]}
                  onChange={(e) => updateField(color.field, e.target.value)}
                  className="w-16 h-16 rounded-xl cursor-pointer border-2 border-dark-border bg-transparent [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-lg"
                />
                <span className="text-xs text-gray-400">{color.label}</span>
                <span className="text-xs text-gray-500 font-mono">{formData[color.field]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={2}>
          <label className={labelClasses}>Do you have a logo?</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {LOGO_OPTIONS.map((option) => {
              const selected = formData.logoStatus === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField('logoStatus', option)}
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
