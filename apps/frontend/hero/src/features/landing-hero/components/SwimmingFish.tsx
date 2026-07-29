import { useState, useEffect, useRef } from 'react'

const SEGMENT_W = 60
const SEGMENT_H = 200
const SEGMENT_COUNT = 5
const CYCLE = 2
const FISH_SRC = '/materials/fish-sprite.png'
const BG_SRC = '/materials/firefly-generated.png'
const FISH_TOTAL_W = SEGMENT_W * SEGMENT_COUNT
const PERSPECTIVE = 800
const OVERLAP = 4

const LEMNISCATE_A = 80

const SHADOW_OFFSET_X = 8
const SHADOW_OFFSET_Y = 14
const SHADOW_BLUR = 6
const SHADOW_ALPHA = 0.4
const FISH_OFFSET_X = -40

const SEG_PEAK = [3, 10, 16, 42, 45] as const
const SEG_Z = [0, 0, 10, 30, 20] as const
const SEG_Z_NEG = [0, 0, -10, -23, -20] as const

interface LemniscateSample {
  t: number
  x: number
  y: number
  tanAngle: number
}

function buildLemniscateTable(count: number): LemniscateSample[] {
  const table: LemniscateSample[] = []
  for (let i = 0; i < count; i++) {
    const t = (i / count) * 2 * Math.PI
    const s = Math.sin(t)
    const c = Math.cos(t)
    const d = 1 + s * s
    const x = LEMNISCATE_A * c / d
    const y = LEMNISCATE_A * s * c / d

    const dx = -LEMNISCATE_A * s * (1 + s * s) - LEMNISCATE_A * c * 2 * s * c
    const dy = LEMNISCATE_A * (c * c - s * s) * d - LEMNISCATE_A * s * c * 2 * s * c
    const tanAngle = Math.atan2(dy, dx)

    table.push({ t, x, y, tanAngle })
  }
  return table
}

const LEMNISCATE_TABLE = buildLemniscateTable(128)

function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a
  if (diff > Math.PI) diff -= 2 * Math.PI
  if (diff < -Math.PI) diff += 2 * Math.PI
  return a + diff * t
}

