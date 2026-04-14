import { motion } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { BIGGEST_PROBLEMS } from './formConstants'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepCurrentWebsite({ formData, updateField, toggleArrayItem, errors }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Your Current Website</h3>
        </div>
        <p className="text-gray-400">
          Help us understand what's working and what needs improvement.
          <span className="text-gray-500 block mt-1 text-sm">
            Don't have a website yet? No problem — skip this step or tell us what you'd like.
          </span>
        </p>
      </div>

      <div className="space-y-5">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>Current Website URL</label>
          <input
            type="url"
            placeholder="https://yourwebsite.com"
            className={inputClasses}
            value={formData.currentWebsiteUrl}
            onChange={(e) => updateField('currentWebsiteUrl', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>What do you LIKE about your current website?</label>
          <textarea
            rows={3}
            placeholder="What's working well that you'd like to keep..."
            className={`${inputClasses} resize-none`}
            value={formData.whatYouLike}
            onChange={(e) => updateField('whatYouLike', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={2}>
          <label className={labelClasses}>What do you DISLIKE about it?</label>
          <textarea
            rows={3}
            placeholder="What frustrates you or your customers..."
            className={`${inputClasses} resize-none`}
            value={formData.whatYouDislike}
            onChange={(e) => updateField('whatYouDislike', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={3}>
          <label className={labelClasses}>Biggest problems (select all that apply)</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {BIGGEST_PROBLEMS.map((problem) => {
              const selected = formData.biggestProblems.includes(problem)
              return (
                <button
                  key={problem}
                  type="button"
                  onClick={() => toggleArrayItem('biggestProblems', problem)}
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
                  {problem}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
