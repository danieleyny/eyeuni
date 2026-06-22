import { useCallback, useEffect, useRef, useState } from 'react'
import { Code2, Layout, Server, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { AnimateIn } from '../useScrollAnimation'
import { useActiveWhenVisible } from '../../hooks/useActiveWhenVisible'

// ---- Tunables --------------------------------------------------------------
// 6 items (phrase + 5 features) lit ~240ms apart → whole sequence in ~1.6s.
const STAGGER = 240 // ms between each item lighting up (phrase → features)

const services = [
  {
    icon: Code2,
    title: 'Custom Built Websites',
    description:
      "We don't use templates. Every website is built from scratch — tailored to your business, your goals, and designed to perform.",
    highlightPhrase: 'tailored to your business, your goals, and designed to perform',
    features: ['Fully custom-built websites', 'E-commerce & booking systems', 'Easy content management', 'Seamless tool integrations', 'Built to convert visitors'],
  },
  {
    icon: Layout,
    title: 'Design & User Experience',
    description: 'Every design choice is made to capture attention, build trust, and drive results.',
    highlightPhrase: 'capture attention, build trust, and drive results',
    features: ['Modern design', 'Mobile-friendly', 'Easy navigation', 'Smooth interactions', 'Conversion-focused'],
  },
  {
    icon: Server,
    title: 'Infrastructure & Reliability',
    description: 'We build websites that are fast, stable, and ready to handle growth as your business expands.',
    highlightPhrase: 'fast, stable, and ready to handle growth',
    features: ['High-speed performance', 'Secure infrastructure', 'Scalable systems', 'Reliable performance', 'Optimized for speed'],
  },
]

function finePointer() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
  )
}

// One card. The highlighter sequence latches on first trigger (hover on desktop,
// scroll-into-view on mobile) and runs once to completion, staying lit until the
// page refreshes. A single setTimeout chain per active card — no loops.
function ServiceCard({ service, reduce, register, index, bgActive }) {
  const { icon: Icon, title, description, highlightPhrase, features } = service
  const total = 1 + features.length // index 0 = phrase, then each feature
  const [lit, setLit] = useState(reduce ? total : 0)
  const startedRef = useRef(false)
  const timerRef = useRef(null)
  const cardRef = useRef(null)

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    if (reduce) {
      setLit(total)
      return
    }
    // Light the phrase now, then each feature STAGGER ms after the previous.
    const tick = (i) => {
      setLit(i)
      if (i < total) timerRef.current = setTimeout(() => tick(i + 1), STAGGER)
    }
    tick(1)
  }, [reduce, total])

  // Register with the parent's shared IntersectionObserver (mobile trigger).
  useEffect(() => {
    const entry = { el: cardRef.current, start }
    const unregister = register(entry)
    return () => {
      unregister?.()
      clearTimeout(timerRef.current)
    }
  }, [register, start])

  const onPointerEnter = () => {
    if (finePointer()) start() // desktop: hover starts it; latches
  }

  const pi = description.indexOf(highlightPhrase)
  const before = pi >= 0 ? description.slice(0, pi) : description
  const after = pi >= 0 ? description.slice(pi + highlightPhrase.length) : ''
  const phraseLit = lit >= 1
  const featureLit = (i) => lit >= i + 2

  return (
    <div
      ref={cardRef}
      onPointerEnter={onPointerEnter}
      className="svc3-card group flex h-full flex-col p-8"
      style={{
        // offset each card so the drift isn't in lockstep; pause it off-screen / reduced-motion
        animationDelay: `${index * -4.5}s`,
        animationPlayState: bgActive ? 'running' : 'paused',
      }}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef0fe] text-[#4f46e5] transition-colors duration-300 group-hover:bg-[#4f46e5] group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2.5 text-xl font-bold text-[#0a0e27]">{title}</h3>
      <p className="mb-6 leading-relaxed text-[#4b5568]">
        {before}
        {pi >= 0 && <span className={`svc-hl ${phraseLit ? 'is-lit' : ''}`}>{highlightPhrase}</span>}
        {after}
      </p>
      <ul className="mt-auto space-y-2.5">
        {features.map((f, i) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-[#4b5568]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef0fe]">
              <Check className="h-3 w-3 text-[#4f46e5]" strokeWidth={3} />
            </span>
            <span className={`svc-hl ${featureLit(i) ? 'is-lit' : ''}`}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesV3() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const active = useActiveWhenVisible(sectionRef)
  const bgActive = active && !reduce // moving gradient runs only on-screen + motion-OK
  const registryRef = useRef([])

  const register = useCallback((entry) => {
    registryRef.current.push(entry)
    return () => {
      registryRef.current = registryRef.current.filter((e) => e !== entry)
    }
  }, [])

  // Mobile / touch trigger: ONE shared IntersectionObserver starts each card the
  // first time it's ~40% visible, then stops observing it. Desktop (fine pointer)
  // uses hover instead, so cards never auto-start there. Reduced motion skips it
  // (cards render fully lit from mount).
  useEffect(() => {
    if (reduce || finePointer()) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            registryRef.current.find((r) => r.el === e.target)?.start()
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    registryRef.current.forEach((r) => r.el && io.observe(r.el))
    return () => io.disconnect()
  }, [reduce])

  return (
    <section ref={sectionRef} id="services" className="bg-white py-24 md:py-32">
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
              <ServiceCard service={service} reduce={reduce} register={register} index={i} bgActive={bgActive} />
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
