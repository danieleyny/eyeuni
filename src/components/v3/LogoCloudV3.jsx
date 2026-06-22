import { AnimateIn } from '../useScrollAnimation'

// TODO(client): swap these text wordmarks for real monochrome SVG brand logos.
const ROW_A = ['Stripe', 'Calendly', 'Google', 'Instagram', 'Shopify', 'Mailchimp', 'Square', 'QuickBooks']
const ROW_B = ['HubSpot', 'Twilio', 'Slack', 'Zapier', 'Meta', 'Notion', 'Airtable', 'OpenAI']

function Wordmark({ label }) {
  return (
    <span className="mx-7 shrink-0 text-xl font-semibold text-[#8a93a6] transition-colors duration-300 hover:text-[#0a0e27]">
      {label}
    </span>
  )
}

function Row({ items, dir }) {
  const doubled = [...items, ...items]
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex items-center py-2 group-hover:[animation-play-state:paused]"
        style={{
          animation: `${dir === 'right' ? 'marquee-right' : 'marquee-left'} 42s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((it, i) => (
          <Wordmark key={i} label={it} />
        ))}
      </div>
    </div>
  )
}

export default function LogoCloudV3() {
  return (
    <section id="integrations" className="bg-[#f6f8fc] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-4xl">
            Works with everything you already use
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#4b5568]">
            Payments, scheduling, marketing and analytics — wired into one seamless experience.
          </p>
        </AnimateIn>
      </div>

      <AnimateIn delay={150} className="space-y-3">
        <Row items={ROW_A} dir="left" />
        <Row items={ROW_B} dir="right" />
      </AnimateIn>
    </section>
  )
}
