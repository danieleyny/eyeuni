import { useState } from 'react'
import { Reveal, Icon, useLang } from './ui'
import { Pic } from '../media'

/* Testimonials — placeholder quotes (see i18n TODO(client)). */
export function Testimonials() {
  const { t } = useLang()
  const d = t.testimonials
  return (
    <section className="section">
      <div className="wrap">
        <Reveal><div className="eyebrow">{d.eyebrow}</div></Reveal>
        <Reveal delay={0.06}><h2 className="lead-h mt-3">{d.title}</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-4 mt-9">
          {d.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="quote-card">
                <div className="mark" aria-hidden>“</div>
                <blockquote className="q">{it.quote}</blockquote>
                <figcaption className="who">
                  <div className="n">{it.name}</div>
                  <div className="r">{it.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="text-[11px] muted mt-4 opacity-70">{d.note}</p>
      </div>
    </section>
  )
}

/* Selected reference projects — placeholder figures (see i18n TODO(client)). */
export function References() {
  const { t } = useLang()
  const d = t.references
  return (
    <section className="section section-sand">
      <div className="wrap">
        <Reveal><div className="eyebrow">{d.eyebrow}</div></Reveal>
        <Reveal delay={0.06}><h2 className="lead-h mt-3">{d.title}</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-5 mt-9">
          {d.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="card overflow-hidden h-full card-hover">
                <div className="figure" style={{ aspectRatio: '16 / 10', borderRadius: 0, border: 0 }}>
                  <Pic name={it.media} imgClassName="w-full h-full object-cover" />
                  <span className="tag y">{it.metric}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-[17px]">{it.type}</h3>
                  <div className="ref-meta">
                    <span>{it.location}</span>
                    <span>{it.size}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="text-[11px] muted mt-4 opacity-70">{d.note}</p>
      </div>
    </section>
  )
}

/* FAQ accordion — objection handling + SEO. */
export function FAQ() {
  const { t } = useLang()
  const d = t.faq
  const [open, setOpen] = useState(0)
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 880 }}>
        <Reveal><div className="eyebrow">{d.eyebrow}</div></Reveal>
        <Reveal delay={0.06}><h2 className="lead-h mt-3 mb-7">{d.title}</h2></Reveal>
        <div>
          {d.items.map((it, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item" key={i}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{it.q}</span>
                  <Icon.arrow className={`faq-ic h-4 w-4 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && <div className="faq-a">{it.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* Water-saved highlight band — placeholder figure (see i18n TODO(client)). */
export function WaterHighlight() {
  const { t } = useLang()
  const d = t.water
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="water-band p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-center">
            <div className="flex items-center gap-4">
              <span className="grid place-items-center h-12 w-12 rounded-xl shrink-0" style={{ background: 'rgba(255,212,0,0.16)', color: 'var(--color-yellow)' }}><Icon.drop className="h-6 w-6" /></span>
              <div className="v">{d.stat}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: '#cfd6ff' }}>{d.eyebrow}</div>
              <h3 className="font-display font-semibold text-[clamp(1.3rem,3.5vw,1.8rem)] mt-2 text-balance">{d.title}</h3>
              <p className="mt-2 text-[15px]" style={{ color: 'var(--color-muted-inv)' }}>{d.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
