import { ROCKET_WAYPOINTS } from '../data/rocket'

export function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t
  const t3 = t2 * t
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  )
}

export function catmullRomDerivative(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t
  return 0.5 * (
    (-p0 + p2) +
    2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t +
    3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t2
  )
}

export function interpolateRocket(progress: number, vw: number, vh: number) {
  const wp = ROCKET_WAYPOINTS
  if (wp.length < 2) return { x: 0, y: 0, heading: 0 }

  const maxIdx = wp.length - 1
  const p = Math.max(0, Math.min(1, progress))

  const floatIdx = p * maxIdx
  const i1 = Math.floor(floatIdx)
  const t = floatIdx - i1

  const i0 = Math.max(0, i1 - 1)
  const i2 = Math.min(maxIdx, i1 + 1)
  const i3 = Math.min(maxIdx, i1 + 2)

  const x = catmullRom(wp[i0].x, wp[i1].x, wp[i2].x, wp[i3].x, t) * vw
  const y = catmullRom(wp[i0].y, wp[i1].y, wp[i2].y, wp[i3].y, t) * vh

  const dx = catmullRomDerivative(wp[i0].x, wp[i1].x, wp[i2].x, wp[i3].x, t) * vw
  const dy = catmullRomDerivative(wp[i0].y, wp[i1].y, wp[i2].y, wp[i3].y, t) * vh

  const heading = Math.atan2(dy || 0.001, dx || 0.001) * (180 / Math.PI) + 90

  return { x, y, heading }
}

export function lerpAngle(start: number, end: number, amount: number) {
  const delta = ((((end - start) % 360) + 540) % 360) - 180
  return start + delta * amount
}
