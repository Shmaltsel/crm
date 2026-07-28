# @svitlo/hero — Project Bundle

**Generated:** 2026-07-28T20:37:44.232Z

## Project Tree

```
├── src/
│   ├── assets/
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── features/
│   │   └── landing-hero/
│   │       ├── components/
│   │       │   ├── beats/
│   │       │   │   ├── FinaleBeat.tsx
│   │       │   │   ├── GalleryBeat.tsx
│   │       │   │   ├── HeroBeat.tsx
│   │       │   │   ├── ManifestBeat.tsx
│   │       │   │   ├── PillarsBeat.tsx
│   │       │   │   ├── StatsBeat.tsx
│   │       │   │   ├── TeamVoicesBeat.tsx
│   │       │   │   ├── TimelineBeat.tsx
│   │       │   │   └── WorldBeat.tsx
│   │       │   ├── overlays/
│   │       │   │   ├── CampfireSparks.tsx
│   │       │   │   ├── GlobalAmbientCanvas.tsx
│   │       │   │   ├── GrassGround.tsx
│   │       │   │   ├── HeroBubbles.tsx
│   │       │   │   ├── NebulaOverlay.tsx
│   │       │   │   ├── PortalOverlay.tsx
│   │       │   │   ├── RocketOverlay.tsx
│   │       │   │   └── StarField.tsx
│   │       │   ├── BeatWrapper.tsx
│   │       │   ├── ContactPanel.tsx
│   │       │   ├── CursorGlow.tsx
│   │       │   ├── FilmGrain.tsx
│   │       │   ├── Footer.tsx
│   │       │   ├── HologramGallery.tsx
│   │       │   ├── MediaPlaceholder.tsx
│   │       │   ├── Nav.tsx
│   │       │   ├── ProgressRail.tsx
│   │       │   ├── ScrollHint.tsx
│   │       │   └── SoundToggle.tsx
│   │       ├── context/
│   │       │   └── AmbientContext.tsx
│   │       ├── data/
│   │       │   ├── gallery.ts
│   │       │   ├── media.ts
│   │       │   ├── nebula.ts
│   │       │   ├── pillars.ts
│   │       │   ├── quotes.ts
│   │       │   ├── rocket.ts
│   │       │   ├── stats.ts
│   │       │   ├── team.ts
│   │       │   ├── timeline.ts
│   │       │   └── worlds.ts
│   │       ├── hooks/
│   │       │   ├── useAudioAmbience.ts
│   │       │   ├── useBeatStrength.ts
│   │       │   ├── useBeatStrengths.ts
│   │       │   ├── useFirstScroll.ts
│   │       │   ├── useHeroIntro.ts
│   │       │   ├── useMotionTimeline.ts
│   │       │   ├── useReducedMotion.ts
│   │       │   ├── useRocketPath.ts
│   │       │   ├── useScrollSnap.ts
│   │       │   ├── useScrollStory.ts
│   │       │   └── useSmoothProgress.ts
│   │       ├── lib/
│   │       │   ├── animation.ts
│   │       │   ├── colors.ts
│   │       │   ├── rocketMath.ts
│   │       │   └── zIndex.ts
│   │       ├── types/
│   │       │   └── timeline.ts
│   │       └── LandingHero.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── HERO-BUNDLE.md
├── index.html
├── OVERLAY-BUNDLE.md
├── package.json
├── postcss.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Root Configs

### `package.json`
```json
{
  "name": "@svitlo/hero",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "bundle": "node ../../bundle-hero.js"
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

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})

```

### `tsconfig.json`
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

### `tsconfig.app.json`
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

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

### `tsconfig.node.json`
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

### `postcss.config.js`
```javascript
export default {
  plugins: {},
}

```

### `.oxlintrc.json`
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

## Source Files

### `src/App.tsx`
```typescript
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

```

### `src/features/landing-hero/components/beats/FinaleBeat.tsx`
```typescript
import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValueEvent, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAmbient } from '../../context/AmbientContext'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

export function FinaleBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 12)
  const reduced = useReducedMotion()
  const ambient = useAmbient()
  const [dustSpawned, setDustSpawned] = useState(false)
  const [visible, setVisible] = useState(false)
  const isSunriseActive = useRef(false)
  const landingAnimDone = useRef(false)
  const fallbackTimerRef = useRef(0)

  const sparkRef = useRef<HTMLDivElement>(null)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)
  const ctaLabelRef = useRef<HTMLSpanElement>(null)

  const horizonY = useTransform(strength, [0, 0.5, 1], ['110%', '85%', '75%'])
  const rocketY = useTransform(strength, [0, 0.7, 0.9, 1], ['50%', '70%', '80%', '82%'])
  const rocketOpacity = useTransform(strength, [0, 0.1, 0.85, 1], [0, 1, 1, 0.8])

  useMotionValueEvent(strength, 'change', (s) => setVisible(s > 0.005))

  useEffect(() => {
    if (dustSpawned || !ambient) return
    let prevVal = 0
    const unsub = strength.on('change', (v) => {
      if (v > 0.85 && prevVal <= 0.85) {
        setDustSpawned(true)
        ambient.spawnDust(window.innerWidth / 2, window.innerHeight * 0.82, 40)
      }
      prevVal = v
    })
    return unsub
  }, [strength, ambient, dustSpawned])

  useEffect(() => {
    if (reduced || landingAnimDone.current) return

    let cancelled = false

    const runAnimation = async () => {
      if (reduced) {
        if (ctaButtonRef.current) {
          ctaButtonRef.current.style.opacity = '1'
          ctaButtonRef.current.style.transform = 'scale(1)'
          ctaButtonRef.current.style.width = '160px'
          ctaButtonRef.current.style.height = '48px'
        }
        if (ctaLabelRef.current) {
          ctaLabelRef.current.style.opacity = '1'
        }
        return
      }

      if (sparkRef.current) {
        await animate(sparkRef.current, { y: -80, opacity: 0 }, { duration: 0 }).then(() =>
          animate(sparkRef.current!, { y: [null, 0], opacity: [0, 1, 1], scale: [0.5, 1.2, 1] }, { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }),
        )
      }
      if (cancelled) return

      if (sparkRef.current) {
        await animate(sparkRef.current, { opacity: [1, 0], scale: [1, 2.5] }, { duration: 0.35, ease: 'easeOut' })
      }
      if (cancelled) return

      if (ctaButtonRef.current) {
        ctaButtonRef.current.style.opacity = '1'
        ctaButtonRef.current.style.transform = 'scale(1)'
        await animate(ctaButtonRef.current, { width: 160, height: 48 }, { type: 'spring', stiffness: 180, damping: 18, mass: 0.8 })
      }
      if (cancelled) return

      if (ctaLabelRef.current) {
        await animate(ctaLabelRef.current, { opacity: 1 }, { duration: 0.4, ease: 'easeOut' })
      }
    }

    const unsub = strength.on('change', (v) => {
      if (v > 0.85 && !landingAnimDone.current && !cancelled) {
        landingAnimDone.current = true
        clearTimeout(fallbackTimerRef.current)
        runAnimation()
      }
    })

    fallbackTimerRef.current = window.setTimeout(() => {
      if (!landingAnimDone.current && !cancelled) {
        landingAnimDone.current = true
        unsub()
        if (ctaButtonRef.current) {
          ctaButtonRef.current.style.opacity = '1'
          ctaButtonRef.current.style.transform = 'scale(1)'
          animate(ctaButtonRef.current, { width: 160, height: 48 }, { duration: 0.4, ease: 'easeOut' })
        }
        if (ctaLabelRef.current) {
          setTimeout(() => { if (ctaLabelRef.current) ctaLabelRef.current.style.opacity = '1' }, 150)
        }
      }
    }, 1200)

    return () => {
      cancelled = true
      unsub()
      clearTimeout(fallbackTimerRef.current)
    }
  }, [strength, reduced])

  const handleCtaClick = () => {
    if (isSunriseActive.current) return
    isSunriseActive.current = true
    if (ambient) ambient.triggerSunrise()
    setTimeout(() => onOpenContact(), 1500)
  }

  return (
    <div
      role="region"
      aria-label="Завершення"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: visible ? undefined : 0, visibility: visible ? 'visible' : 'hidden' }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: horizonY, background: 'linear-gradient(to top, #0B0E1F 60%, transparent)' }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ top: rocketY, opacity: rocketOpacity }}
      >
        <svg viewBox="-30 -40 60 80" className="h-16 w-auto">
          <path
            d="M0,-30 C10,-20 12,-5 12,5 C12,15 6,24 0,28 C-6,24 -12,15 -12,5 C-12,-5 -10,-20 0,-30 Z"
            fill="#C9BFA8"
            stroke="#E8DFC8"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="-10" r="5" fill="#5AACAA" opacity="0.6" />
        </svg>
      </motion.div>

      <div className="relative z-10 mt-32 max-w-[680px]">
        <h2 className="mb-10 text-[clamp(26px,3.9vw,42px)] leading-[1.3] text-paper" style={{ perspective: 600 }}>
          <span style={{ display: 'inline-block', transform: 'rotateX(2deg)' }}>
            Наступна історія<br />
            може початися<br />
            <em className="font-serif italic text-gold glow-word">саме у вашому закладі.</em>
          </span>
        </h2>

        <div className="relative flex justify-center">
          <div
            ref={sparkRef}
            className="absolute h-3 w-3 rounded-full bg-gold"
            style={{
              opacity: 0,
              zIndex: 10,
              boxShadow: '0 0 24px 8px rgba(242,184,75,0.8), 0 0 48px 16px rgba(242,184,75,0.4)',
            }}
          />
          <button
            ref={ctaButtonRef}
            onClick={handleCtaClick}
            className="relative flex items-center justify-center rounded-full border border-gold bg-gold font-bold text-night transition-shadow hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]"
            style={{ opacity: 0, transform: 'scale(0)', width: 8, height: 8, borderRadius: 9999, overflow: 'hidden', zIndex: 5 }}
          >
            <span ref={ctaLabelRef} className="text-[14.5px] px-7 py-3.5 whitespace-nowrap" style={{ opacity: 0 }}>
              Запросити подію
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

