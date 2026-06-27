import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Icon, useLang } from '../ui'
import { Pic, Clip } from '../../media'
import { CtaBand } from '../sections'

const ITEM_MEDIA = ['robot-on-array-angled', 'utility-field-wide', 'robot-cleaning-wide', 'array-field-dry', 'array-rows-hillside', 'array-panorama']

export default function Portfolio({ go }) {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const f = t.portfolio.filters

  const items = [
    ...t.portfolio.items.map((it, i) => ({ ...it, name: ITEM_MEDIA[i] })),
    { title: f.cleaning, cat: 'cleaning', tag: f.cleaning, name: 'robot-flag-hero' },
    { title: f.cleaning, cat: 'cleaning', tag: f.cleaning, name: 'robots-pair-ground' },
    { title: f.rooftop, cat: 'rooftop', tag: f.rooftop, name: 'robot-closeup-sky' },
  ]
  const shown = filter === 'all' ? items : items.filter((i) => i.cat === filter)

  return (
    <div>
      <section className="section">
        <div className="wrap text-center max-w-2xl mx-auto">
          <Reveal><div className="eyebrow justify-center">{t.portfolio.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h1 className="lead-h mx-auto mt-3">{t.portfolio.title}</h1></Reveal>
          <Reveal delay={0.12}><p className="muted mt-4">{t.portfolio.sub}</p></Reveal>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {Object.entries(f).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className="text-sm font-medium rounded-full px-4 py-2 transition-colors"
                style={filter === k ? { background: 'var(--color-blue)', color: '#fff' } : { background: '#fff', color: '#3b3c43', border: '1px solid var(--color-line)' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="section section-sand !pt-10">
        <div className="wrap">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {shown.map((it, i) => (
                <motion.button
                  key={it.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  onClick={() => go('contact')}
                  className="gi"
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Pic name={it.name} imgClassName="w-full h-full object-cover" />
                  <span className="cap">
                    <span className="block text-[11px] uppercase tracking-wide opacity-80 mb-0.5">{it.tag}</span>
                    {it.title}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* before / after */}
      <section className="section">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal><h2 className="lead-h mx-auto">{t.portfolio.beforeAfter.title}</h2></Reveal>
            <Reveal delay={0.06}><p className="muted mt-3">{t.portfolio.beforeAfter.text}</p></Reveal>
          </div>
          <Reveal><div className="max-w-3xl mx-auto mt-8"><BeforeAfter t={t} /></div></Reveal>
        </div>
      </section>

      {/* showreel embed (dark) */}
      <section className="section section-sand">
        <div className="wrap split items-center">
          <div>
            <Reveal><div className="eyebrow">{t.portfolio.eyebrow}</div></Reveal>
            <Reveal delay={0.06}><h2 className="lead-h mt-3">{t.portfolio.videoTitle}</h2></Reveal>
            <Reveal delay={0.12}><p className="muted mt-4">{t.portfolio.videoSub}</p></Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="figure" style={{ aspectRatio: '16 / 9', background: '#000' }}>
              <Clip name="showreel-clean-run-02" videoClassName="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand go={go} />
    </div>
  )
}

/* Drag-to-compare a soiled array (before) vs a clean one (after). */
function BeforeAfter({ t }) {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const set = (clientX) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }
  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '16 / 9', border: '1px solid var(--color-line)' }}
      onMouseMove={(e) => e.buttons === 1 && set(e.clientX)}
      onMouseDown={(e) => set(e.clientX)}
      onTouchMove={(e) => set(e.touches[0].clientX)}
    >
      <Pic name="array-panorama" imgClassName="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute top-3 end-3 z-10 text-xs rounded-full px-3 py-1 text-white" style={{ background: 'rgba(8,9,14,.7)' }}>{t.portfolio.beforeAfter.after}</span>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="absolute inset-0" style={{ width: ref.current ? ref.current.getBoundingClientRect().width : '100%' }}>
          <Pic name="array-dust-atmospheric" imgClassName="absolute inset-0 w-full h-full object-cover" />
        </div>
        <span className="absolute top-3 start-3 z-10 text-xs rounded-full px-3 py-1 text-white" style={{ background: 'rgba(8,9,14,.7)' }}>{t.portfolio.beforeAfter.before}</span>
      </div>
      <div className="absolute inset-y-0 z-20" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="h-full w-0.5 bg-white/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white shadow-lg" style={{ color: '#14151c' }}>
          <Icon.arrow className="h-4 w-4 -ms-1" />
        </div>
      </div>
    </div>
  )
}
