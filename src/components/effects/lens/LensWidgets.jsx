import { motion, useReducedMotion } from 'framer-motion'
import {
  Calendar,
  MessageSquare,
  CreditCard,
  TrendingUp,
  ShoppingBag,
  Bell,
  Check,
} from 'lucide-react'

// ============================================================================
// Capability widgets for "The EYEuni Lens".
// Each is a compact, real-looking UI card with a glowing label. An `active`
// prop (driven by the lens proximity) triggers its micro-animation. They're
// reused both inside the masked panel (absolutely positioned) and in the
// reduced-motion StaticLensGrid (all lit), so they're purely presentational.
// ============================================================================

// Shared shell: glowing capability label + a dark glassy card.
function WidgetShell({ icon: Icon, label, children }) {
  return (
    <div className="w-[148px] sm:w-[160px]">
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-primary/20 text-primary">
          <Icon size={11} strokeWidth={2.5} />
        </span>
        <span className="text-xs font-semibold tracking-wide text-primary drop-shadow-[0_0_8px_rgba(179,200,244,0.7)]">
          {label}
        </span>
      </div>
      <div className="rounded-lg border border-primary/25 bg-dark/85 p-2 shadow-[0_0_26px_rgba(15,49,184,0.4)] backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}

// 1 — Booking: a week strip with one date highlighted + a Book now button.
export function BookingWidget({ active }) {
  const reduce = useReducedMotion()
  const loop = active && !reduce
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return (
    <WidgetShell icon={Calendar} label="Booking">
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
              {12 + i}
            </motion.div>
          )
        })}
      </div>
      <motion.div
        className="mt-1.5 rounded-[5px] bg-accent py-1 text-center text-[9px] font-bold text-white"
        animate={
          loop
            ? { boxShadow: ['0 0 0 rgba(15,49,184,0)', '0 0 14px rgba(15,49,184,0.85)', '0 0 0 rgba(15,49,184,0)'] }
            : {}
        }
        transition={{ duration: 1.5, repeat: loop ? Infinity : 0 }}
      >
        Book now
      </motion.div>
    </WidgetShell>
  )
}

// 2 — AI assistant: an incoming question; the reply types in when active.
export function ChatWidget({ active }) {
  return (
    <WidgetShell icon={MessageSquare} label="AI Assistant">
      <div className="space-y-1">
        <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-white/10 px-2 py-1 text-[8px] leading-tight text-gray-200">
          Need a table for 2?
        </div>
        <motion.div
          className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-accent px-2 py-1 text-[8px] leading-tight text-white"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4, delay: active ? 0.35 : 0 }}
        >
          Tonight at 7 ✓
        </motion.div>
      </div>
    </WidgetShell>
  )
}

// 3 — Payments: a saved card row + a Stripe-style pay button → Paid on active.
export function PaymentsWidget({ active }) {
  const reduce = useReducedMotion()
  const loop = active && !reduce
  return (
    <WidgetShell icon={CreditCard} label="Payments">
      <div className="flex items-center justify-between rounded-[5px] bg-white/5 px-2 py-1">
        <span className="text-[8px] text-gray-300">•••• 4242</span>
        <span className="text-[8px] text-gray-500">12/27</span>
      </div>
      <motion.div
        className="mt-1.5 flex items-center justify-center gap-1 rounded-[5px] bg-accent py-1 text-[9px] font-bold text-white"
        animate={loop ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1.3, repeat: loop ? Infinity : 0 }}
      >
        {active ? (
          <>
            <Check size={9} strokeWidth={3} /> Paid $48.00
          </>
        ) : (
          'Pay $48.00'
        )}
      </motion.div>
    </WidgetShell>
  )
}

