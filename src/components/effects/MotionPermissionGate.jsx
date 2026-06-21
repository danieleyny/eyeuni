import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { EASE } from '../motion/constants'

// Tracks device-motion permission. On iOS 13+, DeviceOrientationEvent requires
// a one-time user gesture to grant. Everywhere else, motion is auto-granted.
//
// status: 'granted' | 'denied' | 'unrequested' | 'unsupported'

const PermCtx = createContext({ status: 'unsupported', request: () => {} })
const SESSION_KEY = 'eyeuni_motion_perm'

function needsIosPermission() {
  return (
    typeof window !== 'undefined' &&
    typeof window.DeviceOrientationEvent !== 'undefined' &&
    typeof window.DeviceOrientationEvent.requestPermission === 'function'
  )
}

export default function MotionPermissionGate({ children }) {
  const [status, setStatus] = useState('unsupported')

  useEffect(() => {
    // Remember a prior decision for this session.
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved === 'granted' || saved === 'denied') {
      setStatus(saved)
      return
    }
    if (needsIosPermission()) {
      setStatus('unrequested')
    } else if (
      typeof window !== 'undefined' &&
      typeof window.DeviceOrientationEvent !== 'undefined'
    ) {
      setStatus('granted') // Android / non-gated browsers
    } else {
      setStatus('unsupported') // desktop without orientation API
    }
  }, [])

  const request = useCallback(async () => {
    if (!needsIosPermission()) return
    try {
      const res = await window.DeviceOrientationEvent.requestPermission()
      const next = res === 'granted' ? 'granted' : 'denied'
      setStatus(next)
      sessionStorage.setItem(SESSION_KEY, next)
    } catch {
      setStatus('denied')
      sessionStorage.setItem(SESSION_KEY, 'denied')
    }
  }, [])

  return (
    <PermCtx.Provider value={{ status, request }}>
      {children}
      <AnimatePresence>
        {status === 'unrequested' && (
          <motion.button
            key="motion-pill"
            onClick={request}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: EASE.out }}
            className="fixed left-1/2 bottom-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] z-[80] -translate-x-1/2 flex items-center gap-2 rounded-full border border-primary/30 bg-dark/80 px-4 py-2.5 text-sm font-medium text-primary backdrop-blur-xl shadow-lg shadow-accent/20"
          >
            <Smartphone className="h-4 w-4" />
            Tap to enable motion
          </motion.button>
        )}
      </AnimatePresence>
    </PermCtx.Provider>
  )
}

export function useMotionPermission() {
  return useContext(PermCtx)
}

// Convenience for tilt consumers: gyro is usable when permission is granted.
export function useGyroEnabled() {
  const { status } = useMotionPermission()
  return status === 'granted'
}
