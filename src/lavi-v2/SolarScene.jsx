import { motion, useReducedMotion } from 'framer-motion'

/* ============================================================
   LionSun — the brand emblem. "Lavi" (לביא) means LION in Hebrew,
   so the mark fuses a radiant desert sun (mane of rays) with a
   front-facing lion's face. Used as the logo and, large + animated,
   as the centrepiece of the hero.
   ============================================================ */
export function LionSun({ className = '', animated = false, reduce = false }) {
  const spinStyle = reduce ? {} : { transformBox: 'fill-box', transformOrigin: 'center', animation: 'mane-spin 48s linear infinite' }
  const Wrap = animated ? motion.svg : 'svg'
  const wrapProps = animated
    ? {
        initial: reduce ? false : { scale: 0.7, opacity: 0, rotate: -8 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        transition: { duration: 1.4, ease: [0.22, 0.61, 0.36, 1] },
      }
    : {}
  return (
    <Wrap viewBox="0 0 100 100" className={className} aria-hidden {...wrapProps}>
      <defs>
        <radialGradient id="ls-sun" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#ffe7a6" />
          <stop offset="0.55" stopColor="#ffc24b" />
          <stop offset="1" stopColor="#ff8a2e" />
        </radialGradient>
        <linearGradient id="ls-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd66a" />
          <stop offset="1" stopColor="#ff7d2e" />
        </linearGradient>
      </defs>
      {/* radiating mane of sun-rays (slowly rotating) */}
      <g style={spinStyle}>
        {Array.from({ length: 16 }).map((_, i) => {
          const long = i % 2 === 0
          return (
            <g key={i} transform={`rotate(${i * 22.5} 50 50)`}>
              <path d={long ? 'M50 2 L46 18 L54 18 Z' : 'M50 8 L47 19 L53 19 Z'} fill="url(#ls-ray)" />
            </g>
          )
        })}
      </g>
      {/* sun disc */}
      <circle cx="50" cy="50" r="30" fill="url(#ls-sun)" />
      {/* lion face */}
      <g fill="#3a1606">
        {/* ears */}
        <circle cx="34" cy="34" r="6.5" />
        <circle cx="66" cy="34" r="6.5" />
      </g>
      <g fill="#ffe7b8">
        <circle cx="34" cy="34" r="3" />
        <circle cx="66" cy="34" r="3" />
      </g>
      {/* eyes */}
      <g fill="#3a1606">
        <path d="M38 46 q4 -4 9 0 q-4 3 -9 0 Z" />
        <path d="M53 46 q5 -4 9 0 q-5 3 -9 0 Z" />
        <circle cx="42.5" cy="46" r="1.8" />
        <circle cx="57.5" cy="46" r="1.8" />
      </g>
      {/* muzzle */}
      <g fill="#fff1d6">
        <ellipse cx="50" cy="60" rx="13" ry="10" />
      </g>
      <g fill="#3a1606">
        {/* nose */}
        <path d="M50 54 l4 4 q-4 3 -8 0 Z" />
        {/* mouth */}
        <path d="M50 60 q0 5 -6 6 M50 60 q0 5 6 6" stroke="#3a1606" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* whisker dots */}
        <circle cx="40" cy="60" r="0.9" /><circle cx="38.5" cy="62.5" r="0.9" />
        <circle cx="60" cy="60" r="0.9" /><circle cx="61.5" cy="62.5" r="0.9" />
      </g>
    </Wrap>
  )
}

/* ============================================================
   Desert ambient background — warm golden-hour dusk with drifting
   sand-glow, a faint star field and dune silhouettes. Site-wide.
   ============================================================ */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {/* dusk sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #140a24 0%, #2e1530 26%, #5e2a2a 50%, #8f3a2a 68%, #2a1606 100%)' }} />
      {/* sun haze */}
      <div className="absolute left-1/2 top-[6%] -translate-x-1/2 h-[34rem] w-[34rem] rounded-full animate-sun" style={{ background: 'radial-gradient(circle, rgba(255,180,80,0.4), transparent 65%)', filter: 'blur(40px)' }} />
      <div className="absolute -left-24 top-1/3 h-[40rem] w-[40rem] rounded-full animate-drift" style={{ background: 'radial-gradient(circle, rgba(255,120,50,0.16), transparent 65%)', filter: 'blur(60px)' }} />
      <div className="absolute -right-24 bottom-0 h-[36rem] w-[36rem] rounded-full animate-drift-2" style={{ background: 'radial-gradient(circle, rgba(255,200,90,0.12), transparent 65%)', filter: 'blur(60px)' }} />
      <StarField />
      {/* dune silhouettes at the foot of the page */}
      <svg className="absolute bottom-0 inset-x-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" style={{ height: '38vh' }}>
        <path d="M0 220 C 240 150 420 250 700 200 C 980 150 1180 250 1440 190 L1440 320 L0 320 Z" fill="#3a1d10" opacity="0.9" />
        <path d="M0 260 C 300 210 520 290 820 250 C 1080 215 1260 290 1440 250 L1440 320 L0 320 Z" fill="#241008" />
      </svg>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 70% at 50% 120%, rgba(19,11,6,0.95), transparent)' }} />
    </div>
  )
}

