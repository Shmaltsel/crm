# @svitlo/hero — Повний кодовий бандл

> Scroll-driven landing page для "Світло Знань"
> `apps/frontend/hero/` | React 19 + Vite 8 + Tailwind v4 + Framer Motion
> Vercel Blob для відео: `https://n1gzcjyiqdwr3azb.public.blob.vercel-storage.com`

---

## Структура файлів

```
apps/frontend/hero/
├── package.json
├── vite.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── index.html
├── .oxlintrc.json
├── .gitignore
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── materials/              ← .gitignore, локальні відео-оригінали
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── assets/
    │   ├── vite.svg
    │   ├── react.svg
    │   └── hero.png
    └── features/landing-hero/
        ├── LandingHero.tsx
        ├── components/
        │   ├── BeatWrapper.tsx
        │   ├── MediaPlaceholder.tsx
        │   ├── Nav.tsx
        │   ├── ContactPanel.tsx
        │   ├── Footer.tsx
        │   ├── CursorGlow.tsx
        │   ├── ProgressRail.tsx
        │   ├── ScrollHint.tsx
        │   ├── SoundToggle.tsx
        │   ├── FilmGrain.tsx
        │   ├── beats/
        │   │   ├── HeroBeat.tsx
        │   │   ├── ManifestBeat.tsx
        │   │   ├── PillarsBeat.tsx
        │   │   ├── WorldBeat.tsx
        │   │   ├── TimelineBeat.tsx
        │   │   ├── GalleryBeat.tsx
        │   │   ├── TeamVoicesBeat.tsx
        │   │   ├── StatsBeat.tsx
        │   │   └── FinaleBeat.tsx
        │   └── overlays/
        │       ├── RocketOverlay.tsx
        │       ├── PortalOverlay.tsx
        │       ├── NebulaOverlay.tsx
        │       ├── StarField.tsx
        │       └── GrassGround.tsx
        ├── data/
        │   ├── media.ts
        │   ├── worlds.ts
        │   ├── nebula.ts
        │   ├── rocket.ts
        │   ├── timeline.ts
        │   ├── team.ts
        │   ├── stats.ts
        │   ├── quotes.ts
        │   ├── pillars.ts
        │   └── gallery.ts
        ├── hooks/
        │   ├── useAudioAmbience.ts
        │   ├── useBeatStrength.ts
        │   ├── useBeatStrengths.ts
        │   ├── useMotionTimeline.ts
        │   ├── useProgressMV.ts
        │   ├── useReducedMotion.ts
        │   ├── useRocketPath.ts
        │   ├── useScrollSnap.ts
        │   └── useScrollStory.ts
        ├── lib/
        │   ├── animation.ts
        │   ├── colors.ts
        │   └── zIndex.ts
        └── types/
            └── timeline.ts
```

---

## package.json

```json
{
  "name": "@svitlo/hero",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@tanstack/react-query": "^5.101.4",
    "framer-motion": "^12.42.2",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.83.0",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "oxlint": "^1.71.0",
    "typescript": "~6.0.2",
    "vite": "^8.1.1"
  }
}
```

## vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/info/',
  plugins: [react(), tailwindcss()],
})
```

## postcss.config.js

```js
export default {
  plugins: {},
}
```

## tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

## index.html

```html
<!doctype html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Світло Знань — Уява оживає</title>
    <meta name="description" content="Ми створюємо сучасні освітні події, які діти пам'ятають роками. Світ Голограм, Оживлених Малюнків та Свят — для шкіл і дитячих садочків." />
    <meta property="og:title" content="Світло Знань — Уява оживає" />
    <meta property="og:description" content="Освітні події для дітей, які запалюють світло в очах." />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## .oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## .gitignore

```
node_modules
dist
dist-ssr
*.local
materials/
```

---

## src/main.tsx

``tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
``n

---

## src/App.tsx

``tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LandingHero } from './features/landing-hero/LandingHero'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingHero />
    </QueryClientProvider>
  )
}

export default App
``n

---

## src/index.css

``css
@import "tailwindcss";

@theme {
  --color-night: #0B0E1F;
  --color-paper: #FBF5EA;
  --color-mist: rgba(251, 245, 234, 0.78);
  --color-mist-soft: rgba(251, 245, 234, 0.52);
  --color-gold: #F2B84B;
  --color-gold-soft: rgba(242, 184, 75, 0.38);
  --color-coral: #FF7A59;
  --color-teal: #8FE3E0;

  --font-display: 'Fraunces', serif;
  --font-body: 'Manrope', sans-serif;

  --ease-hero: cubic-bezier(.22, 1, .36, 1);
}

html {
  scroll-behavior: auto;
}

body {
  background: var(--color-night);
  color: var(--color-paper);
  font-family: var(--font-body);
  overflow-x: hidden;
}

h1, h2, h3, .display {
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: -.015em;
}

a {
  color: inherit;
  text-decoration: none;
}

:focus-visible {
  outline: 2px solid var(--color-coral);
  outline-offset: 3px;
}

@keyframes twinkle {
  0%, 100% { opacity: .18; }
  50% { opacity: .92; }
}

@keyframes leafFall {
  0% { transform: translate(0, 0) rotate(0deg); opacity: .85; }
  100% { transform: translate(var(--dx, 28px), 210px) rotate(210deg); opacity: 0; }
}

@keyframes cueMove {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.01% { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 20px rgba(242,184,75,0.3), 0 0 40px rgba(242,184,75,0.1); }
  50% { text-shadow: 0 0 30px rgba(242,184,75,0.6), 0 0 60px rgba(242,184,75,0.25); }
}

@keyframes glowCoral {
  0%, 100% { text-shadow: 0 0 20px rgba(255,122,89,0.3), 0 0 40px rgba(255,122,89,0.1); }
  50% { text-shadow: 0 0 35px rgba(255,122,89,0.7), 0 0 70px rgba(255,122,89,0.3); }
}

@keyframes irisOpen {
  from { clip-path: circle(0% at 50% 50%); }
  to { clip-path: circle(100% at 50% 50%); }
}

@keyframes jellyWobble {
  0% { transform: scale(1, 1); }
  25% { transform: scale(0.97, 1.03); }
  50% { transform: scale(1.03, 0.97); }
  75% { transform: scale(0.99, 1.01); }
  100% { transform: scale(1, 1); }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dotSpark {
  0% { box-shadow: 0 0 0 0 rgba(242,184,75,0.8); }
  100% { box-shadow: 0 0 0 14px rgba(242,184,75,0); }
}

.stagger-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(18px);
  animation: fadeSlideUp 0.6s var(--ease-hero) forwards;
}

.glow-word {
  animation: glowPulse 3s ease-in-out infinite;
  color: var(--color-gold);
}

.glow-word-coral {
  animation: glowCoral 3s ease-in-out infinite;
  color: var(--color-coral);
}

.iris-reveal {
  animation: irisOpen 1.2s var(--ease-hero) 0.2s both;
}

.jelly-hover:hover {
  animation: jellyWobble 0.5s ease;
}

.pillar-stroke {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.7s var(--ease-hero);
}

@keyframes worldOrganicEntry {
  0% { opacity: 0; transform: scale(0.92, 1.06); }
  60% { opacity: 1; transform: scale(1.03, 0.97); }
  100% { opacity: 1; transform: scale(1, 1); }
}

@keyframes worldScanEntry {
  0% { opacity: 0; clip-path: inset(0 100% 0 0); }
  50% { opacity: 1; clip-path: inset(0 0 0 0); }
  100% { opacity: 1; clip-path: inset(0 0 0 0); }
}

@keyframes worldBounceEntry {
  0% { opacity: 0; transform: scale(1.12); }
  50% { opacity: 1; transform: scale(0.97); }
  75% { transform: scale(1.02); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes flashOverlay {
  0% { opacity: 0.25; }
  100% { opacity: 0; }
}

.world-organic-entry {
  animation: worldOrganicEntry 0.8s var(--ease-hero) both;
}

.world-scan-entry {
  position: relative;
  animation: worldScanEntry 0.9s var(--ease-hero) both;
}

.world-scan-entry::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 45%, rgba(143,227,224,0.3) 50%, transparent 55%);
  animation: scanLinePass 0.9s var(--ease-hero) both;
  pointer-events: none;
}

@keyframes scanLinePass {
  0% { transform: translateX(-100%); opacity: 1; }
  100% { transform: translateX(200%); opacity: 0; }
}

.world-bounce-entry {
  animation: worldBounceEntry 0.7s var(--ease-hero) both;
}

.world-bounce-entry.flash-once::after {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  border-radius: inherit;
  animation: flashOverlay 0.3s ease-out 0.1s both;
  pointer-events: none;
}

.dot-spark-ring {
  box-shadow: 0 0 0 0 rgba(242,184,75,0);
}

.dot-spark-active .dot-spark-ring {
  animation: dotSpark 0.6s ease-out forwards;
}

@keyframes statBounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.12); }
  60% { transform: scale(0.97); }
  100% { transform: scale(1); }
}

@keyframes starPop {
  0% { transform: scale(0.5); opacity: 0.6; }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); opacity: 1; }
}

.stat-bounce {
  animation: statBounce 0.5s var(--ease-hero);
}

.stat-star-lit {
  animation: starPop 0.4s var(--ease-hero) both;
}

@keyframes shootingStar {
  0% { stroke-dashoffset: 1; opacity: 0; }
  10% { opacity: 0.9; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .15s !important;
  }
}
``n

---

## types/timeline.ts

``ts
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
}
``n

---

## lib/animation.ts

``ts
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export function tweenScrollTo(
  target: number,
  opts?: { onCancelCheck?: () => boolean },
): Promise<void> {
  const start = window.scrollY
  const distance = target - start
  const duration = clamp(Math.abs(distance) / window.innerHeight * 260, 350, 1400)
  const startTime = performance.now()

  return new Promise<void>((resolve) => {
    function step(now: number) {
      if (opts?.onCancelCheck?.()) return resolve()
      const t = clamp((now - startTime) / duration, 0, 1)
      window.scrollTo(0, start + distance * smoothstep(t))
      if (t < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}
``n

---

## lib/colors.ts

``ts
import { lerp } from './animation'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  const r = Math.round(lerp(a[0], b[0], t))
  const g = Math.round(lerp(a[1], b[1], t))
  const bl = Math.round(lerp(a[2], b[2], t))
  return `rgb(${r},${g},${bl})`
}
``n

---

## lib/zIndex.ts

``ts
export const Z = {
  overlays: 1,
  cursorGlow: 5,
  rocket: 6,
  content: 10,
  footer: 50,
  scrollHint: 150,
  nav: 300,
  progressRail: 310,
  soundToggle: 320,
  contactPanel: 400,
  confetti: 410,
  skipLinks: 9999,
} as const
``n

---

## hooks/useMotionTimeline.ts

``ts
import { useRef, useEffect, useCallback } from 'react'
import { lerp, clamp, smoothstep } from '../lib/animation'
import type { Timeline } from '../types/timeline'

const TOTAL_BEATS = 13
const DAMPING = 0.08
const SPRING_K = 0.012
const TRAIL_COLORS = ['#F2B84B', '#FF7A59', '#FBF5EA']
const AMBIENT_COLORS = ['#F2B84B', '#8FE3E0', '#FF7A59', '#FBF5EA']

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

export function useMotionTimeline(
  containerRef: React.RefObject<HTMLDivElement | null>,
): { tl: Timeline; subscribe: SubscribeFn } {
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
  })

  const scrollRef = useRef({ y: 0, lastY: 0, velocitySmooth: 0 })
  const cameraTarget = useRef({ x: 0, y: 0, tiltX: 0, tiltY: 0 })
  const shakeAccum = useRef(0)
  const idRef = useRef(0)
  const subscribersRef = useRef<Set<() => void>>(new Set())

  const subscribe: SubscribeFn = useCallback((cb: () => void) => {
    subscribersRef.current.add(cb)
    return () => { subscribersRef.current.delete(cb) }
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

      const track = containerRef.current
      const total = track ? Math.max(1, track.scrollHeight - window.innerHeight) : 1
      const rawProgress = window.scrollY / total
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

      if (t.isScrolling) {
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

      if (t.isScrolling && Math.abs(t.velocity) > 150 && t.trailParticles.length < 60) {
        const rocketBeatIdx = Math.floor(t.progress * 12.99)
        const rocketBeat = t.beatStrengths[clamp(rocketBeatIdx, 0, 12)]
        if (rocketBeat > 0.05) {
          const rx = 0.5 * t.vw + t.parallax[5].x
          const ry = 0.4 * t.vh + t.parallax[5].y
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
  }, [containerRef, subscribe])

  return { tl: tl.current, subscribe }
}
``n

---

## hooks/useScrollStory.ts

``ts
import { useRef } from 'react'
import { useScroll } from 'framer-motion'

export function useScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return { containerRef, scrollYProgress }
}
``n

---

## hooks/useProgressMV.ts

``ts
import { useEffect } from 'react'
import { MotionValue, useMotionValue } from 'framer-motion'
import type { Timeline } from '../types/timeline'

export function useProgressMV(
  tl: Timeline,
  subscribe: (cb: () => void) => () => void,
): MotionValue<number> {
  const mv = useMotionValue(0)

  useEffect(() => {
    mv.set(tl.progress)
    return subscribe(() => { mv.set(tl.progress) })
  }, [tl, subscribe, mv])

  return mv
}
``n

---

## hooks/useScrollSnap.ts

``ts
import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { tweenScrollTo } from '../lib/animation'

const TOTAL_BEATS = 13
const STOP_DELAY = 180

function getBeatCenters(): number[] {
  return Array.from({ length: TOTAL_BEATS }, (_, i) => (i + 0.5) / TOTAL_BEATS)
}

function nearestBeat(progress: number): number {
  const centers = getBeatCenters()
  let best = centers[0]
  let bestDist = Math.abs(progress - best)
  for (let i = 1; i < centers.length; i++) {
    const d = Math.abs(progress - centers[i])
    if (d < bestDist) {
      best = centers[i]
      bestDist = d
    }
  }
  return best
}

export function useScrollSnap(
  scrollYProgress: MotionValue<number>,
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const timerRef = useRef(0)
  const snappingRef = useRef(false)
  const userInputRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    const markUserInput = () => { userInputRef.current = true }
    window.addEventListener('wheel', markUserInput, { passive: true })
    window.addEventListener('touchmove', markUserInput, { passive: true })

    const onScroll = () => {
      if (snappingRef.current) return
      clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        if (snappingRef.current) return
        const track = containerRef.current
        if (!track) return
        const total = Math.max(1, track.scrollHeight - window.innerHeight)
        const progress = window.scrollY / total

        if (progress < 0.005 || progress > 0.995) return

        const target = nearestBeat(progress)
        const targetPx = target * total

        if (Math.abs(window.scrollY - targetPx) < 2) return

        snappingRef.current = true
        userInputRef.current = false
        tweenScrollTo(targetPx, { onCancelCheck: () => userInputRef.current }).then(() => {
          snappingRef.current = false
        })
      }, STOP_DELAY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', markUserInput)
      window.removeEventListener('touchmove', markUserInput)
      clearTimeout(timerRef.current)
    }
  }, [containerRef])
}
``n

