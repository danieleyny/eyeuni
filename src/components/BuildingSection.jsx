import { useState, useEffect, useRef } from 'react'
import { AnimateIn } from './useScrollAnimation'

// Building config
const COLS = 8
const ROWS = 12
const BLOCK_W = 22
const BLOCK_H = 14
const BUILDING_X = 110
const GROUND_Y = 295
const CYCLE_DURATION = 8000 // ms for full loop

// Block colors — EYEuni branded palette
const BLOCK_COLORS = [
  '#0f31b8', '#1338c0', '#1740c8', '#0e2da8',
  '#1a45d0', '#0f31b8', '#1338c0', '#0e2da8',
]

// ─── Tiny Worker on Rope ────────────────────────────────
function RopeWorker({ x, ropeTop, workerY, swayClass }) {
  return (
    <g className={swayClass}>
      {/* Rope */}
      <line x1={x + 5} y1={ropeTop} x2={x + 5} y2={workerY} stroke="#888" strokeWidth="0.8" strokeDasharray="2,1.5" />
      {/* Harness dot */}
      <circle cx={x + 5} cy={workerY} r="1.5" fill="#c8a97e" />
      {/* Body */}
      <circle cx={x + 5} cy={workerY + 4} r="3" fill="#b3c8f4" />
      {/* Hard hat */}
      <rect x={x + 2} y={workerY + 0.5} width="6" height="2" rx="1" fill="#f59e0b" />
      {/* Torso */}
      <rect x={x + 3} y={workerY + 7} width="4" height="5" rx="1" fill="#0f31b8" />
      {/* Arms reaching out */}
      <line x1={x + 3} y1={workerY + 8} x2={x - 1} y2={workerY + 11} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={x + 7} y1={workerY + 8} x2={x + 11} y2={workerY + 11} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1={x + 4} y1={workerY + 12} x2={x + 2} y2={workerY + 16} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={x + 6} y1={workerY + 12} x2={x + 8} y2={workerY + 16} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
      {/* Boots */}
      <rect x={x + 0.5} y={workerY + 15} width="3" height="1.5" rx="0.5" fill="#0f31b8" />
      <rect x={x + 6.5} y={workerY + 15} width="3" height="1.5" rx="0.5" fill="#0f31b8" />
    </g>
  )
}

