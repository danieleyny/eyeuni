import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Icon, SectionHeading, useLang } from '../ui'
import { CONTACT } from '../i18n'

export default function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [type, setType] = useState(t.contact.formTypes[0])

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const fieldCls = 'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-blue-bright focus:bg-white/8 outline-none transition-colors'

  return (
    <div>
      <section className="section pb-0">
        <div className="container-x">
          <SectionHeading center eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* form */}
          <Reveal>
            <div className="glass-strong rounded-[1.75rem] p-7 md:p-9">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="grid place-items-center h-16 w-16 rounded-full mx-auto mb-5" style={{ background: 'linear-gradient(135deg,#2f6bff,#ffd60a)' }}>
                    <Icon.check className="h-8 w-8 text-[#060912]" />
                  </div>
                  <h3 className="font-display font-bold text-xl">{t.brand}</h3>
                  <p className="text-muted mt-2 max-w-sm mx-auto">{t.contact.sent}</p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost mt-6">{t.contact.formSubmit}</button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted mb-1.5 block">{t.contact.formName}</label>
                      <input required className={fieldCls} placeholder={t.contact.formName} />
                    </div>
                    <div>
                      <label className="text-xs text-muted mb-1.5 block">{t.contact.formPhone}</label>
                      <input className={fieldCls} placeholder={t.contact.formPhone} inputMode="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-1.5 block">{t.contact.formEmail}</label>
                    <input required type="email" className={fieldCls} placeholder={t.contact.formEmail} />
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-2 block">{t.contact.formType}</label>
                    <div className="flex flex-wrap gap-2">
                      {t.contact.formTypes.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setType(opt)}
                          className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${type === opt ? 'text-[#060912]' : 'text-muted glass'}`}
                          style={type === opt ? { background: 'linear-gradient(100deg,#2f6bff,#ffd60a)' } : undefined}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-1.5 block">{t.contact.formMessage}</label>
                    <textarea rows={4} className={fieldCls} placeholder={t.contact.formMessage} />
                  </div>
                  <button type="submit" className="btn btn-primary w-full !py-3.5">
                    <Icon.bolt className="h-4 w-4 text-gold" />{t.contact.formSubmit}
                  </button>
                  <p className="text-center text-xs text-muted/80">{t.contact.formNote}</p>
                </form>
              )}
            </div>
          </Reveal>

          {/* direct contact */}
          <div className="space-y-4">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-4">{t.contact.directTitle}</h3>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/5 transition-colors group">
                    <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, rgba(47,107,255,0.3), rgba(47,107,255,0.1))' }}><Icon.phone className="h-5 w-5 text-blue-bright" /></span>
                    <span><span className="block text-xs text-muted">{t.common.callUs}</span><span className="font-medium" dir="ltr">{CONTACT.phone}</span></span>
                  </a>
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/5 transition-colors">
                    <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.3), rgba(37,211,102,0.1))' }}><Icon.whatsapp className="h-5 w-5 text-[#25d366]" /></span>
                    <span><span className="block text-xs text-muted">{t.common.whatsapp}</span><span className="font-medium" dir="ltr">{CONTACT.phone}</span></span>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/5 transition-colors">
                    <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, rgba(255,179,0,0.3), rgba(255,179,0,0.1))' }}><Icon.mail className="h-5 w-5 text-gold-warm" /></span>
                    <span className="min-w-0"><span className="block text-xs text-muted">{t.common.email}</span><span className="font-medium break-all">{CONTACT.email}</span></span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg,#2f6bff,#ffd60a)' }}><Icon.sun className="h-5 w-5 text-[#060912]" /></span>
                  <div>
                    <div className="text-xs text-muted">{t.contact.contactName}</div>
                    <div className="font-display font-semibold">{CONTACT.name}</div>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="text-xs text-muted">{t.contact.hoursTitle}</div>
                  <div className="text-sm mt-1">{t.contact.hours}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="glass rounded-2xl p-6">
                <div className="text-xs text-muted mb-3">{t.contact.socialTitle}</div>
                <div className="flex gap-2.5">
                  {['instagram', 'facebook', 'linkedin', 'youtube'].map((s) => (
                    <a key={s} href="#" onClick={(e) => e.preventDefault()} className="grid place-items-center h-10 w-10 rounded-xl glass text-muted hover:text-ink card-hover" aria-label={s}>
                      <span className="text-sm font-bold uppercase">{s[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
