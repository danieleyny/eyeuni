import { useRef } from 'react'
import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { TILT_MAX_DEG } from '../motion/constants'
import { useDeviceTilt } from '../../hooks/useDeviceTilt'
import { useGyroEnabled } from './MotionPermissionGate'

// Generic 3D tilt + glare wrapper. Works via pointer (desktop) and gyroscope
// (mobile) — never hover-only. Reduced motion → plain div.
export default function TiltCard({
  children,
  maxDeg = TILT_MAX_DEG,
  glare = true,
  className = '',
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const gyroEnabled = useGyroEnabled()
  const { tiltX, tiltY } = useDeviceTilt({ ref, maxDeg, gyroEnabled })

  // rotateX is driven by vertical tilt (inverted), rotateY by horizontal tilt.
  const rotateX = useTransform(tiltY, (v) => -v)
  const rotateY = tiltX
  // Glare follows the tilt direction.
  const glareX = useTransform(tiltX, [-maxDeg, maxDeg], [30, 70])
  const glareY = useTransform(tiltY, [-maxDeg, maxDeg], [20, 80])
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18), transparent 55%)`
  )

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl mix-blend-soft-light"
          />
        )}
      </motion.div>
    </div>
  )
}
