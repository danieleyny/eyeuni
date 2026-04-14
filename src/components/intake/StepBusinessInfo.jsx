import { motion } from 'framer-motion'
import { Building2, Mail, Phone } from 'lucide-react'

const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function StepBusinessInfo({ formData, updateField, errors }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Business Information</h3>
        </div>
        <p className="text-gray-400">Tell us about your business so we can build the perfect site for you.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <label className={labelClasses}>
            Business Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Acme Corp"
            className={`${inputClasses} ${errors.businessName ? 'border-red-400/50' : ''}`}
            value={formData.businessName}
            onChange={(e) => updateField('businessName', e.target.value)}
          />
          {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <label className={labelClasses}>
            Industry / Niche <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Real Estate, Restaurant, SaaS"
            className={`${inputClasses} ${errors.industry ? 'border-red-400/50' : ''}`}
            value={formData.industry}
            onChange={(e) => updateField('industry', e.target.value)}
          />
          {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={2} className="sm:col-span-2">
          <label className={labelClasses}>Business Tagline</label>
          <input
            type="text"
            placeholder="A short phrase that describes what you do"
            className={inputClasses}
            value={formData.tagline}
            onChange={(e) => updateField('tagline', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={3} className="sm:col-span-2">
          <label className={labelClasses}>
            Target Audience <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Who are your ideal customers?"
            className={`${inputClasses} ${errors.targetAudience ? 'border-red-400/50' : ''}`}
            value={formData.targetAudience}
            onChange={(e) => updateField('targetAudience', e.target.value)}
          />
          {errors.targetAudience && <p className="text-red-400 text-xs mt-1">{errors.targetAudience}</p>}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={4}>
          <label className={labelClasses}>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Contact Email</span>
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            className={inputClasses}
            value={formData.contactEmail}
            onChange={(e) => updateField('contactEmail', e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={5}>
          <label className={labelClasses}>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact Phone</span>
          </label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            className={inputClasses}
            value={formData.contactPhone}
            onChange={(e) => updateField('contactPhone', e.target.value)}
          />
        </motion.div>
      </div>
    </div>
  )
}
