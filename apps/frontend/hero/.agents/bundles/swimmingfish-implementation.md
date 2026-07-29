# Bundle: SwimmingFish Implementation (Hero Project)

Джерело: `C:\CRM\apps\frontend\hero\`

---

## How It Works

Риба реалізована через вкладені HTML `<div>` (5 рівнів: head, body1, body2, rear, tail).

Кожен `<div>` — це "вікно" 60px завширшки з `overflow: hidden`. Всередині кожного вікна — той самий SVG (FishSVG, viewBox 300×100), позиціонований через `translateX(-i*60px)`, щоб показати тільки свою "смугу".

3D-хребет працює через HTML `<div>` (не SVG `<g>`), що гарантує коректний `transform-style: preserve-3d` у всіх браузерах.

Кожен `<div>-сегмент` має:
- `transformStyle: preserve-3d` — 3D-контекст
- `transformOrigin: 0px 50px` — шарнір зліва (як `left center` в оригіналі)
- `animation: sf_rotN 2s linear infinite` — `rotateY` + `translateZ`

Амплітуди: ±3°, ±10°, ±16°, ±42°, ±45° (з оригінального CSS).
TranslateZ: [0, 0, ±10, +30/-23, ±20] (з оригінального CSS).

Вся конструкція обгорнута в контейнер з `perspective: 800px`.

Рух (плавання + хвиля) — окремий шар анімації (translateX/translateY), не пов'язаний з 3D-хребтом.

---

## Файли

### 1. SwimmingFish.tsx (поточна реалізація)

```tsx
import { useState } from 'react'

const SEGMENT_W = 60
const SEGMENT_COUNT = 5
const CYCLE = 2
const SVG_TOTAL_W = 300

const SEG_PEAK = [3, 10, 16, 42, 45] as const
const SEG_Z = [0, 0, 10, 30, 20] as const
const SEG_Z_NEG = [0, 0, -10, -23, -20] as const

function buildKeyframes(): string {
  let css = ''
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const peak = SEG_PEAK[i]
    const zPos = SEG_Z[i]
    const zNeg = SEG_Z_NEG[i]
    css += `@keyframes sf_rot${i}{`
    css += `0%{transform:translate3d(0,0,0) rotateY(0deg)}`
    css += `25%{transform:translate3d(0,0,${zPos}px) rotateY(${-peak}deg)}`
    css += `50%{transform:translate3d(0,0,0) rotateY(0deg)}`
    css += `75%{transform:translate3d(0,0,${zNeg}px) rotateY(${peak}deg)}`
    css += `100%{transform:translate3d(0,0,0) rotateY(0deg)}`
    css += `}`
  }
  css += '@keyframes sf_swim{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}'
  css += '@keyframes sf_wobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}'
  return css
}

const KEYFRAMES_CSS = buildKeyframes()

