import { Check } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: 'one-time',
    description: 'Perfect for small businesses needing a professional online presence.',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Contact form',
      'Basic SEO setup',
      '1 round of revisions',
      '2-week delivery',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$1,499',
    period: 'one-time',
    description: 'For growing businesses that need advanced functionality and polish.',
    features: [
      'Up to 15 pages',
      'Custom animations',
      'CMS integration',
      'Advanced SEO',
      'E-commerce ready',
      '3 rounds of revisions',
      'Priority support',
      '3-week delivery',
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    description: 'Full-scale custom web applications tailored to your exact needs.',
    features: [
      'Unlimited pages',
      'Custom web application',
      'API integrations',
      'Database architecture',
      'Cloud deployment',
      'Unlimited revisions',
      'Dedicated support',
      'Ongoing maintenance',
    ],
    cta: 'Contact Us',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/30 via-dark to-dark-card/30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            No hidden fees. Choose the plan that fits your project.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <AnimateIn key={plan.name} delay={i * 150}>
              <div
                className={`relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 h-full ${
                  plan.popular
                    ? 'bg-gradient-to-b from-accent/10 to-dark-card border-accent/30 shadow-2xl shadow-accent/10'
                    : 'bg-dark-card/50 border-dark-border hover:border-primary/30 backdrop-blur-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full tracking-wider uppercase">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-black">{plan.price}</span>
                  {plan.period !== 'quote' && (
                    <span className="text-gray-400 ml-2 text-sm">/{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  className={`block text-center py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    plan.popular
                      ? 'bg-accent text-white hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/25'
                      : 'border border-primary/30 text-primary hover:bg-primary/10'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
