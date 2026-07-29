# Bundle: SwimmingFish Implementation (Hero Project)

Джерело: `C:\CRM\apps\frontend\hero\`

---

## How It Works

Риба використовує оригінальний CSS-підхід з вкладеними `<div>` (chain nesting) та `background-position` slicing.

5 сегментів (Riba1–Riba5) ВКЛАДЕНІ один в одного рекурсивно, кожен 60×200px, з `background-image`
(спрайт `fish-sprite.png`, 300×200px RGBA) та `background-position` для показу своєї "смуги".

**БЕЗ overflow:hidden** — в оригіналі його немає; фон обрізається власними розмірами елемента.
**backface-visibility: hidden + WebkitBackfaceVisibility: hidden** — на ВСІХ сегментах, прибирає "дублікат" при кумулятивному куті >90°.

Вкладеність забезпечує КОМПОЗИЦІЮ трансформів: обертання батьківського сегмента
переноситься на всі дочірні, кожен наступний сегмент додає СВОЄ обертання ПОВЕРХ
успадкованого — ефект "хребта, що плавно згинається".

### Рекурсія (5 сегментів, без зайвого 6-го div)
Останній сегмент (depth=4, хвіст) — одночасно і wrapper, і "лист":
`isLast = depth === SEGMENT_COUNT - 1`, child рендериться лише `!isLast && ...`.
Окрема "leaf"-гілка видалена — кожен з 5 сегментів (depth 0-4) показує свою частину спрайту
і несе transform/animation. Різниця лише в тому, чи має він дитину.

### Анімація
- **Idle:** риба стоїть стабільно, без жодного руху (`animation: undefined` — не задається взагалі)
- **Hover:** тіло хвилюється (`sf_rot0-4`) + риба пливе вісімкою (`sf_figure8`)
- `animation: undefined` коли idle (не 'none' — уникати flash при завантаженні)

### Центрування
Кумулятивний зсунутість вкладених сегментів: 4 × 59px = 236px праворуч.
Компенсується `marginLeft: -148px` на контейнері (половина від ≈296px загальної ширини).
Контейнер має фіксовані розміри 300×200px з `position: relative`.

### Ключові значення (з оригінального style2.css)
- `perspective: 800px` на зовнішньому контейнері
- `transform-style: preserve-3d` на кожному сегменті
- `transformOrigin: 0px 100px` — шарнір зліва по центру висоти (hinge point)
- Постійний `transform: translate3d(59px, 0, 0px) rotateY(0deg)` — базовий стан (idle)
- `animation` заміщує transform під час hover, повертається до базового в idle
- `translate3d(Xpx, 0, Z)` — X=[59,59,58,55,52] на 25%, X=[59,59,58,54,52] на 75% (asymmetric for seg3), Z=[0, 0, ±10, +30/-23, ±20]
- `rotateY`: ±3°, ±10°, ±16°, ±42°, ±45°
- Всі сегменти: ОДНА Й ТА сама фаза (cycle 2s, linear)
- **sf_figure8 amplitude зменшена** для 280px слоту: ±20px X, ±10px Y (max)

---

## Файли

### 1. SwimmingFish.tsx

```tsx
import { useState } from 'react'

const SEGMENT_W = 60
const SEGMENT_H = 200
const SEGMENT_COUNT = 5
const CYCLE = 2
const FISH_SRC = '/materials/fish-sprite.png'
const FISH_TOTAL_W = SEGMENT_W * SEGMENT_COUNT

const SEG_PEAK = [3, 10, 16, 42, 45] as const
const SEG_Z = [0, 0, 10, 30, 20] as const
const SEG_Z_NEG = [0, 0, -10, -23, -20] as const
const SEG_X = [59, 59, 58, 55, 52] as const
const SEG_X_NEG = [59, 59, 58, 54, 52] as const

function buildKeyframes(): string {
  let css = ''
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const peak = SEG_PEAK[i]
    const zPos = SEG_Z[i]
    const zNeg = SEG_Z_NEG[i]
    const xPos = SEG_X[i]
    const xNeg = SEG_X_NEG[i]
    css += `@keyframes sf_rot${i}{`
    css += `0%{transform:translate3d(59px,0,0) rotateY(0deg)}`
    css += `25%{transform:translate3d(${xPos}px,0,${zPos}px) rotateY(${-peak}deg)}`
    css += `50%{transform:translate3d(59px,0,0) rotateY(0deg)}`
    css += `75%{transform:translate3d(${xNeg}px,0,${zNeg}px) rotateY(${peak}deg)}`
    css += `100%{transform:translate3d(59px,0,0) rotateY(0deg)}`
    css += `}`
  }
  css += `@keyframes sf_figure8{`
  css += `0%{transform:translate(0,0) scaleX(1)}`
  css += `12.5%{transform:translate(12px,-10px) scaleX(1)}`
  css += `25%{transform:translate(20px,0) scaleX(1)}`
  css += `37.5%{transform:translate(12px,10px) scaleX(1)}`
  css += `50%{transform:translate(0,0) scaleX(-1)}`
  css += `62.5%{transform:translate(-12px,-10px) scaleX(-1)}`
  css += `75%{transform:translate(-20px,0) scaleX(-1)}`
  css += `87.5%{transform:translate(-12px,10px) scaleX(-1)}`
  css += `100%{transform:translate(0,0) scaleX(1)}`
  css += `}`
  return css
}

const KEYFRAMES_CSS = buildKeyframes()

function FishSegment({ depth, animated }: { depth: number; animated: boolean }): JSX.Element {
  const isLast = depth === SEGMENT_COUNT - 1

  return (
    <div
      style={{
        width: `${SEGMENT_W}px`,
        height: `${SEGMENT_H}px`,
        backgroundImage: `url(${FISH_SRC})`,
        backgroundSize: `${FISH_TOTAL_W}px ${SEGMENT_H}px`,
        backgroundPosition: `${-depth * SEGMENT_W}px 0px`,
        backgroundRepeat: 'no-repeat',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        transformOrigin: '0px 100px',
        transform: 'translate3d(59px, 0, 0px) rotateY(0deg)',
        animation: animated ? `sf_rot${depth} ${CYCLE}s linear infinite` : undefined,
      }}
    >
      {!isLast && <FishSegment depth={depth + 1} animated={animated} />}
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
      <div
        style={{
          perspective: '800px',
          width: `${FISH_TOTAL_W}px`,
          height: `${SEGMENT_H}px`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: '-148px',
            animation: swimming ? 'sf_figure8 4s ease-in-out infinite' : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          <FishSegment depth={0} animated={swimming} />
        </div>
      </div>
    </div>
  )
}
```

---

### 2. fish-sprite.png

Оригінальне кольорове зображення риби з проєкту "Малювака".

- Шлях: `public/materials/fish-sprite.png`
- Розмір: 300×200px, RGBA (прозорий фон)
- Джерело: `C:\Users\shmal\OneDrive\Desktop\малювайка 2\images\IMG_20260715_0001.png`

---

### 3. WorldBeat.tsx (споживач — beat 4)

```tsx
import { SwimmingFish } from '../SwimmingFish'

<div className={`${mediaAnimClass} flex h-[min(200px,28vw)] w-full shrink-0 items-center justify-center md:h-[200px] md:w-[280px]`}>
  <SwimmingFish />
</div>
```

---

### 4. worlds.ts (контент біту 4)

```ts
4: {
  eyebrow: 'Чарівне море',
  heading: 'Намалюй рибку — і вона оживе',
  sub: "Кожна дитина малює свою рибку з любов'ю — а потім бачить, як та оживає й пливе в чарівному морі.",
}
```
