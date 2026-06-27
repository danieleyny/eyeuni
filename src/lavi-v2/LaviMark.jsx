/* Minimal abstract sun / aperture mark — blue ring, yellow core, geometric
   rays in currentColor (ink on light, light on dark). Static, no spin.
   Taken from lavi_v2_redesign_mockup.html. */
export function LaviMark({ className = '', ring = 'var(--color-blue)' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="30" stroke={ring} strokeWidth="6" />
      <circle cx="50" cy="50" r="9" fill="#ffd400" />
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="50" y1="6" x2="50" y2="18" />
        <line x1="50" y1="82" x2="50" y2="94" />
        <line x1="6" y1="50" x2="18" y2="50" />
        <line x1="82" y1="50" x2="94" y2="50" />
        <line x1="19" y1="19" x2="27" y2="27" />
        <line x1="73" y1="73" x2="81" y2="81" />
        <line x1="81" y1="19" x2="73" y2="27" />
        <line x1="27" y1="73" x2="19" y2="81" />
      </g>
    </svg>
  )
}

/* LAVI / ENERGY lockup. Pass Hebrew text in RTL (לביא / אנרגיה). */
export function Wordmark({ main, sub, className = '' }) {
  return (
    <span className={`wordmark ${className}`}>
      {main}
      <small>{sub}</small>
    </span>
  )
}