---

## hooks/useBeatStrength.ts

``ts
import { MotionValue, useTransform } from 'framer-motion'
import { clamp, smoothstep } from '../lib/animation'

const TOTAL_BEATS = 13

/**
 * For a given beat index, computes a "strength" value (0..1) from global scroll progress.
 * Each beat occupies [i/N, (i+1)/N] of total scroll.
 * 28% fade zones at boundaries; first/last beats have special half-fade logic.
 */
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

export function useBeatStrength(
  progress: MotionValue<number>,
  index: number,
): MotionValue<number> {
  return useTransform(progress, (p) => computeBeatStrength(p, index))
}
``n

---

## hooks/useBeatStrengths.ts

``ts
import { MotionValue, useTransform } from 'framer-motion'
import { clamp, smoothstep } from '../lib/animation'

const TOTAL_BEATS = 13

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

export function useBeatStrengths(
  progress: MotionValue<number>,
): MotionValue<number>[] {
  const s0 = useTransform(progress, (p) => computeBeatStrength(p, 0))
  const s1 = useTransform(progress, (p) => computeBeatStrength(p, 1))
  const s2 = useTransform(progress, (p) => computeBeatStrength(p, 2))
  const s3 = useTransform(progress, (p) => computeBeatStrength(p, 3))
  const s4 = useTransform(progress, (p) => computeBeatStrength(p, 4))
  const s5 = useTransform(progress, (p) => computeBeatStrength(p, 5))
  const s6 = useTransform(progress, (p) => computeBeatStrength(p, 6))
  const s7 = useTransform(progress, (p) => computeBeatStrength(p, 7))
  const s8 = useTransform(progress, (p) => computeBeatStrength(p, 8))
  const s9 = useTransform(progress, (p) => computeBeatStrength(p, 9))
  const s10 = useTransform(progress, (p) => computeBeatStrength(p, 10))
  const s11 = useTransform(progress, (p) => computeBeatStrength(p, 11))
  const s12 = useTransform(progress, (p) => computeBeatStrength(p, 12))

  return [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12]
}
``n

---

## hooks/useReducedMotion.ts

``ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
``n

---

## hooks/useRocketPath.ts

``ts
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
``n

---

## hooks/useAudioAmbience.ts

``ts
import { useCallback, useRef, useState } from 'react'

export function useAudioAmbience() {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const windGainRef = useRef<GainNode | null>(null)
  const chimeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [soundOn, setSoundOn] = useState(false)

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 480

    const gain = ctx.createGain()
    gain.gain.value = 0

    src.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    src.start()

    windGainRef.current = gain
  }, [])

  const playChime = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    const freqs = [523.25, 587.33, 659.25, 783.99, 880]
    const freq = freqs[Math.floor(Math.random() * freqs.length)]

    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq

    osc.connect(g)
    g.connect(ctx.destination)

    const t = ctx.currentTime
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.045, t + 0.35)
    g.gain.linearRampToValueAtTime(0, t + 2.1)
    osc.start(t)
    osc.stop(t + 2.2)
  }, [])

  const scheduleChimes = useCallback(() => {
    if (chimeTimerRef.current) clearTimeout(chimeTimerRef.current)
    chimeTimerRef.current = setTimeout(() => {
      playChime()
      scheduleChimes()
    }, 5500 + Math.random() * 7500)
  }, [playChime])

  const toggle = useCallback(() => {
    initAudio()
    const ctx = audioCtxRef.current
    if (ctx?.state === 'suspended') ctx.resume()

    const next = !soundOn
    setSoundOn(next)

    const gain = windGainRef.current
    if (gain && ctx) {
      gain.gain.setTargetAtTime(next ? 0.038 : 0, ctx.currentTime, 0.55)
    }

    if (next) {
      scheduleChimes()
    } else if (chimeTimerRef.current) {
      clearTimeout(chimeTimerRef.current)
    }
  }, [soundOn, initAudio, scheduleChimes])

  return { soundOn, toggle }
}
``n

---

## features/landing-hero/LandingHero.tsx

``tsx
import { useCallback, useRef, useState } from 'react'
import { useScrollStory } from './hooks/useScrollStory'
import { useMotionTimeline } from './hooks/useMotionTimeline'
import { useBeatStrengths } from './hooks/useBeatStrengths'
import { useProgressMV } from './hooks/useProgressMV'
import { useScrollSnap } from './hooks/useScrollSnap'
import { clamp, tweenScrollTo } from './lib/animation'
import { Z } from './lib/zIndex'

import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { CursorGlow } from './components/CursorGlow'
import { ScrollHint } from './components/ScrollHint'
import { ContactPanel } from './components/ContactPanel'
import { Footer } from './components/Footer'
import { FilmGrain } from './components/FilmGrain'

import { NebulaOverlay } from './components/overlays/NebulaOverlay'
import { StarField } from './components/overlays/StarField'
import { RocketOverlay } from './components/overlays/RocketOverlay'
import { PortalOverlay } from './components/overlays/PortalOverlay'
import { GrassGround } from './components/overlays/GrassGround'

import { HeroBeat } from './components/beats/HeroBeat'
import { ManifestBeat } from './components/beats/ManifestBeat'
import { PillarsBeat } from './components/beats/PillarsBeat'
import { WorldBeat } from './components/beats/WorldBeat'
import { TimelineBeat } from './components/beats/TimelineBeat'
import { GalleryBeat } from './components/beats/GalleryBeat'
import { TeamVoicesBeat } from './components/beats/TeamVoicesBeat'
import { StatsBeat } from './components/beats/StatsBeat'
import { FinaleBeat } from './components/beats/FinaleBeat'
import { BeatWrapper } from './components/BeatWrapper'
import type { MotionValue } from 'framer-motion'

export function LandingHero() {
  const { containerRef } = useScrollStory()
  const { tl, subscribe } = useMotionTimeline(containerRef)
  const [contactOpen, setContactOpen] = useState(false)

  const scrollYProgress = useProgressMV(tl, subscribe)
  const beatStrengths = useBeatStrengths(scrollYProgress)

  useScrollSnap(scrollYProgress, containerRef)

  const drawingStrength = beatStrengths[5]
  const finaleStrength = beatStrengths[12]

  const scrollToFraction = useCallback((frac: number) => {
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = clamp(frac, 0, 1) * total
    tweenScrollTo(target)
  }, [containerRef])

  const confettiLockRef = useRef(false)
  const handleConfetti = useCallback((x: number, y: number) => {
    if (confettiLockRef.current) return
    confettiLockRef.current = true
    setTimeout(() => { confettiLockRef.current = false }, 600)
    const colors = ['#F2B84B', '#FF7A59', '#8FE3E0', '#FBF5EA', '#FF6EC7']
    const GRAVITY = 0.35
    const BOUNCE = 0.45
    const FRICTION = 0.98
    const FLOOR_Y = window.innerHeight - 20

    for (let i = 0; i < 35; i++) {
      const bit = document.createElement('div')
      const isCircle = Math.random() > 0.6
      const w = isCircle ? 6 : 5 + Math.random() * 5
      const h = isCircle ? 6 : 8 + Math.random() * 6
      bit.style.cssText = `position:fixed;width:${w}px;height:${h}px;z-index:${Z.confetti};pointer-events:none;border-radius:${isCircle ? '50%' : '1px'};left:0;top:0;background:${colors[Math.floor(Math.random() * colors.length)]}`
      document.body.appendChild(bit)

      const ang = Math.random() * Math.PI * 2
      const speed = 6 + Math.random() * 10
      let vx = Math.cos(ang) * speed
      let vy = Math.sin(ang) * speed * 0.7 - 8
      let px = x
      let py = y
      let rx = 0
      let ry = 0
      const vrx = (Math.random() - 0.5) * 18
      const vry = (Math.random() - 0.5) * 14
      let life = 0
      const maxLife = 90 + Math.floor(Math.random() * 40)

      const tick = () => {
        life++
        vy += GRAVITY
        vx *= FRICTION
        px += vx
        py += vy
        rx += vrx
        ry += vry

        if (py > FLOOR_Y) {
          py = FLOOR_Y
          vy = -vy * BOUNCE
          vx *= 0.85
        }

        const fade = life > maxLife - 15 ? (maxLife - life) / 15 : 1
        bit.style.transform = `translate(${px}px,${py}px) rotateX(${rx}deg) rotateY(${ry}deg)`
        bit.style.opacity = String(Math.max(0, fade))

        if (life < maxLife) {
          requestAnimationFrame(tick)
        } else {
          bit.remove()
        }
      }
      requestAnimationFrame(tick)
    }
  }, [])

  const beats: [MotionValue<number>, React.ReactNode][] = [
    [beatStrengths[0], <HeroBeat key="hero" progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} />],
    [beatStrengths[1], <ManifestBeat key="manifest" progress={scrollYProgress} />],
    [beatStrengths[2], <PillarsBeat key="pillars" progress={scrollYProgress} />],
    ...[3, 4, 5, 6, 7].map((i) => [beatStrengths[i], <WorldBeat key={`world-${i}`} progress={scrollYProgress} beatIndex={i} />] as [MotionValue<number>, React.ReactNode]),
    [beatStrengths[8], <TimelineBeat key="timeline" progress={scrollYProgress} />],
    [beatStrengths[9], <GalleryBeat key="gallery" progress={scrollYProgress} />],
    [beatStrengths[10], <TeamVoicesBeat key="team" progress={scrollYProgress} />],
    [beatStrengths[11], <StatsBeat key="stats" progress={scrollYProgress} />],
    [beatStrengths[12], <FinaleBeat key="finale" progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} onConfetti={handleConfetti} />],
  ]

  return (
    <>
      <a
        href="#main"
        className={`fixed -left-[999px] top-0 bg-gold px-5 py-3 font-bold text-night focus:left-4 focus:top-4`}
        style={{ zIndex: Z.skipLinks }}
      >
        ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ð´Ð¾ Ð·Ð¼Ñ–ÑÑ‚Ñƒ
      </a>
      <a
        href="#contact"
        className={`fixed -left-[999px] top-0 bg-coral px-5 py-3 font-bold text-night focus:left-4 focus:top-16`}
        style={{ zIndex: Z.skipLinks }}
      >
        ÐŸÑ€Ð¾Ð¿ÑƒÑÑ‚Ð¸Ñ‚Ð¸ Ð´Ð¾ Ñ„Ð¾Ñ€Ð¼Ð¸
      </a>

      <ProgressRail progress={scrollYProgress} />
      <Nav
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToFraction}
      />
      <CursorGlow tl={tl} />

      {/* Universe (fixed background) */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: Z.overlays }} aria-hidden="true">
        <NebulaOverlay tl={tl} subscribe={subscribe} />
        <StarField />
        <PortalOverlay tl={tl} subscribe={subscribe} />
        <GrassGround tl={tl} subscribe={subscribe} />
        <RocketOverlay tl={tl} />
      </div>

      {/* Story beats */}
      <main id="main" ref={containerRef} className="relative" style={{ zIndex: Z.content }}>
        <div className="h-[1100vh] max-md:h-[700vh]">
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: Z.content }}>
            {beats.map(([strength, child], i) => (
              <BeatWrapper key={i} strength={strength}>
                {child}
              </BeatWrapper>
            ))}
          </div>
        </div>
      </main>

      <ScrollHint progress={scrollYProgress} finaleStrength={finaleStrength} />
      <SoundToggle />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer onOpenContact={() => setContactOpen(true)} />
      <FilmGrain />
    </>
  )
}
``n

