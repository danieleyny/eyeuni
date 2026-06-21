import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { RotateCcw, Zap } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'
import { useInViewPaused } from '../hooks/useInViewPaused'

// TODO(client): confirm representative load times.
const AGENCY_TIME = '4.1s'
const EYEUNI_TIME = '0.7s'

export default function SpeedRace() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInViewPaused(ref, { threshold: 0.4 })
  const [runKey, setRunKey] = useState(0)

  // Race plays when in view; key lets the user replay it.
  const playing = inView && !reduce
  const k = `${runKey}-${playing}`

  return (
    <section id="speed" ref={ref} className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">speed</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Speed isn't a nice-to-have — it's the difference between a sale and a bounce.
            Here's how a typical agency build compares to an EYEuni site.
          </p>
        </AnimateIn>

        <AnimateIn delay={150}>
          <div className="rounded-2xl border border-dark-border bg-dark-card/50 backdrop-blur-sm p-6 sm:p-10">
            {/* Agency */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-gray-400 font-medium">Typical agency site</span>
                <span className="text-sm font-mono text-red-400">{AGENCY_TIME}</span>
              </div>
              <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                <div
                  key={`a-${k}`}
                  className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400"
                  style={{
                    width: reduce || !playing ? '100%' : '0%',
                    animation: playing ? 'race-agency 4.1s steps(14,end) forwards' : 'none',
                  }}
                />
              </div>
            </div>

            {/* EYEuni */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-primary font-semibold flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> EYEuni site
                </span>
                <span className="text-sm font-mono text-primary">{EYEUNI_TIME}</span>
              </div>
              <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                <div
                  key={`e-${k}`}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_20px] shadow-accent/50"
                  style={{
                    width: reduce || !playing ? '100%' : '0%',
                    animation: playing ? 'race-eyeuni 0.7s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-gray-400">
                That's <span className="text-primary font-bold">~6× faster</span> — every visit. {/* TODO: verify multiple */}
              </p>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setRunKey((n) => n + 1)}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Replay
                </button>
              )}
            </div>
          </div>
        </AnimateIn>
      </div>

      <style>{`
        @keyframes race-agency {
          0% { width: 0%; } 18% { width: 14%; } 20% { width: 14%; }
          45% { width: 38%; } 50% { width: 40%; } 72% { width: 62%; }
          80% { width: 70%; } 100% { width: 100%; }
        }
        @keyframes race-eyeuni { 0% { width: 0%; } 100% { width: 100%; } }
      `}</style>
    </section>
  )
}
