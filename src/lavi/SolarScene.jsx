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
          {/* robotic cleaner traversing the array */}
          <RobotCleaner />
        </motion.div>
      </div>

      {/* floating data chips */}
      <FloatChip className="left-[2%] top-[34%]" delay={0.8} label="+30%" sub="output" />
      <FloatChip className="right-[0%] top-[48%]" delay={1.1} label="10×" sub="faster" gold />
    </div>
  )
}

/* A robotic panel cleaner that rides the array on side rails, sweeping a glowing
   brush back and forth and leaving a freshly-cleaned shine — the company's core
   service, brought to life on the hero. Sits inside the tilted panel plane. */
function RobotCleaner() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="absolute left-1.5 right-1.5 z-30 pointer-events-none"
      style={{ height: '15%' }}
      initial={reduce ? false : { top: '-11%' }}
      animate={reduce ? { top: '40%' } : { top: ['-11%', '85%'] }}
      transition={reduce ? undefined : { duration: 5, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
    >
      {/* freshly-cleaned wet shine the brush leaves on the glass */}
      <div
        className="absolute inset-x-0 -bottom-2 h-[200%]"
        style={{ background: 'linear-gradient(180deg, rgba(150,210,255,0) 0%, rgba(160,215,255,0.4) 55%, rgba(120,190,255,0) 100%)', mixBlendMode: 'screen', filter: 'blur(2px)' }}
      />
      {/* side-rail carriages riding the panel frame */}
      <div className="absolute -left-1 top-0 h-full w-2 rounded-sm" style={{ background: 'linear-gradient(180deg,#d7dee8,#475569)', boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }} />
      <div className="absolute -right-1 top-0 h-full w-2 rounded-sm" style={{ background: 'linear-gradient(180deg,#d7dee8,#475569)', boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }} />
      {/* chassis body with status lights */}
      <div
        className="absolute inset-x-1 top-[8%] h-[52%] rounded-md flex items-center justify-center gap-1.5"
        style={{ background: 'linear-gradient(180deg,#42526b,#0e1730)', boxShadow: '0 3px 9px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.22)' }}
      >
        <span className="block h-1 w-1 rounded-full bg-[#ffd60a]" style={{ boxShadow: '0 0 6px #ffd60a', animation: reduce ? 'none' : 'pulse-glow 1.4s ease-in-out infinite' }} />
        <span className="block h-[3px] w-7 rounded-full" style={{ background: 'rgba(47,107,255,0.6)' }} />
        <span className="block h-1 w-1 rounded-full bg-[#4dd2ff]" style={{ boxShadow: '0 0 6px #4dd2ff', animation: reduce ? 'none' : 'pulse-glow 1.4s ease-in-out infinite 0.4s' }} />
      </div>
      {/* glowing brush roller along the leading edge */}
      <div
        className="absolute inset-x-0 bottom-[14%] h-[7px] rounded-full"
        style={{ background: 'linear-gradient(90deg, rgba(77,210,255,0.45), #c7f1ff 50%, rgba(77,210,255,0.45))', boxShadow: '0 0 12px rgba(120,220,255,0.85)' }}
      />
    </motion.div>
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
