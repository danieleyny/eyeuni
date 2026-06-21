import { useEffect, useRef } from 'react'

// Thin fixed hairline at the very top that fills (brand gradient) as the page
// scrolls. Updates a ref'd element's transform directly — no React re-render.
// Uses a scroll listener + interval fallback (robust under smooth scroll) and
// rAF for smoothness; CSS handles reduced motion (no animation needed — it's a
// position indicator, not motion).
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let raf
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
      bar.style.transform = `scaleX(${p})`
    }
    const loop = () => {
      update()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-primary via-blue-400 to-accent"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
