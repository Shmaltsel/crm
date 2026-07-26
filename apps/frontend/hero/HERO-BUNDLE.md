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
    └── features/landing-hero/
        ├── LandingHero.tsx
        ├── components/
        │   ├── MediaPlaceholder.tsx
        │   ├── Nav.tsx
        │   ├── ContactPanel.tsx
        │   ├── Footer.tsx
        │   ├── CursorGlow.tsx
        │   ├── ProgressRail.tsx
        │   ├── ScrollHint.tsx
        │   ├── SoundToggle.tsx
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
        │   ├── useReducedMotion.ts
        │   ├── useRocketPath.ts
        │   ├── useScrollSnap.ts
        │   └── useScrollStory.ts
        └── lib/
            ├── animation.ts
            └── colors.ts
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

## src/main.tsx

```tsx
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

## src/App.tsx

```tsx
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

## src/index.css

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

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .15s !important;
  }
}
```

---

## features/landing-hero/LandingHero.tsx

```tsx
import { useCallback, useState } from 'react'
import { useScrollStory } from './hooks/useScrollStory'
import { useBeatStrengths } from './hooks/useBeatStrengths'
import { useScrollSnap } from './hooks/useScrollSnap'
import { clamp } from './lib/animation'

import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { CursorGlow } from './components/CursorGlow'
import { ScrollHint } from './components/ScrollHint'
import { ContactPanel } from './components/ContactPanel'
import { Footer } from './components/Footer'

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

