import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function check() {
      if (triggered.current) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
        triggered.current = true
        setIsVisible(true)
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })

    // Periodic fallback check for environments where scroll events don't fire
    const interval = setInterval(check, 300)

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearInterval(interval)
    }
  }, [])

  return [ref, isVisible]
}

export function AnimateIn({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, isVisible] = useScrollAnimation()

  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transforms[direction],
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
