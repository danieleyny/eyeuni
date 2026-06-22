import { Code2, Layout, Server, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimateIn } from '../useScrollAnimation'

const services = [
  {
    icon: Code2,
    title: 'Custom Built Websites',
    description:
      "We don't use templates. Every website is built from scratch — tailored to your business, your goals, and designed to perform.",
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

export default function ServicesV3() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f46e5]">What we do</div>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">Our services</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4b5568]">
            Thoughtfully designed, strategically built, and made to grow your business.
          </p>
        </AnimateIn>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <AnimateIn key={service.title} delay={i * 120} className="h-full">
              <div className="v3-card group flex h-full flex-col p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef0fe] text-[#4f46e5] transition-colors duration-300 group-hover:bg-[#4f46e5] group-hover:text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2.5 text-xl font-bold text-[#0a0e27]">{service.title}</h3>
                <p className="mb-6 leading-relaxed text-[#4b5568]">{service.description}</p>
                <ul className="mt-auto space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#4b5568]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef0fe]">
                        <Check className="h-3 w-3 text-[#4f46e5]" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={300} className="mt-14 text-center">
          <Link to="/intake" className="v3-btn-primary inline-flex items-center gap-2 px-8 py-4 font-bold">
            Start Your Project
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}
