// src/data/products.ts
import type { Product } from '@/lib/types'

// 🔽 importa assets locales (ajusta extensiones si difieren)
import mangoImg  from '@/assets/mango.jpeg'
import cocoImg   from '@/assets/coco.jpeg'
import basilImg  from '@/assets/basil.jpeg'
import chiliImg  from '@/assets/chilli.jpeg'   // archivo con doble “l”
import eggsImg   from '@/assets/eggs.jpeg'

export const CATEGORIES = [
  'Fruits', 'Vegetables', 'Herbs & Spices', 'Eggs & Dairy', 'Organic', 'Value Packs'
]

export const PRODUCTS: Product[] = [
  {
    id: 'pr-mango-namdocmai',
    name: 'Mango (Nam Dok Mai)',
    image: mangoImg,               // ← local
    unit: 'kg',
    retailPrice: 85,
    b2bTiers: [{ minQty: 10, price: 75, unit: 'kg' }, { minQty: 50, price: 65, unit: 'kg' }],
    categories: ['Fruits', 'Organic'],
    producerId: 'p-railay-farm',
    origin: { district: 'Ao Nang' },
    lotId: 'NDM-2025-0901',
    traceabilityUrl: '/trace.html?lot=NDM-2025-0901&product=Mango%20(Nam%20Dok%20Mai)&producer=Railay%20Farm',
    availability: 'in_season',
  },
  {
    id: 'pr-coconut-young',
    name: 'Young Coconut',
    image: cocoImg,                // ← local
    unit: 'piece',
    retailPrice: 35,
    b2bTiers: [{ minQty: 24, price: 30, unit: 'piece' }, { minQty: 100, price: 26, unit: 'piece' }],
    categories: ['Fruits', 'Value Packs'],
    producerId: 'p-krabi-green',
    origin: { district: 'Nuea Khlong' },
    lotId: 'COCO-2025-0830',
    traceabilityUrl: '/trace.html?lot=COCO-2025-0830&product=Young%20Coconut&producer=Krabi%20Green%20Co-op',
    availability: 'in_season',
  },
  {
    id: 'pr-basil-thai',
    name: 'Thai Basil',
    image: basilImg,               // ← local
    unit: 'bunch',
    retailPrice: 20,
    b2bTiers: [{ minQty: 20, price: 16, unit: 'bunch' }],
    categories: ['Herbs & Spices', 'Organic'],
    producerId: 'p-krabi-green',
    origin: { district: 'Nuea Khlong' },
    lotId: 'BASIL-2025-0903',
    traceabilityUrl: '/trace.html?lot=BASIL-2025-0903&product=Thai%20Basil&producer=Krabi%20Green%20Co-op',
    availability: 'limited',
  },
  {
    id: 'pr-chili-birdseye',
    name: 'Bird’s Eye Chili',
    image: chiliImg,               // ← local (archivo chilli.jpeg)
    unit: 'kg',
    retailPrice: 120,
    categories: ['Herbs & Spices'],
    producerId: 'p-tiger-orchards',
    origin: { district: 'Khlong Thom' },
    lotId: 'CHILI-2025-0815',
    traceabilityUrl: '/trace.html?lot=CHILI-2025-0815&product=Bird%E2%80%99s%20Eye%20Chili&producer=Tiger%20Orchards',
    availability: 'out_of_season',
  },
  {
    id: 'pr-eggs-free-range',
    name: 'Free-range Eggs',
    image: eggsImg,                // ← local
    unit: 'tray (30)',
    retailPrice: 135,
    b2bTiers: [{ minQty: 10, price: 120, unit: 'tray (30)' }],
    categories: ['Eggs & Dairy', 'Value Packs'],
    producerId: 'p-railay-farm',
    origin: { district: 'Ao Nang' },
    lotId: 'EGG-2025-0902',
    traceabilityUrl: '/trace.html?lot=EGG-2025-0902&product=Free-range%20Eggs&producer=Railay%20Farm',
    availability: 'in_season',
  },
]

