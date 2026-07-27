import { useEffect, useRef, useState } from 'react'
import { clamp } from '../../lib/animation'
import { Z } from '../../lib/zIndex'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'
import { ROCKET_WAYPOINTS } from '../../data/rocket'

interface Props {
  tl: Timeline
  progress: MotionValue<number>
  subscribe: (cb: () => void) => () => void
}

function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t
  const t3 = t2 * t
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  )
}

function interpolateRocket(progress: number, vw: number, vh: number) {
  const wp = ROCKET_WAYPOINTS
  if (wp.length < 2) return { x: 0, y: 0, heading: 0 }

  const maxIdx = wp.length - 1
  const p = Math.max(0, Math.min(1, progress))

  const floatIdx = p * maxIdx
  const i1 = Math.floor(floatIdx)
  const t = floatIdx - i1

  const i0 = Math.max(0, i1 - 1)
  const i2 = Math.min(maxIdx, i1 + 1)
  const i3 = Math.min(maxIdx, i1 + 2)

  const x = catmullRom(wp[i0].x, wp[i1].x, wp[i2].x, wp[i3].x, t) * vw
  const y = catmullRom(wp[i0].y, wp[i1].y, wp[i2].y, wp[i3].y, t) * vh

  const pAhead = Math.min(1, p + 0.005)
  const floatIdxAhead = pAhead * maxIdx
  const i1A = Math.floor(floatIdxAhead)
  const tA = floatIdxAhead - i1A

  const i0A = Math.max(0, i1A - 1)
  const i2A = Math.min(maxIdx, i1A + 1)
  const i3A = Math.min(maxIdx, i1A + 2)

  const nextX = catmullRom(wp[i0A].x, wp[i1A].x, wp[i2A].x, wp[i3A].x, tA) * vw
  const nextY = catmullRom(wp[i0A].y, wp[i1A].y, wp[i2A].y, wp[i3A].y, tA) * vh

  const dx = nextX - x || 0.001
  const dy = nextY - y || 0.001

  const heading = Math.atan2(dy, dx) * (180 / Math.PI) + 90

  return { x, y, heading }
}

function flamePath(base: string, scale: number): string {
  const m = base.match(/M([\d.-]+),([\d.-]+)\s*C([\d.-]+),([\d.-]+)\s+([\d.-]+),([\d.-]+)\s+([\d.-]+),([\d.-]+)/)
  if (!m) return base
  const bx = parseFloat(m[1])
  const by = parseFloat(m[2])
  const s = (x: number, y: number) => `${bx + (x - bx) * scale},${by + (y - by) * scale}`
  return `M${m[1]},${m[2]} C${s(parseFloat(m[3]), parseFloat(m[4]))} ${s(parseFloat(m[5]), parseFloat(m[6]))} ${s(parseFloat(m[7]), parseFloat(m[8]))}`
}

function flameTipPath(base: string, scale: number): string {
  const m = base.match(/M([\d.-]+),([\d.-]+)\s*L([\d.-]+),([\d.-]+)\s*L([\d.-]+),([\d.-]+)/)
  if (!m) return base
  const bx = parseFloat(m[1])
  const by = parseFloat(m[2])
  const s = (x: number, y: number) => `${bx + (x - bx) * scale},${by + (y - by) * scale}`
  return `M${m[1]},${m[2]} L${s(parseFloat(m[3]), parseFloat(m[4]))} L${s(parseFloat(m[5]), parseFloat(m[6]))}`
}

const FLAME_OUTER = 'M-8,55 C-4,72 4,72 8,55'
const FLAME_INNER = 'M-5,55 C-2,68 2,68 5,55'
const FLAME_TIP = 'M-2,55 L0,68 L2,55'