---

## components/BeatWrapper.tsx

``tsx
import { useState } from 'react'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  strength: MotionValue<number>
  children: ReactNode
}

export function BeatWrapper({ strength, children }: Props) {
  const [active, setActive] = useState(false)
  useMotionValueEvent(strength, 'change', (s) => setActive(s > 0.15))
  return (
    <div className={active ? 'pointer-events-auto' : 'pointer-events-none'} inert={!active ? true : undefined}>
      {children}
    </div>
  )
}
``n

---

## components/FilmGrain.tsx

``tsx
import { Z } from '../lib/zIndex'

export function FilmGrain() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          zIndex: Z.overlays + 1,
          opacity: 0.025,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          zIndex: Z.overlays + 1,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(11,14,31,0.45) 100%)',
        }}
      />
    </>
  )
}
``n

---

## components/Nav.tsx

``tsx
import { useState, useEffect, useRef } from 'react'
import { Z } from '../lib/zIndex'

interface Props {
  onOpenContact: () => void
  onNavigate: (fraction: number) => void
}

const NAV_LINKS = [
  { label: 'ÐŸÑ€Ð¾ Ð½Ð°Ñ', fraction: 0.18 },
  { label: 'ÐÐ°ÑˆÑ– ÑÐ²Ñ–Ñ‚Ð¸', fraction: 0.28 },
  { label: 'Ð¯Ðº Ð¿Ñ€Ð¾Ñ…Ð¾Ð´Ð¸Ñ‚ÑŒ', fraction: 0.62 },
  { label: 'Ð“Ð°Ð»ÐµÑ€ÐµÑ', fraction: 0.70 },
  { label: 'ÐšÐ¾Ð¼Ð°Ð½Ð´Ð°', fraction: 0.78 },
]

function getActiveIndex(progress: number): number {
  let best = 0
  let bestDist = Math.abs(progress - NAV_LINKS[0].fraction)
  for (let i = 1; i < NAV_LINKS.length; i++) {
    const d = Math.abs(progress - NAV_LINKS[i].fraction)
    if (d < bestDist) {
      best = i
      bestDist = d
    }
  }
  return best
}

export function Nav({ onOpenContact, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 40)

      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = y / total
      setActiveIdx(getActiveIndex(progress))

      if (y > 200) {
        setHidden(y > lastScrollY.current && y - lastScrollY.current > 8)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const activeLink = NAV_LINKS[activeIdx]
  const activeEl = linkRefs.current[activeIdx]
  const underlineStyle = activeEl
    ? {
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      }
    : { left: 0, width: 0, opacity: 0 }

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-[400ms] ${
        scrolled
          ? 'bg-night/72 py-3 backdrop-blur-[14px] border-b border-gold/12'
          : 'py-[18px]'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ zIndex: Z.nav, transitionProperty: 'transform, background, padding, border-color' }}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[18px] font-semibold text-paper">
          <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(242,184,75,0.38)]" aria-hidden="true" />
          Ð¡Ð²Ñ–Ñ‚Ð»Ð¾ Ð—Ð½Ð°Ð½ÑŒ
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          <nav className="relative">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => { linkRefs.current[i] = el }}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(link.fraction)
                }}
                className={`text-[13.5px] font-medium transition-colors hover:text-gold ${
                  i === activeIdx ? 'text-gold' : 'text-mist'
                }`}
              >
                {link.label}
              </a>
            ))}
            <span
              className="absolute -bottom-1 h-[2px] rounded-full bg-gold transition-all duration-300"
              style={underlineStyle as React.CSSProperties}
            />
          </nav>
          <button
            onClick={onOpenContact}
            className="rounded-full bg-gold px-[22px] py-2.5 text-[13.5px] font-bold text-night transition-all hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(242,184,75,0.38)]"
          >
            Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ð¸ Ð¿Ð¾Ð´Ñ–ÑŽ
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Ð—Ð°ÐºÑ€Ð¸Ñ‚Ð¸ Ð¼ÐµÐ½ÑŽ' : 'Ð’Ñ–Ð´ÐºÑ€Ð¸Ñ‚Ð¸ Ð¼ÐµÐ½ÑŽ'}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-gold/12 bg-night/95 backdrop-blur-[14px] md:hidden">
          <div className="flex flex-col items-center gap-5 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(link.fraction)
                  setMobileOpen(false)
                }}
                className="text-[15px] font-medium text-mist transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onOpenContact()
                setMobileOpen(false)
              }}
              className="rounded-full bg-gold px-7 py-3 text-[14px] font-bold text-night"
            >
              Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ð¸ Ð¿Ð¾Ð´Ñ–ÑŽ
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
``n

---

## components/ContactPanel.tsx

``tsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Z } from '../lib/zIndex'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  contact: string
  message: string
}

export function ContactPanel({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>({ name: '', contact: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'hero' }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          initial={{ y: 340 }}
          animate={{ y: 0 }}
          exit={{ y: 340 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-1/2 w-[min(500px,92vw)] -translate-x-1/2 rounded-t-[22px] border border-gold/28 bg-[rgba(18,23,48,0.94)] px-[34px] pb-9 pt-8 backdrop-blur-[18px] shadow-[0_-24px_70px_rgba(0,0,0,0.45)]"
          style={{ zIndex: Z.contactPanel }}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute right-4 top-3.5 border-none bg-transparent text-[22px] text-mist-soft transition-colors hover:text-gold"
            aria-label="Ð—Ð°ÐºÑ€Ð¸Ñ‚Ð¸"
          >
            &times;
          </button>

          <h3 id="contact-title" className="font-display text-[21px]">Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ð¸ Ð¿Ð¾Ð´Ñ–ÑŽ</h3>

          {status === 'success' ? (
            <p className="mt-4 text-[15px] text-mist">
              Ð”ÑÐºÑƒÑ”Ð¼Ð¾! ÐœÐ¸ Ð·Ð²'ÑÐ¶ÐµÐ¼Ð¾ÑÑ Ð½Ð°Ð¹Ð±Ð»Ð¸Ð¶Ñ‡Ð¸Ð¼ Ñ‡Ð°ÑÐ¾Ð¼.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ð’Ð°ÑˆÐµ Ñ–Ð¼'Ñ"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold"
              />
              <input
                type="text"
                placeholder="Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½ Ð°Ð±Ð¾ email"
                required
                value={form.contact}
                onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold"
              />
              <textarea
                placeholder="ÐŸÐ¾Ð²Ñ–Ð´Ð¾Ð¼Ð»ÐµÐ½Ð½Ñ (Ð½ÐµÐ¾Ð±Ð¾Ð²'ÑÐ·ÐºÐ¾Ð²Ð¾)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold resize-none"
              />
              {status === 'error' && (
                <p className="text-[13px] text-coral">
                  Ð©Ð¾ÑÑŒ Ð¿Ñ–ÑˆÐ»Ð¾ Ð½Ðµ Ñ‚Ð°Ðº. Ð¡Ð¿Ñ€Ð¾Ð±ÑƒÐ¹Ñ‚Ðµ Ñ‰Ðµ Ñ€Ð°Ð· Ð°Ð±Ð¾ Ð½Ð°Ð¿Ð¸ÑˆÑ–Ñ‚ÑŒ Ð½Ð°Ð¼.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-1 rounded-full border-none bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] disabled:opacity-60"
              >
                {status === 'loading' ? 'ÐÐ°Ð´ÑÐ¸Ð»Ð°ÑŽ...' : 'ÐÐ°Ð´Ñ–ÑÐ»Ð°Ñ‚Ð¸'}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
``n

---

## components/Footer.tsx

``tsx
import { Z } from '../lib/zIndex'

interface Props {
  onOpenContact: () => void
}

export function Footer({ onOpenContact }: Props) {
  return (
    <footer className="relative border-t border-gold/12 bg-night py-9 text-[13px] text-mist-soft" style={{ zIndex: Z.footer }}>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3.5 px-7">
        <span>&copy; 2026 Ð¡Ð²Ñ–Ñ‚Ð»Ð¾ Ð—Ð½Ð°Ð½ÑŒ. Ð£ÑÐ²Ð° Ð¾Ð¶Ð¸Ð²Ð°Ñ”.</span>
        <ul className="flex list-none gap-[22px]">
          <li>
            <a href="#top" className="text-mist-soft transition-colors hover:text-gold">
              ÐŸÑƒÐ±Ð»Ñ–Ñ‡Ð½Ð° Ð¾Ñ„ÐµÑ€Ñ‚Ð°
            </a>
          </li>
          <li>
            <a href="#top" className="text-mist-soft transition-colors hover:text-gold">
              ÐŸÐ¾Ð»Ñ–Ñ‚Ð¸ÐºÐ° ÐºÐ¾Ð½Ñ„Ñ–Ð´ÐµÐ½Ñ†Ñ–Ð¹Ð½Ð¾ÑÑ‚Ñ–
            </a>
          </li>
          <li>
            <button
              onClick={onOpenContact}
              className="text-mist-soft transition-colors hover:text-gold"
            >
              ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð¸
            </button>
          </li>
        </ul>
      </div>
    </footer>
  )
}
``n

---

## components/CursorGlow.tsx

``tsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { Z } from '../lib/zIndex'
import type { Timeline } from '../types/timeline'

interface Props {
  tl?: Timeline
}

const INTERACTIVE_SELECTOR = 'button, a, [role="button"], input, textarea, select, [tabindex]'

export function CursorGlow({ tl }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })
  const lerpRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  const updateGlowColor = useCallback(() => {
    if (!tl) return
    const r = Math.round(tl.lighting.accentR * 255)
    const g = Math.round(tl.lighting.accentG * 255)
    const b = Math.round(tl.lighting.accentB * 255)
    return `rgba(${r},${g},${b},0.14)`
  }, [tl])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setVisible(true)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(el ? !!el.closest(INTERACTIVE_SELECTOR) : false)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      lerpRef.current.x = lerp(lerpRef.current.x, posRef.current.x, 0.12)
      lerpRef.current.y = lerp(lerpRef.current.y, posRef.current.y, 0.12)
      setPos({ x: lerpRef.current.x, y: lerpRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const glowColor = updateGlowColor() ?? 'rgba(242,184,75,0.12)'
  const size = hovering ? 120 : 180
  const opacityVal = hovering ? 0.18 : 0.12

  return (
    <div
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
      aria-hidden="true"
      style={{
        zIndex: Z.cursorGlow,
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        opacity: visible ? opacityVal : 0,
        transition: 'opacity 0.4s, width 0.3s var(--ease-hero), height 0.3s var(--ease-hero)',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
      }}
    />
  )
}
``n

---

## components/ProgressRail.tsx

``tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { Z } from '../lib/zIndex'

interface Props {
  progress: MotionValue<number>
}

export function ProgressRail({ progress }: Props) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/6" style={{ zIndex: Z.progressRail }}>
      <motion.div
        className="h-full bg-gradient-to-r from-coral to-gold shadow-[0_0_12px_rgba(242,184,75,0.38)]"
        style={{ width }}
      />
    </div>
  )
}
``n

---

## components/ScrollHint.tsx

``tsx
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Z } from '../lib/zIndex'

interface Props {
  progress: MotionValue<number>
  finaleStrength: MotionValue<number>
}

export function ScrollHint({ progress, finaleStrength }: Props) {
  const [opacity, setOpacity] = useState(1)

  useMotionValueEvent(progress, 'change', (p) => {
    if (p > 0.015 || finaleStrength.get() > 0.3) {
      setOpacity(0)
    } else {
      setOpacity(1)
    }
  })

  useMotionValueEvent(finaleStrength, 'change', (s) => {
    if (s > 0.3) setOpacity(0)
  })

  return (
    <div
      className="pointer-events-none fixed bottom-7 left-1/2 -translate-x-1/2 text-center"
      style={{ zIndex: Z.scrollHint, opacity }}
    >
      <div className="mx-auto mb-2 h-8 w-px bg-gradient-to-b from-gold to-transparent">
        <div className="h-full w-full origin-top" style={{ animation: 'cueMove 2.4s cubic-bezier(.22,1,.36,1) infinite' }} />
      </div>
      <span className="text-[11px] uppercase tracking-[0.16em] text-mist-soft">
        Ð¡ÐºÑ€Ð¾Ð»ÑŒÑ‚Ðµ, Ñ‰Ð¾Ð± Ð»ÐµÑ‚Ñ–Ñ‚Ð¸ Ð´Ð°Ð»Ñ–
      </span>
    </div>
  )
}
``n

---

## components/SoundToggle.tsx

``tsx
import { useAudioAmbience } from '../hooks/useAudioAmbience'
import { Z } from '../lib/zIndex'

export function SoundToggle() {
  const { soundOn, toggle } = useAudioAmbience()

  return (
    <button
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Ð’Ð¸Ð¼ÐºÐ½ÑƒÑ‚Ð¸ Ð·Ð²ÑƒÐº' : 'Ð£Ð²Ñ–Ð¼ÐºÐ½ÑƒÑ‚Ð¸ Ð·Ð²ÑƒÐº'}
      className={`fixed bottom-5 right-5 flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-night/70 backdrop-blur-[12px] transition-all hover:scale-[1.08] ${
        soundOn
          ? 'border-gold shadow-[0_0_22px_rgba(242,184,75,0.38)]'
          : 'border-gold/35'
      }`}
      style={{ zIndex: Z.soundToggle }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#FBF5EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {soundOn ? (
          <>
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </>
        ) : (
          <>
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  )
}
``n

---

## components/MediaPlaceholder.tsx

``tsx
import { useRef, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  icon?: ReactNode
  className?: string
  src?: string
}

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-30">
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="20" r="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
      <path d="M4,34 L16,24 L26,30 L34,22 L44,30" stroke="#F2B84B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  )
}

export function MediaPlaceholder({ label, icon, className = '', src }: Props) {
  if (src) {
    return <VideoMedia src={src} className={className} />
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gold/25 bg-white/[0.03] ${className}`}
    >
      <div className="flex flex-col items-center gap-2.5 text-center">
        {icon ?? <PlaceholderIcon />}
        <span className="text-[11px] uppercase tracking-[0.12em] text-mist-soft/50">{label}</span>
      </div>
    </div>
  )
}

function VideoMedia({ src, className }: { src: string; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onCanPlay = useCallback(() => setReady(true), [])

  const onError = useCallback(() => {
    setFailed(true)
    console.error('[VideoMedia] failed to load:', src)
  }, [src])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !inView) return
    v.addEventListener('loadeddata', onCanPlay)
    v.addEventListener('error', onError)
    v.load()
    return () => {
      v.removeEventListener('loadeddata', onCanPlay)
      v.removeEventListener('error', onError)
    }
  }, [src, inView, onCanPlay, onError])

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-2xl bg-night ${className}`}>
      {inView && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(!ready && !failed) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlaceholderIcon />
        </div>
      )}
    </div>
  )
}
``n

---

## components/beats/HeroBeat.tsx

``tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { MEDIA_URLS } from '../../data/media'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

const HERO_WORDS = ['Ð£ÑÐ²Ð°']

export function HeroBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 0)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Ð“Ð¾Ð»Ð¾Ð²Ð½Ð° ÑÐµÐºÑ†Ñ–Ñ"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px] iris-reveal">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          ÐžÑÐ²Ñ–Ñ‚Ð½Ñ– Ð¿Ð¾Ð´Ñ–Ñ— Ð´Ð»Ñ Ð´Ñ–Ñ‚ÐµÐ¹
        </p>

        <h1 className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper">
          {HERO_WORDS.map((word, i) => (
            <span
              key={i}
              className="stagger-word"
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              {word}
            </span>
          ))}
          <br />
          <em
            className="font-serif italic text-gold stagger-word glow-word jelly-hover"
            style={{ animationDelay: '0.45s' }}
          >
            Ð¾Ð¶Ð¸Ð²Ð°Ñ”
          </em>
        </h1>

        <p
          className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist stagger-word"
          style={{ animationDelay: '0.6s' }}
        >
          ÐœÐ¸ ÑÑ‚Ð²Ð¾Ñ€ÑŽÑ”Ð¼Ð¾ ÑÑƒÑ‡Ð°ÑÐ½Ñ– Ð¾ÑÐ²Ñ–Ñ‚Ð½Ñ– Ð¿Ð¾Ð´Ñ–Ñ—, ÑÐºÑ– Ð´Ñ–Ñ‚Ð¸ Ð¿Ð°Ð¼'ÑÑ‚Ð°ÑŽÑ‚ÑŒ Ñ€Ð¾ÐºÐ°Ð¼Ð¸.
        </p>

        <div
          className="stagger-word"
          style={{ animationDelay: '0.75s' }}
        >
          <MediaPlaceholder
            label="Ð’Ñ–Ð´ÐµÐ¾-Ð¿Ñ€ÐµÐ²Ê¼ÑŽ Ð¿Ð¾Ð´Ñ–Ñ—"
            src={MEDIA_URLS.heroPreview}
            className="mx-auto mt-8 h-[min(220px,30vw)] w-[min(420px,80vw)]"
          />
        </div>

        <div
          className="mt-9 flex flex-wrap justify-center gap-3.5 stagger-word"
          style={{ animationDelay: '0.9s' }}
        >
          <button className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] active:scale-[0.97]">
            Ð›ÐµÑ‚Ð¸Ð¼Ð¾ Ð´Ð°Ð»Ñ–
          </button>
          <button
            onClick={onOpenContact}
            className="rounded-full border border-white/32 bg-transparent px-7 py-3.5 text-[14.5px] font-bold text-paper transition-all hover:-translate-y-[3px] hover:border-gold hover:text-gold active:scale-[0.97]"
          >
            Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ð¸ Ð¿Ð¾Ð´Ñ–ÑŽ
          </button>
        </div>
      </div>
    </motion.div>
  )
}
``n

