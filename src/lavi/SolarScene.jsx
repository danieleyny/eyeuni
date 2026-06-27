import { motion, useReducedMotion } from 'framer-motion'

/* Fixed ambient background — drifting solar-gold + electric-blue auroras over
   the deep base, with a faint photovoltaic grid. Sits behind all content. */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% -10%, #0d1631 0%, #060912 60%)' }} />
      <div
        className="absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full animate-drift"
        style={{ background: 'radial-gradient(circle, rgba(47,107,255,0.32), transparent 65%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[40rem] w-[40rem] rounded-full animate-drift-2"
        style={{ background: 'radial-gradient(circle, rgba(255,179,0,0.16), transparent 65%)', filter: 'blur(50px)' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full animate-drift"
        style={{ background: 'radial-gradient(circle, rgba(77,134,255,0.14), transparent 65%)', filter: 'blur(60px)' }}
      />
      <div className="absolute inset-0 panel-grid opacity-[0.5]" style={{ maskImage: 'radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 75%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(100% 60% at 50% 120%, rgba(6,9,18,0.9), transparent)' }} />
    </div>
  )
}

/* Hero art — a glowing sun above a tilted, animated solar-panel field with a
   robotic cleaning sweep. Pure SVG/CSS so it's crisp and dependency-free. */
export function HeroArt() {
  const cols = 6
  const rows = 4
  return (
    <div className="relative w-full max-w-[560px] aspect-square mx-auto select-none" aria-hidden>
      {/* glow sun */}
      <motion.div
        className="absolute left-1/2 top-[14%] -translate-x-1/2 animate-sun"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="relative h-44 w-44">
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, #ffe680 0%, #ffd60a 35%, rgba(255,179,0,0.35) 60%, transparent 72%)', filter: 'blur(2px)' }} />
          <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ background: 'conic-gradient(from 0deg, transparent 0 8deg, rgba(255,214,10,0.5) 9deg 11deg, transparent 12deg 30deg)', WebkitMaskImage: 'radial-gradient(circle, transparent 38%, #000 40%, #000 64%, transparent 66%)', maskImage: 'radial-gradient(circle, transparent 38%, #000 40%, #000 64%, transparent 66%)' }} />
        </div>
      </motion.div>

      {/* tilted panel field */}
      <div className="absolute left-1/2 bottom-[6%] -translate-x-1/2 w-[90%]" style={{ perspective: '900px' }}>
        <motion.div
          className="relative grid gap-2 p-3 rounded-2xl glass-strong overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, transform: 'rotateX(52deg) rotateZ(-2deg)', transformStyle: 'preserve-3d', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {Array.from({ length: cols * rows }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-[4/5] rounded-[3px]"
              style={{ background: 'linear-gradient(150deg, #16306e, #0c1c45 55%, #1f3f86)', boxShadow: 'inset 0 0 0 1px rgba(120,160,255,0.25)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + (i % cols) * 0.04 + Math.floor(i / cols) * 0.05 }}
            >
              <div className="h-full w-full opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(160,190,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(160,190,255,0.4) 1px, transparent 1px)', backgroundSize: '50% 33%' }} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* robotic cleaner driving across the array, cleaning as it goes */}
      <RobotCleaner />

      {/* floating data chips */}
      <FloatChip className="left-[2%] top-[34%]" delay={0.8} label="+30%" sub="output" />
      <FloatChip className="right-[0%] top-[48%]" delay={1.1} label="10×" sub="faster" gold />
    </div>
  )
}

/* A detailed cleaning rover that drives back and forth across the array — tracks,
   sensor mast, spinning brush, water spray and brand lights — making the hero
   clearly about robotic solar cleaning. Rides above the tilted panel plane. */
function RobotCleaner() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ left: '14%', top: '40%', width: '24%' }}
      initial={reduce ? false : { x: '0%' }}
      animate={reduce ? { x: '120%' } : { x: ['0%', '185%'], y: [0, -3, 0, 2, 0] }}
      transition={
        reduce
          ? undefined
          : {
              x: { duration: 7, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.4 },
              y: { duration: 2.2, ease: 'easeInOut', repeat: Infinity },
            }
      }
    >
      {/* soft cleaned-glass glow on the panels beneath the rover */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-[6%] w-[150%] h-[55%] rounded-[50%]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(160,220,255,0.5), rgba(120,190,255,0) 70%)', mixBlendMode: 'screen', filter: 'blur(3px)' }}
      />
      <CleaningRobot reduce={reduce} />
    </motion.div>
  )
}

