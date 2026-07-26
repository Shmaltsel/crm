import { useMemo } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Star {
  cx: number
  cy: number
  r: number
  opacity: number
  duration: string
  delay: string
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    cx: Math.random() * 1600,
    cy: Math.random() * 620,
    r: Math.random() * 1.35 + 0.4,
    opacity: 0.25 + Math.random() * 0.55,
    duration: (2.4 + Math.random() * 3.2).toFixed(2),
    delay: (Math.random() * 4).toFixed(2),
  }))
}

export function StarField() {
  const reduced = useReducedMotion()
  const stars = useMemo(() => generateStars(95), [])

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g>
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#F2B84B"
            opacity={star.opacity}
            style={
              reduced
                ? undefined
                : {
                    animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                  }
            }
          />
        ))}
      </g>
    </svg>
  )
}