---

## components/beats/ManifestBeat.tsx

``tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
}

export function ManifestBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 1)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="ÐÐ°Ñˆ Ð¿Ñ€Ð¸Ð½Ñ†Ð¸Ð¿"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          ÐÐ°Ñˆ Ð¿Ñ€Ð¸Ð½Ñ†Ð¸Ð¿
        </p>
        <p className="text-[clamp(24px,3.5vw,40px)] leading-[1.35] text-paper">
          <span className="stagger-word inline-block" style={{ animationDelay: '0.25s' }}>
            ÐœÐ¸ Ð½Ðµ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¸Ð¼Ð¾ Ð·Ð°Ñ…Ð¾Ð´Ð¸.
          </span>
          <br />
          <span className="stagger-word inline-block" style={{ animationDelay: '0.45s' }}>
            ÐœÐ¸ Ð·Ð°Ð¿Ð°Ð»ÑŽÑ”Ð¼Ð¾{' '}
            <span className="glow-word-coral">ÑÐ²Ñ–Ñ‚Ð»Ð¾</span>
            {' '}Ð² Ð¾Ñ‡Ð°Ñ… Ð´Ñ–Ñ‚ÐµÐ¹.
          </span>
        </p>
        <div className="stagger-word" style={{ animationDelay: '0.65s' }}>
          <MediaPlaceholder
            label="Ð¤Ð¾Ñ‚Ð¾ Ð°Ð±Ð¾ Ð²Ñ–Ð´ÐµÐ¾ Ð· Ð¿Ð¾Ð´Ñ–Ñ—"
            src={MEDIA_URLS.malyuvaika}
            className="mx-auto mt-8 h-[min(180px,24vw)] w-[min(380px,75vw)]"
          />
        </div>
      </div>
    </motion.div>
  )
}
``n

---

## components/beats/PillarsBeat.tsx

``tsx
import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { PILLARS } from '../../data/pillars'

const PILLAR_ICONS = [
  <svg key="clock" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <circle cx="22" cy="22" r="16" stroke="#F2B84B" strokeWidth="1.6" pathLength={1} className="pillar-stroke" />
    <path d="M22 13v9l6 4" stroke="#FF7A59" strokeWidth="1.8" strokeLinecap="round" pathLength={1} className="pillar-stroke" />
  </svg>,
  <svg key="person" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <path d="M8 34c0-8 6-13 14-13s14 5 14 13" stroke="#F2B84B" strokeWidth="1.6" strokeLinecap="round" pathLength={1} className="pillar-stroke" />
    <circle cx="22" cy="14" r="7" stroke="#FF7A59" strokeWidth="1.8" pathLength={1} className="pillar-stroke" />
  </svg>,
  <svg key="star" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <path d="M22 8l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" stroke="#F2B84B" strokeWidth="1.6" strokeLinejoin="round" pathLength={1} className="pillar-stroke" />
  </svg>,
  <svg key="cross" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <path d="M10 22h24M22 10v24" stroke="#F2B84B" strokeWidth="1.6" strokeLinecap="round" pathLength={1} className="pillar-stroke" />
    <circle cx="22" cy="22" r="15" stroke="#FF7A59" strokeWidth="1.6" pathLength={1} className="pillar-stroke" />
  </svg>,
]

interface Props {
  progress: MotionValue<number>
}

export function PillarsBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 2)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Ð§Ð¾Ð¼Ñƒ Ð½Ð°Ð¼ Ð´Ð¾Ð²Ñ–Ñ€ÑÑŽÑ‚ÑŒ"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Ð§Ð¾Ð¼Ñƒ Ð½Ð°Ð¼ Ð´Ð¾Ð²Ñ–Ñ€ÑÑŽÑ‚ÑŒ
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Ð”Ð¾Ð²Ñ–Ñ€Ð° Ð±ÑƒÐ´ÑƒÑ”Ñ‚ÑŒÑÑ Ð½Ð° Ð´ÐµÑ‚Ð°Ð»ÑÑ…
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-[26px]">
          {PILLARS.map((pillar, idx) => (
            <PillarItem
              key={idx}
              pillar={pillar}
              icon={PILLAR_ICONS[idx]}
              index={idx}
              strength={strength}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function PillarItem({
  pillar,
  icon,
  index,
  strength,
}: {
  pillar: (typeof PILLARS)[number]
  icon: React.ReactNode
  index: number
  strength: MotionValue<number>
}) {
  const litThreshold = 0.05 + index * 0.12
  const opacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0, 0, 1])
  const translateY = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [12, 12, 0])
  const scale = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.96, 0.96, 1])
  const elRef = useRef<HTMLDivElement>(null)
  const drawnRef = useRef(false)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > litThreshold && !drawnRef.current && elRef.current) {
      drawnRef.current = true
      elRef.current.querySelectorAll('.pillar-stroke').forEach((el) => {
        (el as HTMLElement).style.strokeDashoffset = '0'
      })
    }
  })

  return (
    <motion.div
      ref={elRef}
      className="max-w-[180px] text-center"
      style={{ opacity, y: translateY, scale }}
    >
      {icon}
      <h3 className="mb-1.5 text-[15px] font-bold">{pillar.title}</h3>
      <p className="text-[13px] leading-[1.4] text-mist-soft">{pillar.description}</p>
    </motion.div>
  )
}
``n

---

## components/beats/WorldBeat.tsx

``tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { BEAT_CONTENT, WORLD_BEATS } from '../../data/worlds'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
  beatIndex: number
}

const WORLD_ICONS: Record<number, string> = {
  3: 'ÐœÐ°Ð»ÑŽÐ²Ð°Ð¹ÐºÐ° â€” Ð·Ð°Ð½ÑÑ‚Ñ‚Ñ',
  4: 'Ð Ð¸Ð±ÐºÐ° Ð¾Ð¶Ð¸Ð²Ð°Ñ”',
  5: 'Ð“Ð¾Ð»Ð¾Ð³Ñ€Ð°Ð¼Ð° â€” Ð¿Ñ€Ð¾ÐµÐºÑ†Ñ–Ñ',
  6: 'Popify â€” Ð·Ð¹Ð¾Ð¼ÐºÐ°',
  7: 'Popify â€” Ð¿Ñ€Ð°Ð¹Ñ',
}

const WORLD_MEDIA: Record<number, string | undefined> = {
  4: MEDIA_URLS.malyuvaika,
  5: MEDIA_URLS.hologramEvent,
  6: MEDIA_URLS.popify,
}

