import { Link } from 'react-router-dom'
import { FileText, Code, Rocket } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'

const steps = [
  {
    icon: FileText,
    title: 'Tell Us About Your Business',
    desc: 'Answer a few quick questions so we understand your vision & goals.',
  },
  {
    icon: Code,
    title: 'We Design & Build Your Website',
    desc: 'Our team creates a fully customized demo tailored to you.',
  },
  {
    icon: Rocket,
    title: 'Review, Refine & Launch',
    desc: "Give feedback, request changes, and go live when you're ready.",
  },
]

export default function DemoWebsiteCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-dark-card/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Have a Free Demo Website{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Built for You
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We'll create a custom website tailored to your business, so you can see exactly what you're getting — before making any commitment.
          </p>
        </AnimateIn>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <AnimateIn key={step.title} delay={i * 150}>
              <div className="relative group p-8 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-sm text-center h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-5xl font-black text-dark-border mb-4">0{i + 1}</div>
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA Button */}
        <AnimateIn delay={500} className="text-center">
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-10 py-5 bg-accent text-white font-bold text-lg rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1"
          >
            Get Your Free Demo Website
          </Link>
          <p className="text-gray-500 text-sm mt-4">If you don't love it, you don't pay — simple as that.</p>
        </AnimateIn>
      </div>
    </section>
  )
}
