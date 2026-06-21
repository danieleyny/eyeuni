import { useEffect, useRef, useState } from 'react'
import { Renderer, Program, Mesh, Triangle, Vec2, Vec3 } from 'ogl'
import { DPR_CAP_MOBILE, BRAND, hexToRgb01 } from '../motion/constants'
import { useInViewPaused } from '../../hooks/useInViewPaused'
import { useRafLoop } from '../../hooks/useRafLoop'

// Lazy-loaded WebGL aurora. Drifting fbm ribbons in brand blues over near-black
// with a faint flow grid; the light bends toward pointer/gyro (uPointer).
// Renders into a canvas layered over AuroraFallback, fading in once ready.

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;   // [-1,1]
uniform vec3 uColorA;    // accent
uniform vec3 uColorB;    // primary
uniform vec3 uColorBg;   // dark
uniform float uGridStrength;
uniform float uIntensity;

// hash / value noise -> fbm
float hash(vec2 p){ p = fract(p*vec2(123.34,345.45)); p += dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i); float b = hash(i+vec2(1.0,0.0));
  float c = hash(i+vec2(0.0,1.0)); float d = hash(i+vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0; float amp = 0.5;
  for(int i=0;i<5;i++){ v += amp*noise(p); p *= 2.0; amp *= 0.5; }
  return v;
}

void main(){
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv; p.x *= aspect;

  // pointer/gyro shifts the noise domain -> light bends toward finger.
  vec2 shift = uPointer * 0.25;
  float t = uTime * 0.04;

  // domain-warped fbm ribbons
  vec2 q = vec2(fbm(p*1.5 + shift + t), fbm(p*1.5 - shift - t));
  float n = fbm(p*2.0 + q*1.8 + vec2(0.0, t*1.5));

  // aurora bands — additive glow over near-black (kept dark for text contrast)
  float band = smoothstep(0.35, 0.95, n);
  float ribbon = pow(band, 1.8);

  vec3 col = uColorBg;
  col += uColorA * ribbon * 0.6;                       // deep accent ribbons
  col += uColorB * smoothstep(0.78, 1.0, n) * 0.22;    // subtle primary highlights

  // faint flow grid
  vec2 g = fract((uv + shift*0.1) * vec2(26.0*aspect, 26.0)) - 0.5;
  float grid = smoothstep(0.46, 0.5, max(abs(g.x), abs(g.y)));
  col += uColorB * grid * uGridStrength;

  // keep the upper/center (headline zone) darker for AA contrast
  col *= mix(1.0, 0.5, smoothstep(0.45, 1.0, uv.y));

  // edge vignette so the page frame stays dark
  float vig = smoothstep(1.3, 0.35, length((uv - vec2(0.5, 0.5)) * vec2(aspect, 1.0)));
  col *= mix(0.65, 1.0, vig);

  col = mix(uColorBg, col, uIntensity);
  gl_FragColor = vec4(col, 1.0);
}
`

export default function AuroraBackground({ pointer }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const timeRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const inView = useInViewPaused(canvasRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer, program, mesh, gl
    try {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP_MOBILE)
      renderer = new Renderer({
        canvas,
        dpr,
        alpha: false,
        antialias: false,
      })
      gl = renderer.gl
      if (!gl) throw new Error('no webgl')

      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2(1, 1) },
          uPointer: { value: new Vec2(0, 0) },
          uColorA: { value: new Vec3(...hexToRgb01(BRAND.accent)) },
          uColorB: { value: new Vec3(...hexToRgb01(BRAND.primary)) },
          uColorBg: { value: new Vec3(...hexToRgb01(BRAND.dark)) },
          uGridStrength: { value: 0.05 },
          uIntensity: { value: 0.95 },
        },
      })
      mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

      const resize = () => {
        // Measure the PARENT (full-bleed hero), not the canvas — ogl.setSize
        // writes inline px styles onto the canvas, which would otherwise feed
        // back and shrink it into a small box. Force the style back to 100%.
        const parent = canvas.parentElement
        const w = (parent && parent.clientWidth) || window.innerWidth
        const h = (parent && parent.clientHeight) || window.innerHeight
        renderer.setSize(w, h)
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        program.uniforms.uResolution.value.set(
          gl.drawingBufferWidth,
          gl.drawingBufferHeight
        )
        // Paint a frame immediately — resizing clears the buffer, and the rAF
        // loop may be paused (offscreen/throttled), so never leave it empty.
        renderer.render({ scene: mesh })
      }
      resize()
      window.addEventListener('resize', resize)
      // ResizeObserver fires on initial layout (and any later size change), so
      // the canvas is sized correctly even if mounted before layout settles.
      const ro =
        typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
      if (ro && canvas.parentElement) ro.observe(canvas.parentElement)

      stateRef.current = { renderer, program, mesh, gl, resize }
      setReady(true)

      return () => {
        window.removeEventListener('resize', resize)
        ro?.disconnect()
        const ext = gl.getExtension('WEBGL_lose_context')
        ext?.loseContext()
        stateRef.current = null
      }
    } catch {
      setFailed(true)
      return undefined
    }
  }, [])

  // Smoothly track pointer/gyro into the uniform.
  const targetRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    if (!pointer) return
    const unsubX = pointer.tiltX.on('change', (v) => {
      targetRef.current.x = v / 8
    })
    const unsubY = pointer.tiltY.on('change', (v) => {
      targetRef.current.y = v / 8
    })
    return () => {
      unsubX()
      unsubY()
    }
  }, [pointer])

  useRafLoop(
    (dt) => {
      const s = stateRef.current
      if (!s) return
      timeRef.current += dt
      s.program.uniforms.uTime.value = timeRef.current
      const cur = s.program.uniforms.uPointer.value
      cur.x += (targetRef.current.x - cur.x) * 0.06
      cur.y += (-targetRef.current.y - cur.y) * 0.06
      s.renderer.render({ scene: s.mesh })
    },
    { active: ready && inView && !failed }
  )

  if (failed) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
    />
  )
}
