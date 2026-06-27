import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Icon, useLang } from '../ui'
import { CONTACT } from '../i18n'

export default function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [type, setType] = useState(t.contact.formTypes[0])
  const field = 'w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors'
  const fieldStyle = { background: '#fff', borderColor: 'var(--color-line)', color: 'var(--color-ink)' }

  return (
    <div>
      <section className="section">
        <div className="wrap text-center max-w-2xl mx-auto">
          <Reveal><div className="eyebrow justify-center">{t.contact.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h1 className="lead-h mx-auto mt-3">{t.contact.title}</h1></Reveal>
          <Reveal delay={0.12}><p className="muted mt-4">{t.contact.sub}</p></Reveal>
        </div>
      </section>

      <section className="section section-sand !pt-4">
        <div className="wrap grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          {/* form */}
          <Reveal>
            <div className="card p-7 md:p-9">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="grid place-items-center h-14 w-14 rounded-full mx-auto mb-5" style={{ background: 'var(--color-blue)', color: '#fff' }}><Icon.check className="h-7 w-7" /></div>
                  <h3 className="font-display font-bold text-xl">{t.brand}</h3>
                  <p className="muted mt-2 max-w-sm mx-auto">{t.contact.sent}</p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost mt-6" style={{ color: 'var(--color-ink)' }}>↺</button>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs muted mb-1.5 block">{t.contact.formName}</label>
                      <input required className={field} style={fieldStyle} placeholder={t.contact.formName} />
                    </div>
                    <div>
                      <label className="text-xs muted mb-1.5 block">{t.contact.formPhone}</label>
                      <input className={field} style={fieldStyle} placeholder={t.contact.formPhone} inputMode="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs muted mb-1.5 block">{t.contact.formEmail}</label>
                    <input required type="email" className={field} style={fieldStyle} placeholder={t.contact.formEmail} />
                  </div>
                  <div>
                    <label className="text-xs muted mb-2 block">{t.contact.formType}</label>
                    <div className="flex flex-wrap gap-2">
                      {t.contact.formTypes.map((opt) => (
                        <button type="button" key={opt} onClick={() => setType(opt)} className="px-3.5 py-2 rounded-full text-xs font-medium transition-colors"
                          style={type === opt ? { background: 'var(--color-blue)', color: '#fff' } : { background: 'var(--color-surface-2)', color: '#3b3c43' }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs muted mb-1.5 block">{t.contact.formMessage}</label>
                    <textarea rows={4} className={field} style={fieldStyle} placeholder={t.contact.formMessage} />
                  </div>
                  <button type="submit" className="btn btn-blue w-full !py-3.5">{t.contact.formSubmit}</button>
                  <p className="text-center text-xs muted">{t.contact.formNote}</p>
                </form>
              )}
            </div>
          </Reveal>

          {/* direct */}
          <div className="space-y-4">
            <Reveal delay={0.08}>
              <div className="card p-6">
                <h3 className="font-display font-semibold mb-4">{t.contact.directTitle}</h3>
                <div className="space-y-2">
                  <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-4 rounded-xl p-3 hover:bg-[color:var(--color-surface-2)] transition-colors">
                    <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: '#eef1ff', color: 'var(--color-blue)' }}><Icon.phone className="h-5 w-5" /></span>
                    <span><span className="block text-xs muted">{t.common.callUs}</span><span className="font-medium" dir="ltr">{CONTACT.phone}</span></span>
                  </a>
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl p-3 hover:bg-[color:var(--color-surface-2)] transition-colors">
                    <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: '#e7f8ee', color: '#1a9e54' }}><Icon.whatsapp className="h-5 w-5" /></span>
                    <span><span className="block text-xs muted">{t.common.whatsapp}</span><span className="font-medium" dir="ltr">{CONTACT.phone}</span></span>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-xl p-3 hover:bg-[color:var(--color-surface-2)] transition-colors">
                    <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: '#fff7d6', color: '#b8860b' }}><Icon.mail className="h-5 w-5" /></span>
                    <span className="min-w-0"><span className="block text-xs muted">{t.common.email}</span><span className="font-medium break-all">{CONTACT.email}</span></span>
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="card p-6">
                <div className="text-xs muted">{t.contact.contactName}</div>
                <div className="font-display font-semibold">{CONTACT.name}</div>
                <div className="border-t mt-4 pt-4" style={{ borderColor: 'var(--color-line)' }}>
                  <div className="text-xs muted">{t.contact.hoursTitle}</div>
                  <div className="text-sm mt-1">{t.contact.hours}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
