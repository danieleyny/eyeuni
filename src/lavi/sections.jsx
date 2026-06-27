import { motion } from 'framer-motion'
import { Reveal, Magnetic, Icon, useLang } from './ui'
import { CONTACT } from './i18n'

/* Big gradient call-to-action band reused across pages. */
export function CtaBand({ go }) {
  const { t } = useLang()
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center" style={{ background: 'linear-gradient(120deg, #1840c4, #2f6bff 45%, #ffb300)' }}>
            <div className="absolute inset-0 panel-grid opacity-20" />
            <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 65%)', filter: 'blur(20px)' }} />
            <div className="relative">
              <h2 className="headline text-[clamp(1.8rem,4.5vw,3rem)] text-white max-w-2xl mx-auto text-balance">{t.cta.title}</h2>
              <p className="mt-4 text-white/90 max-w-xl mx-auto">{t.cta.sub}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Magnetic strength={0.25}>
                  <button onClick={() => go('contact')} className="btn !bg-[#060912] !text-white hover:!-translate-y-1">
                    <Icon.bolt className="h-4 w-4 text-gold" />{t.cta.button}
                  </button>
                </Magnetic>
                <a href={`tel:${CONTACT.phoneHref}`} className="btn !bg-white/15 !text-white !border-white/30 hover:!bg-white/25">
                  <Icon.phone className="h-4 w-4" />{CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Stylised solar "photo" tile — dependency-free SVG scene per category, so the
   gallery looks rich without external images. Swap for real photos in the live build. */
export function SolarTile({ cat = 'rooftop', className = '' }) {
  const scenes = {
    rooftop: { sky: ['#1b3aa0', '#3d72ff'], ground: '#0c1430', accent: '#ffd60a' },
    ground: { sky: ['#123a8c', '#2f6bff'], ground: '#10240f', accent: '#ffe14d' },
    floating: { sky: ['#0e4a8c', '#2f9bff'], ground: '#0a3a5c', accent: '#8fe3ff' },
    cleaning: { sky: ['#1840c4', '#4d86ff'], ground: '#0c1430', accent: '#ffd60a' },
  }
  const s = scenes[cat] || scenes.rooftop
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={`sky-${cat}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.sky[0]} />
          <stop offset="1" stopColor={s.sky[1]} />
        </linearGradient>
        <linearGradient id={`pan-${cat}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16306e" />
          <stop offset="1" stopColor="#0c1c45" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky-${cat})`} />
      {/* sun glow */}
      <circle cx="320" cy="64" r="34" fill={s.accent} opacity="0.9" />
      <circle cx="320" cy="64" r="58" fill={s.accent} opacity="0.18" />
      {/* ground / water */}
      <rect y="200" width="400" height="100" fill={s.ground} />
      {cat === 'floating' && <rect y="200" width="400" height="100" fill="#2f9bff" opacity="0.25" />}

      {/* panel rows */}
      <g>
        {[0, 1, 2].map((row) => {
          const y = 150 + row * 38
          const scale = 1 + row * 0.12
          return (
            <g key={row} transform={`translate(${200 - 150 * scale}, ${y})`}>
              {[0, 1, 2, 3].map((c) => (
                <g key={c} transform={`translate(${c * 78 * scale}, 0) skewX(-12)`}>
                  <rect width={62 * scale} height={26 * scale} rx="2" fill={`url(#pan-${cat})`} stroke="#5f86d6" strokeWidth="0.8" />
                  <line x1={21 * scale} y1="0" x2={21 * scale} y2={26 * scale} stroke="#3a5ba8" strokeWidth="0.6" />
                  <line x1={41 * scale} y1="0" x2={41 * scale} y2={26 * scale} stroke="#3a5ba8" strokeWidth="0.6" />
                  <line x1="0" y1={13 * scale} x2={62 * scale} y2={13 * scale} stroke="#3a5ba8" strokeWidth="0.6" />
                </g>
              ))}
            </g>
          )
        })}
      </g>

      {cat === 'cleaning' && (
        <g>
          <rect x="150" y="138" width="70" height="14" rx="3" fill="#ffd60a" opacity="0.9" />
          <rect x="150" y="138" width="70" height="5" rx="2" fill="#fff" opacity="0.6" />
          <circle cx="158" cy="159" r="4" fill="#0a0a0a" />
          <circle cx="212" cy="159" r="4" fill="#0a0a0a" />
        </g>
      )}
      <rect width="400" height="300" fill="url(#vig)" />
      <defs>
        <radialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
      </defs>
    </svg>
  )
}
