import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Icon, useLang } from '../ui'
import { Pic } from '../../media'
import { CONTACT } from '../i18n'

const UserIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>)
const BuildingIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></svg>)
const PinIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></svg>)

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button type="button" key={opt} className="lv-chip" aria-pressed={value === opt} onClick={() => onChange(value === opt ? null : opt)}>
          {opt}
        </button>
      ))}
    </div>
  )
}

function Method({ icon, label, value, href, chip, dir }) {
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      className="flex items-center gap-4 rounded-xl p-3 -mx-1 transition-colors hover:bg-white/5">
      <span className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={chip}>{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs" style={{ color: '#9aa1b0' }}>{label}</span>
        <span className="font-medium text-white break-words" dir={dir}>{value}</span>
      </span>
    </a>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [service, setService] = useState(t.contact.formTypes[0])
  const [siteType, setSiteType] = useState(null)
  const [size, setSize] = useState(null)

  return (
    <div>
      {/* header band */}
      <section className="band" style={{ minHeight: 340 }}>
        <Pic name="robot-action-valley" className="media" imgClassName="media" eager />
        <div className="scrim" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
        <div className="inner"><div className="wrap" style={{ maxWidth: 720 }}>
          <Reveal><div className="eyebrow" style={{ color: '#cfd6ff' }}>{t.contact.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h1 className="mt-4 text-[clamp(2rem,5vw,3rem)]">{t.contact.title}</h1></Reveal>
          <Reveal delay={0.12}><p className="mt-3 max-w-xl" style={{ color: '#dfe2ee' }}>{t.contact.sub}</p></Reveal>
        </div></div>
      </section>

      {/* form + info */}
      <section className="section section-sand">
        <div className="wrap">
          <Reveal>
            <div className="card overflow-hidden grid lg:grid-cols-[1.1fr_0.8fr]" style={{ boxShadow: '0 30px 70px -40px rgba(20,21,28,0.45)' }}>
              {/* form */}
              <div className="p-7 md:p-9">
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-14">
                    <div className="grid place-items-center h-14 w-14 rounded-full mx-auto mb-5" style={{ background: 'var(--color-blue)', color: '#fff' }}><Icon.check className="h-7 w-7" /></div>
                    <h3 className="font-display font-bold text-xl">{t.brand}</h3>
                    <p className="muted mt-2 max-w-sm mx-auto">{t.contact.sent}</p>
                    <button onClick={() => setSent(false)} className="btn btn-ghost mt-6" style={{ color: 'var(--color-ink)' }}>↺</button>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                    {/* core required */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="lv-label">{t.contact.formName}</label>
                        <div className="lv-field"><span className="lv-ic"><UserIcon className="h-[18px] w-[18px]" /></span><input required className="lv-input has-ic" placeholder={t.contact.formName} /></div>
                      </div>
                      <div>
                        <label className="lv-label">{t.contact.formPhone}</label>
                        <div className="lv-field"><span className="lv-ic"><Icon.phone className="h-[18px] w-[18px]" /></span><input required className="lv-input has-ic" placeholder={t.contact.formPhone} inputMode="tel" dir="ltr" /></div>
                      </div>
                    </div>
                    <div>
                      <label className="lv-label">{t.contact.formEmail}</label>
                      <div className="lv-field"><span className="lv-ic"><Icon.mail className="h-[18px] w-[18px]" /></span><input required type="email" className="lv-input has-ic" placeholder={t.contact.formEmail} dir="ltr" /></div>
                    </div>

                    {/* service interested in */}
                    <div>
                      <label className="lv-label">{t.contact.formType}</label>
                      <div className="flex flex-wrap gap-2">
                        {t.contact.formTypes.map((opt) => (
                          <button type="button" key={opt} className="lv-chip" aria-pressed={service === opt} onClick={() => setService(opt)}>{opt}</button>
                        ))}
                      </div>
                    </div>

                    {/* optional qualifiers, visually secondary */}
                    <div className="lv-optional space-y-4">
                      <div className="text-xs font-display font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--color-muted)' }}>{t.contact.formOptional}</div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="lv-label">{t.contact.formCompany} <span style={{ color: '#a7a293' }}>· {t.contact.formCompanyHint}</span></label>
                          <div className="lv-field"><span className="lv-ic"><BuildingIcon className="h-[18px] w-[18px]" /></span><input className="lv-input has-ic" placeholder={t.contact.formCompany} /></div>
                        </div>
                        <div>
                          <label className="lv-label">{t.contact.formLocation}</label>
                          <div className="lv-field"><span className="lv-ic"><PinIcon className="h-[18px] w-[18px]" /></span><input className="lv-input has-ic" placeholder={t.contact.formLocation} /></div>
                        </div>
                      </div>
                      <div>
                        <label className="lv-label">{t.contact.formSiteType}</label>
                        <ChipGroup options={t.contact.siteTypes} value={siteType} onChange={setSiteType} />
                      </div>
                      <div>
                        <label className="lv-label">{t.contact.formSize}</label>
                        <ChipGroup options={t.contact.sizeOptions} value={size} onChange={setSize} />
                      </div>
                      <div>
                        <label className="lv-label">{t.contact.formMessage}</label>
                        <textarea rows={3} className="lv-input" placeholder={t.contact.formMessage} />
                      </div>
                    </div>

                    <div>
                      <button type="submit" className="btn btn-blue w-full !py-3.5">{t.contact.formSubmit}</button>
                      <p className="text-center text-xs muted mt-2.5">{t.contact.formReassure}</p>
                      <p className="text-center text-[11px] muted mt-1 opacity-70">{t.contact.formNote}</p>
                    </div>
                  </form>
                )}
              </div>

              {/* dark info panel */}
              <div className="p-7 md:p-9 flex flex-col" style={{ background: 'var(--color-base-2)', color: '#fff' }}>
                <h3 className="font-display font-semibold text-lg">{t.contact.directTitle}</h3>
                <div className="mt-5 space-y-1.5">
                  <Method icon={<Icon.phone className="h-5 w-5" />} label={t.common.callUs} value={CONTACT.phone} href={`tel:${CONTACT.phoneHref}`} dir="ltr" chip={{ background: 'rgba(42,78,160,0.22)', color: '#9db4e6' }} />
                  <Method icon={<Icon.whatsapp className="h-5 w-5" />} label={t.common.whatsapp} value={CONTACT.phone} href={`https://wa.me/${CONTACT.whatsapp}`} dir="ltr" chip={{ background: 'rgba(37,211,102,0.18)', color: '#56e08c' }} />
                  <Method icon={<Icon.mail className="h-5 w-5" />} label={t.common.email} value={CONTACT.email} href={`mailto:${CONTACT.email}`} chip={{ background: 'rgba(255,212,0,0.18)', color: '#ffd400' }} />
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
                <div className="mt-auto pt-6 flex items-center gap-2.5" style={{ color: '#cdd0da' }}>
                  <Icon.check className="h-4 w-4 shrink-0" style={{ color: 'var(--color-yellow)' }} />
                  <span className="text-[13px]">{t.contact.panelReassure}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
