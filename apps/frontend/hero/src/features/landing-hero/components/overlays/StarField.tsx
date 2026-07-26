import { useMemo, useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Star {
  cx: number
  cy: number
  r: number
  opacity: number
  color: string
  duration: string
  delay: string
}

interface ShootingStar {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  duration: number
}

const STAR_COLORS = ['#F2B84B', '#F2B84B', '#F2B84B', '#8FE3E0', '#FF7A59', '#FBF5EA']

function generateStars(count: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const tier = Math.random()
    stars.push({
      cx: Math.random() * 1600,
      cy: Math.random() * 900,
      r: tier < 0.15 ? 0.3 + Math.random() * 0.4 : tier < 0.7 ? 0.6 + Math.random() * 0.8 : 1.0 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.65,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      duration: (2.8 + Math.random() * 5).toFixed(2),
      delay: (Math.random() * 6).toFixed(2),
    })
  }
  return stars
}

function createShootingStar(id: number): ShootingStar {
  const angle = -0.3 + Math.random() * 0.4
  const len = 80 + Math.random() * 120
  const x1 = Math.random() * 1200 + 200
  const y1 = Math.random() * 400 + 50
  return {
    id,
    x1,
    y1,
    x2: x1 + Math.cos(angle) * len,
    y2: y1 + Math.sin(angle) * len,
    duration: 0.8 + Math.random() * 0.5,
  }
}

export function StarField() {
  const reduced = useReducedMotion()
  const stars = useMemo(() => generateStars(70), [])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    if (reduced) return
    const spawn = () => {
      const s = createShootingStar(idRef.current++)
      setShootingStars((prev) => [...prev.slice(-2), s])
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((x) => x.id !== s.id))
      }, s.duration * 1000 + 200)
    }
    const interval = setInterval(spawn, 18000 + Math.random() * 12000)
    const firstTimeout = setTimeout(spawn, 8000)
    return () => {
      clearInterval(interval)
      clearTimeout(firstTimeout)
    }
  }, [reduced])

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
            fill={star.color}
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
      {shootingStars.map((s) => (
        <line
          key={s.id}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="#FBF5EA"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: `shootingStar ${s.duration}s ease-out forwards`,
          }}
        />
      ))}
    </svg>
  )
}
