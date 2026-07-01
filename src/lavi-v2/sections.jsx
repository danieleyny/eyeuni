import { Reveal, useLang } from './ui'
import { Pic } from '../media'

/* Blue full-bleed CTA band (mockup). */
export function CtaBand({ go }) {
  const { t } = useLang()
  return (
    <section className="ctaband">
      <div className="wrap">
        <Reveal><h2>{t.cta.title}</h2></Reveal>
        <Reveal delay={0.06}><p>{t.cta.sub}</p></Reveal>
        <Reveal delay={0.12}><button className="btn btn-y" onClick={() => go('contact')}>{t.cta.button}</button></Reveal>
      </div>
    </section>
  )
}

/* Real client photos grouped by the categories the pages already use, so every
   SolarImage now resolves to genuine Lavi Energy footage. "floating" now uses
   real floating-PV reservoir shots. */
const MEDIA_BY_CAT = {
  rooftop: ['robot-on-array-angled', 'array-panorama', 'robot-closeup-sky'],
  ground: ['utility-field-wide', 'array-rows-hillside', 'array-field-dry'],
  cleaning: ['robot-cleaning-wide', 'robot-action-valley', 'robot-cleaning-lowangle'],
  floating: ['floating-pv-01', 'floating-pv-03', 'floating-pv-04', 'floating-pv-05'],
}

export function mediaFor(cat = 'ground', idx = 0) {
  const pool = MEDIA_BY_CAT[cat] || MEDIA_BY_CAT.ground
  return pool[idx % pool.length]
}

/* Drop-in replacement for the old SVG/Unsplash tile — now a real client photo. */
export function SolarImage({ cat = 'ground', idx = 0, className = '', hoverZoom = false }) {
  const name = mediaFor(cat, idx)
  const zoom = hoverZoom ? 'transition-transform duration-700 ease-out group-hover:scale-110' : ''
  return (
    <div className={`relative overflow-hidden bg-[#14151c] ${className}`}>
      <Pic name={name} imgClassName={`absolute inset-0 w-full h-full object-cover ${zoom}`} />
    </div>
  )
}