function getWorldKey(beatIndex: number): string {
  for (const wb of WORLD_BEATS) {
    if (wb.beatIndices.includes(beatIndex)) return wb.portalKey
  }
  return 'default'
}

function getMediaAnimClass(worldKey: string): string {
  switch (worldKey) {
    case 'malyuvaika': return 'world-organic-entry'
    case 'hologram': return 'world-scan-entry'
    case 'popify': return 'world-bounce-entry'
    default: return ''
  }
}

export function WorldBeat({ progress, beatIndex }: Props) {
  const strength = useBeatStrength(progress, beatIndex)
  const y = useTransform(strength, [0, 1], [22, 0])
  const content = BEAT_CONTENT[beatIndex]
  if (!content) return null

  const worldKey = getWorldKey(beatIndex)
  const mediaAnimClass = getMediaAnimClass(worldKey)

  return (
    <motion.div
      role="region"
      aria-label={content.heading}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
        <div className={`${mediaAnimClass} h-[min(200px,28vw)] w-full shrink-0 md:h-[200px] md:w-[280px]`}>
          <MediaPlaceholder
            label={WORLD_ICONS[beatIndex] ?? 'Ð†Ð»ÑŽÑÑ‚Ñ€Ð°Ñ†Ñ–Ñ'}
            src={WORLD_MEDIA[beatIndex]}
            className="h-full w-full"
          />
        </div>
        <div className="max-w-[480px]">
          <p
            className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
            style={{ animationDelay: '0.1s' }}
          >
            {content.eyebrow}
          </p>
          <h2
            className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
            style={{ animationDelay: '0.2s' }}
          >
            {content.heading}
          </h2>
          {content.sub && (
            <p
              className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0 stagger-word"
              style={{ animationDelay: '0.35s' }}
            >
              {content.sub}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
``n

---

## components/beats/TimelineBeat.tsx

``tsx
import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { TIMELINE_STEPS } from '../../data/timeline'

interface Props {
  progress: MotionValue<number>
}

export function TimelineBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 8)
  const y = useTransform(strength, [0, 1], [22, 0])
  const [linePct, setLinePct] = useState(0)

  useMotionValueEvent(strength, 'change', (s) => {
    setLinePct(Math.round(clamp01(s) * 100))
  })

  return (
    <motion.div
      role="region"
      aria-label="Ð¯Ðº Ð¿Ñ€Ð¾Ñ…Ð¾Ð´Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ñ–Ñ"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          ÐŸ'ÑÑ‚ÑŒ ÐºÑ€Ð¾ÐºÑ–Ð²
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Ð¯Ðº Ð¿Ñ€Ð¾Ñ…Ð¾Ð´Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ñ–Ñ
        </h2>
        <div className="relative mx-auto mt-[42px] w-[min(700px,90vw)] pt-2">
          <div className="absolute top-[9px] left-0 right-0 h-px bg-gold/22" />
          <div
            className="absolute top-[9px] left-0 h-px bg-gradient-to-r from-gold to-coral"
            style={{ width: `${linePct}%`, transition: 'width 0.4s var(--ease-hero)' }}
          />
          <div className="relative flex justify-between">
            {TIMELINE_STEPS.map((step, idx) => (
              <TimelineStepItem key={idx} step={step} index={idx} strength={strength} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

function TimelineStepItem({
  step,
  index,
  strength,
}: {
  step: (typeof TIMELINE_STEPS)[number]
  index: number
  strength: MotionValue<number>
}) {
  const litThreshold = 0.05 + index * 0.14
  const dotBg = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['transparent', 'transparent', '#F2B84B'])
  const dotScale = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['scale(1)', 'scale(1)', 'scale(1.2)'])
  const labelOpacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0, 0, 1])
  const sparkRef = useRef<HTMLSpanElement>(null)
  const sparkedRef = useRef(false)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > litThreshold && !sparkedRef.current && sparkRef.current) {
      sparkedRef.current = true
      sparkRef.current.classList.add('dot-spark-active')
    }
  })

  return (
    <div className="flex w-[20%] flex-col items-center gap-2.5">
      <span className="relative">
        <motion.span
          ref={sparkRef}
          className="block h-3.5 w-3.5 rounded-full border-2 border-gold"
          style={{ backgroundColor: dotBg, transform: dotScale }}
        />
        <span className="dot-spark-ring absolute inset-[-5px] rounded-full" />
      </span>
      <motion.span
        className="text-[12px] text-mist-soft"
        style={{ opacity: labelOpacity }}
      >
        {step.label}
      </motion.span>
    </div>
  )
}
``n

---

## components/beats/GalleryBeat.tsx

``tsx
import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { GALLERY_NODES } from '../../data/gallery'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
}

const ACCENTS = ['#F2B84B', '#FF7A59', '#8FE3E0', '#FF6EC7', '#F2B84B']
const ROTATIONS = [-2.5, 1.8, -1.2, 3.1, -0.7]

export function GalleryBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 9)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Ð“Ð°Ð»ÐµÑ€ÐµÑ ÐµÐ¼Ð¾Ñ†Ñ–Ð¹"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[820px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Ð“Ð°Ð»ÐµÑ€ÐµÑ ÐµÐ¼Ð¾Ñ†Ñ–Ð¹
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          ÐœÐ¾Ð¼ÐµÐ½Ñ‚Ð¸, ÑÐºÐ»Ð°Ð´ÐµÐ½Ñ– Ð² ÑÑƒÐ·Ñ–Ñ€&apos;Ñ
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {GALLERY_NODES.map((node, idx) => (
            <GalCard key={idx} node={node} index={idx} strength={strength} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function GalCard({
  node,
  index,
  strength,
}: {
  node: (typeof GALLERY_NODES)[number]
  index: number
  strength: MotionValue<number>
}) {
  const litThreshold = 0.02 + index * 0.14
  const opacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.3, 0.3, 1])
  const scaleVal = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.88, 0.88, 1])
  const accent = ACCENTS[index % ACCENTS.length]
  const rot = ROTATIONS[index % ROTATIONS.length]

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      style={{ opacity, scale: scaleVal }}
    >
      <div
        className="overflow-hidden rounded-xl border-2 bg-white/[0.03] transition-shadow hover:shadow-[0_0_20px_rgba(242,184,75,0.15)]"
        style={{
          borderColor: accent,
          transform: `rotate(${rot}deg)`,
          boxShadow: `0 0 0 1px ${accent}22`,
        }}
      >
        <MediaPlaceholder
          label={node.label}
          className="h-[100px] w-full"
        />
      </div>
      <span
        className="mt-1 text-[11px] font-medium"
        style={{ color: accent }}
      >
        {node.label}
      </span>
    </motion.div>
  )
}
``n

---

## components/beats/TeamVoicesBeat.tsx

``tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { CAMPFIRE_QUOTES } from '../../data/quotes'
import { TEAM_MEMBERS } from '../../data/team'

interface Props {
  progress: MotionValue<number>
}