export function LandingHero() {
  const { containerRef, scrollYProgress } = useScrollStory()
  const [contactOpen, setContactOpen] = useState(false)

  const beatStrengths = useBeatStrengths(scrollYProgress)

  useScrollSnap(scrollYProgress, containerRef)

  const drawingStrength = beatStrengths[5]
  const finaleStrength = beatStrengths[12]

  const scrollToFraction = useCallback((frac: number) => {
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = clamp(frac, 0, 1) * total
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [containerRef])

  const handleConfetti = useCallback((x: number, y: number) => {
    const colors = ['#F2B84B', '#FF7A59', '#8FE3E0', '#FBF5EA']
    for (let i = 0; i < 30; i++) {
      const bit = document.createElement('div')
      bit.style.cssText = `position:fixed;width:7px;height:10px;z-index:410;pointer-events:none;border-radius:1px;left:${x}px;top:${y}px;background:${colors[Math.floor(Math.random() * colors.length)]}`
      const ang = Math.random() * Math.PI * 2
      const dist = 90 + Math.random() * 170
      const dx = Math.cos(ang) * dist
      const dy = Math.sin(ang) * dist * 0.65 - 50
      bit.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${dx}px,${dy + 230}px) rotate(${Math.random() * 420}deg)`, opacity: 0 },
        ],
        { duration: 1150 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' },
      )
      document.body.appendChild(bit)
      setTimeout(() => bit.remove(), 1800)
    }
  }, [])

  return (
    <>
      <a href="#main" className="fixed -left-[999px] top-0 z-[9999] bg-gold px-5 py-3 font-bold text-night focus:left-4 focus:top-4">
        Перейти до змісту
      </a>
      <a href="#contact" className="fixed -left-[999px] top-0 z-[9999] bg-coral px-5 py-3 font-bold text-night focus:left-4 focus:top-16">
        Пропустити до форми
      </a>

      <ProgressRail progress={scrollYProgress} />
      <Nav onOpenContact={() => setContactOpen(true)} onNavigate={scrollToFraction} />
      <CursorGlow />

      <div className="fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <NebulaOverlay progress={scrollYProgress} />
        <StarField />
        <PortalOverlay progress={scrollYProgress} beatStrengths={beatStrengths} />
        <GrassGround drawingStrength={drawingStrength} />
        <RocketOverlay progress={scrollYProgress} finaleStrength={finaleStrength} />
      </div>

      <main id="main" ref={containerRef} className="relative z-[10]">
        <div className="h-[1100vh] max-md:h-[700vh]">
          <div className="fixed inset-0 z-[10] pointer-events-none">
            <div className="pointer-events-auto">
              <HeroBeat progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} />
            </div>
            <div className="pointer-events-auto">
              <ManifestBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <PillarsBeat progress={scrollYProgress} />
            </div>
            {[3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="pointer-events-auto">
                <WorldBeat progress={scrollYProgress} beatIndex={i} />
              </div>
            ))}
            <div className="pointer-events-auto">
              <TimelineBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <GalleryBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <TeamVoicesBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <StatsBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <FinaleBeat progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} onConfetti={handleConfetti} />
            </div>
          </div>
        </div>
      </main>

      <ScrollHint progress={scrollYProgress} finaleStrength={finaleStrength} />
      <SoundToggle />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer onOpenContact={() => setContactOpen(true)} />
    </>
  )
}
```

---

## components/MediaPlaceholder.tsx

```tsx
import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  icon?: ReactNode
  className?: string
  src?: string
}

export function MediaPlaceholder({ label, icon, className = '', src }: Props) {
  if (src) {
    return <VideoMedia src={src} className={className} />
  }

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gold/25 bg-white/[0.03] ${className}`}>
      <div className="flex flex-col items-center gap-2.5 text-center">
        {icon ?? (
          <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-30">
            <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="20" r="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <path d="M4,34 L16,24 L26,30 L34,22 L44,30" stroke="#F2B84B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </svg>
        )}
        <span className="text-[11px] uppercase tracking-[0.12em] text-mist-soft/50">{label}</span>
      </div>
    </div>
  )
}

function VideoMedia({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const onCanPlay = () => setReady(true)
    v.addEventListener('loadeddata', onCanPlay)
    v.load()
    return () => v.removeEventListener('loadeddata', onCanPlay)
  }, [src])

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-night ${className}`}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
        onMouseLeave={(e) => {
          const v = e.currentTarget as HTMLVideoElement
          v.pause()
          v.currentTime = 0
        }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-30">
            <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="20" r="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <path d="M4,34 L16,24 L26,30 L34,22 L44,30" stroke="#F2B84B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}
```

---

## components/Nav.tsx

```tsx
import { useState, useEffect } from 'react'

interface Props {
  onOpenContact: () => void
  onNavigate: (fraction: number) => void
}

const NAV_LINKS = [
  { label: 'Про нас', fraction: 0.18 },
  { label: 'Наші світи', fraction: 0.28 },
  { label: 'Як проходить', fraction: 0.62 },
  { label: 'Галерея', fraction: 0.70 },
  { label: 'Команда', fraction: 0.78 },
]

export function Nav({ onOpenContact, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-[300] transition-all duration-[400ms] ${scrolled ? 'bg-night/72 py-3 backdrop-blur-[14px] border-b border-gold/12' : 'py-[18px]'}`}>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[18px] font-semibold text-paper">
          <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(242,184,75,0.38)]" aria-hidden="true" />
          Світло Знань
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href="#" onClick={(e) => { e.preventDefault(); onNavigate(link.fraction) }} className="text-[13.5px] font-medium text-mist transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
          <button onClick={onOpenContact} className="rounded-full bg-gold px-[22px] py-2.5 text-[13.5px] font-bold text-night transition-all hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(242,184,75,0.38)]">
            Запросити подію
          </button>
        </div>

        <button className="flex flex-col gap-1.5 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={mobileOpen}>
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-gold/12 bg-night/95 backdrop-blur-[14px] md:hidden">
          <div className="flex flex-col items-center gap-5 py-6">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href="#" onClick={(e) => { e.preventDefault(); onNavigate(link.fraction); setMobileOpen(false) }} className="text-[15px] font-medium text-mist transition-colors hover:text-gold">
                {link.label}
              </a>
            ))}
            <button onClick={() => { onOpenContact(); setMobileOpen(false) }} className="rounded-full bg-gold px-7 py-3 text-[14px] font-bold text-night">
              Запросити подію
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
```

---

## components/ContactPanel.tsx

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        <motion.div initial={{ y: 340 }} animate={{ y: 0 }} exit={{ y: 340 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed bottom-0 left-1/2 z-[400] w-[min(500px,92vw)] -translate-x-1/2 rounded-t-[22px] border border-gold/28 bg-[rgba(18,23,48,0.94)] px-[34px] pb-9 pt-8 backdrop-blur-[18px] shadow-[0_-24px_70px_rgba(0,0,0,0.45)]">
          <button onClick={onClose} className="absolute right-4 top-3.5 border-none bg-transparent text-[22px] text-mist-soft transition-colors hover:text-gold" aria-label="Закрити">&times;</button>
          <h3 className="font-display text-[21px]">Запросити подію</h3>
          {status === 'success' ? (
            <p className="mt-4 text-[15px] text-mist">Дякуємо! Ми зв'яжемося найближчим часом.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <input type="text" placeholder="Ваше ім'я" required minLength={2} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold" />
              <input type="text" placeholder="Телефон або email" required value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold" />
              <textarea placeholder="Повідомлення (необов'язково)" rows={3} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="rounded-lg border border-gold/20 bg-white/5 px-4 py-3 text-[15px] text-paper placeholder-mist-soft outline-none focus:border-gold resize-none" />
              {status === 'error' && <p className="text-[13px] text-coral">Щось пішло не так. Спробуйте ще раз або напишіть нам.</p>}
              <button type="submit" disabled={status === 'loading'} className="mt-1 rounded-full border-none bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] disabled:opacity-60">
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

---

## components/Footer.tsx

```tsx
interface Props {
  onOpenContact: () => void
}

