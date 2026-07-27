import { useEffect, useRef } from 'react'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
  setCommands: (cmds: AmbientCommands) => void
}

interface Star {
  x: number
  y: number
  r: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
  color: string
  brightness: number
}

interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  life: number
  maxLife: number
  color: string
}

const STAR_COLORS = ['#F2B84B', '#F2B84B', '#F2B84B', '#8FE3E0', '#FF7A59', '#FBF5EA']

function generateStars(count: number, w: number, h: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const tier = Math.random()
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: tier < 0.15 ? 0.3 + Math.random() * 0.4 : tier < 0.7 ? 0.6 + Math.random() * 0.8 : 1.0 + Math.random() * 1.2,
      baseOpacity: 0.15 + Math.random() * 0.65,
      twinkleSpeed: 0.8 + Math.random() * 2,
      twinklePhase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      brightness: 0,
    })
  }
  return stars
}

export interface AmbientCommands {
  spawnDust(cx: number, cy: number, count: number): void
  triggerSunrise(): void
  setHeroStarBrightness(v: number): void
}

export function GlobalAmbientCanvas({ tl, subscribe, setCommands }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const dustRef = useRef<DustParticle[]>([])
  const sunriseRef = useRef(0)
  const heroStarRef = useRef(0)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const campfireStrengthRef = useRef(0)
  const campfireSparkRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number; opacity: number; born: number }[]>([])

  const commandsRef = useRef<AmbientCommands>({
    spawnDust: () => {},
    triggerSunrise: () => {},
    setHeroStarBrightness: () => {},
  })

  useEffect(() => {
    return subscribe(() => {
      campfireStrengthRef.current = tl.beatStrengths[10]
    })
  }, [tl, subscribe])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (starsRef.current.length === 0) {
        starsRef.current = generateStars(80, window.innerWidth, window.innerHeight)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    commandsRef.current = {
      spawnDust(cx: number, cy: number, count: number) {
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 0.5 + Math.random() * 3
          dustRef.current.push({
            x: cx + (Math.random() - 0.5) * 20,
            y: cy + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed * 0.6 - 0.5,
            r: 1 + Math.random() * 3,
            opacity: 0.5 + Math.random() * 0.5,
            life: 0,
            maxLife: 80 + Math.floor(Math.random() * 60),
            color: Math.random() > 0.4 ? '#C9BFA8' : '#FBF5EA',
          })
        }
      },
      triggerSunrise() {
        sunriseRef.current = 0.001
      },
      setHeroStarBrightness(v: number) {
        heroStarRef.current = v
      },
    }
    setCommands(commandsRef.current)

    const tick = (now: number) => {
      if (now - lastFrameRef.current < 33) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      lastFrameRef.current = now
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const time = now * 0.001
      const warpScale = tl.isWarping ? 1 + tl.warpStrength * 2 : 1

      ctx.save()
      if (warpScale !== 1) {
        ctx.translate(w / 2, h / 2)
        ctx.scale(warpScale, warpScale)
        ctx.translate(-w / 2, -h / 2)
      }

      const heroB = heroStarRef.current
      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        let alpha = star.baseOpacity * (0.6 + twinkle * 0.4)
        if (heroB > 0) {
          const dx = star.x - w * 0.5
          const dy = star.y - h * 0.35
          const dist = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - dist / (w * 0.3))
          alpha = Math.min(1, alpha + influence * heroB * 0.8)
        }
        ctx.globalAlpha = alpha
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      if (campfireStrengthRef.current > 0.05) {
        const cs = campfireStrengthRef.current
        if (campfireSparkRef.current.length === 0) {
          for (let i = 0; i < 25; i++) {
            campfireSparkRef.current.push({
              x: 200 + Math.random() * 1200,
              y: 900 + Math.random() * 400,
              vx: 0,
              vy: -(1 + Math.random() * 2.5),
              r: Math.random() * 1.5 + 1,
              opacity: 0.4 + Math.random() * 0.6,
              born: now,
            })
          }
        }
        for (const spark of campfireSparkRef.current) {
          spark.y += spark.vy
          spark.x += Math.sin(now * 0.002 + spark.born) * (2 + Math.random() * 3)
          if (spark.y < -50) {
            spark.y = 900 + Math.random() * 100
            spark.x = 200 + Math.random() * 1200
          }
          ctx.globalAlpha = spark.opacity * cs
          ctx.fillStyle = Math.random() > 0.5 ? '#F2B84B' : '#FF7A59'
          ctx.beginPath()
          ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        campfireSparkRef.current = []
      }

      if (dustRef.current.length > 0) {
        for (let i = dustRef.current.length - 1; i >= 0; i--) {
          const d = dustRef.current[i]
          d.life++
          d.x += d.vx
          d.y += d.vy
          d.vy += 0.02
          d.vx *= 0.98
          const fade = 1 - d.life / d.maxLife
          if (fade <= 0) { dustRef.current.splice(i, 1); continue }
          ctx.globalAlpha = d.opacity * fade
          ctx.fillStyle = d.color
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.r * (1 + (1 - fade) * 0.5), 0, Math.PI * 2)
          ctx.fill()
        }
        if (dustRef.current.length > 50) {
          dustRef.current.splice(0, dustRef.current.length - 50)
        }
      }

      if (sunriseRef.current > 0 && sunriseRef.current < 1) {
        sunriseRef.current = Math.min(1, sunriseRef.current + 0.004)
      }
      if (sunriseRef.current > 0) {
        const sr = sunriseRef.current
        const gradient = ctx.createRadialGradient(w / 2, h * 0.85, 0, w / 2, h * 0.85, h * 0.9)
        gradient.addColorStop(0, `rgba(242,184,75,${sr * 0.6})`)
        gradient.addColorStop(0.3, `rgba(255,122,89,${sr * 0.4})`)
        gradient.addColorStop(0.7, `rgba(143,227,224,${sr * 0.15})`)
        gradient.addColorStop(1, `rgba(11,14,31,${sr * 0.3})`)
        ctx.globalAlpha = sr
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [tl, setCommands])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      aria-hidden="true"
      style={{ zIndex: Z.overlays }}
    />
  )
}
