import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'
import { Z } from '../../lib/zIndex'

function nebulaColorsAt(p: number): { c1: string; c2: string } {
  for (let k = 0; k < NEBULA_STOPS.length - 1; k++) {
    const s0 = NEBULA_STOPS[k]
    const s1 = NEBULA_STOPS[k + 1]
    if (p >= s0.p && p <= s1.p) {
      const t = (p - s0.p) / (s1.p - s0.p)
      return { c1: lerpColor(s0.c1, s1.c1, t), c2: lerpColor(s0.c2, s1.c2, t) }
    }
  }
  return { c1: NEBULA_STOPS[0].c1, c2: NEBULA_STOPS[0].c2 }
}

interface Props {
  progress: MotionValue<number>
}

export function NebulaOverlay({ progress }: Props) {
  const [bg, setBg] = useState(() => {
    const { c1, c2 } = nebulaColorsAt(0)
    return buildGradient(c1, c2)
  })

  useMotionValueEvent(progress, 'change', (p) => {
    const { c1, c2 } = nebulaColorsAt(p)
    setBg(buildGradient(c1, c2))
  })

  return (
    <div className="pointer-events-none absolute -inset-[8%]" style={{ zIndex: Z.overlays }} aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: bg }}
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

function buildGradient(c1: string, c2: string): string {
  return [
    `radial-gradient(ellipse 90% 70% at 25% 25%, ${c2}22, transparent 55%)`,
    `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
  ].join(', ')
}