export function TeamVoicesBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 10)
  const y = useTransform(strength, [0, 1], [22, 0])
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAMPFIRE_QUOTES.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      role="region"
      aria-label="Ð“Ð¾Ð»Ð¾ÑÐ¸ Ñ‚Ð° ÐºÐ¾Ð¼Ð°Ð½Ð´Ð°"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Ð“Ð¾Ð»Ð¾ÑÐ¸ Ñ‚Ð° ÐºÐ¾Ð¼Ð°Ð½Ð´Ð°
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Ð›ÑŽÐ´Ð¸, ÑÐºÐ¸Ñ… Ð½Ðµ ÑÐºÐ¾Ð¿Ñ–ÑŽÐ²Ð°Ñ‚Ð¸
        </h2>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-12">
          <div className="h-[42px] w-7">
            <svg viewBox="0 0 30 44">
              <path d="M15,4 C24,18 24,28 15,40 C6,28 6,18 15,4 Z" fill="#F2B84B" />
            </svg>
          </div>

          <div className="relative w-[min(500px,90vw)]" style={{ minHeight: 110 }}>
            {CAMPFIRE_QUOTES.map((quote, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: idx === activeIdx ? 1 : 0 }}
              >
                <p className="font-display text-[18.5px] leading-[1.42]">{quote.text}</p>
                <p className="mt-3 text-[12.5px] font-bold text-mist-soft">{quote.attribution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {TEAM_MEMBERS.map((member, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMember(idx)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 transition-all hover:-translate-y-[3px] ${
                selectedMember === idx
                  ? 'shadow-[0_0_18px_rgba(242,184,75,0.22)]'
                  : 'bg-white/[0.03]'
              }`}
              style={{
                borderColor: selectedMember === idx ? member.accent : `${member.accent}33`,
                backgroundColor: selectedMember === idx ? `${member.bg}cc` : undefined,
              }}
              aria-label={`${member.name}, ${member.role}`}
            >
              <div
                className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border"
                style={{ borderColor: `${member.accent}44`, backgroundColor: member.bg }}
              >
                <svg viewBox="0 0 48 48" className="h-7 w-7 opacity-40">
                  <circle cx="24" cy="18" r="8" stroke={member.accent} strokeWidth="1.5" fill="none" />
                  <path d="M10,44 C10,32 38,32 38,44" stroke={member.accent} strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span className="text-[11px] font-medium text-mist-soft">{member.name}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 min-h-[22px] text-[14px] text-mist italic">
          {selectedMember !== null
            ? TEAM_MEMBERS[selectedMember].phrase
            : 'ÐÐ°Ñ‚Ð¸ÑÐ½Ñ–Ñ‚ÑŒ Ð½Ð° Ð»ÑŽÐ´Ð¸Ð½Ñƒ, Ñ‰Ð¾Ð± Ð¿Ð¾Ñ‡ÑƒÑ‚Ð¸ Ñ—Ñ— Ñ–ÑÑ‚Ð¾Ñ€Ñ–ÑŽ.'}
        </p>
      </div>
    </motion.div>
  )
}
``n

---

## components/beats/StatsBeat.tsx

``tsx
import { MotionValue, motion, useTransform, useMotionValue, animate, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { STATS } from '../../data/stats'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  progress: MotionValue<number>
}

export function StatsBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 11)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Ð¦Ð¸Ñ„Ñ€Ð¸ ÑÐ²Ñ–Ñ‚Ð»Ð°"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Ð¦Ð¸Ñ„Ñ€Ð¸ ÑÐ²Ñ–Ñ‚Ð»Ð°
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          ÐÐµÐ±Ð¾, ÑÐºÐµ Ð¼Ð¸ Ð·Ð°Ð¿Ð°Ð»Ð¸Ð»Ð¸ Ñ€Ð°Ð·Ð¾Ð¼
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-10">
          {STATS.map((stat, idx) => (
            <StatItem key={idx} stat={stat} strength={strength} index={idx} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StatItem({
  stat,
  strength,
  index,
}: {
  stat: (typeof STATS)[number]
  strength: MotionValue<number>
  index: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [litStars, setLitStars] = useState(0)
  const [showBounce, setShowBounce] = useState(false)
  const triggeredRef = useRef(false)
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > 0.5 && !triggeredRef.current) {
      triggeredRef.current = true
      if (reduced) {
        setDisplayValue(stat.target)
        setLitStars(stat.starsCount)
        setShowBounce(true)
        return
      }
      animate(mv, stat.target, {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          setDisplayValue(Math.round(v))
          setLitStars(Math.round((stat.starsCount * v) / stat.target))
        },
        onComplete: () => {
          setShowBounce(true)
        },
      })
    }
  })

  return (
    <div
      className="w-[140px] stagger-word"
      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
    >
      <div className="mb-2.5 grid h-8 grid-cols-6 gap-[5px]">
        {Array.from({ length: stat.starsCount }, (_, i) => (
          <i
            key={i}
            className={`mx-auto h-1.5 w-1.5 justify-self-center rounded-full transition-all duration-300 ${
              i < litStars
                ? 'bg-gold shadow-[0_0_7px_rgba(242,184,75,0.38)] stat-star-lit'
                : 'bg-gold/14'
            }`}
          />
        ))}
      </div>
      <div
        className={`font-display text-[32px] text-paper transition-transform duration-300 ${
          showBounce ? 'stat-bounce' : ''
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {displayValue.toLocaleString('uk-UA')}{stat.suffix}
      </div>
      <div className="mt-[3px] text-[12.5px] text-mist-soft">{stat.label}</div>
    </div>
  )
}
``n

---

## components/beats/FinaleBeat.tsx

``tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
  onConfetti: (x: number, y: number) => void
}

export function FinaleBeat({ progress, onOpenContact, onConfetti }: Props) {
  const strength = useBeatStrength(progress, 12)
  const y = useTransform(strength, [0, 1], [22, 0])

  const handleClick = (e: React.MouseEvent) => {
    onOpenContact()
    onConfetti(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight * 0.7)
  }

  return (
    <motion.div
      role="region"
      aria-label="Ð—Ð°Ð¿Ñ€Ð¾ÑˆÐµÐ½Ð½Ñ"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Ð—Ð°Ð¿Ñ€Ð¾ÑˆÐµÐ½Ð½Ñ
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          ÐÐ°ÑÑ‚ÑƒÐ¿Ð½Ð° Ñ–ÑÑ‚Ð¾Ñ€Ñ–Ñ<br />
          Ð¼Ð¾Ð¶Ðµ Ð¿Ð¾Ñ‡Ð°Ñ‚Ð¸ÑÑ{' '}
          <em className="font-serif italic text-gold">Ñƒ Ð²Ð°ÑˆÑ–Ð¹ ÑˆÐºÐ¾Ð»Ñ–</em>
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <button
            onClick={handleClick}
            className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]"
          >
            Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ð¸ Ð¿Ð¾Ð´Ñ–ÑŽ
          </button>
        </div>
      </div>
    </motion.div>
  )
}
``n

---

## components/overlays/RocketOverlay.tsx

``tsx
import { useEffect, useRef, useState } from 'react'
import { clamp, lerp } from '../../lib/animation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Timeline } from '../../types/timeline'
import { ROCKET_WAYPOINTS } from '../../data/rocket'

interface Props {
  tl: Timeline
}

function interpolateRocket(progress: number, vw: number, vh: number) {
  const wp = ROCKET_WAYPOINTS
  const idx = progress * (wp.length - 1)
  const i0 = Math.min(Math.floor(idx), wp.length - 2)
  const f = idx - i0
  const a = wp[i0]
  const b = wp[i0 + 1]
  const x = lerp(a.x, b.x, f) * vw
  const y = lerp(a.y, b.y, f) * vh
  const dxPx = (b.x - a.x) * vw
  const dyPx = (b.y - a.y) * vh
  const heading = Math.atan2(dyPx, dxPx) * (180 / Math.PI) + 90
  return { x, y, heading }
}

function flamePath(base: string, scale: number): string {
  const m = base.match(/M([\d.-]+),([\d.-]+)\s*C([\d.-]+),([\d.-]+)\s+([\d.-]+),([\d.-]+)\s+([\d.-]+),([\d.-]+)/)
  if (!m) return base
  return `M${m[1]},${m[2]} C${parseFloat(m[3]) * scale},${parseFloat(m[4]) * scale} ${parseFloat(m[5]) * scale},${parseFloat(m[6]) * scale} ${parseFloat(m[7]) * scale},${parseFloat(m[8]) * scale}`
}

function flameTipPath(base: string, scale: number): string {
  const m = base.match(/M([\d.-]+),([\d.-]+)\s*L([\d.-]+),([\d.-]+)\s*L([\d.-]+),([\d.-]+)/)
  if (!m) return base
  return `M${m[1]},${m[2]} L${m[3]},${parseFloat(m[4]) * scale} L${m[5]},${parseFloat(m[6]) * scale}`
}

const FLAME_OUTER = 'M-8,55 C-4,72 4,72 8,55'
const FLAME_INNER = 'M-5,55 C-2,68 2,68 5,55'
const FLAME_TIP = 'M-2,55 L0,68 L2,55'

export function RocketOverlay({ tl }: Props) {
  const reduced = useReducedMotion()
  const [, setTick] = useState(0)
  const flameRef = useRef(1)

  useEffect(() => {
    const unsub = tl.subscribe(() => setTick((t) => t + 1))
    return unsub
  }, [tl])

  const t = tl
  const rocket = interpolateRocket(t.progress, t.vw, t.vh)
  const camX = rocket.x + t.parallax[5].x + t.camera.x + t.camera.shakeX
  const camY = rocket.y + t.parallax[5].y + t.camera.y + t.camera.shakeY
  const opacity = clamp(1 - t.beatStrengths[12] * 1.4, 0, 1)

  if (!reduced) {
    flameRef.current = 1 + Math.sin(t.elapsed / 90) * 0.12
  }
  const flameScale = flameRef.current
  const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)
  const engineGlow = 0.5 + speedFactor * 0.5

  const now = t.elapsed

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh', zIndex: 6 }}
      >
        {t.trailParticles.map((p) => {
          const age = clamp((now - p.born) / 800, 0, 1)
          const fade = 1 - age * age
          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r * (1 - age * 0.6)}
              fill={p.color}
              opacity={p.opacity * fade * opacity}
            />
          )
        })}
      </svg>

      <div
        className="pointer-events-none fixed"
        aria-hidden="true"
        style={{
          width: 100,
          height: 100,
          transform: `translate(${camX - 50}px, ${camY - 50}px) rotate(${rocket.heading}deg) scale(${t.camera.zoom})`,
          opacity,
          willChange: 'transform',
          zIndex: 6,
        }}
      >
        <svg viewBox="-50 -80 100 160" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="rocketBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF5EA" />
              <stop offset="100%" stopColor="#C9BFA8" />
            </linearGradient>
            <radialGradient id="rocketWindow" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#B8E8E5" />
              <stop offset="100%" stopColor="#5AACAA" />
            </radialGradient>
            <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2B84B" />
              <stop offset="60%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF7A59" stopOpacity={0.6 * engineGlow} />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="engineGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#F2B84B" stopOpacity={engineGlow * 0.3} />
              <stop offset="100%" stopColor="#F2B84B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g>
            <ellipse cx="0" cy="68" rx={14 + speedFactor * 4} ry={3 + speedFactor * 1.5} fill="rgba(11,14,31,0.25)" opacity={clamp(t.camera.depth * 2, 0, 0.35)} />
            <circle cx="0" cy="60" r={20 + speedFactor * 15} fill="url(#engineGlow)" />

            <path
              d="M0,-65 C20,-48 22,-15 22,10 C22,30 12,48 0,55 C-12,48 -22,30 -22,10 C-22,-15 -20,-48 0,-65 Z"
              fill="url(#rocketBody)"
              stroke="#E8DFC8"
              strokeWidth="1.2"
            />
            <path
              d="M0,-65 C10,-50 14,-20 14,5 L0,55 L-14,5 C-14,-20 -10,-50 0,-65 Z"
              fill="#FBF5EA"
              opacity="0.3"
            />
            <circle cx="0" cy="-18" r="10" fill="url(#rocketWindow)" stroke="#FBF5EA" strokeWidth="1.5" />
            <ellipse cx="0" cy="-21" rx="4" ry="3" fill="#FBF5EA" opacity="0.4" />

            <path d="M-22,18 L-38,40 L-22,32 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M22,18 L38,40 L22,32 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M-22,18 L-32,38" stroke="#FBF5EA" strokeWidth="1" opacity="0.5" />
            <path d="M22,18 L32,38" stroke="#FBF5EA" strokeWidth="1" opacity="0.5" />

            <path d={flamePath(FLAME_OUTER, flameScale * (1 + speedFactor * 0.3))} fill="url(#flameOuter)" opacity={engineGlow} />
            <path d={flamePath(FLAME_INNER, flameScale)} fill="url(#flameInner)" opacity={0.9 * engineGlow} />
            <path d={flameTipPath(FLAME_TIP, flameScale * (1 + speedFactor * 0.2))} fill="#FBF5EA" opacity={0.7 * engineGlow} />
          </g>
        </svg>
      </div>
    </>
  )
}
``n

---

## components/overlays/PortalOverlay.tsx

``tsx
import { useEffect, useState } from 'react'
import { clamp } from '../../lib/animation'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
}

interface PlanetState {
  portalS: number
  p0x: number
  p0y: number
  p1x: number
  p1y: number
  p2x: number
  p2y: number
  drift: number
  activePlanet: number
  breathPhase: number
}

export function PortalOverlay({ tl, subscribe }: Props) {
  const [s, setS] = useState<PlanetState>({
    portalS: 0, p0x: 0, p0y: 0, p1x: 0, p1y: 0, p2x: 0, p2y: 0, drift: 0,
    activePlanet: -1, breathPhase: 0,
  })

  useEffect(() => {
    return subscribe(() => {
      const bs = tl.beatStrengths
      const malyuvaikaS = Math.max(bs[3], bs[4])
      const hologramS = bs[5]
      const popifyS = Math.max(bs[6], bs[7])
      const f = bs[12]
      const portalS = clamp(Math.max(malyuvaikaS, hologramS, popifyS, f), 0, 1)
      const p = tl.progress

      let activePlanet = -1
      if (hologramS > 0.15) activePlanet = 0
      else if (malyuvaikaS > 0.15) activePlanet = 1
      else if (popifyS > 0.15) activePlanet = 2

      setS({
        portalS,
        p0x: 82 + Math.sin(p * 2.2) * 4,
        p0y: 18 + Math.cos(p * 1.7) * 3,
        p1x: 14 + Math.sin(p * 1.9 + 1) * 5,
        p1y: 62 + Math.cos(p * 2.3 + 0.5) * 4,
        p2x: 72 + Math.sin(p * 1.4 + 2) * 3,
        p2y: 74 + Math.cos(p * 1.8 + 1) * 3,
        drift: p * 360,
        activePlanet,
        breathPhase: (tl.elapsed / 1000) * 0.8,
      })
    })
  }, [tl, subscribe])

  const breath = Math.sin(s.breathPhase) * 0.03 + 1

  function planetScale(idx: number): string {
    if (s.activePlanet === idx) return `scale(${breath})`
    return 'scale(1)'
  }

  function glowOpacity(idx: number): number {
    if (s.activePlanet === idx) return 0.3
    return 0.12
  }

  return (
    <svg
      className="pointer-events-none fixed inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ zIndex: Z.overlays }}
    >
      <defs>
        <radialGradient id="planet0" cx="38%" cy="35%">
          <stop offset="0%" stopColor="#8FE3E0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#3A8E8A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1A4A48" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="planet0-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8FE3E0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8FE3E0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet1" cx="40%" cy="32%">
          <stop offset="0%" stopColor="#FFB088" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#CC5533" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5A1A0A" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="planet1-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FF7A59" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FF7A59" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet2" cx="36%" cy="38%">
          <stop offset="0%" stopColor="#FF6EC7" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#CC3399" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#6A1A4A" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="planet2-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FF6EC7" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FF6EC7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Planet 0 â€” teal, with ring (Ð“Ð¾Ð»Ð¾Ð³Ñ€Ð°Ð¼Ð°) */}
      <g
        opacity={s.portalS * 0.85}
        transform={`translate(${s.p0x},${s.p0y}) ${planetScale(0)}`}
        style={{ transition: 'transform 0.6s var(--ease-hero)' }}
      >
        <circle r="11" fill="url(#planet0-glow)" opacity={glowOpacity(0)} style={{ transition: 'opacity 0.5s' }} />
        <circle r="4.8" fill="url(#planet0)" />
        <ellipse
          rx="8.2"
          ry="1.6"
          fill="none"
          stroke="#8FE3E0"
          strokeWidth="0.4"
          opacity="0.5"
          transform="rotate(-18)"
        />
        <ellipse
          rx="8.2"
          ry="1.6"
          fill="none"
          stroke="#8FE3E0"
          strokeWidth="0.2"
          opacity="0.25"
          transform="rotate(-18)"
          strokeDasharray="1.2 0.8"
        />
      </g>

      {/* Planet 1 â€” coral, large gas giant (ÐœÐ°Ð»ÑŽÐ²Ð°Ð¹ÐºÐ°) */}
      <g
        opacity={s.portalS * 0.7}
        transform={`translate(${s.p1x},${s.p1y}) ${planetScale(1)}`}
        style={{ transition: 'transform 0.6s var(--ease-hero)' }}
      >
        <circle r="9" fill="url(#planet1-glow)" opacity={glowOpacity(1)} style={{ transition: 'opacity 0.5s' }} />
        <circle r="3.6" fill="url(#planet1)" />
        <path
          d="M-3.2,-0.4 Q0,-1.2 3.2,-0.4"
          fill="none"
          stroke="#FFB088"
          strokeWidth="0.25"
          opacity="0.3"
        />
        <path
          d="M-2.8,0.8 Q0,0.2 2.8,0.8"
          fill="none"
          stroke="#CC5533"
          strokeWidth="0.2"
          opacity="0.2"
        />
      </g>

      {/* Planet 2 â€” pink/magenta, with faint ring (Popify) */}
      <g
        opacity={s.portalS * 0.65}
        transform={`translate(${s.p2x},${s.p2y}) ${planetScale(2)}`}
        style={{ transition: 'transform 0.6s var(--ease-hero)' }}
      >
        <circle r="8" fill="url(#planet2-glow)" opacity={glowOpacity(2)} style={{ transition: 'opacity 0.5s' }} />
        <circle r="3" fill="url(#planet2)" />
        <ellipse
          rx="5.5"
          ry="1.1"
          fill="none"
          stroke="#FF6EC7"
          strokeWidth="0.3"
          opacity="0.35"
          transform="rotate(12)"
        />
      </g>

      {/* Tiny distant dots */}
      <g opacity={s.portalS * 0.4}>
        <circle cx={30 + Math.sin(s.drift * 0.01) * 2} cy="42" r="0.5" fill="#FF6EC7" opacity="0.5" />
        <circle cx={55 + Math.cos(s.drift * 0.008) * 1.5} cy="12" r="0.4" fill="#8FE3E0" opacity="0.4" />
        <circle cx={45 + Math.sin(s.drift * 0.012 + 1) * 1.8} cy="88" r="0.35" fill="#FF7A59" opacity="0.35" />
      </g>
    </svg>
  )
}
``n