```

### `src/features/landing-hero/components/beats/GalleryBeat.tsx`
```typescript
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
      aria-label="Галерея емоцій"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[820px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Галерея емоцій
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Моменти, складені в сузір&apos;я
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
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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

```

### `src/features/landing-hero/components/beats/HeroBeat.tsx`
```typescript
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, animate, useMotionValueEvent } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useHeroIntro } from '../../hooks/useHeroIntro'
import { HeroBubbles } from '../overlays/HeroBubbles'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
  onHeroComplete?: () => void
}

export function HeroBeat({ progress, onOpenContact, onHeroComplete }: Props) {
  const reduced = useReducedMotion()
  const { phase: introPhase } = useHeroIntro()
  const [heroVisible, setHeroVisible] = useState(true)
  const [bubblesActive, setBubblesActive] = useState(false)
  const [underwaterGlow, setUnderwaterGlow] = useState(0)
  const [scrollTranslateY, setScrollTranslateY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)

  useMotionValueEvent(progress, 'change', (v) => {
    const HERO_END = 0.08
    const scrollFraction = Math.min(v / HERO_END, 1)
    const y = -scrollFraction * 100
    setScrollTranslateY(y)
    if (scrollFraction >= 1 && !completedRef.current) {
      completedRef.current = true
      setHeroVisible(false)
      onHeroComplete?.()
    }
  })

  useEffect(() => {
    if (introPhase === 'ready') {
      setBubblesActive(true)
    }
  }, [introPhase])

  useEffect(() => {
    if (introPhase !== 'ready' || reduced) return
    let cancelled = false

    const animateAll = async () => {
      if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return

      await animate(
        titleRef.current,
        { clipPath: 'inset(0% 0% 0% 0%)' },
        { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      )

      if (cancelled || !subtitleRef.current) return
      await Promise.all([
        animate(
          subtitleRef.current,
          { opacity: 1, y: 0 },
          { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        ),
        (async () => {
          await new Promise((r) => setTimeout(r, 350))
          if (!cancelled && ctaRef.current) {
            animate(
              ctaRef.current,
              { opacity: 1, y: 0 },
              { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
            )
          }
        })(),
      ])
    }

    animateAll()
    return () => { cancelled = true }
  }, [introPhase, reduced])

  useEffect(() => {
    if (reduced) {
      if (titleRef.current) titleRef.current.style.clipPath = 'inset(0% 0% 0% 0%)'
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1'
        subtitleRef.current.style.transform = 'translateY(0)'
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1'
        ctaRef.current.style.transform = 'translateY(0)'
      }
    }
  }, [reduced])

  if (!heroVisible) return null

  const rocketX = 20 + Math.abs(scrollTranslateY) * 0.6
  const rocketY = 80 - Math.abs(scrollTranslateY) * 0.8

  return (
    <>
      <div
        ref={containerRef}
        role="region"
        aria-label="Головна секція"
        className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollTranslateY}vh)`,
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-[filter] duration-300"
          style={{
            backgroundImage: 'url(/materials/preview.jpg)',
            filter: `brightness(${1 + underwaterGlow}) saturate(${1 + underwaterGlow * 2})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/20 to-night/60" />

        <div className="relative z-10 max-w-[680px] px-6 text-center">
          <h1
            ref={titleRef}
            className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper"
            style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          >
            Уява<br />
            <em className="font-serif italic text-gold glow-word">оживає</em>
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist"
            style={{ opacity: 0, transform: 'translateY(12px)' }}
          >
            Ми створюємо сучасні освітні події, які діти пам&apos;ятають роками.
          </p>
          <div
            ref={ctaRef}
            className="mt-9 flex flex-wrap justify-center gap-3.5"
            style={{ opacity: 0, transform: 'translateY(12px)' }}
          >
            <button
              onClick={() => onOpenContact()}
              className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] active:scale-[0.97]"
            >
              Запросити подію
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })
              }}
              className="rounded-full border border-paper/20 px-7 py-3.5 text-[14.5px] font-bold text-paper/80 transition-all hover:-translate-y-[3px] hover:border-paper/40 hover:text-paper active:scale-[0.97]"
            >
              Дізнатися більше
            </button>
          </div>
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ opacity: 0.6 }}
        >
          <defs>
            <linearGradient id="heroTrail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F2B84B" stopOpacity="0" />
              <stop offset="40%" stopColor="#F2B84B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FBF5EA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <line
            x1="15%"
            y1="85%"
            x2={`${rocketX}%`}
            y2={`${rocketY}%`}
            stroke="url(#heroTrail)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="15%"
            y1="85%"
            x2={`${rocketX}%`}
            y2={`${rocketY}%`}
            stroke="#F2B84B"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
        <div
          className="pointer-events-none absolute"
          style={{
            left: `${rocketX}%`,
            top: `${rocketY}%`,
            transform: 'translate(-50%, -50%) rotate(-35deg)',
            transition: 'none',
          }}
        >
          <svg viewBox="-20 -30 40 60" className="h-10 w-10">
            <defs>
              <linearGradient id="heroRocketBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBF5EA" />
                <stop offset="100%" stopColor="#C9BFA8" />
              </linearGradient>
              <linearGradient id="heroFlame" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F2B84B" />
                <stop offset="60%" stopColor="#FF7A59" />
                <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,-22 C7,-16 8,-5 8,3 C8,10 4,16 0,18 C-4,16 -8,10 -8,3 C-8,-5 -7,-16 0,-22 Z"
              fill="url(#heroRocketBody)"
              stroke="#E8DFC8"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="-6" r="3.5" fill="#8FE3E0" stroke="#FBF5EA" strokeWidth="0.5" />
            <path d="M-8,6 L-13,14 L-8,11 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M8,6 L13,14 L8,11 Z" fill="#FF7A59" opacity="0.85" />
            <path
              d="M-4,18 L0,28 L4,18"
              fill="url(#heroFlame)"
              opacity={0.9}
            />
            <path
              d="M-2,18 L0,25 L2,18"
              fill="#FBF5EA"
              opacity={0.6}
            />
          </svg>
        </div>
      </div>

      <HeroBubbles active={bubblesActive && heroVisible} />
    </>
  )
}