function sampleLemniscate(tNorm: number): { x: number; y: number; tanAngle: number } {
  const fIndex = tNorm * LEMNISCATE_TABLE.length
  const i0 = Math.floor(fIndex) % LEMNISCATE_TABLE.length
  const i1 = (i0 + 1) % LEMNISCATE_TABLE.length
  const frac = fIndex - Math.floor(fIndex)
  const a = LEMNISCATE_TABLE[i0]
  const b = LEMNISCATE_TABLE[i1]
  return {
    x: -(a.x + (b.x - a.x) * frac),
    y: a.y + (b.y - a.y) * frac,
    tanAngle: lerpAngle(a.tanAngle, b.tanAngle, frac),
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getSegmentKeyframe(segIndex: number, tNorm: number) {
  const peak = SEG_PEAK[segIndex]
  const zPos = SEG_Z[segIndex]
  const zNeg = SEG_Z_NEG[segIndex]

  if (tNorm < 0.25) {
    const r = tNorm / 0.25
    return { angle: lerp(0, -peak, r), z: lerp(0, zPos, r) }
  } else if (tNorm < 0.5) {
    const r = (tNorm - 0.25) / 0.25
    return { angle: lerp(-peak, 0, r), z: lerp(zPos, 0, r) }
  } else if (tNorm < 0.75) {
    const r = (tNorm - 0.5) / 0.25
    return { angle: lerp(0, peak, r), z: lerp(0, zNeg, r) }
  } else {
    const r = (tNorm - 0.75) / 0.25
    return { angle: lerp(peak, 0, r), z: lerp(zNeg, 0, r) }
  }
}

function projectRightEdge(angleRad: number, z: number): number {
  const cosA = Math.cos(angleRad)
  const sinA = Math.sin(angleRad)
  const xRot = SEGMENT_W * cosA
  const zRot = -SEGMENT_W * sinA + z
  const denom = PERSPECTIVE - zRot
  const safeDenom = Math.abs(denom) < 1 ? (denom >= 0 ? 1 : -1) : denom
  return (xRot * PERSPECTIVE) / safeDenom
}

export function SwimmingFish({ className = '' }: { className?: string }) {
  const [swimming, setSwimming] = useState(false)
  const swimRef = useRef<HTMLDivElement>(null)
  const shadowSwimRef = useRef<HTMLDivElement>(null)
  const segRefs = useRef<(HTMLDivElement | null)[]>([])
  const shadowSegRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number>(0)
  const smoothScaleX = useRef(1)
  const curPos = useRef({ x: 0, y: 0, tilt: 0 })
  const returning = useRef(false)
  const blend = useRef(0)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const centerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (swimming) {
      returning.current = false
      blend.current = 0
    } else {
      returning.current = true
    }

    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000

      if (returning.current) {
        const ease = 0.06
        blend.current += (0 - blend.current) * ease
        curPos.current.x += (0 - curPos.current.x) * ease
        curPos.current.y += (0 - curPos.current.y) * ease
        curPos.current.tilt += (0 - curPos.current.tilt) * ease
        smoothScaleX.current += (1 - smoothScaleX.current) * ease
        centerPos.current.x += (0 - centerPos.current.x) * ease
        centerPos.current.y += (0 - centerPos.current.y) * ease

        const b = blend.current
        const bx = curPos.current.x * b
        const by = curPos.current.y * b
        const bt = curPos.current.tilt * b

        const tx = (bx + centerPos.current.x + FISH_OFFSET_X).toFixed(2)
        const ty = (by + centerPos.current.y).toFixed(2)
        const sx = smoothScaleX.current.toFixed(3)
        const rot = bt.toFixed(2)

        const fishTransform = `translate(${tx}px,${ty}px) scaleX(${sx}) rotate(${rot}deg)`
        if (swimRef.current) swimRef.current.style.transform = fishTransform
        if (shadowSwimRef.current) {
          shadowSwimRef.current.style.transform =
            `translate(${(bx + centerPos.current.x + FISH_OFFSET_X + SHADOW_OFFSET_X).toFixed(2)}px,${(by + centerPos.current.y + SHADOW_OFFSET_Y).toFixed(2)}px) scaleX(${sx}) rotate(${rot}deg)`
        }

        let hingeX = 0
        for (let i = 0; i < SEGMENT_COUNT; i++) {
          const el = segRefs.current[i]
          const sel = shadowSegRefs.current[i]
          const t = `translate3d(${hingeX}px, 0, 0px) rotateY(0deg)`
          if (el) el.style.transform = t
          if (sel) sel.style.transform = t
          hingeX += SEGMENT_W
        }

        const settled =
          Math.abs(bx) < 0.1 &&
          Math.abs(by) < 0.1 &&
          Math.abs(smoothScaleX.current - 1) < 0.005
        if (settled) {
          if (swimRef.current) swimRef.current.style.transform = `translate(${FISH_OFFSET_X}px,0px) scaleX(1) rotate(0deg)`
          if (shadowSwimRef.current) shadowSwimRef.current.style.transform = `translate(${FISH_OFFSET_X + SHADOW_OFFSET_X}px,${SHADOW_OFFSET_Y}px) scaleX(1) rotate(0deg)`
          return
        }

        rafRef.current = requestAnimationFrame(animate)
        return
      }

      if (!swimming) return

      blend.current += (1 - blend.current) * 0.04
      const b = blend.current

      const tNorm = (elapsed % CYCLE) / CYCLE

      const pos = sampleLemniscate(tNorm)
      curPos.current.x = pos.x * b
      curPos.current.y = pos.y * b

      centerPos.current.x += (mouseTarget.current.x - centerPos.current.x) * 0.08
      centerPos.current.y += (mouseTarget.current.y - centerPos.current.y) * 0.08

      const rawScaleX = Math.cos(pos.tanAngle) < 0 ? -1 : 1
      const lerpFactor = 0.08
      smoothScaleX.current += (rawScaleX - smoothScaleX.current) * lerpFactor
      if (Math.abs(smoothScaleX.current - rawScaleX) < 0.005) {
        smoothScaleX.current = rawScaleX
      }

      const tiltDeg = (pos.tanAngle * 180 / Math.PI) * 0.06
      const clampedTilt = Math.max(-5, Math.min(5, tiltDeg))
      curPos.current.tilt = clampedTilt * b

      const tx = (curPos.current.x + centerPos.current.x + FISH_OFFSET_X).toFixed(2)
      const ty = (curPos.current.y + centerPos.current.y).toFixed(2)
      const sx = smoothScaleX.current.toFixed(3)
      const rot = curPos.current.tilt.toFixed(2)

      if (swimRef.current) {
        swimRef.current.style.transform = `translate(${tx}px,${ty}px) scaleX(${sx}) rotate(${rot}deg)`
      }
      if (shadowSwimRef.current) {
        shadowSwimRef.current.style.transform =
          `translate(${(curPos.current.x + centerPos.current.x + FISH_OFFSET_X + SHADOW_OFFSET_X).toFixed(2)}px,${(curPos.current.y + centerPos.current.y + SHADOW_OFFSET_Y).toFixed(2)}px) scaleX(${sx}) rotate(${rot}deg)`
      }

      let cumAngleDeg = 0
      let hingeX = 0

      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const { angle, z } = getSegmentKeyframe(i, tNorm)
        cumAngleDeg += angle * b
        const cumAngleRad = (cumAngleDeg * Math.PI) / 180

        const el = segRefs.current[i]
        const sel = shadowSegRefs.current[i]
        const t = `translate3d(${hingeX}px, 0, ${(z * b).toFixed(1)}px) rotateY(${cumAngleDeg.toFixed(1)}deg)`
        if (el) el.style.transform = t
        if (sel) sel.style.transform = t

        hingeX += projectRightEdge(cumAngleRad, z * b)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [swimming])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    let dx = e.clientX - rect.left - cx
    let dy = e.clientY - rect.top - cy
    dx = Math.max(-150, Math.min(150, dx))
    dy = Math.max(-150, Math.min(150, dy))
    mouseTarget.current.x = dx
    mouseTarget.current.y = dy
  }

  function renderSegments(
    refs: (HTMLDivElement | null)[],
    isShadow: boolean,
  ) {
    return Array.from({ length: SEGMENT_COUNT }, (_, i) => (
      <div
        key={i}
        ref={el => { refs[i] = el }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${SEGMENT_W + OVERLAP}px`,
          height: `${SEGMENT_H}px`,
          backgroundImage: `url(${FISH_SRC})`,
          backgroundSize: `${FISH_TOTAL_W}px ${SEGMENT_H}px`,
          backgroundPosition: `${-i * SEGMENT_W}px 0px`,
          backgroundRepeat: 'no-repeat',
          transformOrigin: '0px 100px',
          transform: `translate3d(${i * SEGMENT_W}px, 0, 0) rotateY(0deg)`,
          willChange: 'transform',
          ...(isShadow ? {
            filter: `brightness(0) blur(${SHADOW_BLUR}px)`,
            opacity: swimming ? SHADOW_ALPHA : 0,
            transition: 'opacity 0.4s ease',
          } : {}),
        }}
      />
    ))
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ overflow: 'visible', marginLeft: -60 }}
      onMouseEnter={() => setSwimming(true)}
      onMouseLeave={() => setSwimming(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
        position: 'absolute',
        inset: '-20%',
        backgroundImage: `url(${BG_SRC})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div
        ref={shadowSwimRef}
        style={{
          position: 'absolute',
          width: `${FISH_TOTAL_W}px`,
          height: `${SEGMENT_H}px`,
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        {renderSegments(shadowSegRefs.current, true)}
      </div>
      <div
        ref={swimRef}
        style={{
          position: 'relative',
          width: `${FISH_TOTAL_W}px`,
          height: `${SEGMENT_H}px`,
          overflow: 'visible',
          zIndex: 2,
        }}
      >
        {renderSegments(segRefs.current, false)}
      </div>
    </div>
  )
}
