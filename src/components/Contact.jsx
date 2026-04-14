import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'
import { useState } from 'react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'dani@gmail.com', href: 'mailto:dani@gmail.com' },
  { icon: Phone, label: 'Phone', value: '(123) 456-7890', href: 'tel:1234567890' },
  { icon: MapPin, label: 'Location', value: 'New York, NY', href: '#' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('https://formspree.io/f/mwvapbyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'New Contact Form Submission — EYEuni',
          'Contact Name': e.target.name.value,
          'Contact Email': e.target.email.value,
          'Message': e.target.message.value,
        }),
      })
      if (res.ok) {
        setSent(true)
        e.target.reset()
        setTimeout(() => setSent(false), 3000)
      }
    } catch (err) {
      console.error('Form error:', err)
    }
    setSending(false)
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a question? We'd love to hear from you.
          </p>
        </AnimateIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          {contactInfo.map((info, i) => (
            <AnimateIn key={info.label} delay={i * 100}>
              <a
                href={info.href}
                className="group flex flex-col items-center p-8 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-gray-400 mb-1">{info.label}</span>
                <span className="font-semibold">{info.value}</span>
              </a>
            </AnimateIn>
          ))}
        </div>

        {/* Quick contact form */}
        <AnimateIn delay={400} className="mt-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-dark-card/50 border border-dark-border rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3.5 bg-dark/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3.5 bg-dark/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              className="w-full px-4 py-3.5 bg-dark/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all duration-300 resize-none mb-5"
            />
            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                sent
                  ? 'bg-green-500 text-white'
                  : 'bg-accent text-white hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/25'
              }`}
            >
              {sent ? 'Message Sent!' : sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </form>
        </AnimateIn>
      </div>
    </section>
  )
}
