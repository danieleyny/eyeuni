import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, Bloom Boutique',
    text: 'EYEuni transformed our outdated website into a stunning, modern storefront. Our online sales increased by 200% within the first month. Their attention to detail is unmatched.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, FitPro NYC',
    text: 'Working with EYEuni was a game-changer. They delivered a beautiful, fast website in just 10 days. Our booking rate has tripled since launch. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Director, Nova Properties',
    text: 'The team at EYEuni understood our vision from day one. The website they built perfectly represents our brand and has significantly improved our lead generation.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CTO, TechVault',
    text: 'EYEuni built us a complex SaaS dashboard from scratch. The code quality is exceptional and the UI is incredibly smooth. Best development partner we\'ve had.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAnimating])

  const t = testimonials[current]

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">What Clients Say</h2>
        </AnimateIn>

        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-dark-card/50 border border-dark-border rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              {/* Big quote mark */}
              <div className="absolute top-6 left-8 text-accent/20 text-8xl font-serif leading-none">"</div>

              <div className="relative">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p
                  className={`text-lg md:text-xl text-gray-300 leading-relaxed mb-8 transition-all duration-500 ${
                    isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                >
                  "{t.text}"
                </p>

                <div
                  className={`flex items-center gap-4 transition-all duration-500 delay-100 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-dark-border">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2 flex-1 justify-center">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setIsAnimating(true); setCurrent(i); setTimeout(() => setIsAnimating(false), 500) }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? 'w-8 bg-primary' : 'w-2 bg-dark-border hover:bg-primary/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
