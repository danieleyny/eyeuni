import { lazy, Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import AuroraFallback from './effects/AuroraFallback'
import Magnetic from './effects/Magnetic'
import { useDeviceTilt } from '../hooks/useDeviceTilt'
import { useGyroEnabled } from './effects/MotionPermissionGate'
import { useLenisScrollTo } from './effects/SmoothScroll'
import { useIntroDone } from '../hooks/useIntroHandoff'
import HeroHeadline from './HeroHeadline'

// ogl lands in its own lazy chunk so it never blocks first paint.
const AuroraBackground = lazy(() => import('./effects/AuroraBackground'))

export default function Hero() {
  const reduce = useReducedMotion()
  const gyroEnabled = useGyroEnabled()
  const pointer = useDeviceTilt({ maxDeg: 8, gyroEnabled })
  const scrollTo = useLenisScrollTo()
  const introDone = useIntroDone()

  // Signal the preloader's readiness gate once the hero has actually painted,
  // so the "Into the Eye" dive only lands when the fold is ready.
  useEffect(() => {
    let raf1
    let raf2
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        window.dispatchEvent(new Event('eyeuni:hero-ready'))
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  // As the intro hands off, the hero scales from a touch oversized down to 1 and
  // fades in — so it feels like we land and settle inside the eye.
  const settle = reduce
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { scale: 1.05, opacity: 0 },
        animate: introDone ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Static CSS aurora paints immediately (LCP-safe, reduced-motion bg) */}
      <AuroraFallback />

      {/* Reactive WebGL shader fades in over the fallback (skip on reduced motion) */}
      {!reduce && (
        <Suspense fallback={null}>
          <AuroraBackground pointer={pointer} />
        </Suspense>
      )}

      {/* Soft brand glow accents on top */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-[pulse-glow_4s_ease-in-out_infinite] z-[1] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-[pulse-glow_6s_ease-in-out_infinite] z-[1] pointer-events-none" />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" {...settle}>
        <HeroHeadline />

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get a fully built, custom website demo — completely free, with zero commitment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Magnetic className="rounded-xl">
            <Link
              to="/intake"
              className="block px-8 py-4 bg-accent text-white font-bold rounded-xl text-lg hover:bg-accent/80 transition-colors duration-300 shadow-2xl shadow-accent/30"
            >
              Get Your Free Demo
            </Link>
          </Magnetic>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => scrollTo('#cost')}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-primary/60 hover:text-primary transition-colors"
      >
        <ArrowDown size={28} />
      </button>
    </section>
  )
}
