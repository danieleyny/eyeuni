import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useIntroDone } from '../../hooks/useIntroHandoff'
import HeroHeadline from '../HeroHeadline'

// ---- Tunables --------------------------------------------------------------
const MOCKUP_IMG = 'portfolio/birchwood.jpg' // reused screenshot in the browser frame
const MOCKUP_TILT = { rotateX: 6, rotateY: -9 } // resting 3D angle (deg)

export default function HeroV3() {
  const reduce = useReducedMotion()
  const introDone = useIntroDone()
  const base = import.meta.env.BASE_URL

  // Signal the preloader's readiness gate once the hero has painted, so the
  // into-the-eye dive only lands when the fold (incl. the mockup) is ready.
  useEffect(() => {
    let r1
    let r2
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => window.dispatchEvent(new Event('eyeuni:hero-ready')))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  const settle = reduce
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-28 pb-16">
      {/* Soft drifting gradient ribbon/aura behind the headline */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className={`absolute left-1/2 top-[18%] h-[34rem] w-[44rem] -translate-x-1/2 rounded-[50%] ${reduce ? '' : 'v3-ribbon'}`}
          style={reduce ? { backgroundImage: 'var(--grad-accent)', filter: 'blur(80px)', opacity: 0.16 } : undefined} />
        {/* fade the ribbon into the page bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <motion.div {...settle}>
          {/* eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline-color)] bg-white/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#4b5568] shadow-[var(--shadow-sm)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full v3-grad-bg" />
            Custom websites, built from scratch
          </div>

          <HeroHeadline />

          <p className="mx-auto mt-2 max-w-2xl text-lg leading-relaxed text-[#4b5568] md:text-xl">
            A fully built, custom website demo — completely free, with zero commitment.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/intake" className="v3-btn-primary inline-flex items-center gap-2 px-7 py-4 text-base font-bold">
              Get Your Free Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#portfolio" className="v3-btn-ghost inline-flex items-center gap-2 px-7 py-4 text-base font-semibold">
              See our work
            </a>
          </div>
        </motion.div>

        {/* Floating browser mockup */}
        <motion.div
          className="mt-16 [perspective:1400px]"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={introDone || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--hairline-color)] bg-white shadow-[var(--shadow-lg)]"
            style={reduce ? undefined : { transform: `rotateX(${MOCKUP_TILT.rotateX}deg) rotateY(${MOCKUP_TILT.rotateY}deg)` }}
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-[color:var(--hairline-color)] bg-[#f6f8fc] px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="mx-auto flex w-1/2 max-w-[260px] items-center justify-center rounded-md border border-[color:var(--hairline-color)] bg-white px-3 py-1 text-[11px] text-[#8a93a6]">
                eye-uni.com
              </div>
            </div>
            {/* screenshot */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#f6f8fc]">
              <img
                src={`${base}${MOCKUP_IMG}`}
                alt="A website we built"
                loading="eager"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
