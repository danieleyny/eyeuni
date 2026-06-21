import { useReducedMotion } from 'framer-motion'
import { AnimateIn } from './useScrollAnimation'
import LensReveal from './effects/LensReveal'
import { StaticLensGrid } from './effects/lens/LensWidgets'

// Screen-reader list of the powers the lens reveals.
const CAP_LIST = [
  'Booking',
  'AI assistant',
  'Payments',
  'Live analytics',
  'Storefront',
  'Notifications',
]

// Interactive lens needs a pointer or touch; otherwise (and under reduced
// motion) we show the static grid of all six capabilities.
function canInteract() {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return (
    window.matchMedia('(pointer: fine)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window
  )
}

export default function CapabilityLens() {
  const reduce = useReducedMotion()
  const interactive = !reduce && canInteract()

  return (
    <section id="capabilities" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary">
            THE EYEUNI LENS
          </div>
          <h2 className="mb-5 text-4xl font-bold md:text-5xl">
            Look closer.
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Every site we build hides serious power.
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Drag the lens across the site to reveal what it can really do.
          </p>
        </AnimateIn>

        {/* a11y: capabilities exposed as text for screen readers */}
        <ul className="sr-only">
          {CAP_LIST.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <AnimateIn delay={120}>{interactive ? <LensReveal /> : <StaticLensGrid />}</AnimateIn>
      </div>
    </section>
  )
}
