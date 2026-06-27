/* Abstract "sunrise over panels" emblem — a rising sun on a horizon/panel line,
   no face or mascot. Adapts via currentColor (ink on light, light on dark) with
   a deep-blue core and one yellow ray as fixed accents. */
export function LaviMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      {/* radiating rays (rising sun) */}
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <line x1="50" y1="9" x2="50" y2="21" />
        <line x1="26" y1="19" x2="33" y2="29" />
        <line x1="74" y1="19" x2="67" y2="29" />
        <line x1="11" y1="41" x2="23" y2="45" />
        <line x1="89" y1="41" x2="77" y2="45" />
      </g>
      {/* yellow accent ray (top) */}
      <line x1="50" y1="9" x2="50" y2="21" stroke="#e0a400" strokeWidth="6" strokeLinecap="round" />
      {/* sun half-disc sitting on the horizon */}
      <path d="M31 60 A19 19 0 0 1 69 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* horizon line (panel surface) */}
      <line x1="17" y1="60" x2="83" y2="60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* solar-panel ticks below the horizon */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <line x1="32" y1="60" x2="29" y2="73" />
        <line x1="50" y1="60" x2="50" y2="75" />
        <line x1="68" y1="60" x2="71" y2="73" />
      </g>
      {/* deep-blue core dot in the sun */}
      <circle cx="50" cy="55" r="5.5" fill="#2a4ea0" />
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
