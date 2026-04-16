import { motion } from 'framer-motion'
import { ClipboardCheck, Edit3 } from 'lucide-react'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
}

function ReviewSection({ title, stepIndex, entries, onEdit }) {
  return (
    <div className="border border-dark-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-dark-card/50 px-4 py-3 border-b border-dark-border">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <Edit3 className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="px-4 py-3 space-y-2">
        {entries.map(([label, value]) => (
          <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-3 text-sm">
            <span className="text-gray-500 sm:w-44 flex-shrink-0">{label}</span>
            <span className="text-gray-200 break-words">{value || <span className="text-gray-600 italic">Not provided</span>}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StepReview({ formData, onGoToStep }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Review Your Answers</h3>
        </div>
        <p className="text-gray-400">Please review your responses before submitting. Click "Edit" on any section to make changes.</p>
      </div>

      <div className="space-y-4">
        <motion.div variants={item} initial="hidden" animate="show" custom={0}>
          <ReviewSection title="Contact & Business Info" stepIndex={0} onEdit={onGoToStep} entries={[
            ['Name', formData.contactName],
            ['Email', formData.contactEmail],
            ['Phone', formData.contactPhone],
            ['Business Name', formData.businessName],
            ['Industry', formData.industry],
            ['Tagline', formData.tagline],
            ['Target Audience', formData.targetAudience],
          ]} />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={1}>
          <ReviewSection title="Current Website (Optional)" stepIndex={1} onEdit={onGoToStep} entries={[
            ['Website URL', formData.currentWebsiteUrl],
            ['What You Like', formData.whatYouLike],
            ['What You Dislike', formData.whatYouDislike],
            ['Biggest Problems', formData.biggestProblems.length > 0 ? formData.biggestProblems.join(', ') : ''],
          ]} />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={2}>
          <ReviewSection title="Website Goals" stepIndex={2} onEdit={onGoToStep} entries={[
            ['Goals', formData.websiteGoals.length > 0 ? formData.websiteGoals.join(', ') : ''],
            ['Visitor Actions', formData.desiredActions.length > 0 ? formData.desiredActions.join(', ') : ''],
            ['Competitor Sites', formData.competitors],
            ['Websites You Like', formData.websitesYouLike],
            ['What You Like About Them', formData.whatYouLikeAboutThem],
            ['Other Goals', formData.otherGoals],
          ]} />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={3}>
          <ReviewSection title="Content & Pages" stepIndex={3} onEdit={onGoToStep} entries={[
            ['Pages Needed', formData.pagesNeeded.length > 0 ? formData.pagesNeeded.join(', ') : ''],
            ['Other Pages', formData.otherPages],
            ['Business Description', formData.businessDescription],
            ['Existing Content', formData.existingContent],
          ]} />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={4}>
          <ReviewSection title="Design Preferences" stepIndex={4} onEdit={onGoToStep} entries={[
            ['Design Styles', (formData.designStyles || []).length > 0 ? formData.designStyles.join(', ') : ''],
            ['Primary Color', formData.primaryColor],
            ['Secondary Color', formData.secondaryColor],
            ['Accent Color', formData.accentColor],
            ['Logo Status', formData.logoStatus],
          ]} />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={5}>
          <ReviewSection title="Features & Functionality" stepIndex={5} onEdit={onGoToStep} entries={[
            ['Features', formData.featuresNeeded.length > 0 ? formData.featuresNeeded.join(', ') : ''],
            ['Other Features', formData.otherFeatures],
          ]} />
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" custom={6}>
          <ReviewSection title="Timeline & Notes" stepIndex={6} onEdit={onGoToStep} entries={[
            ['Timeline', formData.timeline],
            ['Additional Notes', formData.anythingElse],
          ]} />
        </motion.div>
      </div>
    </div>
  )
}
