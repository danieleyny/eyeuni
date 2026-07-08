import { useState } from 'react'
import { T, PLACEHOLDERS, CONTACT, CALIBERS, MONTHS, upcomingSaturdays } from './content.js'
import { useLang, useT } from './i18n.js'
import { Reveal, MaskedLines, Counter, LoopVideo, Still, RingsOrnament } from './ui.jsx'

const STARS = '★★★★★'

/* ---- 1 · Hero ------------------------------------------------------------- */

export function Hero() {
  const t = useT()
  return (
    <header className="hero" id="top">
      <div className="hero__media">
        <LoopVideo name="hero-loop" eager />
      </div>
      <div className="hero__content container">
        <Reveal>
          <p className="hero__kicker">“{t(T.hero.kicker)}”</p>
        </Reveal>
        <h1 className="hero__h1">
          <MaskedLines delay={0.15} lines={[t(T.hero.h1a), <span className="brass" key="b">{t(T.hero.h1b)}</span>]} />
        </h1>
        <Reveal delay={0.35}>
          <p className="hero__sub">{t(T.hero.sub)}</p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="hero__cta-row">
            <a className="btn btn--brass" href={CONTACT.phoneHref}>
              {t(T.hero.cta)} <span className="arr">→</span>
            </a>
            <span className="hero__proof">
              <span className="stars" aria-hidden="true">{STARS}</span>
              {t(T.hero.proof).replace('[N]', PLACEHOLDERS.studentsTrained.toLocaleString('en-US'))}
            </span>
          </div>
        </Reveal>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        {t(T.hero.scroll)}
        <span className="hero__scroll-line" />
      </div>
    </header>
  )
}

/* ---- 2 · Stats row ----------------------------------------------------------- */

