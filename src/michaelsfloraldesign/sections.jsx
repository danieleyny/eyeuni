import { T, CONTACT } from './content.js'
import { Reveal, MaskedLines, LoopVideo, Still } from './ui.jsx'

/* ---- 1 · Hero --------------------------------------------------------------- */

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__media">
        <LoopVideo name="hero" eager />
      </div>
      <div className="hero__content container">
        <Reveal>
          <p className="overline overline--light">{T.hero.overline}</p>
        </Reveal>
        <h1 className="hero__h1">
          <MaskedLines delay={0.12} lines={[T.hero.h1a, <em key="i">{T.hero.h1b}</em>]} />
        </h1>
        <Reveal delay={0.3}>
          <p className="hero__sub">{T.hero.sub}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="hero__cta-row">
            <a className="btn btn--gold" href={CONTACT.phoneHref}>
              {T.hero.ctaPrimary} <span className="arr">→</span>
            </a>
            <a className="btn btn--ghost-light" href="#arrangements">
              {T.hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5} as="ul" className="hero__proof">
          {T.hero.proof.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </Reveal>
      </div>
    </header>
  )
}

/* ---- 2 · Stats strip ---------------------------------------------------------- */

export function Stats() {
  return (
    <section className="stats" aria-label="About the shop, at a glance">
      <div className="container stats__grid">
        {T.stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08} className="stats__cell">
            <span className={`stats__value${s.wide ? ' stats__value--wide' : ''}`}>{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---- 3 · Arrangements gallery --------------------------------------------------- */

export function Gallery() {
  return (
    <section className="section" id="arrangements">
      <div className="container">
        <Reveal>
          <span className="overline">{T.gallery.overline}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[T.gallery.title]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="sub">{T.gallery.sub}</p>
        </Reveal>
        <div className="gallery">
          {T.gallery.items.map((item, i) => (
            <Reveal
              key={item.img}
              delay={(i % 3) * 0.08}
              as="figure"
              className={`gallery__item${item.tall ? ' gallery__item--tall' : ''}`}
            >
              <div className="gallery__media">
                <Still name={item.img} alt={item.alt} />
              </div>
              <figcaption className="gallery__caption">{item.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 4 · Atelier video band -------------------------------------------------------- */

export function AtelierBand() {
  return (
    <section className="band" aria-label={T.bandAtelier.quote}>
      <LoopVideo name={T.bandAtelier.name} />
      <Reveal as="p" className="band__quote">
        {T.bandAtelier.quote}
      </Reveal>
    </section>
  )
}

/* ---- 5 · Occasions -------------------------------------------------------------------- */

export function Occasions() {
  return (
    <section className="section section--cream" id="occasions">
      <div className="container">
        <Reveal>
          <span className="overline">{T.occasions.overline}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[T.occasions.title]} />
        </h2>
        <div className="occasions">
          {T.occasions.items.map((item, i) => (
            <Reveal key={item.img} delay={i * 0.08} as="article" className="occasion">
              <div className="occasion__media">
                <Still name={item.img} alt={item.alt} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a className="text-link" href={CONTACT.phoneHref}>
                {T.occasions.link} <span className="arr">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- 6 · Our story ------------------------------------------------------------------------ */

export function Story() {
  return (
    <section className="section" id="story">
      <div className="container story__grid">
        <Reveal className="story__media">
          <Still name="story-portrait" alt={T.story.portraitAlt} />
        </Reveal>
        <div className="story__body">
          <Reveal>
            <span className="overline">{T.story.overline}</span>
          </Reveal>
          <h2 className="h2">
            <MaskedLines lines={[T.story.title]} />
          </h2>
          {T.story.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <p className="story__para">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24} as="blockquote" className="story__quote">
            <p>“{T.story.quote}”</p>
            <cite>— {T.story.quoteAttr}</cite>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---- 7 · Clients strip ----------------------------------------------------------------------- */

export function Clients() {
  return (
    <section className="clients" aria-label="Clients">
      <div className="container">
        <Reveal>
          <span className="overline overline--ivory">{T.clients.overline}</span>
        </Reveal>
        <Reveal delay={0.1} as="ul" className="clients__list">
          {T.clients.names.map((name) => (
            <li key={name}>{name}</li>
          ))}
          <li className="clients__coda">{T.clients.coda}</li>
        </Reveal>
      </div>
    </section>
  )
}

/* ---- 8 · Testimonial ---------------------------------------------------------------------------- */

export function Testimonial() {
  return (
    <section className="section testimonial" id="testimonials">
      <div className="container">
        <Reveal>
          <span className="overline">{T.testimonial.overline}</span>
        </Reveal>
        <Reveal delay={0.08} as="blockquote" className="testimonial__quote">
          “{T.testimonial.quote}”
        </Reveal>
        <Reveal delay={0.16}>
          <p className="testimonial__attr">— {T.testimonial.attribution}</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---- 9 · Delivery video band ----------------------------------------------------------------------- */

export function DeliveryBand() {
  return (
    <section className="band band--short" aria-label={T.bandDelivery.quote}>
      <LoopVideo name={T.bandDelivery.name} />
      <div className="band__stack">
        <Reveal as="p" className="band__quote">
          {T.bandDelivery.quote}
        </Reveal>
        <Reveal delay={0.12}>
          <a className="btn btn--gold" href={CONTACT.phoneHref}>
            {T.bandDelivery.cta} <span className="arr">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ---- 10 · Visit / contact ------------------------------------------------------------------------------ */

export function Visit() {
  return (
    <section className="section section--cream" id="visit">
      <div className="container">
        <Reveal>
          <span className="overline">{T.visit.overline}</span>
        </Reveal>
        <h2 className="h2">
          <MaskedLines lines={[T.visit.title]} />
        </h2>
        <Reveal delay={0.08}>
          <p className="sub">{T.visit.sub}</p>
        </Reveal>
        <div className="visit__grid">
          <div className="visit__info">
            <Reveal className="visit__item visit__item--phone">
              <span className="label">{T.visit.phoneLabel}</span>
              <a className="visit__phone" href={CONTACT.phoneHref}>
                {CONTACT.phoneDisplay}
              </a>
            </Reveal>
            <Reveal delay={0.06} className="visit__item">
              <span className="label">{T.visit.addressLabel}</span>
              <span className="value">{CONTACT.addressShort}</span>
              <span className="visit__area">{CONTACT.addressArea} · New York, NY 10028</span>
              <a className="text-link" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
                {T.visit.directions} <span className="arr">→</span>
              </a>
            </Reveal>
            <Reveal delay={0.12} className="visit__item">
              <span className="label">{T.visit.emailLabel}</span>
              <a className="value visit__email" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </Reveal>
            <Reveal delay={0.18} className="visit__item visit__item--social">
              <a className="text-link" href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="text-link" href={CONTACT.facebookUrl} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="visit__gift">{T.visit.giftNote}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="visit__media">
            <Still name="visit-storefront" alt={T.visit.mapAlt} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
