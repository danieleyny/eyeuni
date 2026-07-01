import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Icon, useLang } from '../ui'
import { Pic, Clip } from '../../media'
import { CtaBand } from '../sections'

const ITEM_MEDIA = ['robot-on-array-angled', 'utility-field-wide', 'robot-cleaning-wide', 'floating-pv-01', 'array-rows-hillside', 'array-panorama']

export default function Portfolio({ go }) {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const f = t.portfolio.filters

  const floatingTitle = t.portfolio.items.find((it) => it.cat === 'floating')?.title || f.floating
  const items = [
    ...t.portfolio.items.map((it, i) => ({ ...it, name: ITEM_MEDIA[i] })),
    { title: f.cleaning, cat: 'cleaning', tag: f.cleaning, name: 'robot-flag-hero' },
    { title: f.cleaning, cat: 'cleaning', tag: f.cleaning, name: 'robots-pair-ground' },
    { title: f.rooftop, cat: 'rooftop', tag: f.rooftop, name: 'robot-closeup-sky' },
    { title: floatingTitle, cat: 'floating', tag: f.floating, name: 'floating-pv-02' },
    { title: floatingTitle, cat: 'floating', tag: f.floating, name: 'floating-pv-03' },
    { title: floatingTitle, cat: 'floating', tag: f.floating, name: 'floating-pv-04' },
    { title: floatingTitle, cat: 'floating', tag: f.floating, name: 'floating-pv-05' },
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

/* Drag- or keyboard-compare a soiled array (before) vs a clean one (after).
   Width is tracked via ResizeObserver so the clipped image always aligns.
   TODO(client): ideal would be a real same-panel before/after pair (one
   dirty, one freshly cleaned, same angle) instead of two different shots. */
function BeforeAfter({ t }) {
  const [pos, setPos] = useState(50)
  const [w, setW] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setW(el.getBoundingClientRect().width)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const setFromX = (clientX) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }
  const onKey = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setPos((p) => Math.max(0, p - 4)); e.preventDefault() }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setPos((p) => Math.min(100, p + 4)); e.preventDefault() }
    else if (e.key === 'Home') { setPos(0); e.preventDefault() }
    else if (e.key === 'End') { setPos(100); e.preventDefault() }
  }

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '16 / 9', border: '1px solid var(--color-line)' }}
      onMouseMove={(e) => e.buttons === 1 && setFromX(e.clientX)}
      onMouseDown={(e) => setFromX(e.clientX)}
      onTouchMove={(e) => setFromX(e.touches[0].clientX)}
    >
      <Pic name="array-panorama" imgClassName="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute top-3 end-3 z-10 text-xs rounded-full px-3 py-1 text-white" style={{ background: 'rgba(8,9,14,.7)' }}>{t.portfolio.beforeAfter.after}</span>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="absolute inset-0 h-full" style={{ width: w || '100%' }}>
          <Pic name="array-dust-atmospheric" imgClassName="absolute inset-0 w-full h-full object-cover" />
        </div>
        <span className="absolute top-3 start-3 z-10 text-xs rounded-full px-3 py-1 text-white" style={{ background: 'rgba(8,9,14,.7)' }}>{t.portfolio.beforeAfter.before}</span>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={t.portfolio.beforeAfter.title}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
        className="absolute inset-y-0 z-20 cursor-ew-resize"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="h-full w-0.5 bg-white/90 mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white shadow-lg" style={{ color: '#14151c' }}>
          <Icon.arrow className="h-4 w-4 -ms-1" />
        </div>
      </div>
    </div>
  )
}
