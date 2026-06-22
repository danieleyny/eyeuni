// Site-wide depth: a very low-opacity film-grain texture + soft vignette.
// Fixed, pointer-events-none, GPU-cheap (a static SVG noise data-URI + radial
// gradient). Must not affect contrast or interaction.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export default function DepthOverlay({ theme = 'dark' }) {
  // The dark grain + vignette is wrong on a bright Stripe/Apple-grade page — the
  // light site stays clean (no overlay).
  if (theme === 'light') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden>
      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '160px 160px' }}
      />
      {/* soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.28) 100%)',
        }}
      />
    </div>
  )
}
