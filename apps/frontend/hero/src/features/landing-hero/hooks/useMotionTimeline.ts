import { useRef, useEffect, useCallback } from 'react'
import { lerp, clamp, smoothstep } from '../lib/animation'
import { interpolateRocket } from '../lib/rocketMath'
import type { Timeline } from '../types/timeline'
import type { MotionValue } from 'framer-motion'

const TOTAL_BEATS = 13
const DAMPING = 0.08
const SPRING_K = 0.012
const TRAIL_COLORS = ['#F2B84B', '#FF7A59', '#FBF5EA']
const AMBIENT_COLORS = ['#F2B84B', '#8FE3E0', '#FF7A59', '#FBF5EA']
const WARP_DURATION_MS = 500

let nextParticleId = 0

function computeBeatStrength(progress: number, index: number): number {
  const N = TOTAL_BEATS
  const start = index / N
  const end = (index + 1) / N
  const range = end - start
  const fade = range * 0.28
  let s: number
  if (index === 0) {
    s = progress > end - fade ? (end - progress) / fade : 1
  } else if (index === N - 1) {
    s = progress < start + fade ? (progress - start) / fade : 1
  } else {
    if (progress < start + fade) s = (progress - start) / fade
    else if (progress > end - fade) s = (end - progress) / fade
    else s = 1
  }
  return clamp(smoothstep(clamp(s, 0, 1)), 0, 1)
}

const SCENE_LIGHTING: [number, number, number][] = [
  [0.95, 0.72, 0.29],
  [0.95, 0.72, 0.29],
  [0.95, 0.72, 0.29],
  [1.0, 0.44, 0.33],
  [1.0, 0.44, 0.33],
  [0.56, 0.89, 0.88],
  [1.0, 0.43, 0.78],
  [1.0, 0.43, 0.78],
  [0.95, 0.72, 0.29],
  [0.95, 0.72, 0.29],
  [0.95, 0.72, 0.29],
  [0.95, 0.72, 0.29],
  [0.95, 0.72, 0.29],
]

const NEBULA_SCENE_COLORS: [number, number, number][] = [
  [0.227, 0.118, 0.388], [0.227, 0.118, 0.388], [0.109, 0.435, 0.541],
  [0.109, 0.435, 0.541], [0.431, 0.227, 0.109], [0.431, 0.227, 0.109],
  [0.478, 0.109, 0.325], [0.227, 0.118, 0.388], [0.165, 0.109, 0.313],
  [0.102, 0.078, 0.251], [0.102, 0.078, 0.251], [0.102, 0.078, 0.251],
  [0.102, 0.078, 0.251],
]

type SubscribeFn = (cb: () => void) => () => void
type StartWarpFn = (fromProgress: number) => void

interface WarpState {
  active: boolean
  startTime: number
  frozenProgress: number
}

