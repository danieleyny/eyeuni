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

/* A digital twin of a real tracked solar-cleaning rover (SolarCleano-style):
   central tracked body with two splayed brush arms, blue/white livery and the
   Israeli flag wrapped on each side brush housing. Drives across the array. */
function RobotCleaner() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ left: '11%', top: '40%', width: '32%' }}
      initial={reduce ? false : { x: '0%' }}
      animate={reduce ? { x: '90%' } : { x: ['0%', '150%'], y: [0, -3, 0, 2, 0] }}
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
        className="absolute left-1/2 -translate-x-1/2 -bottom-[4%] w-[120%] h-[45%] rounded-[50%]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(160,220,255,0.5), rgba(120,190,255,0) 70%)', mixBlendMode: 'screen', filter: 'blur(3px)' }}
      />
      <CleaningRobot reduce={reduce} />
    </motion.div>
  )
}

/* One brush arm: rotating roller + housing wrapped in the Israeli flag. Drawn
   for the left side (brush extends to -x); the right arm reuses it mirrored. */
function RobotWing({ reduce }) {
  const roll = reduce ? {} : { animation: 'robot-roll 0.45s linear infinite' }
  return (
    <g>
      {/* arm linking the brush back to the body */}
      <rect x="4" y="-6" width="26" height="11" rx="4" fill="url(#r-arm)" stroke="#33415c" strokeWidth="0.8" />
      <circle cx="24" cy="-0.5" r="4.6" fill="#3a4356" stroke="#aeb8c8" strokeWidth="0.9" />
      {/* housing / cover wrapped in the Israeli flag */}
      <rect x="-78" y="-23.5" width="82" height="16" rx="3.5" fill="#f5f8fd" stroke="#9aa6ba" strokeWidth="1" />
      <rect x="-75" y="-21.4" width="76" height="2.7" fill="#0038b8" />
      <rect x="-75" y="-11.8" width="76" height="2.7" fill="#0038b8" />
      <g fill="#0038b8" transform="translate(-37 -15.5)">
        <polygon points="0,-3.8 3.3,1.9 -3.3,1.9" />
        <polygon points="0,3.8 3.3,-1.9 -3.3,-1.9" />
      </g>
      {/* rotating cleaning brush roller */}
      <rect x="-80" y="-8" width="86" height="16" rx="8" fill="url(#r-brush2)" stroke="#8f9cb0" strokeWidth="0.9" />
      <g clipPath="url(#wbrush)">
        <g style={roll}>
          {[-12, -8, -4, 0, 4, 8, 12, 16].map((ly) => (
            <line key={ly} x1="-80" y1={ly} x2="6" y2={ly} stroke="#a6b2c6" strokeWidth="1.4" opacity="0.6" />
          ))}
        </g>
      </g>
      {/* metallic end caps */}
      <ellipse cx="-76" cy="0" rx="4.6" ry="8.6" fill="#aeb8c8" stroke="#5a6477" strokeWidth="0.9" />
      <ellipse cx="2" cy="0" rx="4.6" ry="8.6" fill="#d2dae6" stroke="#5a6477" strokeWidth="0.9" />
      {/* water spray flicking off the brush */}
      {[-66, -56, -46, -36].map((sx, k) => (
        <circle key={sx} cx={sx} cy="-12" r="1.6" fill="#cdeeff" style={reduce ? { opacity: 0 } : { animation: `robot-spray 1.1s ease-out infinite ${k * 0.2}s`, transformOrigin: 'center' }} />
      ))}
    </g>
  )
}

