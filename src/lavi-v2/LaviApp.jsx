import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LangProvider, useLang, Icon } from './ui'
import { LaviMark, Wordmark } from './LaviMark'
import { NAV_PAGES, CONTACT } from './i18n'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

const PAGES = { home: Home, about: About, services: Services, portfolio: Portfolio, contact: Contact }

function wordmarkText(lang) {
  return lang === 'he' ? { main: 'לביא', sub: 'אנרגיה' } : { main: 'LAVI', sub: 'ENERGY' }
}

function Brand({ go }) {
  const { t, lang } = useLang()
  const wm = wordmarkText(lang)
  return (
    <button className="brand" onClick={() => go('home')} aria-label={t.brand}>
      <LaviMark className="mark" />
      <Wordmark main={wm.main} sub={wm.sub} />
    </button>
  )
}

function LangToggle({ className = '' }) {
  const { lang, toggle } = useLang()
  return (
    <button className={`lang ${className}`} onClick={toggle} aria-label="Switch language">
      {lang === 'en' ? 'EN · עב' : 'עב · EN'}
    </button>
  )
}

function Header({ page, go }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="lavi-header">
        <div className="wrap nav">
          <Brand go={go} />
          <nav className="menu">
            {NAV_PAGES.map((p) => (
              <button key={p} className={page === p ? 'active' : ''} onClick={() => go(p)}>
                {t.nav[p]}
              </button>
            ))}
          </nav>
          <div className="navright">
            <div className="nav-desktop">
              <LangToggle />
              <button className="btn btn-blue !py-2.5 !px-4" onClick={() => go('contact')}>
                {t.nav.cta}
              </button>
            </div>
            <button className="nav-mobile lang !p-2" onClick={() => setOpen(true)} aria-label="Open menu">
              <Icon.menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-0 inset-x-0 p-6 pt-5"
              style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-line)' }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-5">
                <Brand go={(p) => { go(p); setOpen(false) }} />
                <button className="lang !p-2" onClick={() => setOpen(false)} aria-label="Close menu">
                  <Icon.close className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col">
                {NAV_PAGES.map((p) => (
                  <button
                    key={p}
                    onClick={() => { go(p); setOpen(false) }}
                    className="text-start text-lg font-display font-semibold py-3 border-b"
                    style={{ borderColor: 'var(--color-line)', color: page === p ? 'var(--color-blue)' : 'var(--color-ink)' }}
                  >
                    {t.nav[p]}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-3 mt-5">
                <LangToggle />
                <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-blue flex-1">
                  <Icon.phone className="h-4 w-4" />{t.common.callUs}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer({ go }) {
  const { t, lang } = useLang()
  const wm = wordmarkText(lang)
  return (
    <footer className="lavi-footer">
      <div className="wrap">
        <div className="fgrid">
          <div style={{ color: '#fff' }}>
            <button className="brand" onClick={() => go('home')} style={{ marginBottom: 14 }}>
              <LaviMark className="mark" ring="#5b73ff" />
              <Wordmark main={wm.main} sub={wm.sub} />
            </button>
            <p style={{ maxWidth: 260 }}>{t.footer.blurb}</p>
            <div className="flex gap-2.5 mt-5">
              {['instagram', 'facebook', 'linkedin', 'youtube'].map((s) => (
                <a key={s} href="#" onClick={(e) => e.preventDefault()} className="grid place-items-center h-9 w-9 rounded-lg" style={{ border: '1px solid #23252e', color: '#a9adba' }} aria-label={s}>
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5>{t.footer.services}</h5>
            {t.footer.servicesList.map((s) => (
              <a key={s} href="#" onClick={(e) => { e.preventDefault(); go('services') }} className="block mb-2.5 text-start">{s}</a>
            ))}
          </div>
          <div>
            <h5>{t.footer.quickLinks}</h5>
            {['about', 'portfolio', 'contact'].map((p) => (
              <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} className="block mb-2.5 text-start">{t.nav[p]}</a>
            ))}
          </div>
          <div>
            <h5>{t.footer.contact}</h5>
            <p style={{ marginBottom: 9 }}>{CONTACT.name}</p>
            <a href={`tel:${CONTACT.phoneHref}`} className="block mb-2.5" dir="ltr">{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="block mb-2.5 break-all">{CONTACT.email}</a>
            <p>{t.contact.hours}</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</span>
          <span>{t.footer.builtBy}</span>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  const common = { className: 'h-4 w-4', viewBox: '0 0 24 24', fill: 'currentColor' }
  if (name === 'instagram')
    return <svg {...common}><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.42 8.86 3.42 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.96a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>
  if (name === 'facebook')
    return <svg {...common}><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
  if (name === 'linkedin')
    return <svg {...common}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.76V1.74C24 .78 23.2 0 22.22 0Z" /></svg>
  return <svg {...common}><path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>
}

function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div className="scroll-progress" style={{ width: '100%', transform: `scaleX(${p})` }} />
}

function Shell() {
  const [page, setPage] = useState('home')
  const go = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const PageComp = PAGES[page] || Home

  return (
    <>
      <ScrollProgress />
      <Header page={page} go={go} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <PageComp go={go} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer go={go} />
    </>
  )
}

export default function LaviApp() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  )
}