// ─── Ground Worker ──────────────────────────────────────
function GroundWorker({ baseX, groundY, animClass, carrying = false }) {
  return (
    <g className={animClass}>
      {/* Head */}
      <circle cx={baseX + 5} cy={groundY - 18} r="3" fill="#b3c8f4" />
      {/* Hard hat */}
      <rect x={baseX + 2} y={groundY - 21.5} width="6" height="2" rx="1" fill="#f59e0b" />
      {/* Body */}
      <rect x={baseX + 3} y={groundY - 14.5} width="4" height="5" rx="1" fill="#0f31b8" />
      {/* Arms */}
      {carrying ? (
        <>
          <line x1={baseX + 3} y1={groundY - 13} x2={baseX} y2={groundY - 17} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={baseX + 7} y1={groundY - 13} x2={baseX + 10} y2={groundY - 17} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Block being carried on head */}
          <rect x={baseX - 1} y={groundY - 24} width={BLOCK_W * 0.5} height={BLOCK_H * 0.6} rx="1" fill="#1a45d0" stroke="#2a55e0" strokeWidth="0.3" />
        </>
      ) : (
        <>
          <line x1={baseX + 3} y1={groundY - 13} x2={baseX} y2={groundY - 9} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={baseX + 7} y1={groundY - 13} x2={baseX + 10} y2={groundY - 9} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {/* Legs — walking animation handled by parent class */}
      <g className={carrying ? 'animate-[legStep_0.4s_ease-in-out_infinite]' : ''} style={{ transformOrigin: `${baseX + 4}px ${groundY - 9.5}px` }}>
        <line x1={baseX + 4} y1={groundY - 9.5} x2={baseX + 2} y2={groundY - 4} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
        <rect x={baseX + 0.5} y={groundY - 5} width="3" height="1.5" rx="0.5" fill="#0f31b8" />
      </g>
      <g className={carrying ? 'animate-[legStepAlt_0.4s_ease-in-out_infinite]' : ''} style={{ transformOrigin: `${baseX + 6}px ${groundY - 9.5}px` }}>
        <line x1={baseX + 6} y1={groundY - 9.5} x2={baseX + 8} y2={groundY - 4} stroke="#b3c8f4" strokeWidth="1.5" strokeLinecap="round" />
        <rect x={baseX + 6.5} y={groundY - 5} width="3" height="1.5" rx="0.5" fill="#0f31b8" />
      </g>
    </g>
  )
}

export default function BuildingSection() {
  const [activeRow, setActiveRow] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  // Scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Cycle through rows
  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveRow(prev => (prev + 1) % (ROWS + 2))
    }, CYCLE_DURATION / (ROWS + 2))
    return () => clearInterval(interval)
  }, [inView])

  // How many rows are "built"
  const builtRows = Math.min(activeRow, ROWS)

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/30 via-dark to-dark-card/30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateIn className="text-center mb-12 md:mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            We Help Companies{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Build for the Future
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            In a world that never stops evolving, we keep your business ahead of the curve with modern design and cutting-edge technology.
          </p>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="max-w-lg mx-auto">
            <svg viewBox="0 0 320 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Sky */}
              <defs>
                <linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#060610" />
                  <stop offset="100%" stopColor="#0a0a1a" />
                </linearGradient>
              </defs>
              <rect width="320" height="320" fill="url(#bSky)" />

              {/* Stars */}
              {[[25,15],[70,30],[130,12],[200,25],[260,10],[290,35],[50,50],[170,40],[240,55],[305,20]].map(([sx,sy],i) => (
                <circle key={i} cx={sx} cy={sy} r="0.6" fill="white"
                  opacity={0.15 + (i % 3) * 0.1}
                  className="animate-[twinkle_3s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}

              {/* Ground */}
              <rect x="0" y={GROUND_Y} width="320" height="25" fill="#0d0d15" />
              <line x1="0" y1={GROUND_Y} x2="320" y2={GROUND_Y} stroke="#1a1a2e" strokeWidth="0.5" />

              {/* ── Building blocks ── */}
              <g>
                {[...Array(ROWS)].map((_, row) => {
                  const rowFromBottom = row
                  const isBuilt = rowFromBottom < builtRows
                  const isActive = rowFromBottom === builtRows - 1
                  const y = GROUND_Y - (rowFromBottom + 1) * BLOCK_H

                  return [...Array(COLS)].map((_, col) => {
                    const x = BUILDING_X + col * BLOCK_W
                    const blockDelay = isActive ? col * 0.08 : 0
                    const color = BLOCK_COLORS[(row + col) % BLOCK_COLORS.length]

                    return (
                      <g key={`${row}-${col}`}>
                        <rect
                          x={x}
                          y={y}
                          width={BLOCK_W - 1}
                          height={BLOCK_H - 1}
                          rx="1"
                          fill={isBuilt ? color : 'transparent'}
                          stroke={isBuilt ? '#2a55e0' : 'transparent'}
                          strokeWidth="0.3"
                          className={isActive ? 'animate-[blockPop_0.4s_ease-out_both]' : ''}
                          style={isActive ? { animationDelay: `${blockDelay}s` } : {}}
                        />
                        {/* Window/detail on built blocks */}
                        {isBuilt && !isActive && (
                          <rect
                            x={x + 4}
                            y={y + 3}
                            width={BLOCK_W - 9}
                            height={BLOCK_H - 7}
                            rx="0.5"
                            fill="#0a1a30"
                            opacity="0.5"
                          />
                        )}
                        {/* Subtle light in some windows */}
                        {isBuilt && !isActive && (row + col) % 3 === 0 && (
                          <rect
                            x={x + 5}
                            y={y + 4}
                            width={BLOCK_W - 11}
                            height={BLOCK_H - 9}
                            rx="0.3"
                            fill="#b3c8f4"
                            opacity="0.08"
                          />
                        )}
                      </g>
                    )
                  })
                })}
              </g>

              {/* EYEuni sign on building — only when mostly built */}
              {builtRows >= 6 && (
                <g opacity={Math.min(1, (builtRows - 5) * 0.3)}>
                  <rect x={BUILDING_X + COLS * BLOCK_W / 2 - 28} y={GROUND_Y - builtRows * BLOCK_H + 4} width="56" height="12" rx="2" fill="#0f31b8" stroke="#2a55e0" strokeWidth="0.5" />
                  <text x={BUILDING_X + COLS * BLOCK_W / 2 - 16} y={GROUND_Y - builtRows * BLOCK_H + 13} fill="#b3c8f4" fontSize="6" fontFamily="sans-serif" fontWeight="bold">EYE</text>
                  <text x={BUILDING_X + COLS * BLOCK_W / 2 + 2} y={GROUND_Y - builtRows * BLOCK_H + 13} fill="white" fontSize="6" fontFamily="sans-serif" fontWeight="bold">uni</text>
                </g>
              )}

              {/* ── Rope Workers — hanging from top of built area ── */}
              {builtRows > 1 && builtRows <= ROWS && (
                <>
                  {/* Left rope worker */}
                  <RopeWorker
                    x={BUILDING_X + 15}
                    ropeTop={GROUND_Y - builtRows * BLOCK_H - 10}
                    workerY={GROUND_Y - builtRows * BLOCK_H + 2}
                    swayClass="animate-[ropeSway_2s_ease-in-out_infinite]"
                  />
                  {/* Right rope worker */}
                  <RopeWorker
                    x={BUILDING_X + COLS * BLOCK_W - 35}
                    ropeTop={GROUND_Y - builtRows * BLOCK_H - 10}
                    workerY={GROUND_Y - builtRows * BLOCK_H + 2}
                    swayClass="animate-[ropeSway_2.5s_ease-in-out_infinite_0.5s]"
                  />
                </>
              )}

              {/* ── Ground Workers ── */}
              {/* Walker carrying block — moves back and forth */}
              <g className="animate-[groundWalk_3s_linear_infinite]">
                <GroundWorker baseX={60} groundY={GROUND_Y} animClass="" carrying />
              </g>

              {/* Second walker — opposite direction */}
              <g className="animate-[groundWalkRev_3.5s_linear_infinite]">
                <GroundWorker baseX={250} groundY={GROUND_Y} animClass="" carrying />
              </g>

              {/* Standing supervisor near base */}
              <GroundWorker baseX={BUILDING_X - 30} groundY={GROUND_Y} animClass="" />

              {/* ── Block pile at the side ── */}
              <g>
                {[0,1,2,3,4].map(i => (
                  <rect key={i} x={270 + (i % 3) * 12} y={GROUND_Y - 6 - Math.floor(i / 3) * 8} width="10" height="6" rx="0.5"
                    fill={BLOCK_COLORS[i]} stroke="#2a55e0" strokeWidth="0.3" opacity="0.6" />
                ))}
              </g>

              {/* Small background buildings for context */}
              <rect x="8" y={GROUND_Y - 50} width="18" height="50" fill="#08080f" stroke="#111" strokeWidth="0.3" />
              <rect x="30" y={GROUND_Y - 30} width="14" height="30" fill="#09090f" stroke="#111" strokeWidth="0.3" />
              <rect x="280" y={GROUND_Y - 40} width="16" height="40" fill="#08080f" stroke="#111" strokeWidth="0.3" />
              <rect x="300" y={GROUND_Y - 25} width="14" height="25" fill="#09090f" stroke="#111" strokeWidth="0.3" />
            </svg>
          </div>
        </AnimateIn>
      </div>

      <style>{`
        @keyframes blockPop {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ropeSway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes groundWalk {
          0% { transform: translateX(-20px); }
          48% { transform: translateX(${BUILDING_X - 70}px); }
          50% { transform: translateX(${BUILDING_X - 70}px) scaleX(-1); }
          98% { transform: translateX(-20px) scaleX(-1); }
          100% { transform: translateX(-20px); }
        }
        @keyframes groundWalkRev {
          0% { transform: translateX(20px) scaleX(-1); }
          48% { transform: translateX(${-(BUILDING_X - 100)}px) scaleX(-1); }
          50% { transform: translateX(${-(BUILDING_X - 100)}px); }
          98% { transform: translateX(20px); }
          100% { transform: translateX(20px) scaleX(-1); }
        }
        @keyframes legStep {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes legStepAlt {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </section>
  )
}
