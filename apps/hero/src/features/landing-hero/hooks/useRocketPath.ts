import { MotionValue, useTransform } from 'framer-motion'
import { ROCKET_WAYPOINTS, type RocketWaypoint } from '../data/rocket'
import { lerp } from '../lib/animation'

function interpolateWaypoints(progress: number): RocketWaypoint {
  const wp = ROCKET_WAYPOINTS
  const idx = progress * (wp.length - 1)
  const i0 = Math.min(Math.floor(idx), wp.length - 2)
  const f = idx - i0
  const a = wp[i0]
  const b = wp[i0 + 1]
  return {
    x: lerp(a.x, b.x, f),
    y: lerp(a.y, b.y, f),
    r: lerp(a.r, b.r, f),
  }
}

export function useRocketPath(progress: MotionValue<number>) {
  const rx = useTransform(progress, (p) => interpolateWaypoints(p).x)
  const ry = useTransform(progress, (p) => interpolateWaypoints(p).y)
  const rr = useTransform(progress, (p) => interpolateWaypoints(p).r)
  return { rx, ry, rr }
}
