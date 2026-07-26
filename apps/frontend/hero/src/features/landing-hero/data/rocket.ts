export interface RocketWaypoint {
  /** X position as fraction of viewport width */
  x: number
  /** Y position as fraction of viewport height */
  y: number
  /** Rotation in degrees */
  r: number
}

export const ROCKET_WAYPOINTS: RocketWaypoint[] = [
  { x: 0.50, y: 0.38, r: -6 },
  { x: 0.78, y: 0.26, r: 12 },
  { x: 0.18, y: 0.52, r: -14 },
  { x: 0.72, y: 0.60, r: 18 },
  { x: 0.26, y: 0.30, r: -22 },
  { x: 0.68, y: 0.70, r: 14 },
  { x: 0.32, y: 0.46, r: -9 },
  { x: 0.74, y: 0.34, r: 16 },
  { x: 0.48, y: 0.66, r: 2 },
  { x: 0.22, y: 0.28, r: -18 },
  { x: 0.72, y: 0.48, r: 11 },
  { x: 0.50, y: 0.22, r: -5 },
  { x: 0.50, y: 0.48, r: 0 },
]
