export type GalleryItem = { id: string; alt: string; src: string }

// 🔽 Importa tus 8 imágenes locales (1.jpeg ... 8.jpeg)
import g1 from '@/assets/gallery/1.jpeg'
import g2 from '@/assets/gallery/2.jpeg'
import g3 from '@/assets/gallery/3.jpeg'
import g4 from '@/assets/gallery/4.jpeg'
import g5 from '@/assets/gallery/5.jpeg'
import g6 from '@/assets/gallery/6.jpeg'
import g7 from '@/assets/gallery/7.jpeg'
import g8 from '@/assets/gallery/8.jpeg'

export const GALLERY: GalleryItem[] = [
  { id: 'g-01', alt: 'Krabi farm — 01', src: g1 },
  { id: 'g-02', alt: 'Krabi farm — 02', src: g2 },
  { id: 'g-03', alt: 'Krabi farm — 03', src: g3 },
  { id: 'g-04', alt: 'Krabi farm — 04', src: g4 },
  { id: 'g-05', alt: 'Krabi farm — 05', src: g5 },
  { id: 'g-06', alt: 'Krabi farm — 06', src: g6 },
  { id: 'g-07', alt: 'Krabi farm — 07', src: g7 },
  { id: 'g-08', alt: 'Krabi farm — 08', src: g8 },
]