```

### `src/features/landing-hero/components/beats/ManifestBeat.tsx`
```typescript
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
      aria-label="Наш принцип"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Наш принцип
        </p>
        <p className="text-[clamp(24px,3.5vw,40px)] leading-[1.35] text-paper">
          <span className="stagger-word inline-block" style={{ animationDelay: '0.25s' }}>
            Ми не проводимо заходи.
          </span>
          <br />
          <span className="stagger-word inline-block" style={{ animationDelay: '0.45s' }}>
            Ми запалюємо{' '}
            <span className="glow-word-coral">світло</span>
            {' '}в очах дітей.
          </span>
        </p>
        <div className="stagger-word" style={{ animationDelay: '0.65s' }}>
          <MediaPlaceholder
            label="Фото або відео з події"
            src={MEDIA_URLS.malyuvaika}
            className="mx-auto mt-8 h-[min(180px,24vw)] w-[min(380px,75vw)]"
          />
        </div>
      </div>
    </motion.div>
  )
}

```

### `src/features/landing-hero/components/beats/PillarsBeat.tsx`
```typescript
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
      aria-label="Чому нам довіряють"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Чому нам довіряють
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Довіра будується на деталях
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
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {icon}
      <h3 className="mb-1.5 text-[15px] font-bold">{pillar.title}</h3>
      <p className="text-[13px] leading-[1.4] text-mist-soft">{pillar.description}</p>
    </motion.div>
  )
}

```

### `src/features/landing-hero/components/beats/StatsBeat.tsx`
```typescript
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
      aria-label="Цифри світла"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Цифри світла
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Небо, яке ми запалили разом
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

```

### `src/features/landing-hero/components/beats/TeamVoicesBeat.tsx`
```typescript
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
      aria-label="Голоси та команда"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Голоси та команда
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Люди, яких не скопіювати
        </h2>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-12">
          <div className="h-[42px] w-7">
            <svg viewBox="0 0 30 44">
              <path d="M15,4 C24,18 24,28 15,40 C6,28 6,18 15,4 Z" fill="#F2B84B" />
            </svg>
          </div>

          <div className="relative w-[min(500px,90vw)] heat-haze" style={{ minHeight: 110 }}>
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
            : 'Натисніть на людину, щоб почути її історію.'}
        </p>
      </div>
    </motion.div>
  )
}

```

### `src/features/landing-hero/components/beats/TimelineBeat.tsx`
```typescript
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
      aria-label="Як проходить подія"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          П'ять кроків
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Як проходить подія
        </h2>
        <div className="relative mx-auto mt-[42px] w-[min(700px,90vw)] pt-2">
          <div className="absolute top-[9px] left-0 right-0 h-px bg-gold/22" />
          <div className="absolute top-[9px] left-0 right-0 h-px pulse-line" />
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

```

### `src/features/landing-hero/components/beats/WorldBeat.tsx`
```typescript
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { BEAT_CONTENT, WORLD_BEATS } from '../../data/worlds'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { HologramGallery } from '../HologramGallery'

interface Props {
  progress: MotionValue<number>
  beatIndex: number
}

const WORLD_ICONS: Record<number, string> = {
  3: 'Малювайка — заняття',
  4: 'Рибка оживає',
  5: 'Голограма — проекція',
  6: 'Popify — зйомка',
  7: 'Popify — прайс',
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

  const isHologram = beatIndex === 5

  return (
    <motion.div
      role="region"
      aria-label={content.heading}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-visible px-6 text-center"
      style={{ opacity: strength, y }}
    >
      {isHologram ? (
        <div className="flex max-w-[900px] flex-col items-center gap-8 overflow-visible md:flex-row md:text-left">
          <div className={`${mediaAnimClass} w-full shrink-0 overflow-visible md:w-[440px]`}>
            <HologramGallery />
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
      ) : (
        <div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
          <div className={`${mediaAnimClass} h-[min(200px,28vw)] w-full shrink-0 md:h-[200px] md:w-[280px]`}>
            <MediaPlaceholder
              label={WORLD_ICONS[beatIndex] ?? 'Ілюстрація'}
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
      )}
    </motion.div>
  )
}

```

### `src/features/landing-hero/components/BeatWrapper.tsx`
```typescript
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

```

### `src/features/landing-hero/components/ContactPanel.tsx`
```typescript
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
            aria-label="Закрити"
          >
            &times;
          </button>

          <h3 id="contact-title" className="font-display text-[21px]">Запросити подію</h3>

          {status === 'success' ? (
            <p className="mt-4 text-[15px] text-mist">
              Дякуємо! Ми зв'яжемося найближчим часом.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше ім'я"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold"
              />
              <input
                type="text"
                placeholder="Телефон або email"
                required
                value={form.contact}
                onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold"
              />
              <textarea
                placeholder="Повідомлення (необов'язково)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold resize-none"
              />
              {status === 'error' && (
                <p className="text-[13px] text-coral">
                  Щось пішло не так. Спробуйте ще раз або напишіть нам.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-1 rounded-full border-none bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] disabled:opacity-60"
              >
                {status === 'loading' ? 'Надсилаю...' : 'Надіслати'}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

```

### `src/features/landing-hero/components/CursorGlow.tsx`
```typescript
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

```

### `src/features/landing-hero/components/FilmGrain.tsx`
```typescript
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

```

### `src/features/landing-hero/components/Footer.tsx`
```typescript
import { Z } from '../lib/zIndex'

interface Props {
  onOpenContact: () => void
}

export function Footer({ onOpenContact }: Props) {
  return (
    <footer className="relative border-t border-gold/12 bg-night py-9 text-[13px] text-mist-soft" style={{ zIndex: Z.footer }}>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3.5 px-7">
        <span>&copy; 2026 Світло Знань. Уява оживає.</span>
        <ul className="flex list-none gap-[22px]">
          <li>
            <a href="#top" className="text-mist-soft transition-colors hover:text-gold">
              Публічна оферта
            </a>
          </li>
          <li>
            <a href="#top" className="text-mist-soft transition-colors hover:text-gold">
              Політика конфіденційності
            </a>
          </li>
          <li>
            <button
              onClick={onOpenContact}
              className="text-mist-soft transition-colors hover:text-gold"
            >
              Контакти
            </button>
          </li>
        </ul>
      </div>
    </footer>
  )
}

```

### `src/features/landing-hero/components/HologramGallery.tsx`
```typescript
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLOGRAM_PHOTOS = [
  { src: '/materials/holohrana_photo_2.jpg', hoverSrc: '/materials/hologram-kids-dark.png', alt: 'Діти біля холограмної установки' },
  { src: '/materials/holohrama_photo.jpg', hoverSrc: '/materials/hologram-photo-dark.png', alt: 'Холограмна проекція для дітей' },
  { src: '/materials/hologram-city.jpg', hoverSrc: '/materials/hologram-city-dark.png', alt: 'Холограма міста' },
]

function useImagePreload(src: string): boolean {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])
  return loaded
}

export function HologramGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const hoversLoaded = HOLOGRAM_PHOTOS.map((p) => useImagePreload(p.hoverSrc))

  return (
    <>
      <div className="flex flex-col items-start gap-4 -ml-6 overflow-visible">
        <div className="flex items-start gap-3">
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[0]}
            isHovered={hoveredIdx === 0}
            hoverReady={hoversLoaded[0]}
            onHover={() => setHoveredIdx(0)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(0)}
            className="h-[170px] w-[210px]"
            rotation={-12}
          />
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[1]}
            isHovered={hoveredIdx === 1}
            hoverReady={hoversLoaded[1]}
            onHover={() => setHoveredIdx(1)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(1)}
            className="mt-10 h-[140px] w-[175px]"
            rotation={8}
          />
        </div>
        <div className="ml-10">
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[2]}
            isHovered={hoveredIdx === 2}
            hoverReady={hoversLoaded[2]}
            onHover={() => setHoveredIdx(2)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(2)}
            className="h-[130px] w-[180px]"
            rotation={-6}
          />
        </div>
      </div>

      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveIdx(null)}
          >
            <motion.div
              className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={HOLOGRAM_PHOTOS[activeIdx].src}
                alt={HOLOGRAM_PHOTOS[activeIdx].alt}
                className="block max-h-[80vh] max-w-[90vw] object-contain"
              />
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-night/60 text-paper transition-colors hover:bg-night/80"
                aria-label="Закрити"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function PhotoCard({
  photo,
  isHovered,
  hoverReady,
  onHover,
  onLeave,
  onClick,
  className,
  rotation = 0,
}: {
  photo: (typeof HOLOGRAM_PHOTOS)[number]
  isHovered: boolean
  hoverReady: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  className?: string
  rotation?: number
}) {
  const hasHover = !!photo.hoverSrc && hoverReady

  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-xl border border-white/10 ${className ?? ''}`}
      style={{
        zIndex: isHovered ? 10 : 1,
        transform: isHovered ? 'scale(1.25) rotate(0deg)' : `rotate(${rotation}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        boxShadow: isHovered
          ? '0 0 30px 10px rgba(60,140,255,0.35), 0 0 60px 20px rgba(60,140,255,0.15), 0 0 0 1px rgba(100,180,255,0.4)'
          : '0 8px 24px rgba(0,0,0,0.4)',
        transitionProperty: 'transform, box-shadow',
        transitionDuration: '0.5s, 0.4s',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1), ease',
      }}
    >
      {/* Base image */}
      <img
        src={photo.src}
        alt={photo.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: hasHover && isHovered ? 0 : 1,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'opacity 0.55s ease, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
        loading="lazy"
      />
      {/* Hover overlay image */}
      {hasHover && (
        <img
          src={photo.hoverSrc!}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.55s ease',
          }}
        />
      )}
    </button>
  )
}