/* The rover itself — a crisp SVG so every detail stays sharp at any size. */
function CleaningRobot({ reduce = false }) {
  const spin = reduce ? {} : { transformBox: 'fill-box', transformOrigin: 'center', animation: 'robot-spin 0.9s linear infinite' }
  const roll = reduce ? {} : { animation: 'robot-roll 0.5s linear infinite' }
  const led = (delay) => (reduce ? {} : { animation: `pulse-glow 1.3s ease-in-out infinite ${delay}` })
  const spray = (delay) => (reduce ? { opacity: 0 } : { animation: `robot-spray 1.1s ease-out infinite ${delay}`, transformOrigin: 'center' })

  return (
    <svg viewBox="0 0 120 118" className="relative w-full h-auto overflow-visible" style={{ filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.55))' }} aria-hidden>
      <defs>
        <linearGradient id="r-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe3f0" />
          <stop offset="0.45" stopColor="#8590a6" />
          <stop offset="1" stopColor="#2b3447" />
        </linearGradient>
        <linearGradient id="r-track" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4356" />
          <stop offset="1" stopColor="#0e131d" />
        </linearGradient>
        <linearGradient id="r-brush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8fbff" />
          <stop offset="0.5" stopColor="#7fd6f5" />
          <stop offset="1" stopColor="#2f8fc4" />
        </linearGradient>
        <radialGradient id="r-dome" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#d7f6ff" />
          <stop offset="0.5" stopColor="#3aa6e6" />
          <stop offset="1" stopColor="#10395e" />
        </radialGradient>
        <linearGradient id="r-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#274aa0" />
          <stop offset="1" stopColor="#0c1c45" />
        </linearGradient>
        <radialGradient id="r-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="r-stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#4dd2ff" />
        </linearGradient>
        <clipPath id="r-brushclip"><rect x="28" y="92" width="64" height="11" rx="5.5" /></clipPath>
      </defs>

      {/* contact shadow on the panel */}
      <ellipse cx="60" cy="108" rx="44" ry="6" fill="url(#r-shadow)" />

      {/* small solar panel on the rover's back (on-brand), tucked behind the body */}
      <g transform="rotate(-13 80 36)">
        <rect x="66" y="29" width="28" height="15" rx="1.5" fill="url(#r-panel)" stroke="#5f86d6" strokeWidth="0.7" />
        <line x1="80" y1="29" x2="80" y2="44" stroke="#5f86d6" strokeWidth="0.6" />
        <line x1="66" y1="36.5" x2="94" y2="36.5" stroke="#5f86d6" strokeWidth="0.6" />
      </g>

      {/* sensor mast + camera dome + antenna */}
      <rect x="56.5" y="25" width="7" height="20" rx="2.5" fill="url(#r-body)" stroke="#1b2334" strokeWidth="0.6" />
      <line x1="66" y1="30" x2="77" y2="15" stroke="#aeb8c8" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="77" cy="14.5" r="2.4" fill="#ffd60a" style={led('0.2s')} />
      <circle cx="60" cy="25" r="7.5" fill="url(#r-dome)" stroke="#0e2336" strokeWidth="1" />
      <circle cx="57.4" cy="22.6" r="2.2" fill="#ffffff" opacity="0.75" />

      {/* tracks (caterpillar drive units) */}
      {[22, 78].map((tx) => (
        <g key={tx}>
          <rect x={tx} y="76" width="20" height="20" rx="7" fill="url(#r-track)" stroke="#080b11" strokeWidth="1" />
          {/* tread ticks */}
          {[0, 1, 2, 3, 4].map((k) => (
            <line key={k} x1={tx + 2 + k * 4} y1="77.5" x2={tx + 2 + k * 4} y2="94.5" stroke="#0a0d14" strokeWidth="1.1" opacity="0.7" />
          ))}
          {/* two spinning wheel hubs */}
          {[6, 14].map((wx) => (
            <g key={wx} transform={`translate(${tx + wx} 86)`}>
              <circle r="5" fill="#222a39" />
              <g style={spin}>
                <circle r="4.4" fill="#46506580" stroke="#aeb8c8" strokeWidth="1" />
                <line x1="-3.4" y1="0" x2="3.4" y2="0" stroke="#cdd6e4" strokeWidth="1" />
                <line x1="0" y1="-3.4" x2="0" y2="3.4" stroke="#cdd6e4" strokeWidth="1" />
                <line x1="-2.4" y1="-2.4" x2="2.4" y2="2.4" stroke="#8c97ab" strokeWidth="0.8" />
                <line x1="-2.4" y1="2.4" x2="2.4" y2="-2.4" stroke="#8c97ab" strokeWidth="0.8" />
              </g>
            </g>
          ))}
        </g>
      ))}

      {/* main chassis */}
      <rect x="25" y="42" width="70" height="41" rx="10" fill="url(#r-body)" stroke="#1b2334" strokeWidth="1.2" />
      <rect x="29" y="45" width="62" height="6" rx="3" fill="#ffffff" opacity="0.18" />
      {/* dark sensor visor / face */}
      <rect x="31" y="53" width="58" height="16" rx="5.5" fill="#0a111e" stroke="#33415c" strokeWidth="1" />
      <rect x="33" y="55" width="54" height="4" rx="2" fill="#1d3a66" opacity="0.6" />
      {/* status LEDs in the visor */}
      <circle cx="44" cy="61.5" r="2.7" fill="#4dd2ff" style={led('0s')} />
      <circle cx="60" cy="61.5" r="2.7" fill="#ffd60a" style={led('0.3s')} />
      <circle cx="76" cy="61.5" r="2.7" fill="#7dff9a" style={led('0.6s')} />
      {/* brand stripe + sun badge */}
      <rect x="30" y="73" width="60" height="3.5" rx="1.75" fill="url(#r-stripe)" opacity="0.85" />
      <g transform="translate(37 78.5)">
        <circle r="2.1" fill="#ffd60a" />
        {[0, 45, 90, 135].map((a) => (
          <line key={a} x1="0" y1="-3.4" x2="0" y2="-2.6" stroke="#ffd60a" strokeWidth="0.8" transform={`rotate(${a})`} />
        ))}
      </g>
      {/* corner bolts */}
      {[[29, 47], [91, 47], [29, 79], [91, 79]].map(([bx, by], k) => (
        <circle key={k} cx={bx} cy={by} r="1.3" fill="#aeb8c8" />
      ))}

      {/* water spray above the brush */}
      {[44, 52, 60, 68, 76].map((sx, k) => (
        <circle key={sx} cx={sx} cy="90" r="1.5" fill="#cdeeff" style={spray(`${k * 0.18}s`)} />
      ))}

      {/* front spinning cleaning brush */}
      <g>
        <rect x="28" y="92" width="64" height="11" rx="5.5" fill="url(#r-brush)" stroke="#1c5a7d" strokeWidth="0.8" />
        <g clipPath="url(#r-brushclip)">
          <g style={roll}>
            {[-8, -4, 0, 4, 8, 12, 16, 20, 24].map((ly) => (
              <line key={ly} x1="28" y1={88 + ly} x2="92" y2={88 + ly} stroke="#0d4a6b" strokeWidth="1.1" opacity="0.55" />
            ))}
          </g>
        </g>
        {/* metallic end caps */}
        <circle cx="30" cy="97.5" r="6" fill="#c2cbd9" stroke="#5a6477" strokeWidth="1" />
        <circle cx="90" cy="97.5" r="6" fill="#c2cbd9" stroke="#5a6477" strokeWidth="1" />
        <circle cx="30" cy="97.5" r="2" fill="#3a4356" />
        <circle cx="90" cy="97.5" r="2" fill="#3a4356" />
      </g>
    </svg>
  )
}

function FloatChip({ className = '', label, sub, delay = 0, gold = false }) {
  return (
    <motion.div
      className={`absolute glass rounded-xl px-3.5 py-2.5 animate-float ${className}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={`font-display text-xl font-extrabold ${gold ? 'text-gold' : 'text-gradient'}`}>{label}</div>
      <div className="text-[0.66rem] uppercase tracking-wider text-muted">{sub}</div>
    </motion.div>
  )
}