function FishSVG() {
  return (
    <svg viewBox={`0 0 ${SVG_TOTAL_W} 100`} className="h-full w-full" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="sfH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD97A" />
          <stop offset="100%" stopColor="#D4922A" />
        </linearGradient>
        <linearGradient id="sfB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFBF42" />
          <stop offset="100%" stopColor="#CC7A00" />
        </linearGradient>
        <linearGradient id="sfT" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#E5A030" />
          <stop offset="100%" stopColor="#C47A10" />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="50" rx="38" ry="32" fill="url(#sfH)" />
      <ellipse cx="38" cy="50" rx="36" ry="30" fill="url(#sfH)" opacity={0.7} />
      <ellipse cx="24" cy="42" rx="5" ry="6" fill="#0B0E1F" />
      <ellipse cx="26" cy="40" rx="1.8" ry="2.2" fill="#FBF5EA" />
      <path d="M12,58 Q20,64 28,58" fill="none" stroke="#0B0E1F" strokeWidth={1.2} />
      <path d="M50,28 Q58,18 68,24" fill="url(#sfH)" stroke="#D4922A" strokeWidth={0.8} opacity={0.8} />
      <ellipse cx="100" cy="50" rx="44" ry="34" fill="url(#sfB)" />
      <path d="M62,30 Q80,22 100,26 Q120,22 138,30" fill="none" stroke="#CC7A00" strokeWidth={0.6} opacity={0.5} />
      <path d="M64,40 Q82,34 100,36 Q118,34 136,40" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
      <path d="M66,50 Q84,44 100,46 Q116,44 134,50" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.3} />
      <ellipse cx="160" cy="50" rx="40" ry="32" fill="url(#sfB)" />
      <path d="M122,30 Q140,24 160,28 Q180,24 198,30" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
      <path d="M124,42 Q142,36 160,38 Q178,36 196,42" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
      <ellipse cx="220" cy="50" rx="38" ry="30" fill="url(#sfB)" />
      <path d="M184,34 Q202,28 220,32 Q238,28 256,34" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
      <path d="M250,50 L300,20 Q305,50 300,80 Z" fill="url(#sfT)" />
      <path d="M255,50 L295,28 Q298,50 295,72 Z" fill="url(#sfT)" opacity={0.6} />
      <path d="M260,50 L290,36 Q292,50 290,64 Z" fill="url(#sfT)" opacity={0.3} />
    </svg>
  )
}

function SegmentWindow({ depth, children }: { depth: number; children: React.ReactNode }): JSX.Element {
  if (depth >= SEGMENT_COUNT) return <>{children}</>

  const offset = -(depth * SEGMENT_W)

  return (
    <div
      style={{
        width: `${SEGMENT_W}px`,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transformOrigin: '0px 50px',
        animation: `sf_rot${depth} ${CYCLE}s linear infinite`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${SVG_TOTAL_W}px`,
          transform: `translateX(${offset}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <SegmentWindow depth={depth + 1}>
          {children}
        </SegmentWindow>
      </div>
    </div>
  )
}

export function SwimmingFish({ className = '' }: { className?: string }) {
  const [swimming, setSwimming] = useState(false)

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={() => setSwimming(true)}
      onMouseLeave={() => setSwimming(false)}
    >
      <style>{KEYFRAMES_CSS}</style>
      <div style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}>
        <div
          style={{
            animation: swimming
              ? 'sf_swim 4s ease-in-out infinite alternate, sf_wobble 1.2s ease-in-out infinite'
              : 'sf_wobble 1.2s ease-in-out infinite',
            transformStyle: 'preserve-3d',
            width: `${SEGMENT_W * SEGMENT_COUNT}px`,
            height: '100px',
          }}
        >
          <SegmentWindow depth={0}>
            <FishSVG />
          </SegmentWindow>
        </div>
      </div>
    </div>
  )
}
```

---

### 2. WorldBeat.tsx (споживач — beat 4)

```tsx
import { SwimmingFish } from '../SwimmingFish'

// В WorldBeattsx, beatIndex === 4:
<div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
  <div className={`${mediaAnimClass} flex h-[min(200px,28vw)] w-full shrink-0 items-center justify-center md:h-[200px] md:w-[280px]`}>
    <SwimmingFish />
  </div>
  <div className="max-w-[480px]">
    <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word">
      {content.eyebrow}
    </p>
    <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word">
      {content.heading}
    </h2>
    {content.sub && <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0 stagger-word">{content.sub}</p>}
  </div>
</div>
```

---

### 3. worlds.ts (контент біту 4)

```ts
4: {
  eyebrow: 'Чарівне море',
  heading: 'Намалюй рибку — і вона оживе',
  sub: "Кожна дитина малює свою рибку з любов'ю — а потім бачить, як та оживає й пливе в чарівному морі.",
}
```

---

### 4. index.css (релевантні анімації)

```css
@keyframes worldOrganicEntry {
  0% { opacity: 0; transform: scale(0.92, 1.06); }
  60% { opacity: 1; transform: scale(1.01, 0.99); }
  100% { opacity: 1; transform: scale(1, 1); }
}

.world-organic-entry {
  animation: worldOrganicEntry 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
