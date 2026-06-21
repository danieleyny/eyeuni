import { useEffect } from 'react'
import { useMotionValue, useReducedMotion } from 'framer-motion'
import { TILT_MAX_DEG } from '../components/motion/constants'

// --- Shared gyroscope subject -------------------------------------------------
// A single global `deviceorientation` listener fans out to every subscriber so
// 11 portfolio cards + the hero don't each attach their own listener.
const gyro = { beta: 0, gamma: 0, subscribers: new Set(), attached: false }

function onOrientation(e) {
  // beta: front-back tilt [-180,180]; gamma: left-right [-90,90].
  gyro.beta = e.beta ?? 0
  gyro.gamma = e.gamma ?? 0
  gyro.subscribers.forEach((fn) => fn(gyro))
}

function attachGyro() {
  if (gyro.attached || typeof window === 'undefined') return
  window.addEventListener('deviceorientation', onOrientation, true)
  gyro.attached = true
}

function subscribeGyro(fn) {
  gyro.subscribers.add(fn)
  attachGyro()
  return () => {
    gyro.subscribers.delete(fn)
    if (gyro.subscribers.size === 0 && gyro.attached) {
      window.removeEventListener('deviceorientation', onOrientation, true)
      gyro.attached = false
    }
  }
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

// useDeviceTilt — returns Framer MotionValues so consumers bind to style with
// zero per-frame React renders.
//
//   { ref }       optional element ref; pointer is normalized to its rect.
//                 Omit (hero) to normalize against the viewport.
//   { maxDeg }    output magnitude in degrees.
//   { gyroEnabled } pass MotionPermissionGate status === 'granted'.
//
// Returns { tiltX, tiltY } in [-maxDeg, maxDeg], smoothed.
export function useDeviceTilt({ ref, maxDeg = TILT_MAX_DEG, gyroEnabled = true } = {}) {
  const reduce = useReducedMotion()
  const tiltX = useMotionValue(0) // left-right
  const tiltY = useMotionValue(0) // up-down

  useEffect(() => {
    if (reduce) {
      tiltX.set(0)
      tiltY.set(0)
      return
    }

    let targetX = 0
    let targetY = 0
    let rafId
    let usingGyro = false

    const onPointer = (e) => {
      if (usingGyro) return
      let nx, ny
      const el = ref?.current
      if (el) {
        const r = el.getBoundingClientRect()
        nx = ((e.clientX - r.left) / r.width) * 2 - 1
        ny = ((e.clientY - r.top) / r.height) * 2 - 1
      } else {
        nx = (e.clientX / window.innerWidth) * 2 - 1
        ny = (e.clientY / window.innerHeight) * 2 - 1
      }
      targetX = clamp(nx, -1, 1) * maxDeg
      targetY = clamp(ny, -1, 1) * maxDeg
    }

    window.addEventListener('pointermove', onPointer, { passive: true })

    let unsub
    if (gyroEnabled) {
      unsub = subscribeGyro((g) => {
        usingGyro = true
        // Normalize a comfortable tilt range (~±25°) to maxDeg.
        targetX = clamp(g.gamma / 25, -1, 1) * maxDeg
        targetY = clamp((g.beta - 45) / 25, -1, 1) * maxDeg
      })
    }

    // Smooth toward target each frame (lerp). Pointer/gyro write the target;
    // this single rAF eases the visible value.
    const tick = () => {
      tiltX.set(tiltX.get() + (targetX - tiltX.get()) * 0.12)
      tiltY.set(tiltY.get() + (targetY - tiltY.get()) * 0.12)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointer)
      cancelAnimationFrame(rafId)
      unsub?.()
    }
  }, [ref, maxDeg, gyroEnabled, reduce, tiltX, tiltY])

  return { tiltX, tiltY }
}

export default useDeviceTilt
