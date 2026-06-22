import { useRef, useState } from 'react'
import { AnimateIn } from './useScrollAnimation'
import { useActiveWhenVisible } from '../hooks/useActiveWhenVisible'

// TODO(client): swap these text wordmarks for real monochrome SVG brand logos.
const ROW_A = ['Stripe', 'Calendly', 'Google', 'Instagram', 'Shopify', 'Mailchimp', 'Square', 'QuickBooks']
const ROW_B = ['HubSpot', 'Twilio', 'Slack', 'Zapier', 'Meta', 'Notion', 'Airtable', 'OpenAI']

function Pill({ label }) {
  return (
    <div className="shrink-0 mx-3 flex items-center justify-center px-6 py-3 rounded-xl border border-dark-border bg-dark-card/40">
      <span className="text-lg font-semibold text-gray-500 grayscale opacity-70 transition-all duration-300 hover:text-white hover:opacity-100">
        {label}
      </span>
    </div>
  )
}

// Pauses on hover (existing) AND off-screen / tab hidden (efficiency), via
// animation-play-state — freezes in place, resumes seamlessly.
function Row({ items, dir, active }) {
  const [hover, setHover] = useState(false)
  const doubled = [...items, ...items]
  return (
    <div
      className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex items-center py-2"
        style={{
          animationName: dir === 'right' ? 'marquee-right' : 'marquee-left',
          animationDuration: '38s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: active && !hover ? 'running' : 'paused',
          width: 'max-content',
        }}
      >
        {doubled.map((it, i) => (
          <Pill key={i} label={it} />
        ))}
      </div>
    </div>
  )
}

export default function IntegrationsMarquee() {
  const sectionRef = useRef(null)
  const active = useActiveWhenVisible(sectionRef)
  return (
    <section ref={sectionRef} id="integrations" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connects with the tools you already use
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Payments, scheduling, marketing, analytics and more — wired into one
            seamless experience.
          </p>
        </AnimateIn>
      </div>

      <AnimateIn delay={150} className="space-y-4">
        <Row items={ROW_A} dir="left" active={active} />
        <Row items={ROW_B} dir="right" active={active} />
      </AnimateIn>
    </section>
  )
}