export function Footer({ onOpenContact }: Props) {
  return (
    <footer className="relative z-[50] border-t border-gold/12 bg-night py-9 text-[13px] text-mist-soft">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3.5 px-7">
        <span>&copy; 2026 Світло Знань. Уява оживає.</span>
        <ul className="flex list-none gap-[22px]">
          <li><a href="#" className="text-mist-soft transition-colors hover:text-gold">Публічна оферта</a></li>
          <li><a href="#" className="text-mist-soft transition-colors hover:text-gold">Політика конфіденційності</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact() }} className="text-mist-soft transition-colors hover:text-gold">Контакти</a></li>
        </ul>
      </div>
    </footer>
  )
}
```

---

## components/CursorGlow.tsx

```tsx
import { useState, useEffect } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div className="pointer-events-none fixed z-[5] h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-400" aria-hidden="true" style={{ left: pos.x, top: pos.y, opacity: visible ? 1 : 0, background: 'radial-gradient(circle, rgba(242,184,75,0.12) 0%, transparent 70%)' }} />
  )
}
```

---

## components/ProgressRail.tsx

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
}

export function ProgressRail({ progress }: Props) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <div className="fixed top-0 left-0 right-0 z-[310] h-[3px] bg-white/6">
      <motion.div className="h-full bg-gradient-to-r from-coral to-gold shadow-[0_0_12px_rgba(242,184,75,0.38)]" style={{ width }} />
    </div>
  )
}
```

---

## components/ScrollHint.tsx

```tsx
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

interface Props {
  progress: MotionValue<number>
  finaleStrength: MotionValue<number>
}

export function ScrollHint({ progress, finaleStrength }: Props) {
  const [opacity, setOpacity] = useState(1)

  useMotionValueEvent(progress, 'change', (p) => {
    if (p > 0.015 || finaleStrength.get() > 0.3) setOpacity(0)
    else setOpacity(1)
  })

  useMotionValueEvent(finaleStrength, 'change', (s) => {
    if (s > 0.3) setOpacity(0)
  })

  return (
    <div className="pointer-events-none fixed bottom-7 left-1/2 z-[150] -translate-x-1/2 text-center" style={{ opacity }}>
      <div className="mx-auto mb-2 h-8 w-px bg-gradient-to-b from-gold to-transparent">
        <div className="h-full w-full origin-top" style={{ animation: 'cueMove 2.4s cubic-bezier(.22,1,.36,1) infinite' }} />
      </div>
      <span className="text-[11px] uppercase tracking-[0.16em] text-mist-soft">Скрольте, щоб летіти далі</span>
    </div>
  )
}
```

---

## components/SoundToggle.tsx

```tsx
import { useAudioAmbience } from '../hooks/useAudioAmbience'

export function SoundToggle() {
  const { soundOn, toggle } = useAudioAmbience()
  return (
    <button onClick={toggle} aria-pressed={soundOn} aria-label={soundOn ? 'Вимкнути звук' : 'Увімкнути звук'} className={`fixed bottom-5 right-5 z-[320] flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-night/70 text-paper backdrop-blur-[12px] transition-all hover:scale-[1.08] ${soundOn ? 'border-gold shadow-[0_0_22px_rgba(242,184,75,0.38)]' : 'border-gold/35'}`}>
      {soundOn ? '🔊' : '🔈'}
    </button>
  )
}
```

---

## components/beats/HeroBeat.tsx

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { MEDIA_URLS } from '../../data/media'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

export function HeroBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 0)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div role="region" aria-label="Головна секція" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Освітні події для дітей</p>
        <h1 className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper">Уява<br /><em className="font-serif italic text-gold">оживає</em></h1>
        <p className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist">Ми створюємо сучасні освітні події, які діти пам'ятають роками.</p>
        <MediaPlaceholder label="Відео-превʼю події" src={MEDIA_URLS.heroPreview} className="mx-auto mt-8 h-[min(220px,30vw)] w-[min(420px,80vw)]" />
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <button className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]">Летимо далі</button>
          <button onClick={onOpenContact} className="rounded-full border border-white/32 bg-transparent px-7 py-3.5 text-[14.5px] font-bold text-paper transition-all hover:-translate-y-[3px] hover:border-gold hover:text-gold">Запросити подію</button>
        </div>
      </div>
    </motion.div>
  )
}
```

---

## components/beats/ManifestBeat.tsx

```tsx
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
    <motion.div role="region" aria-label="Наш принцип" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Наш принцип</p>
        <p className="text-[clamp(24px,3.5vw,40px)] leading-[1.35] text-paper">Ми не проводимо заходи.<br />Ми запалюємо <span className="text-coral">світло</span> в очах дітей.</p>
        <MediaPlaceholder label="Фото або відео з події" src={MEDIA_URLS.malyuvaika} className="mx-auto mt-8 h-[min(180px,24vw)] w-[min(380px,75vw)]" />
      </div>
    </motion.div>
  )
}
```

---

## components/beats/WorldBeat.tsx

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { BEAT_CONTENT } from '../../data/worlds'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'

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

export function WorldBeat({ progress, beatIndex }: Props) {
  const strength = useBeatStrength(progress, beatIndex)
  const y = useTransform(strength, [0, 1], [22, 0])
  const content = BEAT_CONTENT[beatIndex]
  if (!content) return null

  return (
    <motion.div role="region" aria-label={content.heading} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
        <MediaPlaceholder label={WORLD_ICONS[beatIndex] ?? 'Ілюстрація'} src={WORLD_MEDIA[beatIndex]} className="h-[min(200px,28vw)] w-full shrink-0 md:h-[200px] md:w-[280px]" />
        <div className="max-w-[480px]">
          <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">{content.eyebrow}</p>
          <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">{content.heading}</h2>
          {content.sub && <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0">{content.sub}</p>}
        </div>
      </div>
    </motion.div>
  )
}
```