/* The rover itself — a crisp SVG so every detail stays sharp at any size. */
function CleaningRobot({ reduce = false }) {
  const spin = reduce ? {} : { transformBox: 'fill-box', transformOrigin: 'center', animation: 'robot-spin 0.85s linear infinite' }
  const led = (delay) => (reduce ? {} : { animation: `pulse-glow 1.3s ease-in-out infinite ${delay}` })

  return (
    <svg viewBox="0 0 200 128" className="relative w-full h-auto overflow-visible" style={{ filter: 'drop-shadow(0 9px 11px rgba(0,0,0,0.5))' }} aria-hidden>
      <defs>
        <linearGradient id="r-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfdff" />
          <stop offset="0.5" stopColor="#c6d0de" />
          <stop offset="1" stopColor="#7a8699" />
        </linearGradient>
        <linearGradient id="r-brush2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f6fb" />
          <stop offset="0.5" stopColor="#c8d2e0" />
          <stop offset="1" stopColor="#8c98ad" />
        </linearGradient>
        <linearGradient id="r-arm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4cedd" />
          <stop offset="1" stopColor="#566073" />
        </linearGradient>
        <linearGradient id="r-track" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4356" />
          <stop offset="1" stopColor="#0e131d" />
        </linearGradient>
        <linearGradient id="r-belt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#0038b8" />
        </linearGradient>
        <linearGradient id="r-topbox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46506a" />
          <stop offset="1" stopColor="#1a2336" />
        </linearGradient>
        <radialGradient id="r-dome" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#d7f6ff" />
          <stop offset="0.5" stopColor="#3aa6e6" />
          <stop offset="1" stopColor="#10395e" />
        </radialGradient>
        <radialGradient id="r-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.4" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id="wbrush"><rect x="-80" y="-8" width="86" height="16" rx="8" /></clipPath>
      </defs>

      {/* contact shadow on the panel */}
      <ellipse cx="100" cy="116" rx="94" ry="9" fill="url(#r-shadow)" />

      {/* two splayed brush arms (behind the body) */}
      <g transform="translate(80 82) rotate(-16)"><RobotWing reduce={reduce} /></g>
      <g transform="translate(200 0) scale(-1 1)"><g transform="translate(80 82) rotate(-16)"><RobotWing reduce={reduce} /></g></g>

      {/* caterpillar tracks */}
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

      {/* main body */}
      <rect x="72" y="34" width="56" height="44" rx="10" fill="url(#r-body)" stroke="#1b2334" strokeWidth="1.3" />
      <rect x="76" y="37" width="48" height="6" rx="3" fill="#ffffff" opacity="0.22" />
      {/* blue livery belt */}
      <rect x="72" y="55" width="56" height="9" fill="url(#r-belt)" />
      <rect x="72" y="55" width="56" height="2" fill="#ffffff" opacity="0.25" />
      {/* front sensor strip + status LEDs */}
      <rect x="80" y="44" width="40" height="10" rx="3.5" fill="#0a111e" stroke="#33415c" strokeWidth="0.9" />
      <circle cx="89" cy="49" r="2.3" fill="#4dd2ff" style={led('0s')} />
      <circle cx="100" cy="49" r="2.3" fill="#ffd60a" style={led('0.3s')} />
      <circle cx="111" cy="49" r="2.3" fill="#7dff9a" style={led('0.6s')} />
      {/* Israeli-flag badge on the body front */}
      <g transform="translate(100 70)">
        <rect x="-11" y="-5" width="22" height="10" rx="1.4" fill="#f5f8fd" stroke="#9aa6ba" strokeWidth="0.6" />
        <rect x="-10" y="-4" width="20" height="1.6" fill="#0038b8" />
        <rect x="-10" y="2.4" width="20" height="1.6" fill="#0038b8" />
        <g fill="#0038b8"><polygon points="0,-2.5 2.2,1.25 -2.2,1.25" /><polygon points="0,2.5 2.2,-1.25 -2.2,-1.25" /></g>
      </g>
      {/* corner bolts */}
      {[[76, 39], [124, 39], [76, 74], [124, 74]].map(([bx, by], k) => (
        <circle key={k} cx={bx} cy={by} r="1.3" fill="#aeb8c8" />
      ))}

      {/* top control module + handle + camera dome */}
      <rect x="84" y="24" width="32" height="13" rx="3" fill="url(#r-topbox)" stroke="#1b2334" strokeWidth="0.9" />
      <rect x="86" y="26.5" width="28" height="2.4" rx="1.2" fill="#ffd60a" opacity="0.85" />
      <rect x="92" y="19" width="16" height="4.6" rx="2.3" fill="#46506a" stroke="#aeb8c8" strokeWidth="0.7" />
      <circle cx="100" cy="30.5" r="3.4" fill="url(#r-dome)" stroke="#0e2336" strokeWidth="0.8" />
      <circle cx="98.8" cy="29.3" r="1" fill="#ffffff" opacity="0.7" />
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