```

### `src/features/landing-hero/components/MediaPlaceholder.tsx`
```typescript
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
    if (IMAGE_EXTS.test(src)) {
      return <ImageMedia src={src} className={className} />
    }
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

const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i

function ImageMedia({ src, className }: { src: string; className: string }) {
  const [ready, setReady] = useState(false)
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-night ${className}`}>
      <img
        src={src}
        onLoad={() => setReady(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PlaceholderIcon />
        </div>
      )}
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
      { rootMargin: '400px' },
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
    if (v && v.readyState >= 2) {
      setReady(true)
    }
  }, [inView])

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
          onLoadedData={onCanPlay}
          onError={onError}
          className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(!ready && !failed) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PlaceholderIcon />
        </div>
      )}
    </div>
  )
}

```

### `src/features/landing-hero/components/Nav.tsx`
```typescript
import { useState, useEffect, useRef } from 'react'
import { useMotionValueEvent } from 'framer-motion'
import { Z } from '../lib/zIndex'
import type { MotionValue } from 'framer-motion'

interface Props {
  onOpenContact: () => void
  onNavigate: (fraction: number) => void
  progress: MotionValue<number>
}

const NAV_LINKS = [
  { label: 'Про нас', fraction: 0.18 },
  { label: 'Наші світи', fraction: 0.28 },
  { label: 'Як проходить', fraction: 0.62 },
  { label: 'Галерея', fraction: 0.70 },
  { label: 'Команда', fraction: 0.78 },
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

export function Nav({ onOpenContact, onNavigate, progress }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useMotionValueEvent(progress, 'change', (p) => {
    setActiveIdx(getActiveIndex(p))
  })

  const activeEl = linkRefs.current[activeIdx]
  const underlineStyle = activeEl
    ? {
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      }
    : { left: 0, width: 0, opacity: 0 }

  const handleNavClick = (fraction: number) => {
    onNavigate(fraction)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-[400ms] ${
        scrolled
          ? 'bg-night/72 py-3 backdrop-blur-[14px] border-b border-gold/12'
          : 'py-[18px]'
      }`}
      style={{ zIndex: Z.nav, transitionProperty: 'transform, background, padding, border-color' }}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[18px] font-semibold text-paper">
          <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(242,184,75,0.38)]" aria-hidden="true" />
          Світло Знань
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="relative flex items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => { linkRefs.current[i] = el }}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.fraction)
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
            Запросити подію
          </button>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-gold/12 bg-night/95 backdrop-blur-[14px] md:hidden">
          <div className="flex flex-col items-center gap-5 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.fraction)
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
              Запросити подію
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

```

### `src/features/landing-hero/components/overlays/CampfireSparks.tsx`
```typescript
import { useEffect, useRef, useState } from 'react'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
}

interface Spark {
  x: number
  y: number
  speed: number
  drift: number
  phase: number
  el: SVGCircleElement | null
}

export function CampfireSparks({ tl, subscribe }: Props) {
  const strengthRef = useRef(0)
  const sparksRef = useRef<Spark[]>([])
  const rafRef = useRef(0)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    return subscribe(() => {
      const s = tl.beatStrengths[10]
      strengthRef.current = s
      setOpacity(s)
    })
  }, [tl, subscribe])

  useEffect(() => {
    const tick = (now: number) => {
      if (strengthRef.current > 0.05) {
        sparksRef.current.forEach((spark) => {
          if (!spark.el) return
          spark.y -= spark.speed
          const xOffset = Math.sin(now * 0.002 + spark.phase) * spark.drift

          if (spark.y < -50) {
            spark.y = 900 + Math.random() * 100
            spark.x = 200 + Math.random() * 1200
          }

          spark.el.setAttribute('cx', String(spark.x + xOffset))
          spark.el.setAttribute('cy', String(spark.y))
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ opacity, zIndex: Z.overlays + 1 }}>
      {Array.from({ length: 25 }, (_, i) => {
        const isGold = Math.random() > 0.5
        return (
          <circle
            key={i}
            ref={(el) => {
              if (!sparksRef.current[i]) {
                sparksRef.current[i] = { x: 200 + Math.random() * 1200, y: 900 + Math.random() * 400, speed: 1 + Math.random() * 2.5, drift: 2 + Math.random() * 5, phase: Math.random() * Math.PI * 2, el }
              } else {
                sparksRef.current[i].el = el
              }
            }}
            r={Math.random() * 1.5 + 1}
            fill={isGold ? '#F2B84B' : '#FF7A59'}
            opacity={0.4 + Math.random() * 0.6}
          />
        )
      })}
    </svg>
  )
}

```

### `src/features/landing-hero/components/overlays/GlobalAmbientCanvas.tsx`
```typescript
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

```

### `src/features/landing-hero/components/overlays/GrassGround.tsx`
```typescript
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
  phase: number
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
        const wind = Math.sin(now * 0.001) * 6
        bladesRef.current.forEach((blade) => {
          if (!blade.el) return
          const bladeScreenX = blade.x / scaleX
          const dist = Math.abs(mouseRef.current.x - bladeScreenX)
          const influence = clamp(1 - dist / 140, 0, 1)
          const bend = influence * 16 * (mouseRef.current.x > bladeScreenX ? 1 : -1)

          const localWind = Math.sin(now * 0.0015 + blade.phase) * 4
          const totalBend = bend + wind + localWind

          blade.el.setAttribute('transform', `translate(${blade.x},0) skewX(${totalBend.toFixed(2)})`)
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
                if (!bladesRef.current[i]) {
                  bladesRef.current[i] = { x, el, phase: Math.random() * Math.PI * 2 }
                } else {
                  bladesRef.current[i].el = el
                }
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

```

### `src/features/landing-hero/components/overlays/HeroBubbles.tsx`
```typescript
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Bubble {
  id: number
  size: number
  x: number
  startY: number
  drift: number
  duration: number
  delay: number
  opacity: number
}

function generateBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 10,
    x: 35 + Math.random() * 30,
    startY: 75 + Math.random() * 15,
    drift: (Math.random() - 0.5) * 20,
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 2,
    opacity: 0.15 + Math.random() * 0.35,
  }))
}

