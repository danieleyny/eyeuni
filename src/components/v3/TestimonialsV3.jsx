import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimateIn } from '../useScrollAnimation'
import { useActiveWhenVisible } from '../../hooks/useActiveWhenVisible'

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CEO, Bloom Boutique', text: 'EYEuni transformed our outdated website into a stunning, modern storefront. Our online sales increased by 200% within the first month. Their attention to detail is unmatched.' },
  { name: 'Marcus Johnson', role: 'Founder, FitPro NYC', text: 'Working with EYEuni was a game-changer. They delivered a beautiful, fast website in just 10 days. Our booking rate has tripled since launch. Highly recommend!' },
  { name: 'Elena Rodriguez', role: 'Director, Nova Properties', text: 'The team at EYEuni understood our vision from day one. The website they built perfectly represents our brand and has significantly improved our lead generation.' },
  { name: 'David Park', role: 'CTO, TechVault', text: 'EYEuni built us a complex SaaS dashboard from scratch. The code quality is exceptional and the UI is incredibly smooth. Best development partner we\'ve had.' },
]

export default function TestimonialsV3() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const sectionRef = useRef(null)
  const active = useActiveWhenVisible(sectionRef)

  const go = (idx) => {
    setFading(true)
    setCurrent((idx + testimonials.length) % testimonials.length)
    setTimeout(() => setFading(false), 400)
  }

  // Auto-advance only while on-screen and the tab is visible.
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => go(current + 1), 5500)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, active])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} id="testimonials" className="bg-[#f6f8fc] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <AnimateIn className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f46e5]">Testimonials</div>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">Loved by the businesses we build for</h2>
        </AnimateIn>

        <AnimateIn>
          <div className="relative text-center">
            <blockquote
              className={`mx-auto max-w-3xl text-2xl font-medium leading-relaxed tracking-[-0.01em] text-[#0a0e27] transition-all duration-500 md:text-[2rem] md:leading-[1.4] ${
                fading ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              “{t.text}”
            </blockquote>

            <div className={`mt-8 flex items-center justify-center gap-3 transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full v3-grad-bg text-lg font-bold text-white">
                {t.name[0]}
              </span>
              <div className="text-left">
                <div className="font-semibold text-[#0a0e27]">{t.name}</div>
                <div className="text-sm text-[#8a93a6]">{t.role}</div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => go(current - 1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--hairline-strong)] text-[#4b5568] transition-colors hover:border-[#4f46e5] hover:text-[#4f46e5]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 v3-grad-bg' : 'w-2 bg-[#cdd5e3] hover:bg-[#9aa6bd]'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(current + 1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--hairline-strong)] text-[#4b5568] transition-colors hover:border-[#4f46e5] hover:text-[#4f46e5]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
