import { Code2, Layout, Server } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Full-stack web applications built with cutting-edge technologies. From concept to deployment, we handle every line of code.',
    features: ['Custom Web Apps', 'E-Commerce', 'CMS Integration', 'API Development'],
  },
  {
    icon: Layout,
    title: 'Front End Development',
    description: 'Pixel-perfect, responsive interfaces that captivate users. Beautiful designs that perform flawlessly on every device.',
    features: ['Responsive Design', 'UI/UX Implementation', 'Animations & Effects', 'Cross-Browser Support'],
  },
  {
    icon: Server,
    title: 'Back End Development',
    description: 'Robust server-side architecture that powers your applications. Secure, scalable, and lightning-fast infrastructure.',
    features: ['Database Design', 'REST & GraphQL APIs', 'Cloud Deployment', 'Performance Optimization'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/50 to-dark" />
      <div className="relative max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We deliver end-to-end web solutions that transform your digital presence.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <AnimateIn key={service.title} delay={i * 150}>
              <div className="group relative p-8 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-sm h-full">
                {/* Gradient hover glow */}
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

        {/* CTA after services */}
        <AnimateIn delay={500} className="text-center mt-16">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1"
          >
            Start Your Project
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimateIn>
      </div>
    </section>
  )
}
