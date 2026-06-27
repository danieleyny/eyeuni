import { useEffect, useRef, useState } from 'react'

/* ============================================================
   Shared real-media layer for both Lavi sites.
   Optimized assets live in /public/media/ (served at /media/…),
   so both /lavi/ and /lavi-v2/ resolve the same files.
   Images: <name>.webp (+ <name>.jpg fallback).
   Videos: <name>.mp4 with a representative photo as poster.
   NOTE: ffmpeg was unavailable in the build env, so videos are the
   original client clips (not re-encoded) and posters point at real
   photos rather than extracted frames. Re-encode later if desired.
   ============================================================ */

export const IMG = {
  'field-arrival-atv': 'White and orange SolarClean F1 cleaning robot on its transport trailer at a dirt field edge, hills and blue sky behind',
  'array-panorama': 'Clean rows of solar panels under a deep blue sky',
  'array-with-robot': 'Solar panels with a cleaning robot on them under a clear sky',
  'utility-field-wide': 'Wide ground-mounted solar field on a dry hillside',
  'array-rows-hillside': 'Low-angle view of solar panel rows on a hillside',
  'array-field-dry': 'Solar panels on a dry field with hills in the background',
  'robot-action-valley': 'Blue and white Israeli-flag cleaning robot working on a solar array in a scenic Israeli valley',
  'robot-closeup-sky': 'Close-up of a cleaning robot on a solar panel against the sky',
  'robot-cleaning-wide': 'Israeli-flag livery robot cleaning a wide solar array in a valley',
  'robot-cleaning-lowangle': 'Blue cleaning robot on a solar panel, dramatic low angle',
  'array-dust-atmospheric': 'Hazy, dust-covered solar panels being serviced — visible soiling',
  'robot-on-array-angled': 'Cleaning robot on angled rows of solar panels',
  'robot-flag-hero': 'Blue and white Israeli-flag cleaning robot, dramatic close angle',
  'transport-atv-robot': 'ATV towing the cleaning robot on a dirt road',
  'robots-pair-ground': 'Two Israeli-flag cleaning robots on the ground',
  'robot-setup-ground': 'Technician setting up a cleaning robot on the ground',
  'cleanerrobot': 'Lavi Energy SolarClean F1 cleaning robot with Israeli-flag livery',
}

export const VID = {
  'showreel-clean-run-01': { poster: 'robot-action-valley', alt: 'Cleaning robot running across a solar array' },
  'showreel-clean-run-02': { poster: 'robot-cleaning-lowangle', alt: 'Second cleaning run across a solar field' },
  'robot-brush-closeup': { poster: 'robot-closeup-sky', alt: 'Close-up of the SolarClean F1 brushing a panel' },
  'field-team-operating': { poster: 'robot-cleaning-wide', alt: 'Worker operating alongside the cleaning robot' },
  'robot-vertical-mobile': { poster: 'robot-action-valley', alt: 'Vertical clip along a solar array' },
  'robot-run-trees': { poster: 'robot-on-array-angled', alt: 'Robot run with trees in the background' },
  'robot-array-wide': { poster: 'robot-on-array-angled', alt: 'Robot on a wide solar array' },
  'panels-reflection-scenic-clip': { poster: 'array-field-dry', alt: 'Reflective panels with hazy hills' },
  'array-pan-short': { poster: 'array-panorama', alt: 'Quick pan across a solar array' },
  'robot-quick-clip': { poster: 'robot-flag-hero', alt: 'Short clip of the cleaning robot' },
  'main': { poster: 'robot-on-array-angled', alt: 'Lavi Energy cleaning robot working across a solar array' },
}

export const mediaUrl = (name, ext) => `/media/${name}.${ext}`

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mq.matches)
    on()
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return reduce
}

/* Responsive picture: webp with jpg fallback. Lazy by default. */
export function Pic({ name, alt, className = '', imgClassName = '', eager = false, draggable = false }) {
  const a = alt ?? IMG[name] ?? ''
  return (
    <picture className={className}>
      <source srcSet={mediaUrl(name, 'webp')} type="image/webp" />
      <img
        src={mediaUrl(name, 'jpg')}
        alt={a}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={draggable}
        className={imgClassName}
      />
    </picture>
  )
}

/* Autoplay/muted/loop/playsinline video that:
   - paints its poster immediately (no preload of the clip),
   - only plays while in view (IntersectionObserver), pausing off-screen,
   - degrades to a static poster image under prefers-reduced-motion. */
export function Clip({ name, poster, className = '', videoClassName = '', objectPosition = 'center', eager = false }) {
  const meta = VID[name] || {}
  const posterName = poster || meta.poster || name
  const posterUrl = mediaUrl(posterName, 'jpg')
  const reduce = usePrefersReducedMotion()
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting)
        if (e.isIntersecting) el.play?.().catch(() => {})
        else el.pause?.()
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  if (reduce) {
    return (
      <picture className={className}>
        <source srcSet={mediaUrl(posterName, 'webp')} type="image/webp" />
        <img src={posterUrl} alt={meta.alt || ''} className={videoClassName} style={{ objectPosition }} />
      </picture>
    )
  }

  return (
    <video
      ref={ref}
      className={`${className} ${videoClassName}`.trim()}
      poster={posterUrl}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? 'metadata' : 'none'}
      aria-label={meta.alt || ''}
      style={{ objectPosition }}
      // keep paused state honest when IO toggles
      data-inview={inView ? '1' : '0'}
    >
      <source src={mediaUrl(name, 'mp4')} type="video/mp4" />
    </video>
  )
}