interface Props {
  active: boolean
}

export function HeroBubbles({ active }: Props) {
  const reduced = useReducedMotion()
  const bubbles = useMemo(() => generateBubbles(reduced ? 0 : 10), [reduced])

  if (!active || reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 20 }} aria-hidden="true">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{
            x: `${b.x}vw`,
            y: `${b.startY}vh`,
            scale: 0.3,
            opacity: 0,
          }}
          animate={{
            y: [`${b.startY}vh`, `${10 + Math.random() * 15}vh`],
            x: [`${b.x}vw`, `${b.x + b.drift}vw`],
            scale: [0.3, 1, 0.8],
            opacity: [0, b.opacity, b.opacity * 0.6, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: 'easeOut',
          }}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 35% 35%, rgba(143,227,224,${b.opacity + 0.2}), rgba(143,227,224,${b.opacity * 0.3}) 60%, transparent)`,
            boxShadow: `inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 ${b.size * 0.5}px rgba(143,227,224,${b.opacity * 0.4})`,
          }}
        />
      ))}
    </div>
  )
}

```

### `src/features/landing-hero/components/overlays/NebulaOverlay.tsx`
```typescript
import { useEffect, useRef, useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
  progress: MotionValue<number>
}

interface NebulaState {
  gradient: string
  hueShift: number
}

function computeNebula(accentR: number, accentG: number, accentB: number, progress: number): NebulaState {
  const hueShift = progress * 30
  const c1 = `rgb(${Math.round(accentR * 255)}, ${Math.round(accentG * 255)}, ${Math.round(accentB * 255)})`
  for (let k = 0; k < NEBULA_STOPS.length - 1; k++) {
    const s0 = NEBULA_STOPS[k]
    const s1 = NEBULA_STOPS[k + 1]
    if (progress >= s0.p && progress <= s1.p) {
      const t = (progress - s0.p) / (s1.p - s0.p)
      const c3 = lerpColor(s0.c2, s1.c2, t)
      return {
        gradient: [
          `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
          `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
        ].join(', '),
        hueShift,
      }
    }
  }
  const c3 = NEBULA_STOPS[0].c2
  return {
    gradient: [
      `radial-gradient(ellipse 90% 70% at 25% 25%, ${c3}22, transparent 55%)`,
      `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
    ].join(', '),
    hueShift,
  }
}

const INITIAL = computeNebula(0.227, 0.118, 0.388, 0)

export function NebulaOverlay({ tl, subscribe, progress }: Props) {
  const stateRef = useRef<NebulaState>(INITIAL)
  const [gradient, setGradient] = useState(INITIAL.gradient)
  const [hueShift, setHueShift] = useState(INITIAL.hueShift)

  useEffect(() => {
    const next = computeNebula(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, progress.get())
    stateRef.current = next
    setGradient(next.gradient)
    setHueShift(next.hueShift)

    const unsub = subscribe(() => {
      const g = computeNebula(tl.lighting.accentR, tl.lighting.accentG, tl.lighting.accentB, progress.get())
      if (g.gradient !== stateRef.current.gradient || g.hueShift !== stateRef.current.hueShift) {
        stateRef.current = g
        setGradient(g.gradient)
        setHueShift(g.hueShift)
      }
    })
    return unsub
  }, [tl, subscribe, progress])

  return (
    <div className="pointer-events-none absolute -inset-[8%]" style={{ zIndex: Z.overlays }} aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: gradient, filter: `hue-rotate(${hueShift}deg)` }}
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

```

### `src/features/landing-hero/components/overlays/PortalOverlay.tsx`
```typescript
import { useEffect, useState } from 'react'
import { clamp } from '../../lib/animation'
import { Z } from '../../lib/zIndex'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'

interface Props {
  tl: Timeline
  subscribe: (cb: () => void) => () => void
  progress: MotionValue<number>
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

export function PortalOverlay({ tl, subscribe, progress }: Props) {
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
      const p = progress.get()

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
  }, [tl, subscribe, progress])

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

      {/* Planet 0 — teal, with ring (Голограма) */}
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

      {/* Planet 1 — coral, large gas giant (Малювайка) */}
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

      {/* Planet 2 — pink/magenta, with faint ring (Popify) */}
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

```

### `src/features/landing-hero/components/overlays/RocketOverlay.tsx`
```typescript
import { useEffect, useRef, useState } from 'react'
import { clamp } from '../../lib/animation'
import { Z } from '../../lib/zIndex'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { interpolateRocket, lerpAngle } from '../../lib/rocketMath'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'

interface Props {
  tl: Timeline
  progress: MotionValue<number>
  subscribe: (cb: () => void) => () => void
  heroCompleted?: boolean
}

const NOZZLE_Y = 55

function scaleFlame(scaleX: number, scaleY: number, coords: number[], cmd: 'C' | 'L' = 'C'): string {
  let d = ''
  for (let i = 0; i < coords.length; i += 2) {
    const x = coords[i] * scaleX
    const y = NOZZLE_Y + (coords[i + 1] - NOZZLE_Y) * scaleY
    d += (i === 0 ? 'M' : i === 2 ? ` ${cmd}` : ' ') + `${x},${y}`
  }
  return d
}

export function RocketOverlay({ tl, progress, subscribe, heroCompleted = true }: Props) {
  const reduced = useReducedMotion()
  const [, setTick] = useState(0)
  const flameRef = useRef(1)
  const currentHeading = useRef<number | null>(null)

  useEffect(() => {
    const unsub = subscribe(() => setTick((t) => t + 1))
    return unsub
  }, [subscribe])

  const t = tl
  const p = progress.get()
  const rocket = interpolateRocket(p, t.vw, t.vh)

  const now = t.elapsed
  const opacity = heroCompleted ? 1 : 0

  if (!reduced) {
    flameRef.current = 1 + Math.sin(now / 90) * 0.12
  }

  const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)

  const enginePower = clamp(p / 0.015, 0, 1) * clamp((1 - p) / 0.015, 0, 1)

  const engineGlow = (0.5 + speedFactor * 0.5) * enginePower
  const flameScale = flameRef.current * enginePower

  const idleHover = (1 - enginePower) * Math.sin(now / 300) * 8

  const rawHeading = rocket.heading
  if (currentHeading.current === null) {
    currentHeading.current = rawHeading
  } else {
    currentHeading.current = lerpAngle(currentHeading.current, rawHeading, 0.20)
  }

  const camX = rocket.x + t.parallax[5].x + t.camera.x + t.camera.shakeX
  const camY = rocket.y + t.parallax[5].y + t.camera.y + t.camera.shakeY + idleHover

  const ws = t.isWarping ? t.warpStrength : 0

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh', zIndex: Z.rocket }}
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
          transform: `translate(${camX - 50}px, ${camY - 50}px) rotate(${currentHeading.current}deg) scale(${t.camera.zoom})`,
          opacity,
          willChange: 'transform',
          zIndex: Z.rocket,
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
            <ellipse cx="0" cy="72" rx={16 + speedFactor * 5} ry={4 + speedFactor * 2} fill="rgba(11,14,31,0.25)" opacity={clamp(t.camera.depth * 2, 0, 0.35)} />
            <circle cx="0" cy="62" r={24 + speedFactor * 18} fill="url(#engineGlow)" />

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

            <path
              d={scaleFlame(1 + speedFactor * 0.15, flameScale * (1 + speedFactor * 0.3), [-10, 55, -5, 85, 5, 85, 10, 55])}
              fill="url(#flameOuter)"
              opacity={engineGlow}
            />
            <path
              d={scaleFlame(1, flameScale, [-7, 55, -3, 78, 3, 78, 7, 55])}
              fill="url(#flameInner)"
              opacity={0.9 * engineGlow}
            />
            <path
              d={scaleFlame(1, flameScale * (1 + speedFactor * 0.2), [-3, 55, 0, 82, 3, 55], 'L')}
              fill="#FBF5EA"
              opacity={0.7 * engineGlow}
            />
          </g>
        </svg>
      </div>

      {t.isWarping && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: Z.rocket + 10 }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i / 24) * Math.PI * 2 + (i % 3) * 0.09
              const baseLen = 25 + (i % 5) * 12
              const delay = (i % 6) * 0.06
              const lineWs = clamp((ws - delay) / (1 - delay), 0, 1)
              const expand = lineWs * lineWs * (3 - 2 * lineWs)
              const x1 = 50 + Math.cos(angle) * 3
              const y1 = 50 + Math.sin(angle) * 3
              const x2 = 50 + Math.cos(angle) * baseLen * expand
              const y2 = 50 + Math.sin(angle) * baseLen * expand
              const opacity = expand * (1 - expand * 0.6) * 0.8
              const colors = ['#FBF5EA', '#F2B84B', '#8FE3E0', '#FBF5EA', '#FF7A59']
              const sw = 0.12 + (i % 3) * 0.06
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors[i % 5]}
                  strokeWidth={sw}
                  strokeLinecap="round"
                  opacity={opacity}
                />
              )
            })}
          </svg>
        </div>
      )}
    </>
  )
}

