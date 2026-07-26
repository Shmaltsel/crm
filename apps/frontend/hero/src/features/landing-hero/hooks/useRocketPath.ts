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

export function useRocketPath(progress: MotionValue<number>) {
  const rx = useTransform(progress, (p) => interpolateWaypoints(p, window.innerWidth, window.innerHeight).x)
  const ry = useTransform(progress, (p) => interpolateWaypoints(p, window.innerWidth, window.innerHeight).y)
  const rr = useTransform(progress, (p) => interpolateWaypoints(p, window.innerWidth, window.innerHeight).r + 90)
  return { rx, ry, rr }
}