---

## components/beats/PillarsBeat.tsx

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { PILLARS } from '../../data/pillars'

const PILLAR_ICONS = [
  <svg key="clock" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8"><circle cx="22" cy="22" r="16" stroke="#F2B84B" strokeWidth="1.6" /><path d="M22 13v9l6 4" stroke="#FF7A59" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  <svg key="person" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8"><path d="M8 34c0-8 6-13 14-13s14 5 14 13" stroke="#F2B84B" strokeWidth="1.6" strokeLinecap="round" /><circle cx="22" cy="14" r="7" stroke="#FF7A59" strokeWidth="1.8" /></svg>,
  <svg key="star" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8"><path d="M22 8l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" stroke="#F2B84B" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  <svg key="cross" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8"><path d="M10 22h24M22 10v24" stroke="#F2B84B" strokeWidth="1.6" strokeLinecap="round" /><circle cx="22" cy="22" r="15" stroke="#FF7A59" strokeWidth="1.6" /></svg>,
]

interface Props {
  progress: MotionValue<number>
}

export function PillarsBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 2)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div role="region" aria-label="Чому нам довіряють" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Чому нам довіряють</p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">Довіра будується на деталях</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-[26px]">
          {PILLARS.map((pillar, idx) => (
            <PillarItem key={idx} pillar={pillar} icon={PILLAR_ICONS[idx]} index={idx} strength={strength} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function PillarItem({ pillar, icon, index, strength }: { pillar: (typeof PILLARS)[number]; icon: React.ReactNode; index: number; strength: MotionValue<number> }) {
  const litThreshold = 0.05 + index * 0.12
  const opacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0, 0, 1])
  const translateY = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [16, 16, 0])
  const scale = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.94, 0.94, 1])

  return (
    <motion.div className="max-w-[180px] text-center" style={{ opacity, y: translateY, scale }}>
      {icon}
      <h3 className="mb-1.5 text-[15px] font-bold">{pillar.title}</h3>
      <p className="text-[13px] leading-[1.4] text-mist-soft">{pillar.description}</p>
    </motion.div>
  )
}
```

---

## components/beats/TimelineBeat.tsx

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { TIMELINE_STEPS } from '../../data/timeline'

interface Props {
  progress: MotionValue<number>
}

export function TimelineBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 8)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div role="region" aria-label="Як проходить подія" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">П'ять кроків</p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">Як проходить подія</h2>
        <div className="relative mx-auto mt-[42px] w-[min(700px,90vw)] pt-2">
          <div className="absolute top-[9px] left-0 right-0 h-px bg-gold/22" />
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

function TimelineStepItem({ step, index, strength }: { step: (typeof TIMELINE_STEPS)[number]; index: number; strength: MotionValue<number> }) {
  const litThreshold = 0.05 + index * 0.14
  const dotBg = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['transparent', 'transparent', '#F2B84B'])
  const dotScale = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['scale(1)', 'scale(1)', 'scale(1.2)'])
  const labelOpacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0, 0, 1])

  return (
    <div className="flex w-[20%] flex-col items-center gap-2.5">
      <motion.span className="block h-3.5 w-3.5 rounded-full border-2 border-gold" style={{ backgroundColor: dotBg, transform: dotScale }} />
      <motion.span className="text-[12px] text-mist-soft" style={{ opacity: labelOpacity }}>{step.label}</motion.span>
    </div>
  )
}
```

---

## components/beats/GalleryBeat.tsx

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { GALLERY_NODES } from '../../data/gallery'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
}