```

### `src/features/landing-hero/components/overlays/StarField.tsx`
```typescript
import { useMemo, useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Timeline } from '../../types/timeline'

interface Props {
  tl: Timeline
}

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

export function StarField({ tl }: Props) {
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

  const warpScale = tl.isWarping ? 1 + tl.warpStrength * 2 : 1

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        transform: `scale(${warpScale})`,
        transformOrigin: '50% 50%',
        transition: tl.isWarping ? 'none' : 'transform 0.5s ease-out',
        zIndex: 0,
      }}
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

```

### `src/features/landing-hero/components/ProgressRail.tsx`
```typescript
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

```

### `src/features/landing-hero/components/ScrollHint.tsx`
```typescript
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
        Скрольте, щоб летіти далі
      </span>
    </div>
  )
}

```

### `src/features/landing-hero/components/SoundToggle.tsx`
```typescript
import { useAudioAmbience } from '../hooks/useAudioAmbience'
import { Z } from '../lib/zIndex'

export function SoundToggle() {
  const { soundOn, toggle } = useAudioAmbience()

  return (
    <button
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}
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

```

### `src/features/landing-hero/context/AmbientContext.tsx`
```typescript
import { createContext, useCallback, useContext, useState } from 'react'
import type { AmbientCommands } from '../components/overlays/GlobalAmbientCanvas'

const AmbientCtx = createContext<AmbientCommands | null>(null)

export function useAmbient() {
  return useContext(AmbientCtx)
}

export function useAmbientCommands() {
  const [commands, setCommandsState] = useState<AmbientCommands | null>(null)
  const setCommands = useCallback((cmds: AmbientCommands) => setCommandsState(cmds), [])
  return { commands, setCommands }
}

export { AmbientCtx }

```

### `src/features/landing-hero/data/gallery.ts`
```typescript
export interface GalleryNode {
  label: string
  /** Position as percentage of container */
  left: string
  top: string
}

export const GALLERY_NODES: GalleryNode[] = [
  { label: 'Перший подив', left: '8.5%', top: '76%' },
  { label: 'Світло шоу', left: '23%', top: '35%' },
  { label: 'Оживлений герой', left: '50%', top: '44%' },
  { label: 'Тиша перед шоу', left: '63%', top: '6%' },
  { label: 'Оплески', left: '91%', top: '26%' },
]

```

### `src/features/landing-hero/data/media.ts`
```typescript
export const MEDIA_URLS = {
  heroPreview: '/materials/Hologram_Event_Kids_School.mp4',
  malyuvaika: '/materials/відео - малювайка.MP4',
  hologramEvent: '/materials/holohrana_photo_2.jpg',
  hologramReaction: '/materials/IMG_6455.MP4',
  popify: '/materials/відео попіфай.MP4',
} as const

```

### `src/features/landing-hero/data/nebula.ts`
```typescript
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

```

### `src/features/landing-hero/data/pillars.ts`
```typescript
export interface Pillar {
  title: string
  description: string
  /** SVG icon path data for 44x44 viewBox */
  iconPath: string
}

export const PILLARS: Pillar[] = [
  {
    title: 'Сучасне обладнання',
    description: 'Власні технічні розробки.',
    iconPath: 'M22 13v9l6 4',
  },
  {
    title: 'Власні сценарії',
    description: 'Жодних шаблонних виступів.',
    iconPath: 'M8 34c0-8 6-13 14-13s14 5 14 13',
  },
  {
    title: 'Команда',
    description: 'Її неможливо скопіювати.',
    iconPath: 'M22 8l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z',
  },
  {
    title: 'Індивідуальний підхід',
    description: 'Під вік дітей і простір.',
    iconPath: 'M10 22h24M22 10v24',
  },
]

```

### `src/features/landing-hero/data/quotes.ts`
```typescript
export interface CampfireQuote {
  text: string
  attribution: string
}

export const CAMPFIRE_QUOTES: CampfireQuote[] = [
  {
    text: '«Такого захоплення в очах дітей я не бачила за десять років роботи в школі.»',
    attribution: 'Директорка школи, м. Львів',
  },
  {
    text: '«Все організували так, що ми взагалі ні про що не хвилювались у день свята.»',
    attribution: 'Вихователька дитячого садочка',
  },
  {
    text: '«Мій малюнок ожив! Він рухався і махав мені рукою.»',
    attribution: 'Учень 3 класу',
  },
]

```

### `src/features/landing-hero/data/rocket.ts`
```typescript
export interface RocketWaypoint {
  /** X position as fraction of viewport width */
  x: number
  /** Y position as fraction of viewport height */
  y: number
}

export const ROCKET_WAYPOINTS: RocketWaypoint[] = [
  { x: 0.20, y: 0.05 },
  { x: 0.28, y: 0.10 },
  { x: 0.38, y: 0.13 },
  { x: 0.48, y: 0.18 },
  { x: 0.56, y: 0.25 },
  { x: 0.62, y: 0.33 },
  { x: 0.66, y: 0.41 },
  { x: 0.62, y: 0.49 },
  { x: 0.52, y: 0.55 },
  { x: 0.42, y: 0.61 },
  { x: 0.36, y: 0.67 },
  { x: 0.38, y: 0.73 },
  { x: 0.46, y: 0.79 },
  { x: 0.50, y: 0.86 },
  { x: 0.50, y: 0.95 },
]

```

### `src/features/landing-hero/data/stats.ts`
```typescript
export interface StatBlock {
  target: number
  suffix: string
  starsCount: number
  label: string
}

export const STATS: StatBlock[] = [
  { target: 120, suffix: '+', starsCount: 12, label: 'закладів' },
  { target: 25000, suffix: '+', starsCount: 12, label: 'дітей' },
  { target: 3, suffix: '', starsCount: 6, label: 'унікальні світи' },
  { target: 100, suffix: '%', starsCount: 12, label: 'власні сценарії' },
]

```

### `src/features/landing-hero/data/team.ts`
```typescript
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
    name: 'Марія',
    role: 'режисерка',
    phrase: 'Люблю момент, коли зала на секунду затихає.',
    bg: '#1E2447',
    accent: '#F2B84B',
  },
  {
    name: 'Олег',
    role: 'технічний директор',
    phrase: 'Найкраща технологія — та, якої не помічають.',
    bg: '#232848',
    accent: '#FF7A59',
  },
  {
    name: 'Настя',
    role: 'художниця',
    phrase: 'Кожен малюнок заслуговує ожити хоч раз.',
    bg: '#141935',
    accent: '#F2B84B',
  },
  {
    name: 'Тарас',
    role: 'керівник',
    phrase: 'Найважливіше — щоб діти забули, що ми взагалі є.',
    bg: '#1E2447',
    accent: '#FF7A59',
  },
]

