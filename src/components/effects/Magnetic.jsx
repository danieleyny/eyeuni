import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Wraps a CTA. On fine-pointer (desktop) it gently pulls toward the cursor.
// On touch it fires a ripple + a light haptic. Reduced motion → neither.
export default function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })

  const isFinePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onMove = (e) => {
    if (reduce || !isFinePointer()) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const onPointerDown = (e) => {
    // Mobile tap feedback: ripple + haptic.
    if (isFinePointer()) return
    if (navigator.vibrate) navigator.vibrate(10)
    const el = ref.current
    const r = el.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'eyeuni-ripple'
    const size = Math.max(r.width, r.height)
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${e.clientX - r.left - size / 2}px`
    ripple.style.top = `${e.clientY - r.top - size / 2}px`
    el.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onPointerDown}
    >
      {children}
    </motion.div>
  )
}
