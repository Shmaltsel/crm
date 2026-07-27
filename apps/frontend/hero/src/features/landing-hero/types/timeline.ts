export interface Camera {
  x: number
  y: number
  tiltX: number
  tiltY: number
  shakeX: number
  shakeY: number
  depth: number
  zoom: number
}

export interface Lighting {
  ambientR: number
  ambientG: number
  ambientB: number
  accentR: number
  accentG: number
  accentB: number
  intensity: number
  exposure: number
  vignette: number
}

export interface ParallaxLayer {
  x: number
  y: number
}

export interface TrailParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  born: number
  color: string
}

export interface Timeline {
  progress: number
  dt: number
  elapsed: number
  velocity: number
  acceleration: number
  direction: number
  isScrolling: boolean
  beatStrengths: number[]
  vw: number
  vh: number
  camera: Camera
  lighting: Lighting
  parallax: ParallaxLayer[]
  trailParticles: TrailParticle[]
  ambientParticles: TrailParticle[]
  isWarping: boolean
  warpStrength: number
}
