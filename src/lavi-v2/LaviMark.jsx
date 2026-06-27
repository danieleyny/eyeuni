/* Minimal digital glyph of Lavi's tracked cleaning robot — rounded body with
   two splayed brush arms (blue), eyes, a yellow sensor light and tracks.
   Body uses currentColor so it reads as ink on light and light on dark. */
export function LaviMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      {/* splayed brush arms */}
      <g fill="#0a2bff">
        <rect x="0" y="60" width="36" height="11" rx="5.5" transform="rotate(20 18 65)" />
        <rect x="64" y="60" width="36" height="11" rx="5.5" transform="rotate(-20 82 65)" />
      </g>
      {/* tracks */}
      <rect x="30" y="66" width="13" height="16" rx="4" fill="currentColor" />
      <rect x="57" y="66" width="13" height="16" rx="4" fill="currentColor" />
      {/* body */}
      <rect x="26" y="30" width="48" height="40" rx="13" fill="currentColor" />
      {/* eyes */}
      <circle cx="40" cy="47" r="5.2" fill="#0a2bff" />
      <circle cx="60" cy="47" r="5.2" fill="#0a2bff" />
      {/* sensor visor */}
      <rect x="37" y="58" width="26" height="5" rx="2.5" fill="#0a2bff" opacity="0.55" />
      {/* antenna + yellow sensor light */}
      <line x1="50" y1="30" x2="50" y2="17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="13" r="6.2" fill="#ffd400" />
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
