# SwimmingFish — бандл анімації та руху риби

## Файли

| Файл | Призначення |
|------|-------------|
| `components/SwimmingFish.tsx` | Компонент риби: траєкторія, хребет, тінь, blend |
| `components/beats/WorldBeat.tsx` (рядок 129) | Місце вставки `<SwimmingFish />` в біті "Малювайка" |
| `public/materials/fish-sprite.png` | Спрайт-аркуш риби: 5 сегментів по 60×200px, загальний розмір 300×200px |
| `public/materials/firefly-generated.png` | Фон зображення (завжди позаду риби) |

---

## Константи

### Сегменти хребта

```
SEGMENT_W     = 60    — ширина одного сегмента (px)
SEGMENT_H     = 200   — висота сегмента (px)
SEGMENT_COUNT = 5     — кількість сегментів (голова → хвіст)
OVERLAP       = 4     — нахлест між сегментами (px), закриває sub-pixel розриви
PERSPECTIVE   = 800   — perspective для rotateY проекції (px)
CYCLE         = 2     — тривалість одного циклу анімації (сек)
```

### Траєкторія (лемніската Бернуллі)

```
LEMNISCATE_A = 80    — амплітуда лемніскати (px), визначає розмір вісімки
```

Параметричні рівняння:
```
x(t) = A · cos(t) / (1 + sin²(t))
y(t) = A · sin(t) · cos(t) / (1 + sin²(t))
```

### Зміщення риби та тіні

```
FISH_OFFSET_X   = -40   — зсув риби вліво відносно фону (px)
SHADOW_OFFSET_X = 8     — зсув тіні відносно риби по X (px)
SHADOW_OFFSET_Y = 14    — зсув тіні відносно риби по Y (px)
SHADOW_BLUR     = 6     — розмиття тіні (px)
SHADOW_ALPHA    = 0.4   — прозорість тіні
```

### Амплітуди сегментів (кути повороту навколо Y)

```
SEG_PEAK = [3, 10, 16, 42, 45]   — пікові кути (°) для сегментів 0-4
```

| Сегмент | Роль | Піковий кут |
|---------|------|-------------|
| 0 | Голова | 3° |
| 1 | Тіло | 10° |
| 2 | Тіло | 16° |
| 3 | Перехід до хвоста | 42° |
| 4 | Хвіст | 45° |

### Z-зміщення (глибина для перспективи)

```
SEG_Z     = [0, 0, 10, 30, 20]     — Z при позитивному куті (px)
SEG_Z_NEG = [0, 0, -10, -23, -20]  — Z при негативному куті (px)
```

---

## Архітектура анімації

### Rendering pipeline

```
outer div (flex, overflow: visible, marginLeft: -60)
├── background div (firefly-generated.png, inset: -20%, zIndex: 0)
├── shadowSwimRef div (absolute, zIndex: 1)
│   └── shadow segments × 5 (brightness(0) blur(6px), opacity: 0→0.4)
└── swimRef div (relative, zIndex: 2)
    └── fish segments × 5 (fish-sprite.png)
```

### Шари (z-index)

| zIndex | Елемент | Опис |
|--------|---------|------|
| 0 | `background div` | Фон firefly-generated.png, завжди видимий |
| 1 | `shadowSwimRef` | Тінь — копія сегментів риби з `brightness(0) blur(6px)` |
| 2 | `swimRef` | Риба — 5 сегментів з спрайта |

### RAF-цикл (requestAnimationFrame)

Стан анімації керується через refs (не state), щоб уникнути ре-рендерів:

| Ref | Тип | Призначення |
|-----|-----|-------------|
| `swimRef` | `HTMLDivElement` | Контейнер риби (фігура-8 + rotate) |
| `shadowSwimRef` | `HTMLDivElement` | Контейнер тіні (копіює трансформи риби + зміщення) |
| `segRefs` | `(HTMLDivElement \| null)[]` | Refs для 5 сегментів риби |
| `shadowSegRefs` | `(HTMLDivElement \| null)[]` | Refs для 5 сегментів тіні |
| `smoothScaleX` | `number` | Поточний scaleX (EMA-фільтр) |
| `curPos` | `{x, y, tilt}` | Поточна позиція та нахил |
| `returning` | `boolean` | Чи зараз фаза повернення |
| `blend` | `number` | 0→1: наростання анімації від простою |

---

## Фази анімації

### 1. Idle (очікування)

Коли `swimming === false` та `returning === false`:
- Риба стоїть на місці
- Сегменти: `translate3d(i*60, 0, 0) rotateY(0deg)` — пряма лінія
- Контейнер: `translate(FISH_OFFSET_X, 0) scaleX(1) rotate(0deg)`
- Тінь: `opacity: 0`

### 2. Blend-in (наростання)

Коли `swimming === true`:
- `blend` зростає від 0 до 1: `blend += (1 - blend) * 0.04` (~60 кадрів ≈ 1с)
- Позиція: `lemniscate * blend` — риба плавно починає рух
- Кути хребта: `angle * blend` — сегменти плавно починають згинатись
- Z-зміщення: `z * blend`
- Tilt: `tiltDeg * blend`
- Тінь: `opacity: 0 → 0.4` (CSS transition 0.4s)

### 3. Swimming (повна анімація)

Коли `blend ≈ 1`:
- Риба рухається по лемніскаті
- Хребет згинається з кумулятивними кутами
- scaleX плавно переключається (EMA-фільтр)
- Tilt слідує за кривизною траєкторії

### 4. Returning (повернення)

