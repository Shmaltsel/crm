import { useEffect, useRef, useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
  progress: MotionValue<number>
}

interface NebulaState {
  gradient: string
  hueShift: number
}

function computeNebula(accentR: number, accentG: number, accentB: number, progress: number): NebulaState {
  const hueShift = progress * 30
  const c1 = `rgb(${Math.round(accentR * 255)}, ${Math.round(accentG * 255)}, ${Math.round(accentB * 255)})`
  for (let k = 0; k < NEBULA_STOPS.length - 1; k++) {
    const s0 = NEBULA_STOPS[k]
    const s1 = NEBULA_STOPS[k + 1]
    if (progress >= s0.p && progress <= s1.p) {
      const t = (progress - s0.p) / (s1.p - s0.p)
      const c3 = lerpColor(s0.c2, s1.c2, t)
      return {
        gradient: [
          `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
          `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
        ].join(', '),
        hueShift,
      }
    }
  }
  const c3 = NEBULA_STOPS[0].c2
  return {
    gradient: [
      `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
      `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
    ].join(', '),
    hueShift,
  }
}

const INITIAL = computeNebula(0.227, 0.118, 0.388, 0)

export function NebulaOverlay({ tl, subscribe, progress }: Props) {
  const stateRef = useRef<NebulaState>(INITIAL)
  const [gradient, setGradient] = useState(INITIAL.gradient)
  const [hueShift, setHueShift] = useState(INITIAL.hueShift)

  useEffect(() => {
    const next = computeNebula(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, progress.get())
    stateRef.current = next
    setGradient(next.gradient)
    setHueShift(next.hueShift)

    const unsub = subscribe(() => {
      const g = computeNebula(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, progress.get())
      if (g.gradient !== stateRef.current.gradient || g.hueShift !== stateRef.current.hueShift) {
        stateRef.current = g
        setGradient(g.gradient)
        setHueShift(g.hueShift)
      }
    })
    return unsub
  }, [tl, subscribe, progress])

  return (
    <div className="pointer-events-none absolute -inset-[8%]" style={{ zIndex: Z.overlays }} aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: gradient, filter: `hue-rotate(${hueShift}deg)` }}
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
