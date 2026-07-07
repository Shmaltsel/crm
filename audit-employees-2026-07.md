# Аудит Employees.tsx та пов'язаних компонентів

## 1) Tailwind-кольори/шрифти/тіні

### Файл: apps/frontend/src/pages/Employees.tsx

| Категорія | Класи | Визначення |
|-----------|-------|------------|
| Фон | `bg-slate-50`, `bg-slate-100`, `bg-slate-200`, `bg-white`, `bg-blue-600`, `bg-emerald-600`, `bg-rose-500`, `bg-slate-50/50` | Tailwind default palette + `surface.subtle: #f8fafc` у конфігу |
| Кольорові акценти ролей | `bg-blue-50`, `bg-emerald-50`, `bg-violet-50`, `border-blue-200`, `border-emerald-200`, `border-violet-200` | Tailwind default (blue/emerald/violet). **violet не має токена в конфігу** |
| Текст | `text-slate-800`, `text-slate-700`, `text-slate-600`, `text-slate-500`, `text-slate-400`, `text-slate-300`, `text-white`, `text-blue-600`, `text-red-500`, `text-emerald-600` | Tailwind default + `content.primary/secondary/muted` у конфігу (не використовуються) |
| Тіні | `shadow-sm`, `shadow-xl`, `shadow-md` | Tailwind default. Конфіг має `shadow.card` та `shadow.modal` — **не використовуються** |
| Закруглення | `rounded-lg`, `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-xl` | Tailwind default. Конфіг має `rounded-card/modal/control` — **не використовуються** |
| Шрифти | `font-bold`, `font-semibold`, `font-medium`, `font-normal` | Tailwind default, конфіг не розширює typography |
| Розміри тексту | `text-xs`(12px), `text-sm`(14px), `text-base`, `text-lg`, `text-xl`, `text-2xl` | Tailwind default scale |

### Файл: EmployeeCard.tsx
| Категорія | Класи | Джерело |
|-----------|-------|---------|
| Аватар | `bg-gradient-to-br from-blue-500 to-blue-600`, `from-emerald-500 to-emerald-600`, `from-violet-500 to-violet-600` | Inline Record, не винесено в конфіг |
| Рольове кільце | `ring-blue-100`, `ring-emerald-100`, `ring-violet-100` | Inline Record |
| Hover-бордер | `hover:border-blue-200`, `hover:border-emerald-200`, `hover:border-violet-200` | Inline Record |

### Файл: UserModal.tsx / ProjectModal.tsx
| Категорія | Класи | Джерело |
|-----------|-------|---------|
| Бекдроп | `bg-slate-900/40 backdrop-blur-sm` | Tailwind default + blur utility |
| Інпути | `border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none` | Tailwind default |
| Кнопка дії | `bg-blue-600` (UserModal), `bg-emerald-600` (ProjectModal) | Tailwind default |

### Файл: animations/employees.ts
- Framer Motion variants (`cardVariants`, `modalVariants`, `backdropVariants`, `formVariants`, `fieldVariants`, `shakeVariants`, `checkmarkVariants`) — використовують власні значення transition, не пов'язані з конфігом `transitionDuration`

---

## 2) Пропси/типи даних

### User (EmployeeCard.tsx)
| Поле | Тип | Джерело |
|------|-----|---------|
| id | `string` | API |
| name | `string` | API |
| phone | `string \| null` | API |
| email | `string` | API |
| cityId | `string \| null` | API |
| city | `{ id: string; name: string }` | API (опційно) |
| role | `"MANAGER" \| "DRIVER" \| "HOST" \| "SUPERADMIN" \| "GUEST"` | API |
| telegramId | `string \| null \| undefined` | API |
| car | `string \| null \| undefined` | API |

**Проблема:** тип User визначено двічі: `Employees.tsx:27-37` та `EmployeeCard.tsx:11-21`. Не використовується спільний тип з `src/types/index.ts` (там є `User` на рядку 76).

### Project
| Поле | Тип | Джерело |
|------|-----|---------|
| id | `string` | API |
| name | `string` | API |
| color | `string` | API |
| pricePerChild | `number` (через `as any`) | API (не типізовано) |

**Проблема:** `pricePerChild` доступний через `(p as any).pricePerChild` — немає типізації.

### Визначення кольорів ролей — дублюються:
- `ROLE_COLORS` (Employees.tsx) — кольори для badge кількості
- `ROLE_HEADER_COLORS` (Employees.tsx) — кольори для лінії заголовка
- `ROLE_RING` (EmployeeCard.tsx) — кольори ring навколо аватара
- `ROLE_GRADIENT` (EmployeeCard.tsx) — градієнти аватарів
- `ROLE_HOVER_BORDER` (EmployeeCard.tsx) — hover-бордер картки
- `ROLE_ICON_MAP` (features/calendar/constants.ts) — окрема мапа для календаря

---

## 3) Проблеми

### Контраст (WCAG AA)
| Елемент | Колір | Фон | АА (4.5:1 для тексту) |
|---------|-------|-----|----------------------|
| `text-slate-400` (#94a3b8) | #94a3b8 | #ffffff | **FAIL** — ratio ~2.5:1 |
| `text-slate-400` (#94a3b8) | #94a3b8 | #f8fafc (surface subtle) | **FAIL** |
| `text-slate-500` (#64748b) | #64748b | #ffffff | **BORDERLINE** — 4.6:1 |
| `text-slate-300` (#cbd5e1) | #cbd5e1 | #ffffff | **FAIL** — ~1.7:1 |

### Фокус-стани
- UserModal.tsx: кнопка закриття ✕ — немає `focus-visible` стилів, немає `aria-label`
- ProjectModal.tsx: кнопка закриття ✕ — те саме
- handleDelete використовує `window.confirm` — не доступно для клавіатури
- `handleDeleteProject` — те саме

### Відсутні aria-атрибути
- Модалки: немає `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Delete confirm: використовує `window.confirm` замість доступної модалки
- Інпути: немає `aria-label` або зв'язку з `<label>` (хоча ProjectModal має label)
- EmployeeCard: кнопки ✏️ та 🗑 мають `aria-label` ✅ — це єдиний правильно налаштований компонент
- Bottom section (Project cards): кнопки ✏️ та 🗑 мають `title` але не мають `aria-label`

### Інше
- Employees.tsx: `formError` використовується в `setFormError("")` (рядок 196) до оголошення (рядок 215) — **помилка порядку**
- `isLoading` = `usersLoading` (рядок 152), `projectsLoading` не використовується (lint error F29)
- `grouped` має статичний масив ролей `["MANAGER", "DRIVER", "HOST"]` — SUPERADMIN не показується
- Project card `(p as any).pricePerChild` — втрата типізації
- Delete error handler використовує `alert()` замість Toast
- Modal форми не мають валідації (Zod/yup), окрім перевірки `fullName.trim()`
- `handleSubmit` зловлює `err: any` — втрата типізації