export function GalleryBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 9)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div role="region" aria-label="Галерея емоцій" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[820px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Галерея емоцій</p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">Моменти, складені в сузір&apos;я</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {GALLERY_NODES.map((node, idx) => (
            <GalCard key={idx} node={node} index={idx} strength={strength} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function GalCard({ node, index, strength }: { node: (typeof GALLERY_NODES)[number]; index: number; strength: MotionValue<number> }) {
  const litThreshold = 0.02 + index * 0.14
  const opacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.3, 0.3, 1])
  const scaleVal = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.9, 0.9, 1])

  return (
    <motion.div className="flex flex-col items-center gap-2" style={{ opacity, scale: scaleVal }}>
      <MediaPlaceholder label={node.label} className="h-[100px] w-full" />
    </motion.div>
  )
}
```

---

## components/beats/TeamVoicesBeat.tsx

```tsx
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
    const interval = setInterval(() => { setActiveIdx((prev) => (prev + 1) % CAMPFIRE_QUOTES.length) }, 4200)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div role="region" aria-label="Голоси та команда" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Голоси та команда</p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">Люди, яких не скопіювати</h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-12">
          <div className="h-[42px] w-7"><svg viewBox="0 0 30 44"><path d="M15,4 C24,18 24,28 15,40 C6,28 6,18 15,4 Z" fill="#F2B84B" /></svg></div>
          <div className="relative w-[min(500px,90vw)]" style={{ minHeight: 110 }}>
            {CAMPFIRE_QUOTES.map((quote, idx) => (
              <div key={idx} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: idx === activeIdx ? 1 : 0 }}>
                <p className="font-display text-[18.5px] leading-[1.42]">{quote.text}</p>
                <p className="mt-3 text-[12.5px] font-bold text-mist-soft">{quote.attribution}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {TEAM_MEMBERS.map((member, idx) => (
            <button key={idx} onClick={() => setSelectedMember(idx)} className={`flex flex-col items-center gap-1.5 rounded-xl border-2 bg-white/[0.03] px-3 py-3 transition-all hover:-translate-y-[3px] ${selectedMember === idx ? 'border-gold shadow-[0_0_18px_rgba(242,184,75,0.22)]' : 'border-gold/20'}`} aria-label={`${member.name}, ${member.role}`}>
              <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border border-gold/20 bg-white/[0.04]">
                <svg viewBox="0 0 48 48" className="h-7 w-7 opacity-35"><circle cx="24" cy="18" r="8" stroke="#F2B84B" strokeWidth="1.5" fill="none" /><path d="M10,44 C10,32 38,32 38,44" stroke="#F2B84B" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <span className="text-[11px] font-medium text-mist-soft">{member.name}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 min-h-[22px] text-[14px] text-mist italic">
          {selectedMember !== null ? TEAM_MEMBERS[selectedMember].phrase : 'Натисніть на людину, щоб почути її історію.'}
        </p>
      </div>
    </motion.div>
  )
}
```

---

## components/beats/StatsBeat.tsx

```tsx
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
    <motion.div role="region" aria-label="Цифри світла" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Цифри світла</p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">Небо, яке ми запалили разом</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-10">
          {STATS.map((stat, idx) => <StatItem key={idx} stat={stat} strength={strength} />)}
        </div>
      </div>
    </motion.div>
  )
}

function StatItem({ stat, strength }: { stat: (typeof STATS)[number]; strength: MotionValue<number> }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [litStars, setLitStars] = useState(0)
  const triggeredRef = useRef(false)
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > 0.5 && !triggeredRef.current) {
      triggeredRef.current = true
      if (reduced) { setDisplayValue(stat.target); setLitStars(stat.starsCount); return }
      animate(mv, stat.target, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { setDisplayValue(Math.round(v)); setLitStars(Math.round((stat.starsCount * v) / stat.target)) } })
    }
  })

  return (
    <div className="w-[140px]">
      <div className="mb-2.5 grid h-8 grid-cols-6 gap-[5px]">
        {Array.from({ length: stat.starsCount }, (_, i) => (
          <i key={i} className={`mx-auto h-1.5 w-1.5 justify-self-center rounded-full transition-all duration-250 ${i < litStars ? 'bg-gold shadow-[0_0_7px_rgba(242,184,75,0.38)]' : 'bg-gold/14'}`} />
        ))}
      </div>
      <div className="font-display text-[32px] text-paper">{displayValue.toLocaleString('uk-UA')}{stat.suffix}</div>
      <div className="mt-[3px] text-[12.5px] text-mist-soft">{stat.label}</div>
    </div>
  )
}
```

---

## components/beats/FinaleBeat.tsx

```tsx
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
    <motion.div role="region" aria-label="Запрошення" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: strength, y }}>
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">Запрошення</p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">Наступна історія<br />може початися <em className="font-serif italic text-gold">у вашій школі</em></h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <button onClick={handleClick} className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]">Запросити подію</button>
        </div>
      </div>
    </motion.div>
  )
}
```

---

## overlays/RocketOverlay.tsx

```tsx
import { MotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { useRocketPath } from '../../hooks/useRocketPath'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  finaleStrength: MotionValue<number>
}

interface Particle {
  id: number
  x: number
  y: number
  r: number
  opacity: number
  born: number
}

const TRAIL_COLORS = ['#F2B84B', '#FF7A59', '#FBF5EA']