function StarField() {
  const stars = [
    [12, 14], [22, 8], [34, 18], [48, 10], [63, 16], [76, 9], [88, 20], [18, 26], [42, 24], [70, 28], [84, 32], [8, 34], [55, 30], [93, 12],
  ]
  return (
    <div className="absolute inset-0">
      {stars.map(([l, t], i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{ left: `${l}%`, top: `${t}%`, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, background: '#ffe9c2', animation: `twinkle ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }}
        />
      ))}
    </div>
  )
}

/* Drifting dust / sand motes for the hero. */
function DustField({ count = 16 }) {
  const motes = Array.from({ length: count })
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {motes.map((_, i) => {
        const left = (i * 53) % 100
        const top = 40 + ((i * 37) % 55)
        const dur = 7 + (i % 6)
        const size = 1.5 + (i % 3)
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, background: 'rgba(255,221,160,0.8)', animation: `dust-rise ${dur}s linear ${i * 0.6}s infinite` }}
          />
        )
      })}
    </div>
  )
}

/* ============================================================
   DesertHeroScene — full-bleed cinematic background for the hero:
   rising LionSun, dunes, a warm-lit solar field and the rover.
   ============================================================ */
export function DesertHeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #130a22 0%, #341735 30%, #6e2f2b 52%, #ad4a28 70%, #e6913f 85%, #2a1606 100%)' }} />
      <StarField />
      {/* warm halo behind the rising lion-sun */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[2%] h-[40vh] w-[40vh] rounded-full animate-sun" style={{ background: 'radial-gradient(circle, rgba(255,190,90,0.45), transparent 66%)', filter: 'blur(30px)' }} />

      {/* dune ridges */}
      <svg className="absolute bottom-0 inset-x-0 w-full" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" style={{ height: '58%' }}>
        <path d="M0 250 C 260 180 460 270 760 220 C 1040 175 1240 260 1440 210 L1440 420 L0 420 Z" fill="#7a3a1e" opacity="0.5" />
        <path d="M0 300 C 320 240 540 320 840 280 C 1100 246 1290 320 1440 286 L1440 420 L0 420 Z" fill="#4f2613" opacity="0.85" />
        <path d="M0 356 C 300 320 600 372 900 344 C 1160 320 1320 366 1440 348 L1440 420 L0 420 Z" fill="#2a1409" />
      </svg>

      <DustField />
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(180deg, transparent, rgba(19,11,6,0.55) 80%, #130b06)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 20%, transparent 45%, rgba(19,11,6,0.45))' }} />
    </div>
  )
}

/* Warm-lit tilted panel field with the rover driving across it. */
export function PanelField({ reduce = false }) {
  const cols = 7
  const rows = 2
  return (
    <div className="relative w-full" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative grid gap-2 p-3 rounded-2xl overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, transform: 'rotateX(64deg)', transformStyle: 'preserve-3d', boxShadow: '0 50px 90px -30px rgba(0,0,0,0.85)', background: 'linear-gradient(160deg, rgba(44,27,15,0.8), rgba(26,15,8,0.7))', border: '1px solid rgba(255,200,150,0.12)' }}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-[3px]"
            style={{ background: 'linear-gradient(150deg, #1c3a78, #0c1c45 50%, #2a4f96)', boxShadow: 'inset 0 0 0 1px rgba(150,185,255,0.28)' }}
          >
            {/* warm sun reflection on the glass */}
            <div className="h-full w-full" style={{ background: 'linear-gradient(150deg, rgba(255,190,90,0.35), transparent 55%)' }} />
          </div>
        ))}
      </motion.div>
      <RobotCleaner />
    </div>
  )
}

/* ===================== Robot (digital SolarCleano-style rover) ===================== */
function RobotCleaner() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ left: '9%', top: '34%', width: '30%' }}
      initial={reduce ? false : { x: '0%' }}
      animate={reduce ? { x: '90%' } : { x: ['0%', '170%'], y: [0, -3, 0, 2, 0] }}
      transition={
        reduce
          ? undefined
          : {
              x: { duration: 7.5, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.4 },
              y: { duration: 2.2, ease: 'easeInOut', repeat: Infinity },
            }
      }
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-[4%] w-[120%] h-[45%] rounded-[50%]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(160,220,255,0.5), rgba(120,190,255,0) 70%)', mixBlendMode: 'screen', filter: 'blur(3px)' }}
      />
      <CleaningRobot reduce={reduce} />
    </motion.div>
  )
}

function RobotWing({ reduce }) {
  const roll = reduce ? {} : { animation: 'robot-roll 0.45s linear infinite' }
  return (
    <g>
      <rect x="4" y="-6" width="26" height="11" rx="4" fill="url(#r-arm)" stroke="#33415c" strokeWidth="0.8" />
      <circle cx="24" cy="-0.5" r="4.6" fill="#3a4356" stroke="#aeb8c8" strokeWidth="0.9" />
      <rect x="-78" y="-23.5" width="82" height="16" rx="3.5" fill="#f5f8fd" stroke="#9aa6ba" strokeWidth="1" />
      <rect x="-75" y="-21.4" width="76" height="2.7" fill="#0038b8" />
      <rect x="-75" y="-11.8" width="76" height="2.7" fill="#0038b8" />
      <g fill="#0038b8" transform="translate(-37 -15.5)">
        <polygon points="0,-3.8 3.3,1.9 -3.3,1.9" />
        <polygon points="0,3.8 3.3,-1.9 -3.3,-1.9" />
      </g>
      <rect x="-80" y="-8" width="86" height="16" rx="8" fill="url(#r-brush2)" stroke="#8f9cb0" strokeWidth="0.9" />
      <g clipPath="url(#wbrush)">
        <g style={roll}>
          {[-12, -8, -4, 0, 4, 8, 12, 16].map((ly) => (
            <line key={ly} x1="-80" y1={ly} x2="6" y2={ly} stroke="#a6b2c6" strokeWidth="1.4" opacity="0.6" />
          ))}
        </g>
      </g>
      <ellipse cx="-76" cy="0" rx="4.6" ry="8.6" fill="#aeb8c8" stroke="#5a6477" strokeWidth="0.9" />
      <ellipse cx="2" cy="0" rx="4.6" ry="8.6" fill="#d2dae6" stroke="#5a6477" strokeWidth="0.9" />
      {[-66, -56, -46, -36].map((sx, k) => (
        <circle key={sx} cx={sx} cy="-12" r="1.6" fill="#cdeeff" style={reduce ? { opacity: 0 } : { animation: `robot-spray 1.1s ease-out infinite ${k * 0.2}s`, transformOrigin: 'center' }} />
      ))}
    </g>
  )
}

function CleaningRobot({ reduce = false }) {
  const spin = reduce ? {} : { transformBox: 'fill-box', transformOrigin: 'center', animation: 'robot-spin 0.85s linear infinite' }
  const led = (delay) => (reduce ? {} : { animation: `pulse-glow 1.3s ease-in-out infinite ${delay}` })
  return (
    <svg viewBox="0 0 200 128" className="relative w-full h-auto overflow-visible" style={{ filter: 'drop-shadow(0 9px 11px rgba(0,0,0,0.5))' }} aria-hidden>
      <defs>
        <linearGradient id="r-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbfdff" /><stop offset="0.5" stopColor="#c6d0de" /><stop offset="1" stopColor="#7a8699" /></linearGradient>
        <linearGradient id="r-brush2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3f6fb" /><stop offset="0.5" stopColor="#c8d2e0" /><stop offset="1" stopColor="#8c98ad" /></linearGradient>
        <linearGradient id="r-arm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c4cedd" /><stop offset="1" stopColor="#566073" /></linearGradient>
        <linearGradient id="r-track" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a4356" /><stop offset="1" stopColor="#0e131d" /></linearGradient>
        <linearGradient id="r-belt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f6bff" /><stop offset="1" stopColor="#0038b8" /></linearGradient>
        <linearGradient id="r-topbox" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#46506a" /><stop offset="1" stopColor="#1a2336" /></linearGradient>
        <radialGradient id="r-dome" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stopColor="#d7f6ff" /><stop offset="0.5" stopColor="#3aa6e6" /><stop offset="1" stopColor="#10395e" /></radialGradient>
        <radialGradient id="r-shadow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#000" stopOpacity="0.4" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
        <clipPath id="wbrush"><rect x="-80" y="-8" width="86" height="16" rx="8" /></clipPath>
      </defs>
      <ellipse cx="100" cy="116" rx="94" ry="9" fill="url(#r-shadow)" />
      <g transform="translate(80 82) rotate(-16)"><RobotWing reduce={reduce} /></g>
      <g transform="translate(200 0) scale(-1 1)"><g transform="translate(80 82) rotate(-16)"><RobotWing reduce={reduce} /></g></g>
      {[68, 118].map((tx) => (
        <g key={tx}>
          <rect x={tx} y="62" width="14" height="28" rx="6" fill="url(#r-track)" stroke="#080b11" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <line key={k} x1={tx + 1.5} y1={64 + k * 4.2} x2={tx + 12.5} y2={64 + k * 4.2} stroke="#0a0d14" strokeWidth="1.1" opacity="0.7" />
          ))}
          {[8, 20].map((wy) => (
            <g key={wy} transform={`translate(${tx + 7} ${62 + wy})`}>
              <circle r="4.6" fill="#222a39" />
              <g style={spin}>
                <circle r="4" fill="#465065" stroke="#aeb8c8" strokeWidth="0.9" />
                <line x1="-3" y1="0" x2="3" y2="0" stroke="#cdd6e4" strokeWidth="0.9" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="#cdd6e4" strokeWidth="0.9" />
              </g>
            </g>
          ))}
        </g>
      ))}
      <rect x="72" y="34" width="56" height="44" rx="10" fill="url(#r-body)" stroke="#1b2334" strokeWidth="1.3" />
      <rect x="76" y="37" width="48" height="6" rx="3" fill="#ffffff" opacity="0.22" />
      <rect x="72" y="55" width="56" height="9" fill="url(#r-belt)" />
      <rect x="72" y="55" width="56" height="2" fill="#ffffff" opacity="0.25" />
      <rect x="80" y="44" width="40" height="10" rx="3.5" fill="#0a111e" stroke="#33415c" strokeWidth="0.9" />
      <circle cx="89" cy="49" r="2.3" fill="#4dd2ff" style={led('0s')} />
      <circle cx="100" cy="49" r="2.3" fill="#ffd60a" style={led('0.3s')} />
      <circle cx="111" cy="49" r="2.3" fill="#7dff9a" style={led('0.6s')} />
      <g transform="translate(100 70)">
        <rect x="-11" y="-5" width="22" height="10" rx="1.4" fill="#f5f8fd" stroke="#9aa6ba" strokeWidth="0.6" />
        <rect x="-10" y="-4" width="20" height="1.6" fill="#0038b8" />
        <rect x="-10" y="2.4" width="20" height="1.6" fill="#0038b8" />
        <g fill="#0038b8"><polygon points="0,-2.5 2.2,1.25 -2.2,1.25" /><polygon points="0,2.5 2.2,-1.25 -2.2,-1.25" /></g>
      </g>
      {[[76, 39], [124, 39], [76, 74], [124, 74]].map(([bx, by], k) => (
        <circle key={k} cx={bx} cy={by} r="1.3" fill="#aeb8c8" />
      ))}
      <rect x="84" y="24" width="32" height="13" rx="3" fill="url(#r-topbox)" stroke="#1b2334" strokeWidth="0.9" />
      <rect x="86" y="26.5" width="28" height="2.4" rx="1.2" fill="#ffd60a" opacity="0.85" />
      <rect x="92" y="19" width="16" height="4.6" rx="2.3" fill="#46506a" stroke="#aeb8c8" strokeWidth="0.7" />
      <circle cx="100" cy="30.5" r="3.4" fill="url(#r-dome)" stroke="#0e2336" strokeWidth="0.8" />
      <circle cx="98.8" cy="29.3" r="1" fill="#ffffff" opacity="0.7" />
    </svg>
  )
}