export function RocketOverlay({ tl, progress, subscribe }: Props) {
  const reduced = useReducedMotion()
  const [, setTick] = useState(0)
  const flameRef = useRef(1)

  useEffect(() => {
    const unsub = subscribe(() => setTick((t) => t + 1))
    return unsub
  }, [subscribe])

  const t = tl
  const p = progress.get()
  const rocket = interpolateRocket(p, t.vw, t.vh)
  const camX = rocket.x + t.parallax[5].x + t.camera.x + t.camera.shakeX
  const camY = rocket.y + t.parallax[5].y + t.camera.y + t.camera.shakeY

  const opacity = 1

  if (!reduced) {
    flameRef.current = 1 + Math.sin(t.elapsed / 90) * 0.12
  }

  const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)

  const isParked = p < 0.005
  const isLanded = p > 0.985
  const engineGlow = (isParked || isLanded) ? 0 : 0.5 + speedFactor * 0.5
  const flameScale = (isParked || isLanded) ? 0 : flameRef.current

  const now = t.elapsed

  const ws = t.isWarping ? t.warpStrength : 0
  const flashOpacity = Math.pow(ws, 4)
  const rocketStretch = 1 + ws * 10

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh', zIndex: Z.rocket }}
      >
        {t.trailParticles.map((p) => {
          const age = clamp((now - p.born) / 800, 0, 1)
          const fade = 1 - age * age
          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r * (1 - age * 0.6)}
              fill={p.color}
              opacity={p.opacity * fade * opacity}
            />
          )
        })}
      </svg>

      <div
        className="pointer-events-none fixed"
        aria-hidden="true"
        style={{
          width: 100,
          height: 100,
          transform: `translate(${camX - 50}px, ${camY - 50}px) rotate(${rocket.heading}deg) scale(${t.camera.zoom}) scaleY(${rocketStretch})`,
          opacity,
          willChange: 'transform',
          zIndex: Z.rocket,
        }}
      >
        <svg viewBox="-50 -80 100 160" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="rocketBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF5EA" />
              <stop offset="100%" stopColor="#C9BFA8" />
            </linearGradient>
            <radialGradient id="rocketWindow" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#B8E8E5" />
              <stop offset="100%" stopColor="#5AACAA" />
            </radialGradient>
            <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2B84B" />
              <stop offset="60%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF7A59" stopOpacity={0.6 * engineGlow} />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="engineGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#F2B84B" stopOpacity={engineGlow * 0.3} />
              <stop offset="100%" stopColor="#F2B84B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g>
            <ellipse cx="0" cy="68" rx={14 + speedFactor * 4} ry={3 + speedFactor * 1.5} fill="rgba(11,14,31,0.25)" opacity={clamp(t.camera.depth * 2, 0, 0.35)} />
            <circle cx="0" cy="60" r={20 + speedFactor * 15} fill="url(#engineGlow)" />

            <path
              d="M0,-65 C20,-48 22,-15 22,10 C22,30 12,48 0,55 C-12,48 -22,30 -22,10 C-22,-15 -20,-48 0,-65 Z"
              fill="url(#rocketBody)"
              stroke="#E8DFC8"
              strokeWidth="1.2"
            />
            <path
              d="M0,-65 C10,-50 14,-20 14,5 L0,55 L-14,5 C-14,-20 -10,-50 0,-65 Z"
              fill="#FBF5EA"
              opacity="0.3"
            />
            <circle cx="0" cy="-18" r="10" fill="url(#rocketWindow)" stroke="#FBF5EA" strokeWidth="1.5" />
            <ellipse cx="0" cy="-21" rx="4" ry="3" fill="#FBF5EA" opacity="0.4" />

            <path d="M-22,18 L-38,40 L-22,32 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M22,18 L38,40 L22,32 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M-22,18 L-32,38" stroke="#FBF5EA" strokeWidth="1" opacity="0.5" />
            <path d="M22,18 L32,38" stroke="#FBF5EA" strokeWidth="1" opacity="0.5" />

            <path d={flamePath(FLAME_OUTER, flameScale * (1 + speedFactor * 0.3))} fill="url(#flameOuter)" opacity={engineGlow} />
            <path d={flamePath(FLAME_INNER, flameScale)} fill="url(#flameInner)" opacity={0.9 * engineGlow} />
            <path d={flameTipPath(FLAME_TIP, flameScale * (1 + speedFactor * 0.2))} fill="#FBF5EA" opacity={0.7 * engineGlow} />
          </g>
        </svg>
      </div>

      {t.isWarping && (
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center" style={{ zIndex: Z.rocket + 10 }}>
          <div className="absolute left-[35%] h-[200vh] w-px bg-teal/60" style={{ transform: `scaleY(${ws * 5})`, opacity: ws }} />
          <div className="absolute right-[35%] h-[200vh] w-[2px] bg-gold/60" style={{ transform: `scaleY(${ws * 8})`, opacity: ws }} />
          <div className="absolute inset-0 bg-paper transition-opacity" style={{ opacity: flashOpacity }} />
        </div>
      )}
    </>
  )
}
