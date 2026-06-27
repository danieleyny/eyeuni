import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Icon, useLang } from '../ui'
import { Pic } from '../../media'
import { CONTACT } from '../i18n'

function Method({ icon, label, value, href, chip, dir }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag href={href} target={href && href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      className="flex items-center gap-4 rounded-xl p-3 -mx-1 transition-colors hover:bg-white/5">
      <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={chip}>{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs" style={{ color: '#9aa1b0' }}>{label}</span>
        <span className="font-medium text-white break-words" dir={dir}>{value}</span>
      </span>
    </Tag>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [type, setType] = useState(t.contact.formTypes[0])
  const field = 'w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors'
  const fieldStyle = { background: '#fff', borderColor: 'var(--color-line)', color: 'var(--color-ink)' }

  return (
    <div>
      {/* header band */}
      <section className="band" style={{ minHeight: 360 }}>
        <Pic name="robot-action-valley" className="media" imgClassName="media" eager />
        <div className="scrim" />
        <div className="inner"><div className="wrap" style={{ maxWidth: 720 }}>
          <Reveal><div className="eyebrow" style={{ color: '#cfd6ff' }}>{t.contact.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h1 className="mt-4 text-[clamp(2rem,5vw,3rem)]">{t.contact.title}</h1></Reveal>
          <Reveal delay={0.12}><p className="mt-3 max-w-xl" style={{ color: '#dfe2ee' }}>{t.contact.sub}</p></Reveal>
        </div></div>
      </section>

      {/* form + info card */}
      <section className="section section-sand">
        <div className="wrap">
          <Reveal>
            <div className="card overflow-hidden grid lg:grid-cols-[1.05fr_0.85fr]" style={{ boxShadow: '0 30px 70px -40px rgba(20,21,28,0.45)' }}>
              {/* form */}
              <div className="p-7 md:p-9">
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
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

              {/* dark info panel */}
              <div className="p-7 md:p-9 flex flex-col" style={{ background: 'var(--color-base-2)', color: '#fff' }}>
                <h3 className="font-display font-semibold text-lg">{t.contact.directTitle}</h3>
                <div className="mt-5 space-y-1.5">
                  <Method
                    icon={<Icon.phone className="h-5 w-5" />} label={t.common.callUs} value={CONTACT.phone} href={`tel:${CONTACT.phoneHref}`} dir="ltr"
                    chip={{ background: 'rgba(10,43,255,0.18)', color: '#8fa6ff' }} />
                  <Method
                    icon={<Icon.whatsapp className="h-5 w-5" />} label={t.common.whatsapp} value={CONTACT.phone} href={`https://wa.me/${CONTACT.whatsapp}`} dir="ltr"
                    chip={{ background: 'rgba(37,211,102,0.18)', color: '#56e08c' }} />
                  <Method
                    icon={<Icon.mail className="h-5 w-5" />} label={t.common.email} value={CONTACT.email} href={`mailto:${CONTACT.email}`}
                    chip={{ background: 'rgba(255,212,0,0.18)', color: '#ffd400' }} />
                </div>

                <div className="mt-6 pt-6 grid grid-cols-2 gap-4" style={{ borderTop: '1px solid #23252e' }}>
                  <div>
                    <div className="text-xs" style={{ color: '#9aa1b0' }}>{t.contact.contactName}</div>
                    <div className="font-display font-semibold mt-0.5">{CONTACT.name}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: '#9aa1b0' }}>{t.contact.hoursTitle}</div>
                    <div className="text-sm mt-0.5">{t.contact.hours}</div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="text-xs mb-3" style={{ color: '#9aa1b0' }}>{t.contact.socialTitle}</div>
                  <div className="flex gap-2.5">
                    {['instagram', 'facebook', 'linkedin', 'youtube'].map((s) => (
                      <a key={s} href="#" onClick={(e) => e.preventDefault()} className="grid place-items-center h-9 w-9 rounded-lg transition-colors" style={{ border: '1px solid #2a2d36', color: '#a9adba' }} aria-label={s}>
                        <span className="text-xs font-bold uppercase">{s[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
