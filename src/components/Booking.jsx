import { useState } from 'react'
import { Calendar, Send } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', projectType: '', budget: '', date: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClasses = 'w-full px-4 py-3.5 bg-dark-card/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300'
  const labelClasses = 'block text-sm font-medium text-gray-300 mb-2'

  return (
    <section id="booking" className="py-24 md:py-32 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Copy */}
          <AnimateIn direction="left">
            <div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Book Now</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Schedule Your{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Demo Call
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Ready to transform your online presence? Book a free 30-minute consultation and let's discuss how we can bring your vision to life.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Free 30-Minute Call</h4>
                    <p className="text-gray-400 text-sm">No obligation. We'll discuss your project, goals, and provide a custom quote.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Quick Turnaround</h4>
                    <p className="text-gray-400 text-sm">We respond within 24 hours and can start your project the same week.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right side - Form */}
          <AnimateIn direction="right">
            <form onSubmit={handleSubmit} className="bg-dark-card/50 border border-dark-border rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Full Name</label>
                  <input type="text" name="name" required placeholder="John Doe" className={inputClasses} value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelClasses}>Email</label>
                  <input type="email" name="email" required placeholder="john@example.com" className={inputClasses} value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelClasses}>Phone</label>
                  <input type="tel" name="phone" placeholder="(555) 123-4567" className={inputClasses} value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelClasses}>Project Type</label>
                  <select name="projectType" required className={inputClasses} value={formData.projectType} onChange={handleChange}>
                    <option value="">Select type...</option>
                    <option value="new-website">New Website</option>
                    <option value="redesign">Website Redesign</option>
                    <option value="web-app">Web Application</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Budget Range</label>
                  <select name="budget" required className={inputClasses} value={formData.budget} onChange={handleChange}>
                    <option value="">Select budget...</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1500">$500 - $1,500</option>
                    <option value="1500-5000">$1,500 - $5,000</option>
                    <option value="5000+">$5,000+</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Preferred Date</label>
                  <input type="date" name="date" className={inputClasses} value={formData.date} onChange={handleChange} />
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClasses}>Message</label>
                <textarea name="message" rows={4} placeholder="Tell us about your project..." className={`${inputClasses} resize-none`} value={formData.message} onChange={handleChange} />
              </div>

              <button
                type="submit"
                className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-white hover:bg-accent/80 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5'
                }`}
              >
                {submitted ? (
                  <>Sent Successfully!</>
                ) : (
                  <>
                    Schedule Your Demo Call
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
