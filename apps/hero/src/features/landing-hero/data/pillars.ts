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
