export type WorldKey = 'hologram' | 'drawing' | 'celebration'

export interface WorldBeatData {
  /** Beat indices that use this world (e.g. [3, 4] for hologram) */
  beatIndices: number[]
  /** Which portal SVG group to show */
  portalKey: WorldKey
}

export interface BeatContent {
  eyebrow: string
  heading: string
  sub?: string
}

/** Maps beat index to its world key for portal overlay */
export const WORLD_BEATS: WorldBeatData[] = [
  { beatIndices: [3, 4], portalKey: 'hologram' },
  { beatIndices: [5, 6], portalKey: 'drawing' },
  { beatIndices: [7], portalKey: 'celebration' },
]

export const BEAT_CONTENT: Record<number, BeatContent> = {
  3: { eyebrow: 'Світ 01', heading: 'Світ Голограм', sub: 'Об\'ємні проєкції оживають прямо в залі — без окулярів, тільки щирий подив.' },
  4: { eyebrow: 'Своя атмосфера', heading: 'Світло, яке тримають у долонях', sub: 'Кожне шоу — окрема історія, написана під конкретний зал і вік дітей.' },
  5: { eyebrow: 'Світ 02', heading: 'Світ Оживших Малюнків', sub: 'Проведіть курсором біля дерева — і побачите, як воно відповідає.' },
  6: { eyebrow: 'Олівець. Фарба. Папір.', heading: 'Малюнок стає персонажем', sub: 'Дитина малює — і за кілька хвилин бачить, як її герой рухається на екрані.' },
  7: { eyebrow: 'Світ 03', heading: 'Світ Свят', sub: 'Конфеті, ліхтарики та сценарій, який перетворює свято на подію.' },
}
