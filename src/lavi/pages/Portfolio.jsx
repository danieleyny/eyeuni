import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Icon, SectionHeading, useLang } from '../ui'
import { CtaBand, SolarImage } from '../sections'

export default function Portfolio({ go }) {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const filters = t.portfolio.filters
  const items = filter === 'all' ? t.portfolio.items : t.portfolio.items.filter((i) => i.cat === filter)

  return (
    <div>
      <section className="section pb-0">
        <div className="container-x">
          <SectionHeading center eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} sub={t.portfolio.sub} />

          {/* filter chips */}
          <div className="mt-9 flex flex-wrap justify-center gap-2">
            {Object.entries(filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === key ? 'text-[#060912]' : 'text-muted hover:text-ink glass'}`}
                style={filter === key ? { background: 'linear-gradient(100deg,#2f6bff,#ffd60a)' } : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* gallery grid */}
      <section className="section pt-10">
        <div className="container-x">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {items.map((it, i) => (
                <motion.button
                  key={it.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => go('contact')}
                  className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden card-hover text-start"
                >
                  <SolarImage cat={it.cat} idx={i} w={760} hoverZoom className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <span className="text-[0.62rem] uppercase tracking-wider font-display font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(47,107,255,0.3)', color: '#cfe0ff', backdropFilter: 'blur(6px)' }}>{it.tag}</span>
                    <h3 className="font-display font-semibold mt-2 text-white">{it.title}</h3>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* before / after */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading center title={t.portfolio.beforeAfter.title} sub={t.portfolio.beforeAfter.text} />
          <Reveal>
            <div className="mt-9 max-w-3xl mx-auto"><BeforeAfter t={t} /></div>
          </Reveal>
        </div>
      </section>

      {/* video */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] glass-strong">
              <SolarImage cat="cleaning" idx={0} w={1400} className="absolute inset-0 w-full h-full opacity-30" />
              <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-14">
                <div>
                  <span className="eyebrow"><Icon.play className="h-3 w-3" />Video</span>
                  <h3 className="headline text-[clamp(1.5rem,3.5vw,2.3rem)] mt-5">{t.portfolio.videoTitle}</h3>
                  <p className="text-muted mt-3 leading-relaxed">{t.portfolio.videoSub}</p>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10" style={{ background: 'linear-gradient(135deg,#0c1c45,#16306e)' }}>
                  <SolarImage cat="cleaning" idx={1} w={900} className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 grid place-items-center">
                    <button className="grid place-items-center h-16 w-16 rounded-full shadow-xl transition-transform hover:scale-110" style={{ background: 'linear-gradient(135deg,#2f6bff,#ffd60a)' }} aria-label={t.portfolio.videoCta}>
                      <Icon.play className="h-7 w-7 text-[#060912] ms-1" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 start-3 text-xs text-white/90 glass rounded-full px-3 py-1">{t.portfolio.videoCta}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand go={go} />
    </div>
  )
}

/* Drag-to-compare before/after slider. */
function BeforeAfter({ t }) {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)

  const setFromClient = (clientX) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const pct = ((clientX - r.left) / r.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/10"
      onMouseMove={(e) => e.buttons === 1 && setFromClient(e.clientX)}
      onMouseDown={(e) => setFromClient(e.clientX)}
      onTouchMove={(e) => setFromClient(e.touches[0].clientX)}
    >
      {/* after (clean) full */}
      <SolarImage cat="ground" idx={0} w={1200} className="absolute inset-0 w-full h-full" />
      <span className="absolute top-3 end-3 z-10 text-xs glass rounded-full px-3 py-1">{t.portfolio.beforeAfter.after}</span>

      {/* before (soiled) clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="absolute inset-0" style={{ width: ref.current ? ref.current.getBoundingClientRect().width : '100%' }}>
          <SolarImage cat="ground" idx={0} w={1200} className="w-full h-full" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(80,55,20,0.7), rgba(50,40,25,0.6))', mixBlendMode: 'multiply' }} />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(rgba(120,90,40,0.6) 1px, transparent 2px)', backgroundSize: '7px 7px' }} />
        </div>
        <span className="absolute top-3 start-3 text-xs glass rounded-full px-3 py-1">{t.portfolio.beforeAfter.before}</span>
      </div>

      {/* handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="h-full w-0.5 bg-white/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white shadow-lg text-[#060912]">
          <Icon.arrow className="h-4 w-4 -ms-1" /><Icon.arrow className="h-4 w-4 rotate-180 -ms-1" />
        </div>
      </div>
    </div>
  )
}