```

### `src/features/landing-hero/data/timeline.ts`
```typescript
export interface TimelineStep {
  label: string
}

export const TIMELINE_STEPS: TimelineStep[] = [
  { label: 'Знайомство' },
  { label: 'Підготовка' },
  { label: 'Приїзд' },
  { label: 'Подія' },
  { label: 'Щасливі діти' },
]

```

### `src/features/landing-hero/data/worlds.ts`
```typescript
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
    eyebrow: 'Проєкт 01 · Малювайка',
    heading: 'Світ фарб і фантазії',
    sub: 'Розвивальний проєкт для дитячого садочка: уява, дрібна моторика й упевненість у собі через яскраву творчість.',
  },
  4: {
    eyebrow: 'Чарівне море',
    heading: 'Намалюй рибку — і вона оживе',
    sub: "Кожна дитина малює свою рибку з любов'ю — а потім бачить, як та оживає й пливе в чарівному морі.",
  },
  5: {
    eyebrow: 'Проєкт 02 · Голограма',
    heading: 'Світ Голограм',
    sub: "Об'ємні 3D-проекції оживають прямо в залі — без окулярів, тільки щирий подив дітей.",
  },
  6: {
    eyebrow: 'Проєкт 03 · Popify',
    heading: 'Відео на згадку',
    sub: 'Сучасний формат зйомки яскравих 360°-відео. Уся апаратура — наша. Від дітей потрібні лише настрій і улюблена пісня.',
  },
  7: {
    eyebrow: 'Як це працює',
    heading: 'Своє відео за кілька хвилин',
    sub: '1-2 людини у кадрі — 200 грн, 3 і більше — 100 грн з кожного. Спробувати може кожен охочий.',
  },
}

```

### `src/features/landing-hero/hooks/useAudioAmbience.ts`
```typescript
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

```

### `src/features/landing-hero/hooks/useBeatStrength.ts`
```typescript
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

```

### `src/features/landing-hero/hooks/useBeatStrengths.ts`
```typescript
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

```

### `src/features/landing-hero/hooks/useFirstScroll.ts`
```typescript
import { useEffect, useRef, useState } from 'react'

export function useFirstScroll(): boolean {
  const [hasInteracted, setHasInteracted] = useState(false)
  const touchedRef = useRef(false)

  useEffect(() => {
    if (touchedRef.current) return

    const onInteract = () => {
      if (touchedRef.current) return
      touchedRef.current = true
      setHasInteracted(true)
      window.removeEventListener('wheel', onInteract)
      window.removeEventListener('touchmove', onInteract)
      window.removeEventListener('keydown', onKey)
    }

    const onKey = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' ']
      if (scrollKeys.includes(e.key)) onInteract()
    }

    window.addEventListener('wheel', onInteract, { passive: true })
    window.addEventListener('touchmove', onInteract, { passive: true })
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('wheel', onInteract)
      window.removeEventListener('touchmove', onInteract)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return hasInteracted
}

```

### `src/features/landing-hero/hooks/useHeroIntro.ts`
```typescript
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export type HeroPhase = 'idle' | 'intro' | 'ready'

interface HeroIntroState {
  phase: HeroPhase
  introProgress: number
}

export function useHeroIntro(): HeroIntroState {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<HeroPhase>('idle')
  const [introProgress, setIntroProgress] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (reduced) {
      setPhase('ready')
      setIntroProgress(1)
      return
    }

    const startTime = performance.now()
    const INTRO_DURATION = 600

    setPhase('intro')

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / INTRO_DURATION, 1)
      setIntroProgress(t)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('ready')
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [reduced])

  return { phase, introProgress }
}

```

### `src/features/landing-hero/hooks/useMotionTimeline.ts`
```typescript
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

  const scrollRef = useRef({ y: 0, lastY: 0, velocitySmooth: 0, stoppedFrames: 0 })
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
        if (Math.abs(rawVelocity) < 20) {
          scroll.stoppedFrames++
        } else {
          scroll.stoppedFrames = 0
        }
        if (scroll.stoppedFrames > 2) {
          scroll.velocitySmooth = 0
        } else {
          scroll.velocitySmooth = lerp(scroll.velocitySmooth, rawVelocity, clamp(dt * 6, 0, 1))
        }
        scroll.lastY = scroll.y

        t.velocity = clamp(scroll.velocitySmooth, -3000, 3000)
        t.acceleration = 0
        t.direction = t.velocity > 50 ? 1 : t.velocity < -50 ? -1 : 0
        t.isScrolling = Math.abs(t.velocity) > 30

        for (let i = 0; i < TOTAL_BEATS; i++) {
          t.beatStrengths[i] = computeBeatStrength(t.progress, i)
        }
      }

      const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)

      t.camera.x = 0
      t.camera.y = 0
      t.camera.tiltX = 0
      t.camera.tiltY = 0
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
      const parallaxInertia = [0.02, 0.03, 0.05, 0.06, 0.08, 0.1, 0.15, 0.1]
      for (let i = 0; i < 8; i++) {
        const targetPx = t.progress * t.vh * parallaxSpeeds[i] * 0.12
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

```

### `src/features/landing-hero/hooks/useReducedMotion.ts`
```typescript
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

```

### `src/features/landing-hero/hooks/useRocketPath.ts`
```typescript
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

```

### `src/features/landing-hero/hooks/useScrollSnap.ts`
```typescript
import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { tweenScrollTo } from '../lib/animation'

const TOTAL_BEATS = 13
const STOP_DELAY = 250

function getBeatCenters(): number[] {
  const centers: number[] = []
  for (let i = 0; i < TOTAL_BEATS; i++) {
    centers.push((i + 0.5) / TOTAL_BEATS)
  }
  centers.push(1)
  return centers
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
  enabled: boolean = true,
) {
  const timerRef = useRef(0)
  const snappingRef = useRef(false)
  const userInputRef = useRef(false)
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(0)
  const scrollEndFiredRef = useRef(false)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const markUserInput = () => { userInputRef.current = true }
    window.addEventListener('wheel', markUserInput, { passive: true })
    window.addEventListener('touchmove', markUserInput, { passive: true })

    const evaluate = () => {
      if (snappingRef.current) return
      const track = containerRef.current
      if (!track) return
      const total = Math.max(1, track.scrollHeight - window.innerHeight)
      const progress = window.scrollY / total

      const now = performance.now()
      const dt = now - lastTimeRef.current
      const dy = window.scrollY - lastScrollRef.current
      const velocity = dt > 0 ? dy / dt : 0
      const scrollingDown = velocity > 0.15

      if (progress > 0.9 && scrollingDown) return

      if (progress < 0.005 || progress > 0.995) return

      const target = nearestBeat(progress)
      const targetPx = target * total
      const DEADZONE = window.innerHeight * 0.15

      if (Math.abs(window.scrollY - targetPx) < DEADZONE) return

      snappingRef.current = true
      userInputRef.current = false
      tweenScrollTo(targetPx, { onCancelCheck: () => userInputRef.current }).then(() => {
        snappingRef.current = false
      })
    }

    const onScroll = () => {
      const now = performance.now()
      lastScrollRef.current = window.scrollY
      lastTimeRef.current = now

      clearTimeout(timerRef.current)
      if (!scrollEndFiredRef.current) {
        timerRef.current = window.setTimeout(evaluate, STOP_DELAY)
      }
    }

    const onScrollEnd = () => {
      scrollEndFiredRef.current = true
      clearTimeout(timerRef.current)
      evaluate()
      setTimeout(() => { scrollEndFiredRef.current = false }, 50)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const hasScrollEnd = 'onscrollend' in window
    if (hasScrollEnd) {
      window.addEventListener('scrollend', onScrollEnd)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('wheel', markUserInput)
      window.removeEventListener('touchmove', markUserInput)
      clearTimeout(timerRef.current)
    }
  }, [containerRef, enabled])
}

