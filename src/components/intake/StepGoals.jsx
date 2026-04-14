import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { PRIMARY_GOALS } from './formConstants'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepGoals({ formData, updateField, errors }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Website Goals</h3>
        </div>
        <p className="text-gray-400">What should your new website accomplish?</p>
      </div>

      <div className="space-y-6">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>
            Primary Goal <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRIMARY_GOALS.map((goal) => {
              const selected = formData.primaryGoal === goal.label
              return (
                <button
                  key={goal.label}
                  type="button"
                  onClick={() => updateField('primaryGoal', goal.label)}
                  className={`flex flex-col items-center gap-2 px-4 py-5 rounded-xl border text-sm transition-all duration-300 ${
                    selected
                      ? 'border-primary/50 bg-primary/5 text-white shadow-lg shadow-accent/10'
                      : 'border-dark-border bg-dark-card/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="font-medium">{goal.label}</span>
                </button>
              )
            })}
          </div>
          {errors.primaryGoal && <p className="text-red-400 text-xs mt-2">{errors.primaryGoal}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>
            What action should visitors take? <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Book a call, Buy a product, Sign up..."
            className={`${inputClasses} ${errors.desiredAction ? 'border-red-400/50' : ''}`}
            value={formData.desiredAction}
            onChange={(e) => updateField('desiredAction', e.target.value)}
          />
          {errors.desiredAction && <p className="text-red-400 text-xs mt-1">{errors.desiredAction}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={2}>
          <label className={labelClasses}>Competitor Websites</label>
          <input
            type="text"
            placeholder="URLs of websites you compete with"
            className={inputClasses}
            value={formData.competitors}
            onChange={(e) => updateField('competitors', e.target.value)}
          />
          <p className="text-gray-500 text-xs mt-1">Separate multiple URLs with commas</p>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={3}>
          <label className={labelClasses}>Top Websites You Like</label>
          <input
            type="text"
            placeholder="URLs of websites whose design or style you love"
            className={inputClasses}
            value={formData.websitesYouLike}
            onChange={(e) => updateField('websitesYouLike', e.target.value)}
          />
          <p className="text-gray-500 text-xs mt-1">These can be from any industry — just sites you think look great</p>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={4}>
          <label className={labelClasses}>What do you like about those websites?</label>
          <textarea
            rows={3}
            placeholder="e.g. I love the clean layout of site X, the color scheme of site Y, the way site Z presents their services..."
            className={`${inputClasses} resize-none`}
            value={formData.whatYouLikeAboutThem}
            onChange={(e) => updateField('whatYouLikeAboutThem', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={5}>
          <label className={labelClasses}>Any other goals?</label>
          <textarea
            rows={3}
            placeholder="Anything else you want your website to achieve..."
            className={`${inputClasses} resize-none`}
            value={formData.otherGoals}
            onChange={(e) => updateField('otherGoals', e.target.value)}
          />
        </motion.div>
      </div>
    </div>
  )
}
