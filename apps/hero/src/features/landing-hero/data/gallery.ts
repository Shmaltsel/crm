export interface GalleryNode {
  label: string
  /** Position as percentage of container */
  left: string
  top: string
}

export const GALLERY_NODES: GalleryNode[] = [
  { label: 'Перший подив', left: '8.5%', top: '76%' },
  { label: 'Світло шоу', left: '23%', top: '35%' },
  { label: 'Оживлений герой', left: '50%', top: '44%' },
  { label: 'Тиша перед шоу', left: '63%', top: '6%' },
  { label: 'Оплески', left: '91%', top: '26%' },
]
