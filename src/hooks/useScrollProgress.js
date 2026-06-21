import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

// Returns a MotionValue (0..1) of how far `ref` has scrolled through its own
// height past the top of the viewport — progress for a tall pinned section.
// Computed from getBoundingClientRect each frame, so it's robust to smooth
// scroll libraries (Lenis) where framer-motion's useScroll can stall.
//
// progress = clamp(-top / (height - viewportHeight), 0, 1)
//
// One getBoundingClientRect per frame is negligible; the rAF only runs while
// the section is mounted (it's removed from the tree when far offscreen anyway
// via the parent), and it self-cancels when the value is already settled at an
// endpoint and the rect hasn't moved.
export function useScrollProgress(ref) {
  const progress = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf
    const update = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      progress.set(p)
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)

    return () => cancelAnimationFrame(raf)
  }, [ref, progress])

  return progress
}

export default useScrollProgress
