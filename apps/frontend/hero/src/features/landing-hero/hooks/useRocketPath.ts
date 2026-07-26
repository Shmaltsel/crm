import { useState, useEffect } from 'react'
import { MotionValue, useTransform } from 'framer-motion'
import { ROCKET_WAYPOINTS, type RocketWaypoint } from '../data/rocket'
import { lerp } from '../lib/animation'

function interpolateWaypoints(progress: number, vw: number, vh: number): RocketWaypoint & { r: number } {
  const wp = ROCKET_WAYPOINTS
  const idx = progress * (wp.length - 1)
  const i0 = Math.min(Math.floor(idx), wp.length - 2)
  const f = idx - i0
  const a = wp[i0]
  const b = wp[i0 + 1]

  const x = lerp(a.x, b.x, f)
  const y = lerp(a.y, b.y, f)

  const dxPx = (b.x - a.x) * vw
  const dyPx = (b.y - a.y) * vh
  const headingDeg = Math.atan2(dyPx, dxPx) * (180 / Math.PI)

  return { x, y, r: headingDeg }
}

function useViewportSize() {
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])
  return size
}

export function useRocketPath(progress: MotionValue<number>) {
  const { w, h } = useViewportSize()
  const rx = useTransform(progress, (p) => interpolateWaypoints(p, w || window.innerWidth, h || window.innerHeight).x)
  const ry = useTransform(progress, (p) => interpolateWaypoints(p, w || window.innerWidth, h || window.innerHeight).y)
  const rr = useTransform(progress, (p) => interpolateWaypoints(p, w || window.innerWidth, h || window.innerHeight).r + 90)
  return { rx, ry, rr }
}