export function useMotionTimeline(
  smoothProgress: MotionValue<number>,
): { tl: Timeline; subscribe: SubscribeFn; startWarp: StartWarpFn } {
  const tl = useRef<Timeline>({
    progress: 0, dt: 0, elapsed: 0,
    velocity: 0, acceleration: 0, direction: 0, isScrolling: false,
    beatStrengths: new Array(TOTAL_BEATS).fill(0),
    vw: typeof window !== 'undefined' ? window.innerWidth : 1200,
    vh: typeof window !== 'undefined' ? window.innerHeight : 800,
    camera: { x: 0, y: 0, tiltX: 0, tiltY: 0, shakeX: 0, shakeY: 0, depth: 0, zoom: 1 },
    lighting: { ambientR: 0.95, ambientG: 0.72, ambientB: 0.29, accentR: 1, accentG: 1, accentB: 1, intensity: 0.6, exposure: 1, vignette: 0.3 },
    parallax: Array.from({ length: 8 }, () => ({ x: 0, y: 0 })),
    trailParticles: [],
    ambientParticles: [],
    isWarping: false,
    warpStrength: 0,
  })

  const scrollRef = useRef({ y: 0, lastY: 0, velocitySmooth: 0 })
  const cameraTarget = useRef({ x: 0, y: 0, tiltX: 0, tiltY: 0 })
  const shakeAccum = useRef(0)
  const idRef = useRef(0)
  const subscribersRef = useRef<Set<() => void>>(new Set())
  const warpRef = useRef<WarpState>({ active: false, startTime: 0, frozenProgress: 0 })

  const subscribe: SubscribeFn = useCallback((cb: () => void) => {
    subscribersRef.current.add(cb)
    return () => { subscribersRef.current.delete(cb) }
  }, [])

  const startWarp: StartWarpFn = useCallback((fromProgress: number) => {
    warpRef.current = {
      active: true,
      startTime: performance.now(),
      frozenProgress: fromProgress,
    }
    tl.current.isWarping = true
    tl.current.progress = fromProgress
    for (let i = 0; i < TOTAL_BEATS; i++) {
      tl.current.beatStrengths[i] = computeBeatStrength(fromProgress, i)
    }
  }, [])

  const syncViewport = useCallback(() => {
    tl.current.vw = window.innerWidth
    tl.current.vh = window.innerHeight
  }, [])

  useEffect(() => {
    syncViewport()
    window.addEventListener('resize', syncViewport)
    window.addEventListener('orientationchange', syncViewport)
    return () => {
      window.removeEventListener('resize', syncViewport)
      window.removeEventListener('orientationchange', syncViewport)
    }
  }, [syncViewport])

  useEffect(() => {
    let raf = 0
    let lastTime = performance.now()

    const tick = (now: number) => {
      const dtMs = Math.min(now - lastTime, 50)
      lastTime = now
      const dt = dtMs / 1000
      const t = tl.current

      t.dt = dt
      t.elapsed = now

      const warp = warpRef.current
      if (warp.active) {
        const elapsed = now - warp.startTime
        const progress01 = clamp(elapsed / WARP_DURATION_MS, 0, 1)
        t.warpStrength = progress01 < 0.5
          ? 2 * progress01 * progress01
          : 1 - Math.pow(-2 * progress01 + 2, 2) / 2

        t.progress = warp.frozenProgress

        for (let i = 0; i < TOTAL_BEATS; i++) {
          t.beatStrengths[i] = computeBeatStrength(warp.frozenProgress, i)
        }

        if (progress01 >= 1) {
          warp.active = false
          t.isWarping = false
          t.warpStrength = 0
        }
      } else {
        const rawProgress = smoothProgress.get()
        t.progress = clamp(rawProgress, 0, 1)

        const scroll = scrollRef.current
        scroll.y = window.scrollY
        const rawVelocity = (scroll.y - scroll.lastY) / Math.max(dt, 0.001)
        scroll.velocitySmooth = lerp(scroll.velocitySmooth, rawVelocity, clamp(dt * 12, 0, 1))
        scroll.lastY = scroll.y

        t.velocity = clamp(scroll.velocitySmooth, -3000, 3000)
        t.acceleration = (t.velocity - scroll.velocitySmooth) * 3
        t.direction = t.velocity > 50 ? 1 : t.velocity < -50 ? -1 : 0
        t.isScrolling = Math.abs(t.velocity) > 30

        for (let i = 0; i < TOTAL_BEATS; i++) {
          t.beatStrengths[i] = computeBeatStrength(t.progress, i)
        }
      }

      const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)
      cameraTarget.current.x = clamp(t.velocity * 0.003, -6, 6)
      cameraTarget.current.y = clamp(t.acceleration * 0.0004, -4, 4)
      cameraTarget.current.tiltX = clamp(t.velocity * 0.0015, -3, 3)
      cameraTarget.current.tiltY = clamp(t.acceleration * 0.0002, -2, 2)

      t.camera.x = lerp(t.camera.x, cameraTarget.current.x, SPRING_K)
      t.camera.y = lerp(t.camera.y, cameraTarget.current.y, SPRING_K)
      t.camera.tiltX = lerp(t.camera.tiltX, cameraTarget.current.tiltX, SPRING_K)
      t.camera.tiltY = lerp(t.camera.tiltY, cameraTarget.current.tiltY, SPRING_K)
      t.camera.zoom = lerp(t.camera.zoom, 1 - speedFactor * 0.015, DAMPING)

      if (t.isScrolling && !t.isWarping) {
        shakeAccum.current += dt * (8 + speedFactor * 15)
        t.camera.shakeX = Math.sin(shakeAccum.current * 1.1) * speedFactor * 0.4
        t.camera.shakeY = Math.cos(shakeAccum.current * 1.7) * speedFactor * 0.3
      } else {
        t.camera.shakeX = lerp(t.camera.shakeX, 0, DAMPING)
        t.camera.shakeY = lerp(t.camera.shakeY, 0, DAMPING)
      }

      t.camera.depth = lerp(t.camera.depth, t.progress * 0.3, DAMPING)

      const parallaxSpeeds = [0.02, 0.05, 0.1, 0.15, 0.25, 0.35, 0.5, 1.0]
      const parallaxInertia = [0.02, 0.03, 0.05, 0.06, 0.08, 0.1, 0.12, 0.15]
      for (let i = 0; i < 8; i++) {
        const targetPx = t.progress * t.vh * parallaxSpeeds[i] * t.direction
        const targetPy = t.progress * t.vh * parallaxSpeeds[i] * 0.3
        t.parallax[i].x = lerp(t.parallax[i].x, targetPx, parallaxInertia[i])
        t.parallax[i].y = lerp(t.parallax[i].y, targetPy, parallaxInertia[i])
      }

      for (let i = t.trailParticles.length - 1; i >= 0; i--) {
        const p = t.trailParticles[i]
        const age = (now - p.born) / 800
        if (age > 1) { t.trailParticles.splice(i, 1); continue }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.opacity = (1 - age * age) * 0.8
      }

      for (let i = t.ambientParticles.length - 1; i >= 0; i--) {
        const p = t.ambientParticles[i]
        const age = (now - p.born) / 4000
        if (age > 1) { t.ambientParticles.splice(i, 1); continue }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.opacity = Math.sin(age * Math.PI) * 0.15
      }

      if (t.isScrolling && Math.abs(t.velocity) > 150 && t.trailParticles.length < 60 && !t.isWarping) {
        const rocketBeatIdx = Math.floor(t.progress * 12.99)
        const rocketBeat = t.beatStrengths[clamp(rocketBeatIdx, 0, 12)]
        if (rocketBeat > 0.05) {
          const rocket = interpolateRocket(t.progress, t.vw, t.vh)
          const rx = rocket.x + t.parallax[5].x + t.camera.x + t.camera.shakeX
          const ry = rocket.y + t.parallax[5].y + t.camera.y + t.camera.shakeY
          const boost = clamp(Math.abs(t.velocity) / 1500, 0, 2)
          const count = 1 + Math.round(boost)
          for (let j = 0; j < count; j++) {
            const angle = Math.PI
            const spread = (Math.random() - 0.5) * (14 + boost * 8)
            t.trailParticles.push({
              id: idRef.current++,
              x: rx + Math.cos(angle) * 16 + spread,
              y: ry + Math.sin(angle) * 16 + spread,
              vx: Math.cos(angle) * (20 + boost * 15) + (Math.random() - 0.5) * 30,
              vy: Math.sin(angle) * (20 + boost * 15) + (Math.random() - 0.5) * 30,
              r: (1.2 + Math.random() * 2.5) * (1 + boost * 0.3),
              opacity: (0.4 + Math.random() * 0.5) * (0.5 + boost * 0.5),
              born: now,
              color: TRAIL_COLORS[nextParticleId++ % TRAIL_COLORS.length],
            })
          }
        }
      }

      if (t.ambientParticles.length < 12 && Math.random() < 0.03) {
        t.ambientParticles.push({
          id: nextParticleId++,
          x: Math.random() * t.vw,
          y: Math.random() * t.vh,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 6,
          r: 0.3 + Math.random() * 1,
          opacity: 0,
          born: now,
          color: AMBIENT_COLORS[nextParticleId++ % AMBIENT_COLORS.length],
        })
      }

      const sceneIdx = clamp(Math.floor(t.progress * 12.99), 0, 12)
      const nextIdx = clamp(sceneIdx + 1, 0, 12)
      const sceneFrac = (t.progress * 12.99) - sceneIdx
      const sceneBlend = smoothstep(clamp(sceneFrac < 0.85 ? 0 : (sceneFrac - 0.85) / 0.15, 0, 1))

      const sA = SCENE_LIGHTING[sceneIdx]
      const sB = SCENE_LIGHTING[nextIdx]
      t.lighting.ambientR = lerp(sA[0], sB[0], sceneBlend)
      t.lighting.ambientG = lerp(sA[1], sB[1], sceneBlend)
      t.lighting.ambientB = lerp(sA[2], sB[2], sceneBlend)

      const nA = NEBULA_SCENE_COLORS[sceneIdx]
      const nB = NEBULA_SCENE_COLORS[nextIdx]
      t.lighting.accentR = lerp(nA[0], nB[0], sceneBlend)
      t.lighting.accentG = lerp(nA[1], nB[1], sceneBlend)
      t.lighting.accentB = lerp(nA[2], nB[2], sceneBlend)

      t.lighting.intensity = lerp(0.5, 0.9, clamp(Math.abs(t.velocity) / 2000, 0, 1))
      t.lighting.exposure = lerp(1, 1.08, speedFactor)
      t.lighting.vignette = lerp(0.3, 0.15, speedFactor)

      for (const cb of subscribersRef.current) cb()

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [subscribe, smoothProgress])

  return { tl: tl.current, subscribe, startWarp }
}
