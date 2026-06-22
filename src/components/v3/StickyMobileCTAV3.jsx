import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Light "Get Your Free Demo" bar docked to the bottom on phones. Appears after
// the hero, hides while the contact section / footer is in view. Desktop: hidden.
export default function StickyMobileCTAV3() {
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
    const iv = setInterval(onScroll, 400)
    onScroll()

    const targets = ['#contact', 'footer'].map((s) => document.querySelector(s)).filter(Boolean)
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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--hairline-color)] bg-white/85 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 backdrop-blur-xl md:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/intake" className="v3-btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-base font-bold">
            Get Your Free Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