export function RocketOverlay({ progress, finaleStrength }: Props) {
  const { rx, ry, rr } = useRocketPath(progress)
  const [pos, setPos] = useState({ x: 0, y: 0, r: -6 })
  const [opacity, setOpacity] = useState(1)
  const [particles, setParticles] = useState<Particle[]>([])
  const idRef = useRef(0)
  const lastTrailRef = useRef(0)

  const finaleS = useTransform(finaleStrength, (s) => clamp(1 - s * 1.4, 0, 1))

  useMotionValueEvent(rx, 'change', (v) => setPos((p) => ({ ...p, x: v * window.innerWidth })))
  useMotionValueEvent(ry, 'change', (v) => setPos((p) => ({ ...p, y: v * window.innerHeight })))
  useMotionValueEvent(rr, 'change', (v) => setPos((p) => ({ ...p, r: v })))
  useMotionValueEvent(finaleS, 'change', setOpacity)

  const spawnTrail = useCallback((x: number, y: number) => {
    const now = performance.now()
    if (now - lastTrailRef.current < 40) return
    lastTrailRef.current = now

    const newParticles: Particle[] = Array.from({ length: 2 }, () => {
      const angle = ((pos.r + 180) * Math.PI) / 180
      const spread = (Math.random() - 0.5) * 20
      return {
        id: idRef.current++,
        x: x + Math.cos(angle) * 18 + spread,
        y: y + Math.sin(angle) * 18 + spread,
        r: 1.5 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
        born: now,
      }
    })

    setParticles((prev) => {
      const alive = prev.filter((p) => now - p.born < 800)
      return [...alive, ...newParticles].slice(-40)
    })
  }, [pos.r])

  useMotionValueEvent(rx, 'change', () => {
    spawnTrail(pos.x, pos.y)
  })

  useMotionValueEvent(progress, 'change', () => {
    spawnTrail(pos.x, pos.y)
  })

  const now = performance.now()

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[6]"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh' }}
      >
        {particles.map((p) => {
          const age = clamp((now - p.born) / 800, 0, 1)
          const fade = 1 - age * age
          const color = TRAIL_COLORS[p.id % TRAIL_COLORS.length]
          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r * (1 - age * 0.6)}
              fill={color}
              opacity={p.opacity * fade * opacity}
            />
          )
        })}
      </svg>

      <div
        className="pointer-events-none fixed z-[6]"
        aria-hidden="true"
        style={{
          width: 100,
          height: 100,
          transform: `translate(${pos.x - 50}px, ${pos.y - 50}px) rotate(${pos.r}deg)`,
          opacity,
          willChange: 'transform',
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
              <stop offset="0%" stopColor="#FF7A59" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g>
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

            <path d="M-8,55 C-4,72 4,72 8,55" fill="url(#flameOuter)" opacity="0.5">
              <animate attributeName="d" values="M-8,55 C-4,72 4,72 8,55;M-6,55 C-2,78 2,78 6,55;M-8,55 C-4,72 4,72 8,55" dur="0.15s" repeatCount="indefinite" />
            </path>
            <path d="M-5,55 C-2,68 2,68 5,55" fill="url(#flameInner)" opacity="0.9">
              <animate attributeName="d" values="M-5,55 C-2,68 2,68 5,55;M-4,55 C-1,74 1,74 4,55;M-5,55 C-2,68 2,68 5,55" dur="0.12s" repeatCount="indefinite" />
            </path>
            <path d="M-2,55 L0,68 L2,55" fill="#FBF5EA" opacity="0.7">
              <animate attributeName="d" values="M-2,55 L0,68 L2,55;M-1,55 L0,74 L1,55;M-2,55 L0,68 L2,55" dur="0.1s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>
    </>
  )
}
```

## overlays/PortalOverlay.tsx

```tsx
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  beatStrengths: MotionValue<number>[]
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
}

export function PortalOverlay({ progress, beatStrengths }: Props) {
  const [s, setS] = useState<PlanetState>({
    portalS: 0, p0x: 0, p0y: 0, p1x: 0, p1y: 0, p2x: 0, p2y: 0, drift: 0,
  })

  useMotionValueEvent(progress, 'change', (p) => {
    const malyuvaikaS = Math.max(beatStrengths[3]?.get() ?? 0, beatStrengths[4]?.get() ?? 0)
    const hologramS = beatStrengths[5]?.get() ?? 0
    const popifyS = Math.max(beatStrengths[6]?.get() ?? 0, beatStrengths[7]?.get() ?? 0)
    const f = beatStrengths[12]?.get() ?? 0
    const portalS = clamp(Math.max(malyuvaikaS, hologramS, popifyS, f), 0, 1)

    setS({
      portalS,
      p0x: 82 + Math.sin(p * 2.2) * 4,
      p0y: 18 + Math.cos(p * 1.7) * 3,
      p1x: 14 + Math.sin(p * 1.9 + 1) * 5,
      p1y: 62 + Math.cos(p * 2.3 + 0.5) * 4,
      p2x: 72 + Math.sin(p * 1.4 + 2) * 3,
      p2y: 74 + Math.cos(p * 1.8 + 1) * 3,
      drift: p * 360,
    })
  })

  return (
    <svg
      className="pointer-events-none fixed inset-0 h-full w-full z-[1]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
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
      <g opacity={s.portalS * 0.85} transform={`translate(${s.p0x},${s.p0y})`}>
        <circle r="9" fill="url(#planet0-glow)" />
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
      <g opacity={s.portalS * 0.7} transform={`translate(${s.p1x},${s.p1y})`}>
        <circle r="7" fill="url(#planet1-glow)" />
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
      <g opacity={s.portalS * 0.65} transform={`translate(${s.p2x},${s.p2y})`}>
        <circle r="6" fill="url(#planet2-glow)" />
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

## overlays/NebulaOverlay.tsx

```tsx
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { NEBULA_STOPS } from '../../data/nebula'
import { lerpColor } from '../../lib/colors'

function nebulaColorsAt(p: number): { c1: string; c2: string } {
  for (let k = 0; k < NEBULA_STOPS.length - 1; k++) {
    const s0 = NEBULA_STOPS[k]
    const s1 = NEBULA_STOPS[k + 1]
    if (p >= s0.p && p <= s1.p) {
      const t = (p - s0.p) / (s1.p - s0.p)
      return { c1: lerpColor(s0.c1, s1.c1, t), c2: lerpColor(s0.c2, s1.c2, t) }
    }
  }
  return { c1: NEBULA_STOPS[0].c1, c2: NEBULA_STOPS[0].c2 }
}

interface Props {
  progress: MotionValue<number>
}

export function NebulaOverlay({ progress }: Props) {
  const [bg, setBg] = useState(() => {
    const { c1, c2 } = nebulaColorsAt(0)
    return buildGradient(c1, c2)
  })

  useMotionValueEvent(progress, 'change', (p) => {
    const { c1, c2 } = nebulaColorsAt(p)
    setBg(buildGradient(c1, c2))
  })

  return (
    <div className="pointer-events-none absolute -inset-[8%] z-[1]" aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: bg }}
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

function buildGradient(c1: string, c2: string): string {
  return [
    `radial-gradient(ellipse 90% 70% at 25% 25%, ${c2}22, transparent 55%)`,
    `radial-gradient(ellipse 80% 60% at 75% 75%, ${c1}cc, #0B0E1F 65%)`,
  ].join(', ')
}
```

## overlays/StarField.tsx

```tsx
import { useMemo } from 'react'
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

export function StarField() {
  const reduced = useReducedMotion()
  const stars = useMemo(() => generateStars(70), [])

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
    </svg>
  )
}
```

## overlays/GrassGround.tsx

```tsx
import { useEffect, useRef, useState } from 'react'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { clamp } from '../../lib/animation'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  drawingStrength: MotionValue<number>
}