Коли `swimming === false`:
- `returning = true`
- `blend`, `x`, `y`, `tilt`, `scaleX` плавно decay до цільових значень
- Ease: `value += (0 - value) * 0.06`
- Хребет: сегменти повертаються в пряму лінію (`rotateY(0deg)`)
- Коли `settled` (x < 0.1, y < 0.1, |scaleX-1| < 0.005) → зупинка RAF

---

## Траєкторія: Лемніската Бернуллі

### Lookup-таблиця

- 128 точок, попередньо обчислених при ініціалізації модуля
- Кожна точка: `{ t, x, y, tanAngle }`
- `tanAngle` — кут дотичної вектора (для визначення напрямку scaleX)

### Семплування

```
sampleLemniscate(tNorm) → { x, y, tanAngle }
```

- Лінійна інтерполяція між сусідніми точками таблиці
- `lerpAngle()` для коректної інтерполяції кутів з wrap-around ±π
- X-координата інвертована (`-x`) для дзеркалення траєкторії

### Дзеркалення

Оригінальна лемніската рухається справа наліво. Інверсія X (`-x`) дає рух зліва направо — відповідно до напрямку голови риби (спрайт дивиться вправо).

### Визначення scaleX

```
scaleX = cos(tanAngle) < 0 ? 1 : -1
```

- `cos(tanAngle) < 0` → рухається вправо → scaleX = 1 (дивиться вправо)
- `cos(tanAngle) >= 0` → рухається вліво → scaleX = -1 (дивиться вліво)

### EMA-фільтр для scaleX

```
smoothScaleX += (targetScaleX - smoothScaleX) * 0.08
```

Розтягує переключення scaleX на кілька кадрів, усуває "teleport" при зміні напрямку.

---

## Хребет: 3D-згинання сегментів

### Кумулятивні кути

Кожен сегмент додає свій кут до попередніх:

```
cumAngle[0] = angle[0]                    // 3°
cumAngle[1] = angle[0] + angle[1]         // 13°
cumAngle[2] = angle[0] + angle[1] + angle[2]  // 29°
cumAngle[3] = ... + angle[3]              // 71°
cumAngle[4] = ... + angle[4]              // 116° (на піку)
```

### Perspective projection

Правий край кожного сегмента обчислюється через perspective проекцію:

```
projectRightEdge(angleRad, z):
  xRot = SEGMENT_W * cos(angle)
  zRot = -SEGMENT_W * sin(angle) + z
  denom = PERSPECTIVE - zRot
  return (xRot * PERSPECTIVE) / denom
```

Це дає правильну позицію наступного сегмента з урахуванням 3D-деформації.

### Ключові кадри сегментів

Кожен сегмент має 4 фази за цикл (linear easing, як `animation-timing-function: linear`):

| tNorm | Куточок | Z |
|-------|---------|---|
| 0 → 0.25 | 0 → −peak | 0 → +zPos |
| 0.25 → 0.5 | −peak → 0 | +zPos → 0 |
| 0.5 → 0.75 | 0 → +peak | 0 → −zNeg |
| 0.75 → 1.0 | +peak → 0 | −zNeg → 0 |

---

## Тінь

### Механіка

- Тінь — це **копія всіх 5 сегментів риби** з тими самими спрайтами та трансформаціями
- Візуально відрізняється лише стилями:
  - `filter: brightness(0) blur(6px)` — чорний розмитий силует
  - `opacity: 0 → 0.4` (CSS transition 0.4s ease)
- Зміщується на `(SHADOW_OFFSET_X, SHADOW_OFFSET_Y)` від позиції риби
- Слідує за рибою в тому самому RAF-циклі (ті ж hinge-кути, та ж лемніската)
- `pointerEvents: 'none'` — не перехоплює кліки

---

## Події

| Подія | Дія |
|-------|-----|
| `mouseEnter` | `setSwimming(true)` → запуск RAF-циклу, `blend` = 0 → 1 |
| `mouseLeave` | `setSwimming(false)` → фаза returning, `blend` decay до 0 |

---

## CSS-класи та позиціонування

### WorldBeat (батьківський контейнер)

```html
<div class="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
  <div class="... md:h-[200px] md:w-[280px]">  <!-- контейнер риби -->
    <SwimmingFish />
  </div>
  <div class="max-w-[480px]">  <!-- текст -->
```

### SwimmingFish (зовнішній div)

```
className: "relative flex items-center justify-center"
style: overflow: visible, marginLeft: -60
```

`marginLeft: -60` зсуває рибу вліво, щоб текст не перекривав елемент.

---

## Оптимізації

1. **Refs замість state** — усі зміни анімації через refs, жодних ре-рендерів React
2. **`will-change: transform`** — підказка браузеру для GPU-композитингу
3. **Pre-computed lookup table** — 128 точок лемніскати обчислюються один раз при завантаженні модуля
4. **EMA-фільтр** — `smoothScaleX` уникнає різких стрибків scaleX
5. **`requestAnimationFrame`** — синхронізація з refresh rate монітора

---

## Орієнтовні значення blend

| Час (сек) | blend | Візуальний ефект |
|-----------|-------|------------------|
| 0.0 | 0.00 | Риба нерухома, хребет пряма |
| 0.25 | 0.10 | Легке згинання, ледь помітний рух |
| 0.5 | 0.18 | Видимий початок руху по лемніскаті |
| 1.0 | 0.33 | Риба активно плаває, тінь видна |
| 2.0 | 0.55 | Майже повна амплітуда |
| 3.0 | 0.70 | Повна анімація |
