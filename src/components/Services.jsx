import { Code2, Layout, Server } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimateIn } from './useScrollAnimation'

const services = [
  {
    icon: Code2,
    title: 'Custom Built Websites',
    description: "We don't use templates. Every website is built from scratch — tailored to your business, your goals, and designed to perform.",
    features: ['Fully custom-built websites', 'E-commerce & booking systems', 'Easy content management', 'Seamless tool integrations', 'Built to convert visitors'],
  },
  {
    icon: Layout,
    title: 'Design & User Experience',
    description: 'Every design choice is made to capture attention, build trust, and drive results.',
    features: ['Modern design', 'Mobile-friendly', 'Easy navigation', 'Smooth interactions', 'Conversion-focused'],
  },
  {
    icon: Server,
    title: 'Infrastructure & Reliability',
    description: 'We build websites that are fast, stable, and ready to handle growth as your business expands.',
    features: ['High-speed performance', 'Secure infrastructure', 'Scalable systems', 'Reliable performance', 'Optimized for speed'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/50 to-dark" />
      <div className="relative max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Thoughtfully Designed. Strategically Built. Made to Grow Your Business.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <AnimateIn key={service.title} delay={i * 150}>
              <div className="group relative p-8 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-sm h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={500} className="text-center mt-16">
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1"
          >
            Start Your Project
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}
