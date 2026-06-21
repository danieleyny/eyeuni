import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './motion/constants'

// Glowing "Get Your Free Demo" bar docked to the bottom on phones. Appears
// after the hero, hides while the contact section / footer is in view (so it
// never covers the form's own CTA). Desktop unaffected (md:hidden).
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let pastHero = false
    let nearEnd = false
    const update = () => setShow(pastHero && !nearEnd)

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6
      update()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // setInterval fallback because scroll events can be sparse under smooth scroll.
    const iv = setInterval(onScroll, 400)
    onScroll()

    // Hide when the contact section or footer is visible.
    const targets = ['#contact', 'footer']
      .map((s) => document.querySelector(s))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        nearEnd = entries.some((e) => e.isIntersecting)
        update()
      },
      { threshold: 0.05 }
    )
    targets.forEach((t) => io.observe(t))

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(iv)
      io.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 bg-gradient-to-t from-dark via-dark/90 to-transparent"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE.out }}
        >
          <Link
            to="/intake"
            className="relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base shadow-lg shadow-accent/40 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Your Free Demo <ArrowRight className="w-4 h-4" />
            </span>
            {/* shimmer */}
            <span
              className="absolute inset-0 z-0 opacity-60"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2.6s linear infinite',
              }}
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
