import { motion, useReducedMotion } from 'framer-motion'
import {
  Calendar,
  CreditCard,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Bell,
  Check,
  Lock,
  Plus,
} from 'lucide-react'

const BASE = import.meta.env.BASE_URL

// ============================================================================
// "The EYEuni Lens" — the dormant site is a genuinely beautiful, full-color
// luxury restaurant ("Maison"). The lens reveals the SAME site coming alive:
// concrete, labeled capability widgets anchored to real elements of the page.
// ============================================================================

// Anchors: capability id → where its widget sits + the label + (optional) the
// source element it's powering (for the halo). x/y are panel fractions.
// Ordered so the auto-drift sweeps a clean loop across all six.
export const ANCHORS = [
  { id: 'analytics', x: 0.22, y: 0.13, label: 'Live analytics' },
  { id: 'booking', x: 0.74, y: 0.17, label: 'Booking system', src: { x: 0.85, y: 0.07 } },
  { id: 'payments', x: 0.74, y: 0.46, label: 'Secure payments', src: { x: 0.5, y: 0.4 } },
  { id: 'concierge', x: 0.74, y: 0.84, label: 'AI concierge' },
  { id: 'notify', x: 0.24, y: 0.85, label: 'Instant notifications' },
  { id: 'ordering', x: 0.24, y: 0.55, label: 'Online ordering', src: { x: 0.22, y: 0.66 } },
]

