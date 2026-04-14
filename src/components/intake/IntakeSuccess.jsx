import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function IntakeSuccess({ formData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex"
      >
        <CheckCircle className="w-20 h-20 text-green-400 mb-6" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        Thank You!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-lg max-w-md mx-auto mb-8"
      >
        We've received your project details. Our team will start building your free demo website and reach out to you within a few days.
      </motion.p>

      {formData.businessName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-card/50 border border-dark-border rounded-xl p-6 max-w-sm mx-auto mb-8"
        >
          <p className="text-sm text-gray-400 mb-2">Project for</p>
          <p className="text-lg font-semibold text-white">{formData.businessName}</p>
          {formData.contactEmail && (
            <p className="text-sm text-gray-400 mt-2">We'll contact you at {formData.contactEmail}</p>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  )
}
