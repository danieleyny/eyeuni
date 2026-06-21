import { createContext, useContext } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export const LenisContext = createContext(null)

// Mount once around the route content (NOT around the Preloader, which locks
// body scroll while its curtain is up). Provides the Lenis instance so anchor
// links can route through lenis.scrollTo.
export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion()
  const lenis = useSmoothScroll({ enabled: !reduce })
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

// Smoothly scroll to a target (selector or element). Falls back to native
// scrollIntoView when Lenis is disabled (reduced motion).
export function useLenisScrollTo() {
  const lenis = useLenis()
  return (target, opts = {}) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.1, ...opts })
    } else {
      const el =
        typeof target === 'string' ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
