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
