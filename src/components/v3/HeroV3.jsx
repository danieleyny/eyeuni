import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useIntroDone } from '../../hooks/useIntroHandoff'
import { useActiveWhenVisible } from '../../hooks/useActiveWhenVisible'
import { useLenisScrollTo } from '../effects/SmoothScroll'
import HeroHeadline from '../HeroHeadline'

// ---- Tunables --------------------------------------------------------------
const MOCKUP_TILT = { rotateX: 6, rotateY: -9 } // resting 3D angle (deg)
const CYCLE_MS = 3200 // how long each portfolio screenshot is shown
// Real sites we've built — the mockup rotates through them to show more work.
const SITES = [
  { img: 'portfolio/birchwood.jpg', host: 'birchwoodny.com' },
  { img: 'portfolio/fleurfund.jpg', host: 'fleurfund.com' },
  { img: 'portfolio/laundryday.jpg', host: 'laundryday.nyc' },
  { img: 'portfolio/laundrydayapp.jpg', host: 'app.laundryday.app' },
  { img: 'portfolio/nyapts.jpg', host: 'ny-apts.com' },
  { img: 'portfolio/propertyos.jpg', host: 'propertyos.app' },
  { img: 'portfolio/contractorco.jpg', host: 'contractorco.app' },
  { img: 'portfolio/safeconsulting.jpg', host: 'safeconsulting.shop' },
  { img: 'portfolio/rentovercharge.jpg', host: 'rentoverchargenyc.com' },
]

export default function HeroV3() {
  const reduce = useReducedMotion()
  const introDone = useIntroDone()
  const base = import.meta.env.BASE_URL
  const scrollTo = useLenisScrollTo()
  const sectionRef = useRef(null)
  const active = useActiveWhenVisible(sectionRef)
  const [siteIdx, setSiteIdx] = useState(0)

  // Rotate the mockup through our portfolio sites (static under reduced motion).
  // Pauses when off-screen / tab hidden; resumes from the current image.
  useEffect(() => {
    if (reduce || !active) return
    const t = setInterval(() => setSiteIdx((i) => (i + 1) % SITES.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [reduce, active])

  const site = SITES[siteIdx]

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
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-28 pb-16">
      {/* Soft drifting gradient ribbon/aura behind the headline */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className={`absolute left-1/2 top-[18%] h-[34rem] w-[44rem] -translate-x-1/2 rounded-[50%] ${reduce ? '' : 'v3-ribbon'}`}
          style={reduce ? { backgroundImage: 'var(--grad-accent)', filter: 'blur(80px)', opacity: 0.16 } : { animationPlayState: active ? 'running' : 'paused' }} />
        {/* fade the ribbon into the page bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <motion.div {...settle}>
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

        {/* Floating browser mockup — rotates through our work; click to jump to
            the portfolio. */}
        <motion.div
          className="mt-16 [perspective:1400px]"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={introDone || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => scrollTo('#portfolio')}
            aria-label="See our portfolio"
            className="group mx-auto block w-full max-w-3xl cursor-pointer select-none overflow-hidden rounded-2xl border border-[color:var(--hairline-color)] bg-white text-left shadow-[var(--shadow-lg)] transition-shadow duration-500 hover:shadow-[0_36px_80px_-24px_rgba(13,18,40,0.30)]"
            style={reduce ? undefined : { transform: `rotateX(${MOCKUP_TILT.rotateX}deg) rotateY(${MOCKUP_TILT.rotateY}deg)` }}
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-[color:var(--hairline-color)] bg-[#f6f8fc] px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="relative mx-auto flex h-[22px] w-1/2 max-w-[260px] items-center justify-center overflow-hidden rounded-md border border-[color:var(--hairline-color)] bg-white px-3 text-[11px] text-[#8a93a6]">
                {/* host crossfades in lockstep with the screenshot below */}
                <AnimatePresence initial={false}>
                  <motion.span
                    key={site.host}
                    className="absolute"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  >
                    {site.host}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            {/* cycling screenshots (crossfade) — not draggable */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f6f8fc]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={site.img}
                  src={`${base}${site.img}`}
                  alt="A website we built"
                  draggable={false}
                  loading="eager"
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-top"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
