import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { AnimateIn } from '../useScrollAnimation'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'charlieeyny@gmail.com', href: 'mailto:charlieeyny@gmail.com' },
  { icon: Phone, label: 'Phone', value: '(917) 847-4664', href: 'tel:9178474664' },
  { icon: MapPin, label: 'Location', value: 'New York, NY', href: '#' },
]

const inputClass =
  'w-full rounded-xl border border-[color:var(--hairline-strong)] bg-white px-4 py-3.5 text-[#0a0e27] placeholder-[#8a93a6] transition-all duration-300 focus:border-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20'

export default function ContactV3() {
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
          Message: e.target.message.value,
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
    <section id="contact" className="bg-[#f6f8fc] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f46e5]">Contact</div>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">Get in touch</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4b5568]">Have a question? We'd love to hear from you.</p>
        </AnimateIn>

        <div className="grid gap-5 lg:grid-cols-3">
          {contactInfo.map((info, i) => (
            <AnimateIn key={info.label} delay={i * 100}>
              <a href={info.href} className="v3-card group flex h-full flex-col items-center p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef0fe] text-[#4f46e5] transition-colors duration-300 group-hover:bg-[#4f46e5] group-hover:text-white">
                  <info.icon className="h-6 w-6" />
                </div>
                <span className="mb-1 text-sm text-[#8a93a6]">{info.label}</span>
                <span className="font-semibold text-[#0a0e27]">{info.value}</span>
              </a>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={300} className="mt-10">
          <form onSubmit={handleSubmit} className="v3-card mx-auto max-w-2xl p-8">
            <div className="mb-5 grid gap-5 sm:grid-cols-2">
              <input type="text" name="name" placeholder="Your Name" required className={inputClass} />
              <input type="email" name="email" placeholder="Your Email" required className={inputClass} />
            </div>
            <textarea name="message" placeholder="Your Message" rows={4} required className={`${inputClass} mb-5 resize-none`} />
            <button
              type="submit"
              disabled={sending}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-white transition-all duration-300 ${
                sent ? 'bg-[#16a34a]' : 'v3-btn-primary'
              }`}
            >
              {sent ? 'Message Sent!' : sending ? 'Sending…' : (<><Send className="h-4 w-4" /> Send Message</>)}
            </button>
          </form>
        </AnimateIn>
      </div>
    </section>
  )
}