// ── The base Maison site (full color, attractive, static) ──────────────────
export function MaisonSite() {
  // TODO(client): swap room-*.jpg for real food / interior photography.
  const dishes = [
    { name: 'Seared Scallops', price: '$32', img: 'room-1.jpg' },
    { name: 'Wagyu Tartare', price: '$28', img: 'room-2.jpg' },
    { name: 'Truffle Tagliatelle', price: '$36', img: 'room-3.jpg' },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0c0c0c] text-white">
      {/* Hero with real photo */}
      <div className="relative h-[47%]">
        <img src={`${BASE}mockup/hotel-hero.jpg`} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c0c0c] to-transparent" />

        {/* Nav */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2.5 sm:px-5">
          <span
            className="text-[13px] tracking-[0.22em] text-white sm:text-[15px]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            MAISON
          </span>
          <div className="hidden gap-3 text-[8px] uppercase tracking-wider text-white/55 sm:flex">
            <span>Menu</span>
            <span>About</span>
            <span>Book</span>
          </div>
          <span className="rounded-[3px] bg-[#c8a97e] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wider text-[#0c0c0c]">
            Reserve
          </span>
        </div>

        {/* Hero copy */}
        <div className="absolute inset-x-0 bottom-2.5 px-4 text-center">
          <div className="mb-1 text-[7px] uppercase tracking-[0.3em] text-[#c8a97e]">
            Hudson Valley
          </div>
          <div className="text-[19px] leading-tight sm:text-[24px]" style={{ fontFamily: 'Georgia, serif' }}>
            Fine dining, <span className="italic text-[#c8a97e]">reimagined</span>
          </div>
          <div className="mx-auto mt-1 max-w-[220px] text-[9px] leading-snug text-white/55">
            Seasonal tasting menus & natural wine, moments from the river.
          </div>
          <span className="mt-2 inline-block rounded-[3px] bg-[#c8a97e] px-3 py-1 text-[8px] font-semibold uppercase tracking-wider text-[#0c0c0c]">
            Reserve a table
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="px-3 pt-3 sm:px-5">
        <div className="mb-1.5 flex items-end justify-between">
          <div>
            <div className="text-[6px] uppercase tracking-[0.3em] text-[#c8a97e]">The Menu</div>
            <div className="text-[11px]" style={{ fontFamily: 'Georgia, serif' }}>
              Signature plates
            </div>
          </div>
          <div className="text-[7px] uppercase tracking-wider text-[#c8a97e]/70">View all →</div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {dishes.map((d) => (
            <div key={d.name} className="overflow-hidden rounded-[3px]">
              <div className="relative aspect-[3/2]">
                <img src={`${BASE}mockup/${d.img}`} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute inset-x-1 bottom-1">
                  <div className="text-[6px] font-medium leading-tight sm:text-[7px]">{d.name}</div>
                  <div className="text-[6px] text-[#c8a97e] sm:text-[7px]">{d.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 px-3 py-2 text-[7px] uppercase tracking-wider text-white/40 sm:px-5">
        <span className="normal-case tracking-[0.2em]" style={{ fontFamily: 'Georgia, serif' }}>
          © Maison
        </span>
        <span className="flex gap-2">
          <span>Reservations</span>
          <span className="hidden sm:inline">Private events</span>
        </span>
      </div>
    </div>
  )
}

// ── Shared widget shell: a glowing name pill + a bright card ────────────────
function WidgetShell({ icon: Icon, label, children, w = 'w-[144px] sm:w-[160px]' }) {
  return (
    <div className={w}>
      <div className="mb-1.5 flex w-max items-center gap-1.5">
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] bg-primary/25 text-primary">
          <Icon size={12} strokeWidth={2.5} />
        </span>
        <span className="whitespace-nowrap rounded-full bg-dark/85 px-2 py-0.5 text-xs font-semibold tracking-wide text-primary shadow-[0_0_12px_rgba(15,49,184,0.5)] ring-1 ring-primary/30">
          {label}
        </span>
      </div>
      <div className="rounded-lg border border-primary/40 bg-[#0b1020]/95 p-2 shadow-[0_0_30px_rgba(15,49,184,0.5)] backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}

// 1 — Live analytics → top-left HUD: a chart that draws + bookings delta.
export function AnalyticsWidget({ active }) {
  const bars = [0.4, 0.6, 0.5, 0.74, 0.66, 0.92, 1]
  return (
    <WidgetShell icon={TrendingUp} label="Live analytics">
      <div className="flex h-9 items-end justify-between gap-[3px]">
        {bars.map((b, i) => (
          <div key={i} className="relative h-full flex-1">
            <motion.div
              className="absolute bottom-0 w-full rounded-t-[2px] bg-gradient-to-t from-accent to-primary"
              initial={false}
              animate={{ height: active ? `${b * 100}%` : '8%' }}
              transition={{ duration: 0.5, delay: active ? i * 0.05 : 0, ease: 'easeOut' }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 text-[10px] font-bold text-primary">
        +24% <span className="font-normal text-gray-400">bookings today</span>
      </div>
    </WidgetShell>
  )
}

// 2 — Booking system → the nav "Reserve" button: calendar + time + confirm.
export function BookingWidget({ active }) {
  const reduce = useReducedMotion()
  const loop = active && !reduce
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <WidgetShell icon={Calendar} label="Booking system">
      <div className="grid grid-cols-7 gap-[3px]">
        {days.map((d, i) => (
          <div key={`d${i}`} className="text-center text-[7px] text-gray-500">
            {d}
          </div>
        ))}
        {Array.from({ length: 7 }).map((_, i) => {
          const hot = i === 4
          return (
            <motion.div
              key={`n${i}`}
              className={`flex h-4 items-center justify-center rounded-[3px] text-[8px] ${
                hot ? 'bg-accent font-bold text-white' : 'bg-white/5 text-gray-400'
              }`}
              animate={loop && hot ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: loop ? Infinity : 0, repeatDelay: 0.7 }}
            >
              {18 + i}
            </motion.div>
          )
        })}
      </div>
      <div className="mt-1.5 flex items-center gap-1">
        <span className="rounded-[4px] bg-primary/15 px-1.5 py-0.5 text-[8px] font-semibold text-primary">
          7:30 PM
        </span>
        <motion.span
          className="flex-1 rounded-[4px] bg-accent py-0.5 text-center text-[8px] font-bold text-white"
          animate={loop ? { opacity: [0.85, 1, 0.85] } : { opacity: 1 }}
          transition={{ duration: 1.4, repeat: loop ? Infinity : 0 }}
        >
          Confirm
        </motion.span>
      </div>
    </WidgetShell>
  )
}

// 3 — Secure payments → the hero CTA: a Stripe-style deposit card.
export function PaymentsWidget({ active }) {
  const reduce = useReducedMotion()
  const loop = active && !reduce
  return (
    <WidgetShell icon={CreditCard} label="Secure payments">
      <div className="flex items-center justify-between rounded-[5px] bg-white/5 px-2 py-1">
        <span className="flex items-center gap-1 text-[8px] text-gray-200">
          <Lock size={8} /> •••• 4242
        </span>
        <span className="text-[8px] text-gray-500">12/27</span>
      </div>
      <motion.div
        className="mt-1.5 flex items-center justify-center gap-1 rounded-[5px] bg-accent py-1 text-[9px] font-bold text-white"
        animate={loop ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 1.3, repeat: loop ? Infinity : 0 }}
      >
        {active ? (
          <>
            <Check size={9} strokeWidth={3} /> Deposit paid · $25
          </>
        ) : (
          'Pay deposit · $25'
        )}
      </motion.div>
    </WidgetShell>
  )
}

// 4 — AI concierge → bottom-right: a chat that types its reply.
export function ConciergeWidget({ active }) {
  return (
    <WidgetShell icon={MessageSquare} label="AI concierge">
      <div className="space-y-1">
        <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-white/10 px-2 py-1 text-[8px] leading-tight text-gray-200">
          Table for two tonight?
        </div>
        <motion.div
          className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-accent px-2 py-1 text-[8px] leading-tight text-white"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4, delay: active ? 0.35 : 0 }}
        >
          Booked for 7:30 ✓
        </motion.div>
      </div>
    </WidgetShell>
  )
}

// 5 — Instant notifications → footer: a reservation toast springs in.
export function NotificationsWidget({ active }) {
  return (
    <WidgetShell icon={Bell} label="Instant notifications">
      <motion.div
        className="flex items-center gap-1.5 rounded-[5px] border border-primary/20 bg-white/5 px-2 py-1.5"
        initial={false}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Bell size={9} />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[8px] font-semibold text-white">New reservation</div>
          <div className="text-[7px] text-gray-400">Table 7 · 7:30 PM</div>
        </div>
      </motion.div>
    </WidgetShell>
  )
}

// 6 — Online ordering → the first dish card: add to order + cart ticks up.
export function OrderingWidget({ active }) {
  const reduce = useReducedMotion()
  return (
    <WidgetShell icon={ShoppingBag} label="Online ordering">
      <div className="flex items-center gap-1.5">
        <div className="h-7 w-7 shrink-0 overflow-hidden rounded-[4px]">
          <img src={`${BASE}mockup/room-1.jpg`} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[8px] font-medium text-gray-100">Seared Scallops</div>
          <div className="text-[7px] text-[#c8a97e]">$32</div>
        </div>
        <div className="relative">
          <span className="flex items-center gap-0.5 rounded-[4px] bg-accent px-1.5 py-1 text-[8px] font-bold text-white">
            <Plus size={9} strokeWidth={3} /> Add
          </span>
          <motion.span
            key={active ? 'on' : 'off'}
            className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-dark"
            initial={reduce ? false : { scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          >
            {active ? 2 : 1}
          </motion.span>
        </div>
      </div>
    </WidgetShell>
  )
}

export const WIDGETS = {
  analytics: AnalyticsWidget,
  booking: BookingWidget,
  payments: PaymentsWidget,
  concierge: ConciergeWidget,
  notify: NotificationsWidget,
  ordering: OrderingWidget,
}

// ── Reduced-motion / no-pointer fallback: the beautiful site with every
//    capability shown statically and labeled, pinned at its anchor. ─────────
export function StaticLensReveal() {
  return (
    <div className="relative h-[560px] overflow-hidden rounded-2xl border border-dark-border bg-dark-card/30 sm:h-[600px]">
      <MaisonSite />
      {/* activated scanner tint over the whole site */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(15,49,184,0.16), transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />
      {ANCHORS.map((a) => {
        const W = WIDGETS[a.id]
        return (
          <div
            key={a.id}
            className="absolute"
            style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%`, transform: 'translate(-50%, -50%)' }}
          >
            <W active />
          </div>
        )
      })}
    </div>
  )
}
