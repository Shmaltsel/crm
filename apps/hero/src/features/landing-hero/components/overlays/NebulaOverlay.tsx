import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'

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
    return `radial-gradient(circle at 30% 30%, ${c2}33, transparent 62%), radial-gradient(circle at 70% 72%, ${c1}, #0B0E1F 72%)`
  })

  useMotionValueEvent(progress, 'change', (p) => {
    const { c1, c2 } = nebulaColorsAt(p)
    setBg(`radial-gradient(circle at 30% 30%, ${c2}33, transparent 62%), radial-gradient(circle at 70% 72%, ${c1}, #0B0E1F 72%)`)
  })

  return (
    <div
      className="pointer-events-none absolute -inset-[12%] z-[1]"
      aria-hidden="true"
      style={{ background: bg, filter: 'blur(36px)' }}
    />
  )
}