---

## components/overlays/NebulaOverlay.tsx

``tsx
import { useEffect, useRef, useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
}

function buildGradient(accentR: number, accentG: number, accentB: number, progress: number): string {
  const hueShift = progress * 30
  const c1 = `rgb(${Math.round(accentR * 255)}, ${Math.round(accentG * 255)}, ${Math.round(accentB * 255)})`
  for (let k = 0; k < NEBULA_STOPS.length - 1; k++) {
    const s0 = NEBULA_STOPS[k]
    const s1 = NEBULA_STOPS[k + 1]
    if (progress >= s0.p && progress <= s1.p) {
      const t = (progress - s0.p) / (s1.p - s0.p)
      const c2 = lerpColor(s0.c1, s1.c1, t)
      const c3 = lerpColor(s0.c2, s1.c2, t)
      return [
        `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
        `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
      ].join(', ')
    }
  }
  const c2 = NEBULA_STOPS[0].c1
  const c3 = NEBULA_STOPS[0].c2
  return [
    `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
    `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
  ].join(', ')
}

export function NebulaOverlay({ tl, subscribe }: Props) {
  const bgRef = useRef('')
  const [, setTick] = useState(0)

  useEffect(() => {
    bgRef.current = buildGradient(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, tl.progress)
    const unsub = subscribe(() => {
      const g = buildGradient(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, tl.progress)
      if (g !== bgRef.current) {
        bgRef.current = g
        setTick((t) => t + 1)
      }
    })
    return unsub
  }, [tl, subscribe])

  return (
    <div className="pointer-events-none absolute -inset-[8%]" style={{ zIndex: Z.overlays }} aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: bgRef.current }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(255,122,89,0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
``n

---

## components/overlays/StarField.tsx

``tsx
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
``n

---

## components/overlays/GrassGround.tsx

``tsx
import { useEffect, useRef, useState } from 'react'
import { clamp } from '../../lib/animation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
}

const BLADE_COUNT = 28
const BLADE_SPACING = 1528 / BLADE_COUNT

interface Blade {
  x: number
  el: SVGLineElement | null
}

export function GrassGround({ tl, subscribe }: Props) {
  const strengthRef = useRef(0)
  const bladesRef = useRef<Blade[]>([])
  const mouseRef = useRef({ x: window.innerWidth / 2 })
  const reduced = useReducedMotion()
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const svgRef = useRef<SVGGElement>(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    return subscribe(() => {
      const s = tl.beatStrengths[5]
      strengthRef.current = s
      setOpacity(s)
    })
  }, [tl, subscribe])

  useEffect(() => {
    if (reduced) return

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const scaleX = 1600 / window.innerWidth

    const tick = (now: number) => {
      if (now - lastFrameRef.current < 33) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      lastFrameRef.current = now

      if (strengthRef.current > 0.12) {
        bladesRef.current.forEach((blade) => {
          if (!blade.el) return
          const bladeScreenX = blade.x / scaleX
          const dist = Math.abs(mouseRef.current.x - bladeScreenX)
          const influence = clamp(1 - dist / 140, 0, 1)
          const bend = influence * 16 * (mouseRef.current.x > bladeScreenX ? 1 : -1)
          blade.el.setAttribute('transform', `translate(${blade.x},0) skewX(${bend.toFixed(2)})`)
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [reduced])

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g ref={svgRef} transform="translate(0,760)">
        {Array.from({ length: BLADE_COUNT }, (_, i) => {
          const x = 36 + i * BLADE_SPACING
          return (
            <line
              key={i}
              ref={(el) => {
                bladesRef.current[i] = { x, el }
              }}
              x1={x}
              y1={0}
              x2={x}
              y2={-32}
              stroke="#FBF5EA"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.52"
            />
          )
        })}
      </g>
      <g transform="translate(180,760)">
        <path d="M0,90 L0,10" stroke="#FBF5EA" strokeWidth="2.1" strokeLinecap="round" />
        <path
          d="M0,40 C-30,26 -46,4 -40,-24"
          stroke="#FBF5EA"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0,26 C26,10 40,-8 36,-34"
          stroke="#FBF5EA"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="-40" cy="-24" r="4" fill="#F2B84B" />
        <circle cx="36" cy="-34" r="4" fill="#FF7A59" />
        <circle cx="4" cy="-12" r="4" fill="#F2B84B" />
      </g>
    </svg>
  )
}
``n

---

## data/media.ts

``ts
const BLOB_BASE = 'https://n1gzcjyiqdwr3azb.public.blob.vercel-storage.com'

export const MEDIA_URLS = {
  heroPreview: `${BLOB_BASE}/Hologram_Event_Kids_S%D1%81hool.mp4`,
  malyuvaika: `${BLOB_BASE}/%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%20-%20%D0%BC%D0%B0%D0%BB%D1%8E%D0%B2%D0%B0%D0%B9%D0%BA%D0%B0.MP4`,
  hologramEvent: `${BLOB_BASE}/Hologram_Event_Kids_S%D1%81hool.mp4`,
  hologramReaction: `${BLOB_BASE}/IMG_6455.MP4`,
  popify: `${BLOB_BASE}/%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%20%D0%BF%D0%BE%D0%BF%D1%96%D1%84%D0%B0%D0%B9.MP4`,
} as const
``n

---

## data/worlds.ts

``ts
export type WorldKey = 'malyuvaika' | 'hologram' | 'popify'

export interface WorldBeatData {
  beatIndices: number[]
  portalKey: WorldKey
}

export interface BeatContent {
  eyebrow: string
  heading: string
  sub?: string
}

export const WORLD_BEATS: WorldBeatData[] = [
  { beatIndices: [3, 4], portalKey: 'malyuvaika' },
  { beatIndices: [5], portalKey: 'hologram' },
  { beatIndices: [6, 7], portalKey: 'popify' },
]

export const BEAT_CONTENT: Record<number, BeatContent> = {
  3: {
    eyebrow: 'ÐŸÑ€Ð¾Ñ”ÐºÑ‚ 01 Â· ÐœÐ°Ð»ÑŽÐ²Ð°Ð¹ÐºÐ°',
    heading: 'Ð¡Ð²Ñ–Ñ‚ Ñ„Ð°Ñ€Ð± Ñ– Ñ„Ð°Ð½Ñ‚Ð°Ð·Ñ–Ñ—',
    sub: 'Ð Ð¾Ð·Ð²Ð¸Ð²Ð°Ð»ÑŒÐ½Ð¸Ð¹ Ð¿Ñ€Ð¾Ñ”ÐºÑ‚ Ð´Ð»Ñ Ð´Ð¸Ñ‚ÑÑ‡Ð¾Ð³Ð¾ ÑÐ°Ð´Ð¾Ñ‡ÐºÐ°: ÑƒÑÐ²Ð°, Ð´Ñ€Ñ–Ð±Ð½Ð° Ð¼Ð¾Ñ‚Ð¾Ñ€Ð¸ÐºÐ° Ð¹ ÑƒÐ¿ÐµÐ²Ð½ÐµÐ½Ñ–ÑÑ‚ÑŒ Ñƒ ÑÐ¾Ð±Ñ– Ñ‡ÐµÑ€ÐµÐ· ÑÑÐºÑ€Ð°Ð²Ñƒ Ñ‚Ð²Ð¾Ñ€Ñ‡Ñ–ÑÑ‚ÑŒ.',
  },
  4: {
    eyebrow: 'Ð§Ð°Ñ€Ñ–Ð²Ð½Ðµ Ð¼Ð¾Ñ€Ðµ',
    heading: 'ÐÐ°Ð¼Ð°Ð»ÑŽÐ¹ Ñ€Ð¸Ð±ÐºÑƒ â€” Ñ– Ð²Ð¾Ð½Ð° Ð¾Ð¶Ð¸Ð²Ðµ',
    sub: "ÐšÐ¾Ð¶Ð½Ð° Ð´Ð¸Ñ‚Ð¸Ð½Ð° Ð¼Ð°Ð»ÑŽÑ” ÑÐ²Ð¾ÑŽ Ñ€Ð¸Ð±ÐºÑƒ Ð· Ð»ÑŽÐ±Ð¾Ð²'ÑŽ â€” Ð° Ð¿Ð¾Ñ‚Ñ–Ð¼ Ð±Ð°Ñ‡Ð¸Ñ‚ÑŒ, ÑÐº Ñ‚Ð° Ð¾Ð¶Ð¸Ð²Ð°Ñ” Ð¹ Ð¿Ð»Ð¸Ð²Ðµ Ð² Ñ‡Ð°Ñ€Ñ–Ð²Ð½Ð¾Ð¼Ñƒ Ð¼Ð¾Ñ€Ñ–.",
  },
  5: {
    eyebrow: 'ÐŸÑ€Ð¾Ñ”ÐºÑ‚ 02 Â· Ð“Ð¾Ð»Ð¾Ð³Ñ€Ð°Ð¼Ð°',
    heading: 'Ð¡Ð²Ñ–Ñ‚ Ð“Ð¾Ð»Ð¾Ð³Ñ€Ð°Ð¼',
    sub: "ÐžÐ±'Ñ”Ð¼Ð½Ñ– 3D-Ð¿Ñ€Ð¾ÐµÐºÑ†Ñ–Ñ— Ð¾Ð¶Ð¸Ð²Ð°ÑŽÑ‚ÑŒ Ð¿Ñ€ÑÐ¼Ð¾ Ð² Ð·Ð°Ð»Ñ– â€” Ð±ÐµÐ· Ð¾ÐºÑƒÐ»ÑÑ€Ñ–Ð², Ñ‚Ñ–Ð»ÑŒÐºÐ¸ Ñ‰Ð¸Ñ€Ð¸Ð¹ Ð¿Ð¾Ð´Ð¸Ð² Ð´Ñ–Ñ‚ÐµÐ¹.",
  },
  6: {
    eyebrow: 'ÐŸÑ€Ð¾Ñ”ÐºÑ‚ 03 Â· Popify',
    heading: 'Ð’Ñ–Ð´ÐµÐ¾ Ð½Ð° Ð·Ð³Ð°Ð´ÐºÑƒ',
    sub: 'Ð¡ÑƒÑ‡Ð°ÑÐ½Ð¸Ð¹ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ Ð·Ð¹Ð¾Ð¼ÐºÐ¸ ÑÑÐºÑ€Ð°Ð²Ð¸Ñ… 360Â°-Ð²Ñ–Ð´ÐµÐ¾. Ð£ÑÑ Ð°Ð¿Ð°Ñ€Ð°Ñ‚ÑƒÑ€Ð° â€” Ð½Ð°ÑˆÐ°. Ð’Ñ–Ð´ Ð´Ñ–Ñ‚ÐµÐ¹ Ð¿Ð¾Ñ‚Ñ€Ñ–Ð±Ð½Ñ– Ð»Ð¸ÑˆÐµ Ð½Ð°ÑÑ‚Ñ€Ñ–Ð¹ Ñ– ÑƒÐ»ÑŽÐ±Ð»ÐµÐ½Ð° Ð¿Ñ–ÑÐ½Ñ.',
  },
  7: {
    eyebrow: 'Ð¯Ðº Ñ†Ðµ Ð¿Ñ€Ð°Ñ†ÑŽÑ”',
    heading: 'Ð¡Ð²Ð¾Ñ” Ð²Ñ–Ð´ÐµÐ¾ Ð·Ð° ÐºÑ–Ð»ÑŒÐºÐ° Ñ…Ð²Ð¸Ð»Ð¸Ð½',
    sub: '1-2 Ð»ÑŽÐ´Ð¸Ð½Ð¸ Ñƒ ÐºÐ°Ð´Ñ€Ñ– â€” 200 Ð³Ñ€Ð½, 3 Ñ– Ð±Ñ–Ð»ÑŒÑˆÐµ â€” 100 Ð³Ñ€Ð½ Ð· ÐºÐ¾Ð¶Ð½Ð¾Ð³Ð¾. Ð¡Ð¿Ñ€Ð¾Ð±ÑƒÐ²Ð°Ñ‚Ð¸ Ð¼Ð¾Ð¶Ðµ ÐºÐ¾Ð¶ÐµÐ½ Ð¾Ñ…Ð¾Ñ‡Ð¸Ð¹.',
  },
}
``n

---

## data/nebula.ts

``ts
export interface NebulaStop {
  /** Progress position (0..1) */
  p: number
  /** Primary gradient color (hex) */
  c1: string
  /** Secondary gradient color (hex) */
  c2: string
}

export const NEBULA_STOPS: NebulaStop[] = [
  { p: 0.00, c1: '#3a1e63', c2: '#F2B84B' },
  { p: 0.18, c1: '#3a1e63', c2: '#F2B84B' },
  { p: 0.26, c1: '#1c6f8a', c2: '#8FE3E0' },
  { p: 0.40, c1: '#1c6f8a', c2: '#8FE3E0' },
  { p: 0.48, c1: '#6e3a1c', c2: '#FF7A59' },
  { p: 0.60, c1: '#6e3a1c', c2: '#FF7A59' },
  { p: 0.68, c1: '#7a1c53', c2: '#F2B84B' },
  { p: 0.80, c1: '#3a1e63', c2: '#8FE3E0' },
  { p: 0.90, c1: '#2a1c50', c2: '#F2B84B' },
  { p: 1.00, c1: '#1a1440', c2: '#F2B84B' },
]
``n

---

## data/rocket.ts

``ts
export interface RocketWaypoint {
  /** X position as fraction of viewport width */
  x: number
  /** Y position as fraction of viewport height */
  y: number
}

export const ROCKET_WAYPOINTS: RocketWaypoint[] = [
  { x: 0.50, y: 0.38 },
  { x: 0.78, y: 0.26 },
  { x: 0.18, y: 0.52 },
  { x: 0.72, y: 0.60 },
  { x: 0.26, y: 0.30 },
  { x: 0.68, y: 0.70 },
  { x: 0.32, y: 0.46 },
  { x: 0.74, y: 0.34 },
  { x: 0.48, y: 0.66 },
  { x: 0.22, y: 0.28 },
  { x: 0.72, y: 0.48 },
  { x: 0.50, y: 0.22 },
  { x: 0.50, y: 0.48 },
]
``n

---

## data/timeline.ts

``ts
export interface TimelineStep {
  label: string
}

export const TIMELINE_STEPS: TimelineStep[] = [
  { label: 'Ð—Ð½Ð°Ð¹Ð¾Ð¼ÑÑ‚Ð²Ð¾' },
  { label: 'ÐŸÑ–Ð´Ð³Ð¾Ñ‚Ð¾Ð²ÐºÐ°' },
  { label: 'ÐŸÑ€Ð¸Ñ—Ð·Ð´' },
  { label: 'ÐŸÐ¾Ð´Ñ–Ñ' },
  { label: 'Ð©Ð°ÑÐ»Ð¸Ð²Ñ– Ð´Ñ–Ñ‚Ð¸' },
]
``n

---

## data/team.ts

``ts
export interface TeamMember {
  name: string
  role: string
  phrase: string
  /** SVG avatar background and accent colors */
  bg: string
  accent: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'ÐœÐ°Ñ€Ñ–Ñ',
    role: 'Ñ€ÐµÐ¶Ð¸ÑÐµÑ€ÐºÐ°',
    phrase: 'Ð›ÑŽÐ±Ð»ÑŽ Ð¼Ð¾Ð¼ÐµÐ½Ñ‚, ÐºÐ¾Ð»Ð¸ Ð·Ð°Ð»Ð° Ð½Ð° ÑÐµÐºÑƒÐ½Ð´Ñƒ Ð·Ð°Ñ‚Ð¸Ñ…Ð°Ñ”.',
    bg: '#1E2447',
    accent: '#F2B84B',
  },
  {
    name: 'ÐžÐ»ÐµÐ³',
    role: 'Ñ‚ÐµÑ…Ð½Ñ–Ñ‡Ð½Ð¸Ð¹ Ð´Ð¸Ñ€ÐµÐºÑ‚Ð¾Ñ€',
    phrase: 'ÐÐ°Ð¹ÐºÑ€Ð°Ñ‰Ð° Ñ‚ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ñ–Ñ â€” Ñ‚Ð°, ÑÐºÐ¾Ñ— Ð½Ðµ Ð¿Ð¾Ð¼Ñ–Ñ‡Ð°ÑŽÑ‚ÑŒ.',
    bg: '#232848',
    accent: '#FF7A59',
  },
  {
    name: 'ÐÐ°ÑÑ‚Ñ',
    role: 'Ñ…ÑƒÐ´Ð¾Ð¶Ð½Ð¸Ñ†Ñ',
    phrase: 'ÐšÐ¾Ð¶ÐµÐ½ Ð¼Ð°Ð»ÑŽÐ½Ð¾Ðº Ð·Ð°ÑÐ»ÑƒÐ³Ð¾Ð²ÑƒÑ” Ð¾Ð¶Ð¸Ñ‚Ð¸ Ñ…Ð¾Ñ‡ Ñ€Ð°Ð·.',
    bg: '#141935',
    accent: '#F2B84B',
  },
  {
    name: 'Ð¢Ð°Ñ€Ð°Ñ',
    role: 'ÐºÐµÑ€Ñ–Ð²Ð½Ð¸Ðº',
    phrase: 'ÐÐ°Ð¹Ð²Ð°Ð¶Ð»Ð¸Ð²Ñ–ÑˆÐµ â€” Ñ‰Ð¾Ð± Ð´Ñ–Ñ‚Ð¸ Ð·Ð°Ð±ÑƒÐ»Ð¸, Ñ‰Ð¾ Ð¼Ð¸ Ð²Ð·Ð°Ð³Ð°Ð»Ñ– Ñ”.',
    bg: '#1E2447',
    accent: '#FF7A59',
  },
]
``n

---

## data/stats.ts

``ts
export interface StatBlock {
  target: number
  suffix: string
  starsCount: number
  label: string
}

export const STATS: StatBlock[] = [
  { target: 120, suffix: '+', starsCount: 12, label: 'Ð·Ð°ÐºÐ»Ð°Ð´Ñ–Ð²' },
  { target: 25000, suffix: '+', starsCount: 12, label: 'Ð´Ñ–Ñ‚ÐµÐ¹' },
  { target: 3, suffix: '', starsCount: 6, label: 'ÑƒÐ½Ñ–ÐºÐ°Ð»ÑŒÐ½Ñ– ÑÐ²Ñ–Ñ‚Ð¸' },
  { target: 100, suffix: '%', starsCount: 12, label: 'Ð²Ð»Ð°ÑÐ½Ñ– ÑÑ†ÐµÐ½Ð°Ñ€Ñ–Ñ—' },
]
``n

---

## data/quotes.ts

``ts
export interface CampfireQuote {
  text: string
  attribution: string
}

export const CAMPFIRE_QUOTES: CampfireQuote[] = [
  {
    text: 'Â«Ð¢Ð°ÐºÐ¾Ð³Ð¾ Ð·Ð°Ñ…Ð¾Ð¿Ð»ÐµÐ½Ð½Ñ Ð² Ð¾Ñ‡Ð°Ñ… Ð´Ñ–Ñ‚ÐµÐ¹ Ñ Ð½Ðµ Ð±Ð°Ñ‡Ð¸Ð»Ð° Ð·Ð° Ð´ÐµÑÑÑ‚ÑŒ Ñ€Ð¾ÐºÑ–Ð² Ñ€Ð¾Ð±Ð¾Ñ‚Ð¸ Ð² ÑˆÐºÐ¾Ð»Ñ–.Â»',
    attribution: 'Ð”Ð¸Ñ€ÐµÐºÑ‚Ð¾Ñ€ÐºÐ° ÑˆÐºÐ¾Ð»Ð¸, Ð¼. Ð›ÑŒÐ²Ñ–Ð²',
  },
  {
    text: 'Â«Ð’ÑÐµ Ð¾Ñ€Ð³Ð°Ð½Ñ–Ð·ÑƒÐ²Ð°Ð»Ð¸ Ñ‚Ð°Ðº, Ñ‰Ð¾ Ð¼Ð¸ Ð²Ð·Ð°Ð³Ð°Ð»Ñ– Ð½Ñ– Ð¿Ñ€Ð¾ Ñ‰Ð¾ Ð½Ðµ Ñ…Ð²Ð¸Ð»ÑŽÐ²Ð°Ð»Ð¸ÑÑŒ Ñƒ Ð´ÐµÐ½ÑŒ ÑÐ²ÑÑ‚Ð°.Â»',
    attribution: 'Ð’Ð¸Ñ…Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÐºÐ° Ð´Ð¸Ñ‚ÑÑ‡Ð¾Ð³Ð¾ ÑÐ°Ð´Ð¾Ñ‡ÐºÐ°',
  },
  {
    text: 'Â«ÐœÑ–Ð¹ Ð¼Ð°Ð»ÑŽÐ½Ð¾Ðº Ð¾Ð¶Ð¸Ð²! Ð’Ñ–Ð½ Ñ€ÑƒÑ…Ð°Ð²ÑÑ Ñ– Ð¼Ð°Ñ…Ð°Ð² Ð¼ÐµÐ½Ñ– Ñ€ÑƒÐºÐ¾ÑŽ.Â»',
    attribution: 'Ð£Ñ‡ÐµÐ½ÑŒ 3 ÐºÐ»Ð°ÑÑƒ',
  },
]
``n

---

## data/pillars.ts

``ts
export interface Pillar {
  title: string
  description: string
  /** SVG icon path data for 44x44 viewBox */
  iconPath: string
}

export const PILLARS: Pillar[] = [
  {
    title: 'Ð¡ÑƒÑ‡Ð°ÑÐ½Ðµ Ð¾Ð±Ð»Ð°Ð´Ð½Ð°Ð½Ð½Ñ',
    description: 'Ð’Ð»Ð°ÑÐ½Ñ– Ñ‚ÐµÑ…Ð½Ñ–Ñ‡Ð½Ñ– Ñ€Ð¾Ð·Ñ€Ð¾Ð±ÐºÐ¸.',
    iconPath: 'M22 13v9l6 4',
  },
  {
    title: 'Ð’Ð»Ð°ÑÐ½Ñ– ÑÑ†ÐµÐ½Ð°Ñ€Ñ–Ñ—',
    description: 'Ð–Ð¾Ð´Ð½Ð¸Ñ… ÑˆÐ°Ð±Ð»Ð¾Ð½Ð½Ð¸Ñ… Ð²Ð¸ÑÑ‚ÑƒÐ¿Ñ–Ð².',
    iconPath: 'M8 34c0-8 6-13 14-13s14 5 14 13',
  },
  {
    title: 'ÐšÐ¾Ð¼Ð°Ð½Ð´Ð°',
    description: 'Ð‡Ñ— Ð½ÐµÐ¼Ð¾Ð¶Ð»Ð¸Ð²Ð¾ ÑÐºÐ¾Ð¿Ñ–ÑŽÐ²Ð°Ñ‚Ð¸.',
    iconPath: 'M22 8l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z',
  },
  {
    title: 'Ð†Ð½Ð´Ð¸Ð²Ñ–Ð´ÑƒÐ°Ð»ÑŒÐ½Ð¸Ð¹ Ð¿Ñ–Ð´Ñ…Ñ–Ð´',
    description: 'ÐŸÑ–Ð´ Ð²Ñ–Ðº Ð´Ñ–Ñ‚ÐµÐ¹ Ñ– Ð¿Ñ€Ð¾ÑÑ‚Ñ–Ñ€.',
    iconPath: 'M10 22h24M22 10v24',
  },
]
``n

---

## data/gallery.ts

``ts
export interface GalleryNode {
  label: string
  /** Position as percentage of container */
  left: string
  top: string
}

export const GALLERY_NODES: GalleryNode[] = [
  { label: 'ÐŸÐµÑ€ÑˆÐ¸Ð¹ Ð¿Ð¾Ð´Ð¸Ð²', left: '8.5%', top: '76%' },
  { label: 'Ð¡Ð²Ñ–Ñ‚Ð»Ð¾ ÑˆÐ¾Ñƒ', left: '23%', top: '35%' },
  { label: 'ÐžÐ¶Ð¸Ð²Ð»ÐµÐ½Ð¸Ð¹ Ð³ÐµÑ€Ð¾Ð¹', left: '50%', top: '44%' },
  { label: 'Ð¢Ð¸ÑˆÐ° Ð¿ÐµÑ€ÐµÐ´ ÑˆÐ¾Ñƒ', left: '63%', top: '6%' },
  { label: 'ÐžÐ¿Ð»ÐµÑÐºÐ¸', left: '91%', top: '26%' },
]
``n

