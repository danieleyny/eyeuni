import { useEffect, useState } from 'react'
import { T, NAV, CONTACT } from './content.js'
import { RevealRoot, StemMark } from './ui.jsx'
import {
  Hero,
  Stats,
  Gallery,
  AtelierBand,
  Occasions,
  Events,
  Story,
  Testimonial,
  DeliveryBand,
  Visit,
} from './sections.jsx'

const NAV_IDS = NAV.map(([id]) => id)

/** Track which section is in view so the matching nav item gets the gold underline. */
function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

function Nav({ scrolled }) {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(NAV_IDS)

  // Full-screen overlay menu locks page scroll while open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  // Anchor links inside the overlay: the browser performs the anchor scroll
  // before React re-renders, so the scroll lock must be lifted synchronously
  // in the click handler — otherwise the scroll clamps to 0 and never happens.
  const closeMenu = () => {
    document.documentElement.style.overflow = ''
    setOpen(false)
  }

  return (
    <nav className={`nav${scrolled ? ' nav--solid' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={closeMenu}>
          <StemMark size={20} />
          <span>{T.brand}</span>
        </a>
        <div className="nav__links">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              className={`nav__link${active === id ? ' nav__link--active' : ''}`}
              href={`#${id}`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav__right">
          <a className="btn btn--gold-outline nav__cta" href={CONTACT.phoneHref}>
            {T.nav.order}
          </a>
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`nav__overlay${open ? ' nav__overlay--open' : ''}`}>
        {NAV.map(([id, label], i) => (
          <a key={id} href={`#${id}`} style={{ '--i': i }} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a
          className="nav__overlay-phone"
          href={CONTACT.phoneHref}
          style={{ '--i': NAV.length }}
          onClick={closeMenu}
        >
          {T.nav.order} · {CONTACT.phoneDisplay}
        </a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="footer__brand" href="#top">
          <StemMark size={18} />
          {T.brand} <span className="footer__brand-suffix">{T.brandSuffix}</span>
        </a>
        <nav className="footer__nav" aria-label="Footer">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="footer__meta">
          <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span className="footer__social">
            <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </span>
          <span>{T.footer.rights}</span>
        </div>
      </div>
    </footer>
  )
}

export default function MfdApp() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24)
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <RevealRoot>
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Stats />
        <Gallery />
        <AtelierBand />
        <Occasions />
        <Events />
        <Story />
        <Testimonial />
        <DeliveryBand />
        <Visit />
      </main>
      <Footer />
    </RevealRoot>
  )
}
