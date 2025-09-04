import type { Producer } from '@/lib/types'

export const PRODUCERS: Producer[] = [
  {
    id: 'p-krabi-green',
    name: 'Krabi Green Co-op',
    verified: true,
    location: 'Nuea Khlong, Krabi',
    contact: { whatsapp: '+66 88 000 0000', email: 'hello@krabigreen.example' },
  },
  {
    id: 'p-railay-farm',
    name: 'Railay Farm',
    verified: true,
    location: 'Ao Nang, Krabi',
    contact: { whatsapp: '+66 88 111 1111' },
  },
  {
    id: 'p-tiger-orchards',
    name: 'Tiger Orchards',
    verified: false,
    location: 'Khlong Thom, Krabi',
  },
]