// 4 — Live analytics: bars that draw upward when active + a delta readout.
export function AnalyticsWidget({ active }) {
  const bars = [0.4, 0.62, 0.5, 0.82, 0.7, 1]
  return (
    <WidgetShell icon={TrendingUp} label="Live Analytics">
      <div className="flex h-9 items-end justify-between gap-[3px]">
        {bars.map((b, i) => (
          <div key={i} className="relative h-full flex-1">
            <motion.div
              className="absolute bottom-0 w-full rounded-t-[2px] bg-gradient-to-t from-accent to-primary"
              initial={false}
              animate={{ height: active ? `${b * 100}%` : '8%' }}
              transition={{ duration: 0.5, delay: active ? i * 0.06 : 0, ease: 'easeOut' }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 text-[9px] font-bold text-primary">
        +24% <span className="font-normal text-gray-500">today</span>
      </div>
    </WidgetShell>
  )
}

// 5 — Storefront: a product list with live stock counts; rows slide in.
export function StoreWidget({ active }) {
  const items = [
    ['Linen Shirt', '12'],
    ['Suede Boots', '3'],
    ['Wool Scarf', '8'],
  ]
  return (
    <WidgetShell icon={ShoppingBag} label="Storefront">
      <div className="space-y-1">
        {items.map(([name, stock], i) => (
          <motion.div
            key={name}
            className="flex items-center gap-1.5"
            initial={false}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0.25, x: -6 }}
            transition={{ duration: 0.35, delay: active ? i * 0.08 : 0 }}
          >
            <span className="h-3 w-3 shrink-0 rounded-[3px] bg-gradient-to-br from-primary to-accent" />
            <span className="flex-1 truncate text-[8px] text-gray-200">{name}</span>
            <span className="text-[7px] text-gray-500">{stock} left</span>
          </motion.div>
        ))}
      </div>
    </WidgetShell>
  )
}

// 6 — Notifications: an order toast that springs in when active.
export function NotificationsWidget({ active }) {
  return (
    <WidgetShell icon={Bell} label="Notifications">
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
          <div className="truncate text-[8px] font-semibold text-white">New order #1043</div>
          <div className="text-[7px] text-gray-400">Just now · $48.00</div>
        </div>
      </motion.div>
    </WidgetShell>
  )
}

// Registry keyed by hotspot id.
export const WIDGETS = {
  booking: BookingWidget,
  chat: ChatWidget,
  pay: PaymentsWidget,
  analytics: AnalyticsWidget,
  store: StoreWidget,
  notify: NotificationsWidget,
}

// ============================================================================
// The dormant mock site (rendered twice: muted base + full-color live layer).
// Both variants share identical box layout so the clipped live layer overlays
// the base pixel-for-pixel.
// ============================================================================
export function MockSite({ live = false }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* nav */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-3.5 w-3.5 rounded-full ${
              live ? 'bg-gradient-to-br from-primary to-accent' : 'bg-gray-500'
            }`}
          />
          <span className={`text-[11px] font-bold ${live ? 'text-white' : 'text-gray-400'}`}>
            Maison
          </span>
        </div>
        <div className="hidden gap-3 text-[9px] text-gray-400 sm:flex">
          <span>Menu</span>
          <span>About</span>
          <span>Book</span>
        </div>
        <span
          className={`rounded-md px-2 py-1 text-[9px] font-semibold ${
            live ? 'bg-accent text-white' : 'bg-white/10 text-gray-400'
          }`}
        >
          Reserve
        </span>
      </div>

      {/* hero band */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* hero "image" fill — vivid when live, muted when dormant */}
        <div
          className="absolute inset-0"
          style={{
            background: live
              ? 'linear-gradient(135deg, rgba(15,49,184,0.45), rgba(179,200,244,0.18) 60%, transparent), radial-gradient(circle at 70% 20%, rgba(179,200,244,0.25), transparent 55%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          }}
        />
        <div className={`relative text-lg font-bold sm:text-xl ${live ? 'text-white' : 'text-gray-500'}`}>
          Fine dining, reimagined
        </div>
        <div className="relative mt-1 max-w-[230px] text-[10px] leading-snug text-gray-400">
          Seasonal plates & natural wine in the heart of the city.
        </div>
        <span
          className={`relative mt-3 rounded-lg px-3 py-1.5 text-[10px] font-bold ${
            live ? 'bg-primary text-dark' : 'bg-white/10 text-gray-400'
          }`}
        >
          Reserve a table
        </span>
      </div>

      {/* 3-card grid */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-white/5">
            <div
              className={`h-8 ${
                live
                  ? [
                      'bg-gradient-to-br from-primary/60 to-accent/60',
                      'bg-gradient-to-br from-accent/60 to-primary/40',
                      'bg-gradient-to-br from-primary/40 to-accent/50',
                    ][i]
                  : 'bg-white/10'
              }`}
            />
            <div className="p-1.5">
              <div className={`h-1.5 w-3/4 rounded ${live ? 'bg-primary/60' : 'bg-white/15'}`} />
              <div className="mt-1 h-1 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 text-[8px] text-gray-500">
        <span>© Maison</span>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// Reduced-motion / no-pointer fallback: all six capabilities lit in a grid.
// ============================================================================
const STATIC_ORDER = ['booking', 'chat', 'pay', 'analytics', 'store', 'notify']

export function StaticLensGrid() {
  return (
    <div className="grid grid-cols-2 place-items-center gap-5 rounded-2xl border border-dark-border bg-dark-card/30 p-6 sm:grid-cols-3">
      {STATIC_ORDER.map((id) => {
        const W = WIDGETS[id]
        return <W key={id} active />
      })}
    </div>
  )
}