const BLADE_COUNT = 28
const BLADE_SPACING = 1528 / BLADE_COUNT

interface Blade {
  x: number
  el: SVGLineElement | null
}

export function GrassGround({ drawingStrength }: Props) {
  const [opacity, setOpacity] = useState(0)
  const bladesRef = useRef<Blade[]>([])
  const mouseRef = useRef({ x: window.innerWidth / 2 })
  const reduced = useReducedMotion()
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const svgRef = useRef<SVGGElement>(null)

  useMotionValueEvent(drawingStrength, 'change', setOpacity)

  useEffect(() => {
    if (reduced || opacity < 0.12) return

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const scaleX = 1600 / window.innerWidth
    let running = true

    const tick = (now: number) => {
      if (!running) return
      if (now - lastFrameRef.current < 33) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      lastFrameRef.current = now

      bladesRef.current.forEach((blade) => {
        if (!blade.el) return
        const bladeScreenX = blade.x / scaleX
        const dist = Math.abs(mouseRef.current.x - bladeScreenX)
        const influence = clamp(1 - dist / 140, 0, 1)
        const bend = influence * 16 * (mouseRef.current.x > bladeScreenX ? 1 : -1)
        blade.el.setAttribute('transform', `translate(${blade.x},0) skewX(${bend.toFixed(2)})`)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [opacity, reduced])

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
```

---

## data/media.ts

```ts
const BLOB_BASE = 'https://n1gzcjyiqdwr3azb.public.blob.vercel-storage.com'

export const MEDIA_URLS = {
  heroPreview: `${BLOB_BASE}/Hologram_Event_Kids_S%D1%81hool.mp4`,
  malyuvaika: `${BLOB_BASE}/%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%20-%20%D0%BC%D0%B0%D0%BB%D1%8E%D0%B2%D0%B0%D0%B9%D0%BA%D0%B0.MP4`,
  hologramEvent: `${BLOB_BASE}/Hologram_Event_Kids_S%D1%81hool.mp4`,
  hologramReaction: `${BLOB_BASE}/IMG_6455.MP4`,
  popify: `${BLOB_BASE}/%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%20%D0%BF%D0%BE%D0%BF%D1%96%D1%84%D0%B0%D0%B9.MP4`,
} as const
```

## data/worlds.ts

```ts
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
  3: { eyebrow: 'Проєкт 01 · Малювайка', heading: 'Світ фарб і фантазії', sub: 'Розвивальний проєкт для дитячого садочка: уява, дрібна моторика й упевненість у собі через яскраву творчість.' },
  4: { eyebrow: 'Чарівне море', heading: 'Намалюй рибку — і вона оживе', sub: "Кожна дитина малює свою рибку з любов'ю — а потім бачить, як та оживає й пливе в чарівному морі." },
  5: { eyebrow: 'Проєкт 02 · Голограма', heading: 'Світ Голограм', sub: "Об'ємні 3D-проекції оживають прямо в залі — без окулярів, тільки щирий подив дітей." },
  6: { eyebrow: 'Проєкт 03 · Popify', heading: 'Відео на згадку', sub: 'Сучасний формат зйомки яскравих 360°-відео. Уся апаратура — наша. Від дітей потрібні лише настрій і улюблена пісня.' },
  7: { eyebrow: 'Як це працює', heading: 'Своє відео за кілька хвилин', sub: '1-2 людини у кадрі — 200 грн, 3 і більше — 100 грн з кожного. Спробувати може кожен охочий.' },
}
```

## data/nebula.ts

```ts
export interface NebulaStop { p: number; c1: string; c2: string }

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

## data/rocket.ts

```ts
export interface RocketWaypoint { x: number; y: number; r: number }

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
```

## data/timeline.ts

```ts
export interface TimelineStep { label: string }

export const TIMELINE_STEPS: TimelineStep[] = [
  { label: 'Знайомство' },
  { label: 'Підготовка' },
  { label: 'Приїзд' },
  { label: 'Подія' },
  { label: 'Щасливі діти' },
]
```

## data/team.ts

```ts
export interface TeamMember { name: string; role: string; phrase: string; bg: string; accent: string }

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Марія', role: 'режисерка', phrase: 'Люблю момент, коли зала на секунду затихає.', bg: '#1E2447', accent: '#F2B84B' },
  { name: 'Олег', role: 'технічний директор', phrase: 'Найкраща технологія — та, якої не помічають.', bg: '#232848', accent: '#FF7A59' },
  { name: 'Настя', role: 'художниця', phrase: 'Кожен малюнок заслуговує ожити хоч раз.', bg: '#141935', accent: '#F2B84B' },
  { name: 'Тарас', role: 'керівник', phrase: 'Найважливіше — щоб діти забули, що ми взагалі є.', bg: '#1E2447', accent: '#FF7A59' },
]
```

## data/stats.ts

```ts
export interface StatBlock { target: number; suffix: string; starsCount: number; label: string }

export const STATS: StatBlock[] = [
  { target: 120, suffix: '+', starsCount: 12, label: 'закладів' },
  { target: 25000, suffix: '+', starsCount: 12, label: 'дітей' },
  { target: 3, suffix: '', starsCount: 6, label: 'унікальні світи' },
  { target: 100, suffix: '%', starsCount: 12, label: 'власні сценарії' },
]
```

## data/quotes.ts

```ts
export interface CampfireQuote { text: string; attribution: string }

export const CAMPFIRE_QUOTES: CampfireQuote[] = [
  { text: '«Такого захоплення в очах дітей я не бачила за десять років роботи в школі.»', attribution: 'Директорка школи, м. Львів' },
  { text: '«Все організували так, що ми взагалі ні про що не хвилювались у день свята.»', attribution: 'Вихователька дитячого садочка' },
  { text: '«Мій малюнок ожив! Він рухався і махав мені рукою.»', attribution: 'Учень 3 класу' },
]
```

## data/pillars.ts

```ts
export interface Pillar { title: string; description: string; iconPath: string }

export const PILLARS: Pillar[] = [
  { title: 'Сучасне обладнання', description: 'Власні технічні розробки.', iconPath: 'M22 13v9l6 4' },
  { title: 'Власні сценарії', description: 'Жодних шаблонних виступів.', iconPath: 'M8 34c0-8 6-13 14-13s14 5 14 13' },
  { title: 'Команда', description: 'Її неможливо скопіювати.', iconPath: 'M22 8l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z' },
  { title: 'Індивідуальний підхід', description: 'Під вік дітей і простір.', iconPath: 'M10 22h24M22 10v24' },
]
```

## data/gallery.ts

```ts
export interface GalleryNode { label: string; left: string; top: string }

export const GALLERY_NODES: GalleryNode[] = [
  { label: 'Перший подив', left: '8.5%', top: '76%' },
  { label: 'Світло шоу', left: '23%', top: '35%' },
  { label: 'Оживлений герой', left: '50%', top: '44%' },
  { label: 'Тиша перед шоу', left: '63%', top: '6%' },
  { label: 'Оплески', left: '91%', top: '26%' },
]
```

---

## hooks/useAudioAmbience.ts

```ts
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

## hooks/useBeatStrength.ts

```ts
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

export function useBeatStrength(
  progress: MotionValue<number>,
  index: number,
): MotionValue<number> {
  return useTransform(progress, (p) => computeBeatStrength(p, index))
}
```

## hooks/useBeatStrengths.ts

```ts
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

## hooks/useReducedMotion.ts

```ts
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

## hooks/useRocketPath.ts

```ts
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
```

## hooks/useScrollSnap.ts

```ts
import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { clamp } from '../lib/animation'

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

  useEffect(() => {
    if (!containerRef.current) return

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
        window.scrollTo({ top: targetPx, behavior: 'smooth' })
        setTimeout(() => { snappingRef.current = false }, 800)
      }, STOP_DELAY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timerRef.current)
    }
  }, [containerRef])
}
```

## hooks/useScrollStory.ts

```ts
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

---

## lib/animation.ts

```ts
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}
```

## lib/colors.ts

```ts
import { lerp } from './animation'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

export function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`
}
```
