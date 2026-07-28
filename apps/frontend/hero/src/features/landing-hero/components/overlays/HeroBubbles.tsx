import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Bubble {
  id: number
  size: number
  x: number
  startY: number
  drift: number
  duration: number
  delay: number
  opacity: number
}

function generateBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 10,
    x: 35 + Math.random() * 30,
    startY: 75 + Math.random() * 15,
    drift: (Math.random() - 0.5) * 20,
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 2,
    opacity: 0.15 + Math.random() * 0.35,
  }))
}

interface Props {
  active: boolean
}

export function HeroBubbles({ active }: Props) {
  const reduced = useReducedMotion()
  const bubbles = useMemo(() => generateBubbles(reduced ? 0 : 10), [reduced])

  if (!active || reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 20 }} aria-hidden="true">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{
            x: `${b.x}vw`,
            y: `${b.startY}vh`,
            scale: 0.3,
            opacity: 0,
          }}
          animate={{
            y: [`${b.startY}vh`, `${10 + Math.random() * 15}vh`],
            x: [`${b.x}vw`, `${b.x + b.drift}vw`],
            scale: [0.3, 1, 0.8],
            opacity: [0, b.opacity, b.opacity * 0.6, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: 'easeOut',
          }}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 35% 35%, rgba(143,227,224,${b.opacity + 0.2}), rgba(143,227,224,${b.opacity * 0.3}) 60%, transparent)`,
            boxShadow: `inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 ${b.size * 0.5}px rgba(143,227,224,${b.opacity * 0.4})`,
          }}
        />
      ))}
    </div>
  )
}
