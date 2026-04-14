import { AnimateIn } from './useScrollAnimation'

// ─── Stick Figure Worker ────────────────────────────────
function Worker({ x, y, type = 'standing', scale = 1, flip = false }) {
  const s = scale
  const flipT = flip ? `translate(${x + 18 * s}, ${y}) scale(-${s}, ${s})` : `translate(${x}, ${y}) scale(${s})`

  // Animation class based on type
  const bodyClass = type === 'hammering'
    ? 'animate-[hammerSwing_0.6s_ease-in-out_infinite]'
    : type === 'walking'
      ? 'animate-[workerBounce_0.5s_ease-in-out_infinite]'
      : type === 'welding'
        ? 'animate-[weldPulse_0.3s_ease-in-out_infinite]'
        : ''

  return (
    <g transform={flipT} className={bodyClass}>
      {/* Head */}
      <circle cx="9" cy="4" r="3.5" fill="#b3c8f4" />
      {/* Hard hat */}
      <path d="M5,3 L13,3 L12,0.5 Q9,-1 6,0.5 Z" fill="#f59e0b" />
      <rect x="4" y="2.5" width="10" height="1.5" rx="0.5" fill="#f59e0b" />
      {/* Eyes */}
      <circle cx="7.5" cy="3.5" r="0.6" fill="#0a0a0f" />
      <circle cx="10.5" cy="3.5" r="0.6" fill="#0a0a0f" />
      {/* Body */}
      <rect x="6" y="8" width="6" height="7" rx="1.5" fill="#0f31b8" />
      {/* Belt */}
      <rect x="6" y="12" width="6" height="1.2" fill="#c8a97e" />
      {/* Arms */}
      {type === 'hammering' ? (
        <>
          <g className="animate-[armHammer_0.6s_ease-in-out_infinite]" style={{ transformOrigin: '6px 9px' }}>
            <line x1="6" y1="9" x2="0" y2="14" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
            {/* Hammer */}
            <rect x="-3" y="13" width="4" height="2.5" rx="0.5" fill="#888" />
            <line x1="-1" y1="14" x2="-1" y2="11" stroke="#a0522d" strokeWidth="1.2" strokeLinecap="round" />
          </g>
          <line x1="12" y1="9" x2="15" y2="13" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : type === 'welding' ? (
        <>
          <line x1="6" y1="9" x2="1" y2="13" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
          <g className="animate-[weldArm_0.4s_ease-in-out_infinite]" style={{ transformOrigin: '12px 9px' }}>
            <line x1="12" y1="9" x2="18" y2="12" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
            {/* Welding torch */}
            <rect x="17" y="11" width="3" height="1.5" rx="0.5" fill="#666" />
          </g>
        </>
      ) : type === 'carrying' ? (
        <>
          <line x1="6" y1="9" x2="2" y2="6" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="9" x2="16" y2="6" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
          {/* Beam being carried */}
          <rect x="0" y="4.5" width="18" height="2" rx="0.5" fill="#0f31b8" opacity="0.6" />
        </>
      ) : (
        <>
          <line x1="6" y1="9" x2="2" y2="14" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="9" x2="16" y2="14" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {/* Legs */}
      {type === 'walking' ? (
        <>
          <g className="animate-[legWalk_0.5s_ease-in-out_infinite]" style={{ transformOrigin: '7px 15px' }}>
            <line x1="7" y1="15" x2="4" y2="22" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="22" x2="2" y2="23" stroke="#0f31b8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g className="animate-[legWalkAlt_0.5s_ease-in-out_infinite]" style={{ transformOrigin: '11px 15px' }}>
            <line x1="11" y1="15" x2="14" y2="22" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="22" x2="16" y2="23" stroke="#0f31b8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </>
      ) : (
        <>
          <line x1="7" y1="15" x2="5" y2="22" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="22" x2="3" y2="23" stroke="#0f31b8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="11" y1="15" x2="13" y2="22" stroke="#b3c8f4" strokeWidth="2" strokeLinecap="round" />
          <line x1="13" y1="22" x2="15" y2="23" stroke="#0f31b8" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

// ─── Welding Sparks ─────────────────────────────────────
function Sparks({ cx, cy }) {
  return (
    <g>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const r = 3 + Math.random() * 4
        return (
          <circle
            key={i}
            cx={cx + Math.cos(angle) * r}
            cy={cy + Math.sin(angle) * r}
            r="0.8"
            fill="#f59e0b"
            className="animate-[sparkFly_0.6s_ease-out_infinite]"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        )
      })}
      {/* Central glow */}
      <circle cx={cx} cy={cy} r="2" fill="#f59e0b" opacity="0.6" className="animate-[weldGlow_0.3s_ease-in-out_infinite]" />
      <circle cx={cx} cy={cy} r="4" fill="#f59e0b" opacity="0.15" className="animate-[weldGlow_0.3s_ease-in-out_infinite]" />
    </g>
  )
}

export default function BuildingSection() {
  const floorH = 28
  const floorW = 100
  const buildingX = 150
  const groundY = 310
  const numFloors = 8

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/30 via-dark to-dark-card/30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
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

        {/* Construction Animation */}
        <AnimateIn delay={200}>
          <div className="max-w-xl mx-auto">
            <svg
              viewBox="0 0 400 340"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ── Sky background ── */}
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a0a1a" />
                  <stop offset="100%" stopColor="#0f1528" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1a2a4a" />
                  <stop offset="100%" stopColor="#0f1f3a" />
                </linearGradient>
                <linearGradient id="activeFloor" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1a2a4a" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0f1f3a" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              <rect width="400" height="340" fill="url(#skyGrad)" />

              {/* Stars */}
              {[
                [30, 20], [80, 45], [140, 15], [260, 35], [320, 18], [370, 50],
                [50, 60], [180, 55], [290, 12], [350, 40], [110, 38], [230, 25],
              ].map(([sx, sy], i) => (
                <circle key={i} cx={sx} cy={sy} r="0.7" fill="white" opacity={0.2 + Math.random() * 0.3}
                  className="animate-[starTwinkle_3s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}

              {/* Clouds */}
              <g className="animate-[cloudDrift_20s_linear_infinite]" opacity="0.08">
                <ellipse cx="60" cy="70" rx="30" ry="8" fill="white" />
                <ellipse cx="80" cy="68" rx="20" ry="6" fill="white" />
              </g>
              <g className="animate-[cloudDrift2_25s_linear_infinite]" opacity="0.05">
                <ellipse cx="280" cy="50" rx="35" ry="7" fill="white" />
                <ellipse cx="305" cy="48" rx="22" ry="5" fill="white" />
              </g>

              {/* ── Ground ── */}
              <rect x="0" y={groundY} width="400" height="30" fill="#0d0d15" />
              <line x1="0" y1={groundY} x2="400" y2={groundY} stroke="#1e1e2e" strokeWidth="1" />

              {/* Ground details */}
              <rect x="20" y={groundY + 8} width="50" height="12" rx="2" fill="#161620" stroke="#1e1e2e" strokeWidth="0.5" />
              <text x="28" y={groundY + 17} fill="#b3c8f4" fontSize="5" fontFamily="sans-serif" fontWeight="bold">EYEuni HQ</text>

              {/* Material pile */}
              <rect x="310" y={groundY - 6} width="30" height="6" rx="1" fill="#0f31b8" opacity="0.4" />
              <rect x="315" y={groundY - 11} width="22" height="5" rx="1" fill="#0f31b8" opacity="0.3" />
              <rect x="318" y={groundY - 15} width="16" height="4" rx="1" fill="#0f31b8" opacity="0.2" />

              {/* ── Building (floors build from bottom) ── */}
              <g>
                {[...Array(numFloors)].map((_, i) => {
                  const fy = groundY - (i + 1) * floorH
                  const delay = (i * 0.8) % (numFloors * 0.8)
                  const isActive = i >= numFloors - 2

                  return (
                    <g key={i}
                      className="animate-[floorAppear_6.4s_ease-out_infinite]"
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {/* Floor panel */}
                      <rect
                        x={buildingX}
                        y={fy}
                        width={floorW}
                        height={floorH}
                        fill={isActive ? 'url(#activeFloor)' : 'url(#glassGrad)'}
                        stroke="#1e3a5f"
                        strokeWidth="0.5"
                      />
                      {/* Windows */}
                      {[0, 1, 2, 3].map((w) => (
                        <rect
                          key={w}
                          x={buildingX + 8 + w * 24}
                          y={fy + 5}
                          width="16"
                          height={floorH - 10}
                          rx="1"
                          fill="#0a1628"
                          stroke="#1e3a5f"
                          strokeWidth="0.3"
                        />
                      ))}
                      {/* Window light glow (random windows lit) */}
                      {[0, 2, 3].filter(() => !isActive && Math.random() > 0.3).map((w) => (
                        <rect
                          key={`glow-${w}`}
                          x={buildingX + 9 + w * 24}
                          y={fy + 6}
                          width="14"
                          height={floorH - 12}
                          rx="0.5"
                          fill="#b3c8f4"
                          opacity="0.06"
                        />
                      ))}
                      {/* Floor divider line */}
                      <line x1={buildingX} y1={fy + floorH} x2={buildingX + floorW} y2={fy + floorH} stroke="#2a4a6f" strokeWidth="0.5" />
                    </g>
                  )
                })}

                {/* EYEuni logo on building front */}
                <g transform={`translate(${buildingX + floorW / 2}, ${groundY - numFloors * floorH + 12})`}>
                  {/* Logo background */}
                  <rect x="-18" y="-6" width="36" height="12" rx="2" fill="#0f31b8" opacity="0.8" />
                  {/* Eye icon */}
                  <circle cx="-7" cy="0" r="3" fill="none" stroke="#b3c8f4" strokeWidth="0.6" />
                  <circle cx="-7" cy="0" r="1.2" fill="#b3c8f4" />
                  {/* Text */}
                  <text x="1" y="2" fill="#b3c8f4" fontSize="5.5" fontFamily="sans-serif" fontWeight="bold">EYE</text>
                  <text x="14" y="2" fill="white" fontSize="5.5" fontFamily="sans-serif" fontWeight="bold">uni</text>
                </g>
              </g>

              {/* ── Crane ── */}
              <g>
                {/* Crane tower */}
                <rect x={buildingX + floorW - 8} y={groundY - numFloors * floorH - 50} width="6" height={numFloors * floorH + 50} fill="#2a2a3a" />
                {/* Cross bracing */}
                {[...Array(5)].map((_, i) => (
                  <g key={i}>
                    <line
                      x1={buildingX + floorW - 8} y1={groundY - i * 50}
                      x2={buildingX + floorW - 2} y2={groundY - i * 50 - 50}
                      stroke="#3a3a4a" strokeWidth="0.5"
                    />
                    <line
                      x1={buildingX + floorW - 2} y1={groundY - i * 50}
                      x2={buildingX + floorW - 8} y2={groundY - i * 50 - 50}
                      stroke="#3a3a4a" strokeWidth="0.5"
                    />
                  </g>
                ))}

                {/* Crane arm (swinging) */}
                <g
                  className="animate-[craneSwing_4s_ease-in-out_infinite]"
                  style={{ transformOrigin: `${buildingX + floorW - 5}px ${groundY - numFloors * floorH - 48}px` }}
                >
                  <line
                    x1={buildingX + floorW - 5}
                    y1={groundY - numFloors * floorH - 48}
                    x2={buildingX + floorW + 60}
                    y2={groundY - numFloors * floorH - 48}
                    stroke="#3a3a5a" strokeWidth="2.5"
                  />
                  {/* Cable */}
                  <line
                    x1={buildingX + floorW + 50}
                    y1={groundY - numFloors * floorH - 48}
                    x2={buildingX + floorW + 50}
                    y2={groundY - numFloors * floorH - 20}
                    stroke="#666" strokeWidth="0.8"
                    strokeDasharray="2,1"
                  />
                  {/* Hook & load */}
                  <rect
                    x={buildingX + floorW + 42}
                    y={groundY - numFloors * floorH - 22}
                    width="16" height="4" rx="0.5"
                    fill="#0f31b8" opacity="0.5"
                    className="animate-[loadSway_4s_ease-in-out_infinite]"
                  />
                </g>

                {/* Crane cab */}
                <rect x={buildingX + floorW - 12} y={groundY - numFloors * floorH - 55} width="14" height="8" rx="1" fill="#2a2a3a" stroke="#3a3a5a" strokeWidth="0.5" />
                <rect x={buildingX + floorW - 10} y={groundY - numFloors * floorH - 54} width="5" height="4" rx="0.5" fill="#1a2a4a" />
              </g>

              {/* ── Workers ── */}

              {/* Ground walker — carrying beam, walks back and forth */}
              <g className="animate-[walkCycle_5s_linear_infinite]">
                <Worker x={280} y={groundY - 23} type="carrying" scale={0.9} />
              </g>

              {/* Builder on active floor — hammering */}
              <Worker
                x={buildingX + 15}
                y={groundY - (numFloors - 1) * floorH - 23}
                type="hammering"
                scale={0.85}
              />

              {/* Welder on active floor — with sparks */}
              <Worker
                x={buildingX + 60}
                y={groundY - (numFloors - 1) * floorH - 23}
                type="welding"
                scale={0.85}
                flip
              />
              <Sparks
                cx={buildingX + 64}
                cy={groundY - (numFloors - 1) * floorH - 10}
              />

              {/* Ground standing worker (supervisor) */}
              <Worker x={90} y={groundY - 23} type="standing" scale={0.9} />

              {/* ── Scaffolding on active floor ── */}
              <g opacity="0.4">
                <line x1={buildingX - 5} y1={groundY - (numFloors - 1) * floorH} x2={buildingX - 5} y2={groundY - numFloors * floorH} stroke="#666" strokeWidth="1" />
                <line x1={buildingX + floorW + 5} y1={groundY - (numFloors - 1) * floorH} x2={buildingX + floorW + 5} y2={groundY - numFloors * floorH} stroke="#666" strokeWidth="1" />
                <line x1={buildingX - 8} y1={groundY - (numFloors - 1) * floorH + 5} x2={buildingX + floorW + 8} y2={groundY - (numFloors - 1) * floorH + 5} stroke="#666" strokeWidth="0.8" />
              </g>

              {/* ── Small background buildings ── */}
              <rect x="15" y={groundY - 60} width="25" height="60" fill="#0d0d18" stroke="#1a1a2a" strokeWidth="0.3" />
              <rect x="18" y={groundY - 55} width="5" height="7" fill="#1a1a2a" />
              <rect x="26" y={groundY - 55} width="5" height="7" fill="#1a1a2a" />
              <rect x="18" y={groundY - 42} width="5" height="7" fill="#1a1a2a" />
              <rect x="26" y={groundY - 42} width="5" height="7" fill="#1a1a2a" />

              <rect x="50" y={groundY - 40} width="20" height="40" fill="#0e0e1a" stroke="#1a1a2a" strokeWidth="0.3" />
              <rect x="53" y={groundY - 36} width="4" height="5" fill="#1a1a2a" />
              <rect x="60" y={groundY - 36} width="4" height="5" fill="#1a1a2a" />

              <rect x="340" y={groundY - 45} width="22" height="45" fill="#0d0d18" stroke="#1a1a2a" strokeWidth="0.3" />
              <rect x="370" y={groundY - 35} width="18" height="35" fill="#0e0e1a" stroke="#1a1a2a" strokeWidth="0.3" />
            </svg>
          </div>
        </AnimateIn>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes floorAppear {
          0%, 5% { opacity: 0.3; }
          15%, 100% { opacity: 1; }
        }
        @keyframes craneSwing {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-8deg); }
        }
        @keyframes loadSway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-5px); }
        }
        @keyframes hammerSwing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1px); }
        }
        @keyframes armHammer {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(-35deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes weldArm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes weldPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.5px); }
        }
        @keyframes workerBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes legWalk {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes legWalkAlt {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(-12deg); }
        }
        @keyframes walkCycle {
          0% { transform: translateX(40px); }
          45% { transform: translateX(-80px); }
          50% { transform: translateX(-80px) scaleX(-1); }
          95% { transform: translateX(40px) scaleX(-1); }
          100% { transform: translateX(40px); }
        }
        @keyframes sparkFly {
          0% { opacity: 1; r: 0.8; }
          100% { opacity: 0; r: 0; transform: translate(var(--tx, 2px), var(--ty, -3px)); }
        }
        @keyframes weldGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(-60px); }
          100% { transform: translateX(420px); }
        }
        @keyframes cloudDrift2 {
          0% { transform: translateX(50px); }
          100% { transform: translateX(-420px); }
        }
      `}</style>
    </section>
  )
}
