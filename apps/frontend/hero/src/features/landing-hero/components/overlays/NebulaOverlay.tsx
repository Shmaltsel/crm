import { useEffect, useRef, useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
}

function buildGradient(accentR: number, accentG: number, accentB: number, progress: number): string {
  const hueShift = progress * 30
  const c1 = `rgb(${Math.round(accentR * 255)}, ${Math.round(accentG * 255)}, ${Math.round(accentB * 255)})`
  for (let k = 0; k < NEBULA_STOPS.length - 1; k++) {
    const s0 = NEBULA_STOPS[k]
    const s1 = NEBULA_STOPS[k + 1]
    if (progress >= s0.p && progress <= s1.p) {
      const t = (progress - s0.p) / (s1.p - s0.p)
      const c2 = lerpColor(s0.c1, s1.c1, t)
      const c3 = lerpColor(s0.c2, s1.c2, t)
      return [
        `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
        `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
      ].join(', ')
    }
  }
  const c2 = NEBULA_STOPS[0].c1
  const c3 = NEBULA_STOPS[0].c2
  return [
    `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
    `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
  ].join(', ')
}

export function NebulaOverlay({ tl, subscribe }: Props) {
  const bgRef = useRef('')
  const [, setTick] = useState(0)

  useEffect(() => {
    bgRef.current = buildGradient(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, tl.progress)
    const unsub = subscribe(() => {
      const g = buildGradient(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, tl.progress)
      if (g !== bgRef.current) {
        bgRef.current = g
        setTick((t) => t + 1)
      }
    })
    return unsub
  }, [tl, subscribe])

  return (
    <div className="pointer-events-none absolute -inset-[8%]" style={{ zIndex: Z.overlays }} aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: bgRef.current }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(255,122,89,0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