export function Stats() {
  const t = useT()
  const cells = [
    { value: <Counter value={PLACEHOLDERS.yearsInstructing} suffix="+" />, label: t(T.stats.years) },
    { value: <Counter value={PLACEHOLDERS.studentsTrained} suffix="+" />, label: t(T.stats.students) },
    { value: <Counter value={PLACEHOLDERS.approvalRate} suffix="%" />, label: t(T.stats.approval), brass: true },
    { value: t(T.stats.bilingualValue), label: t(T.stats.bilingual) },
  ]
  return (
    <section className="stats" aria-label={t({ en: 'Academy statistics', es: 'Estadísticas de la academia' })}>
      <div className="container" style={{ paddingInline: 0 }}>
        <div className="stats__grid">
          {cells.map((c, i) => (
            <Reveal key={i} delay={i * 0.06} className="stats__cell">
              <div className={`stats__value${c.brass ? ' stats__value--brass' : ''}`}>{c.value}</div>
              <div className="stats__label">{c.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 3 · How it works ------------------------------------------------------------ */

export function HowItWorks() {
  const t = useT()
  return (
    <section className="section" id="how">
      <RingsOrnament style={{ top: '8%', right: '-160px' }} />
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.how.kicker)}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[t(T.how.title)]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="sub">{t(T.how.sub)}</p>
        </Reveal>
        <div className="how__grid">
          {T.how.steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.08} className="how__card">
              <span className="how__num tnum">0{i + 1}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.body)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 4 · Licensing paths ------------------------------------------------------------- */

export function Licensing() {
  const t = useT()
  return (
    <section className="section section--tint" id="licensing">
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.licensing.kicker)}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[t(T.licensing.title)]} />
        </h2>
        <div className="lic__grid">
          {T.licensing.cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.08} className={`lic__card${card.featured ? ' lic__card--featured' : ''}`}>
              <div className="lic__media">
                {card.featured && <span className="lic__badge">{T.licensing.esBadge}</span>}
                <Still name={card.img} alt={t(card.alt)} />
              </div>
              <div className="lic__body">
                <h3>{t(card.title)}</h3>
                <p>{t(card.body)}</p>
                <ul className="lic__list">
                  {card.includes.map((inc, j) => (
                    <li key={j}>{t(inc)}</li>
                  ))}
                </ul>
                <p className="lic__paper">{t(T.licensing.paperwork)}</p>
                <a className="lic__cta" href={CONTACT.phoneHref}>
                  {t(T.licensing.cta)} <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 5 · Full-bleed video band ---------------------------------------------------------- */

export function VideoBand() {
  const t = useT()
  return (
    <section className="band" aria-label={t(T.band.quote)}>
      <LoopVideo name="band-livefire" />
      <Reveal as="p" className="band__quote">
        {t(T.band.quote)}
      </Reveal>
    </section>
  )
}

/* ---- 6 · Testimonial (light breather) ------------------------------------------------------ */

export function Testimonial() {
  const t = useT()
  const p = PLACEHOLDERS.testimonial
  return (
    <section className="section testimonial">
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.testimonial.kicker)}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <blockquote className="testimonial__quote">“{t(p)}”</blockquote>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="testimonial__attr">
            <span className="stars" aria-label="5 stars">{STARS}</span>
            <span className="sep" aria-hidden="true" />
            <span>
              {p.attribution} · {t(p.course)} · {p.year}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---- 7 · Courses grid -------------------------------------------------------------------------- */

export function Courses() {
  const t = useT()
  const [filter, setFilter] = useState('all')
  const filters = ['all', 'licensing', 'skills', 'professional', 'community']
  const items = T.courses.items.filter((item) => filter === 'all' || item.cat === filter)
  return (
    <section className="section" id="courses">
      <RingsOrnament style={{ bottom: '-120px', left: '-200px' }} />
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.courses.kicker)}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[t(T.courses.title)]} />
        </h2>
        <Reveal delay={0.1}>
          <div className="courses__filters" role="group">
            {filters.map((f) => (
              <button
                key={f}
                className="courses__filter"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {t(T.courses.filters[f])}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="courses__grid">
          {items.map((item, i) => (
            <Reveal key={t(item.title)} delay={(i % 4) * 0.06} className="course" as="article" tabIndex={0}>
              <Still name={item.img} alt={t(item.title)} />
              <span className="course__cat">{t(T.courses.filters[item.cat])}</span>
              <div className="course__label">
                <h3>{t(item.title)}</h3>
                <p>{t(item.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 8 · Instructor ------------------------------------------------------------------------------- */

export function Instructor() {
  const t = useT()
  return (
    <section className="section section--tint" id="instructor">
      <div className="container">
        <div className="instructor__grid">
          <Reveal className="instructor__media">
            <Still name="instructor-sight" alt={t({ en: 'Gloved hands fine-tuning a rifle sight over a paper target', es: 'Manos con guantes ajustando la mira de un rifle sobre una diana' })} />
          </Reveal>
          <div>
            <Reveal>
              <span className="kicker">{t(T.instructor.kicker)}</span>
            </Reveal>
            <h2 className="instructor__name">
              <MaskedLines lines={[T.instructor.name]} />
            </h2>
            <Reveal delay={0.08}>
              <p className="instructor__titles">{t(T.instructor.titles)}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="instructor__body">{t(T.instructor.body)}</p>
            </Reveal>
            <div className="instructor__pillars">
              {T.instructor.pillars.map((pillar, i) => (
                <Reveal key={i} delay={0.18 + i * 0.07} className="pillar">
                  <span className="pillar__num tnum">0{i + 1}</span>
                  <div>
                    <h4>{t(pillar.title)}</h4>
                    <p>{t(pillar.body)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4}>
              <span className="instructor__nra">
                <span className="dot" aria-hidden="true" />
                {t(T.instructor.nra)}
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- 9 · Upcoming classes ----------------------------------------------------------------------------- */

export function UpcomingClasses() {
  const t = useT()
  const { lang } = useLang()
  const dates = upcomingSaturdays(T.classes.sessions.length)
  return (
    <section className="section" id="classes">
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.classes.kicker)}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[t(T.classes.title)]} />
        </h2>
        <Reveal delay={0.08}>
          <p className="sub">{t(T.classes.sub)}</p>
        </Reveal>
        <div className="classes__list">
          {T.classes.sessions.map((s, i) => {
            const d = dates[i]
            return (
              <Reveal key={i} delay={i * 0.07} className="class-row">
                <div className="class-row__date">
                  <span className="class-row__day tnum">{d.getDate()}</span>
                  <span className="class-row__month">{MONTHS[lang][d.getMonth()]}</span>
                </div>
                <div>
                  <div className="class-row__name">
                    {t(s.title)}
                    {s.badge && <span className="class-row__badge">{s.badge}</span>}
                  </div>
                  <div className="class-row__meta">{t(s.time)}</div>
                </div>
                <a className="class-row__cta" href={CONTACT.phoneHref}>
                  {t(T.classes.reserve)} <span className="arr">→</span>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---- 10 · The private range ------------------------------------------------------------------------------ */

export function Range() {
  const t = useT()
  return (
    <section className="section section--tint" id="range">
      <div className="container">
        <div className="range__grid">
          <div>
            <Reveal>
              <span className="kicker">{t(T.range.kicker)}</span>
            </Reveal>
            <h2 className="h2">
              <MaskedLines lines={[t(T.range.title)]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="sub">{t(T.range.body)}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="stats__label" style={{ marginTop: 32 }}>{t(T.range.calibers)}</p>
              <div className="calibers">
                {CALIBERS.map((c) => (
                  <span key={c} className={`caliber${c === '9mm' ? ' caliber--hi' : ''}`}>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.22} className="range__card">
              <span className="label">{t(T.range.location)}</span>
              <span className="addr">{CONTACT.address}</span>
              <span className="appt">{t(T.range.appointment)}</span>
              <a className="btn btn--ghost" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
                {t(T.range.directions)} <span className="arr">→</span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="range__media">
            <Still name="range-bench" alt={t({ en: 'Training bench with ear protection at the private range', es: 'Banco de entrenamiento con protección auditiva en el campo privado' })} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---- 11 · Women's training + community ------------------------------------------------------------------------ */

export function Women() {
  const t = useT()
  return (
    <section className="section" id="women">
      <div className="container">
        <div className="women__grid">
          <Reveal delay={0.1} className="women__media">
            <Still name="women-range" alt={t({ en: 'A woman training at an indoor shooting range', es: 'Una mujer entrenando en un campo de tiro techado' })} />
          </Reveal>
          <div>
            <Reveal>
              <span className="kicker">{t(T.women.kicker)}</span>
            </Reveal>
            <h2 className="h2">
              <MaskedLines lines={[t(T.women.title)]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="sub">{t(T.women.body)}</p>
            </Reveal>
            <div className="discounts">
              {[T.women.discounts.veterans, T.women.discounts.groups].map((d, i) => (
                <Reveal key={i} delay={0.16 + i * 0.07} className="discount">
                  <h4>{t(d.title)}</h4>
                  <p>{t(d.body)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- 12 · FAQ -------------------------------------------------------------------------------------------------- */

function FaqItem({ item, index }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={index * 0.05} className={`faq__item${open ? ' faq__item--open' : ''}`}>
      <button className="faq__q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {t(item.q)}
        <span className="faq__icon" aria-hidden="true" />
      </button>
      {/* CSS grid-rows accordion — animates height with no JS measurement. */}
      <div className="faq__a">
        <div className="faq__a-clip">
          <p className="faq__a-inner">{t(item.a)}</p>
        </div>
      </div>
    </Reveal>
  )
}

export function Faq() {
  const t = useT()
  return (
    <section className="section section--tint" id="faq">
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.faq.kicker)}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[t(T.faq.title)]} />
        </h2>
        <div className="faq__list">
          {T.faq.items.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 13 · Contact ------------------------------------------------------------------------------------------------- */

export function Contact() {
  const t = useT()
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    // Demo form: front-end only until FORMSPREE_PLACEHOLDER is wired.
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <span className="kicker">{t(T.contact.kicker)}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[t(T.contact.title)]} />
        </h2>
        <Reveal delay={0.08}>
          <p className="sub">{t(T.contact.sub)}</p>
        </Reveal>
        <div className="contact__grid">
          <div className="contact__items">
            <Reveal className="contact__item">
              <span className="label">{t(T.contact.callLabel)}</span>
              <a className="value link-brass tnum" href={CONTACT.phoneHref}>
                {CONTACT.phoneDisplay}
              </a>
            </Reveal>
            <Reveal delay={0.06} className="contact__item">
              <span className="label">{t(T.contact.emailLabel)}</span>
              <a className="value link-brass" href={`mailto:${CONTACT.email}`} style={{ overflowWrap: 'anywhere' }}>
                {CONTACT.email}
              </a>
            </Reveal>
            <Reveal delay={0.12} className="contact__item">
              <span className="label">{t(T.contact.visitLabel)}</span>
              <span className="value">{CONTACT.address}</span>
            </Reveal>
            <Reveal delay={0.18} className="contact__item">
              <span className="label">{t(T.contact.hoursLabel)}</span>
              <span className="value">{t(T.contact.hours)}</span>
            </Reveal>
            <Reveal delay={0.24}>
              <a className="btn btn--brass contact__bigcall" href={CONTACT.phoneHref}>
                {t(T.hero.cta)} <span className="arr">→</span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            {sent ? (
              <div className="form__success" role="status">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t(T.contact.form.success)}
              </div>
            ) : (
              <form className="form" action={CONTACT.formAction} onSubmit={submit}>
                <label>
                  {t(T.contact.form.name)}
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label>
                  {t(T.contact.form.email)}
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label>
                  {t(T.contact.form.message)}
                  <textarea name="message" required placeholder={t(T.contact.form.messagePh)} />
                </label>
                <button className="btn btn--brass" type="submit" style={{ justifySelf: 'start' }}>
                  {t(T.contact.form.submit)} <span className="arr">→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
