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
  { beatIndices: [6], portalKey: 'popify' },
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
}
