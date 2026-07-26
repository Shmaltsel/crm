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
