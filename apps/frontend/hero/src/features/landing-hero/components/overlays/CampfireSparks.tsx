import { useEffect, useRef, useState } from 'react'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
}

interface Spark {
  x: number
  y: number
  speed: number
  drift: number
  phase: number
  el: SVGCircleElement | null
}

export function CampfireSparks({ tl, subscribe }: Props) {
  const strengthRef = useRef(0)
  const sparksRef = useRef<Spark[]>([])
  const rafRef = useRef(0)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    return subscribe(() => {
      const s = tl.beatStrengths[10]
      strengthRef.current = s
      setOpacity(s)
    })
  }, [tl, subscribe])

  useEffect(() => {
    const tick = (now: number) => {
      if (strengthRef.current > 0.05) {
        sparksRef.current.forEach((spark) => {
          if (!spark.el) return
          spark.y -= spark.speed
          const xOffset = Math.sin(now * 0.002 + spark.phase) * spark.drift

          if (spark.y < -50) {
            spark.y = 900 + Math.random() * 100
            spark.x = 200 + Math.random() * 1200
          }

          spark.el.setAttribute('cx', String(spark.x + xOffset))
          spark.el.setAttribute('cy', String(spark.y))
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ opacity, zIndex: Z.overlays + 1 }}>
      {Array.from({ length: 25 }, (_, i) => {
        const isGold = Math.random() > 0.5
        return (
          <circle
            key={i}
            ref={(el) => {
              if (!sparksRef.current[i]) {
                sparksRef.current[i] = { x: 200 + Math.random() * 1200, y: 900 + Math.random() * 400, speed: 1 + Math.random() * 2.5, drift: 2 + Math.random() * 5, phase: Math.random() * Math.PI * 2, el }
              } else {
                sparksRef.current[i].el = el
              }
            }}
            r={Math.random() * 1.5 + 1}
            fill={isGold ? '#F2B84B' : '#FF7A59'}
            opacity={0.4 + Math.random() * 0.6}
          />
        )
      })}
    </svg>
  )
}
