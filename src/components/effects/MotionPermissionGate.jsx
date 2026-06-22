import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Tracks device-motion availability for tilt consumers. On iOS 13+,
// DeviceOrientationEvent needs a gesture-gated permission prompt — we no longer
// show one (the gyro tilt is a minor enhancement, not worth a button), so gyro
// simply stays disabled there. Android / other browsers auto-grant; desktop
// falls back to pointer tilt.
//
// status: 'granted' | 'denied' | 'unrequested' | 'unsupported'

const PermCtx = createContext({ status: 'unsupported', request: () => {} })

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
    if (needsIosPermission()) {
      // iOS gates gyro behind a prompt we intentionally don't show.
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

  const request = useCallback(() => {}, [])

  return <PermCtx.Provider value={{ status, request }}>{children}</PermCtx.Provider>
}

export function useMotionPermission() {
  return useContext(PermCtx)
}

// Convenience for tilt consumers: gyro is usable when permission is granted.
export function useGyroEnabled() {
  const { status } = useMotionPermission()
  return status === 'granted'
}