```

### `src/features/landing-hero/hooks/useScrollStory.ts`
```typescript
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

```

### `src/features/landing-hero/hooks/useSmoothProgress.ts`
```typescript
import { useSpring, useMotionValueEvent } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'
import type { MotionValue } from 'framer-motion'

export function useSmoothProgress(source: MotionValue<number>) {
  const reduced = useReducedMotion()
  const smooth = useSpring(source, {
    stiffness: 210,
    damping: 32,
    mass: 1.1,
    restDelta: 0.0001,
  })

  useMotionValueEvent(source, 'change', (latest) => {
    if (Math.abs(latest - smooth.get()) > 0.1) {
      smooth.jump(latest)
    }
  })

  return reduced ? source : smooth
}

```

### `src/features/landing-hero/LandingHero.tsx`
```typescript
import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollStory } from './hooks/useScrollStory'
import { useMotionTimeline } from './hooks/useMotionTimeline'
import { useBeatStrengths } from './hooks/useBeatStrengths'
import { useSmoothProgress } from './hooks/useSmoothProgress'
import { useScrollSnap } from './hooks/useScrollSnap'
import { useReducedMotion } from './hooks/useReducedMotion'
import { clamp, tweenScrollTo } from './lib/animation'
import { Z } from './lib/zIndex'

import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { CursorGlow } from './components/CursorGlow'
import { ScrollHint } from './components/ScrollHint'
import { ContactPanel } from './components/ContactPanel'
import { FilmGrain } from './components/FilmGrain'

import { NebulaOverlay } from './components/overlays/NebulaOverlay'
import { RocketOverlay } from './components/overlays/RocketOverlay'
import { PortalOverlay } from './components/overlays/PortalOverlay'
import { GrassGround } from './components/overlays/GrassGround'
import { GlobalAmbientCanvas } from './components/overlays/GlobalAmbientCanvas'
import { AmbientCtx, useAmbientCommands } from './context/AmbientContext'

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
  const { containerRef, scrollYProgress } = useScrollStory()
  const smoothProgress = useSmoothProgress(scrollYProgress)
  const { tl, subscribe, startWarp } = useMotionTimeline(smoothProgress)
  const [contactOpen, setContactOpen] = useState(false)

  const beatStrengths = useBeatStrengths(smoothProgress)
  const reduced = useReducedMotion()

  useScrollSnap(smoothProgress, containerRef, !reduced)

  const { commands, setCommands } = useAmbientCommands()
  const [heroCompleted, setHeroCompleted] = useState(false)

  const finaleStrength = beatStrengths[12]

  const handleHeroComplete = useCallback(() => {
    if (heroCompleted) return
    setHeroCompleted(true)
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = (1 / 13) * total
    window.scrollTo(0, target)
  }, [containerRef, heroCompleted])

  const WARP_HALF = 250

  const scrollToFraction = useCallback((frac: number) => {
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = clamp(frac, 0, 1) * total
    const currentProgress = clamp(smoothProgress.get(), 0, 1)
    const fromBeat = Math.floor(currentProgress * 13)
    const toBeat = Math.floor(frac * 13)
    const distance = Math.abs(toBeat - fromBeat)

    if (distance <= 1) {
      tweenScrollTo(target)
      return
    }

    if (reduced) {
      window.scrollTo(0, target)
      return
    }

    startWarp(currentProgress)
    setTimeout(() => {
      window.scrollTo(0, target)
    }, WARP_HALF)
  }, [containerRef, smoothProgress, startWarp, reduced])

  const beats: [MotionValue<number>, React.ReactNode][] = [
    [beatStrengths[0], <HeroBeat key="hero" progress={smoothProgress} onOpenContact={() => setContactOpen(true)} onHeroComplete={handleHeroComplete} />],
    [beatStrengths[1], <ManifestBeat key="manifest" progress={smoothProgress} />],
    [beatStrengths[2], <PillarsBeat key="pillars" progress={smoothProgress} />],
    ...[3, 4, 5, 6, 7].map((i) => [beatStrengths[i], <WorldBeat key={`world-${i}`} progress={smoothProgress} beatIndex={i} />] as [MotionValue<number>, React.ReactNode]),
    [beatStrengths[8], <TimelineBeat key="timeline" progress={smoothProgress} />],
    [beatStrengths[9], <GalleryBeat key="gallery" progress={smoothProgress} />],
    [beatStrengths[10], <TeamVoicesBeat key="team" progress={smoothProgress} />],
    [beatStrengths[11], <StatsBeat key="stats" progress={smoothProgress} />],
    [beatStrengths[12], <FinaleBeat key="finale" progress={smoothProgress} onOpenContact={() => setContactOpen(true)} />],
  ]

  return (
    <AmbientCtx.Provider value={commands}>
      <a
        href="#main"
        className={`fixed -left-[999px] top-0 bg-gold px-5 py-3 font-bold text-night focus:left-4 focus:top-4`}
        style={{ zIndex: Z.skipLinks }}
      >
        Перейти до змісту
      </a>
      <a
        href="#contact"
        className={`fixed -left-[999px] top-0 bg-coral px-5 py-3 font-bold text-night focus:left-4 focus:top-16`}
        style={{ zIndex: Z.skipLinks }}
      >
        Пропустити до форми
      </a>

      <ProgressRail progress={smoothProgress} />
      <Nav
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToFraction}
        progress={smoothProgress}
      />
      <CursorGlow tl={tl} />

      {/* Universe (fixed background) */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: Z.overlays }} aria-hidden="true">
        <NebulaOverlay tl={tl} subscribe={subscribe} progress={smoothProgress} />
        <GlobalAmbientCanvas tl={tl} subscribe={subscribe} setCommands={setCommands} />
        <PortalOverlay tl={tl} subscribe={subscribe} progress={smoothProgress} />
        <GrassGround tl={tl} subscribe={subscribe} />
        <RocketOverlay tl={tl} progress={smoothProgress} subscribe={subscribe} heroCompleted={heroCompleted} />
        <motion.div
          className="pointer-events-none fixed inset-0 bg-night"
          style={{ opacity: finaleStrength, zIndex: 4 }}
          aria-hidden="true"
        />
      </div>

      {/* Story beats */}
      <main id="main" ref={containerRef} className="relative" style={{ zIndex: Z.content }}>
        <div className="h-[1100vh] max-md:h-[700vh]">
          <div className="fixed inset-0 overflow-visible pointer-events-none" style={{ zIndex: Z.content }}>
            {beats.map(([strength, child], i) => (
              <BeatWrapper key={i} strength={strength}>
                {child}
              </BeatWrapper>
            ))}
          </div>
        </div>
      </main>

      <ScrollHint progress={smoothProgress} finaleStrength={finaleStrength} />
      <SoundToggle />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <FilmGrain />
    </AmbientCtx.Provider>
  )
}

```

### `src/features/landing-hero/lib/animation.ts`
```typescript
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

```

### `src/features/landing-hero/lib/colors.ts`
```typescript
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

```

### `src/features/landing-hero/lib/rocketMath.ts`
```typescript
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

```

### `src/features/landing-hero/lib/zIndex.ts`
```typescript
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

```

### `src/features/landing-hero/types/timeline.ts`
```typescript
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

```

### `src/index.css`
```css
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

.heat-haze { filter: url(#heat); }

.pulse-line {
  background: linear-gradient(90deg, transparent, rgba(242,184,75,0.8), transparent);
  background-size: 200% 100%;
  animation: energyPulse 3s linear infinite;
}

@keyframes energyPulse {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .15s !important;
  }
}

```

### `src/main.tsx`
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

**Files:** 68 | **Lines:** 4,760
