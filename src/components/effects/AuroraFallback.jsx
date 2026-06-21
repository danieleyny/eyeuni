// Pure-CSS aurora: brand-blue radial glows over near-black + a faint grid.
// Paints on the first frame (not lazy) so the hero LCP text is never blocked,
// and there is zero layout shift. Also the reduced-motion hero background.
export default function AuroraFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-dark">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 30% 25%, rgba(15,49,184,0.45), transparent 70%),' +
            'radial-gradient(50% 45% at 75% 60%, rgba(179,200,244,0.18), transparent 70%),' +
            'radial-gradient(70% 60% at 50% 100%, rgba(15,49,184,0.25), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(179,200,244,0.8) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(179,200,244,0.8) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 40%, black 0%, transparent 75%)',
        }}
      />
      {/* Fade the bottom into the page for a seamless hand-off. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-dark" />
    </div>
  )
}
