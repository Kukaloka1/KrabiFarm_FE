export type B2BTier = { minQty: number; price: number; unit: string }

export type Producer = {
  id: string
  name: string
  verified: boolean
  logo?: string
  location: string
  contact?: { whatsapp?: string; email?: string }
}

export type Product = {
  id: string
  name: string
  image: string
  unit: string
  retailPrice: number
  b2bTiers?: B2BTier[]
  categories: string[]
  producerId: string
  origin: { district: string; village?: string }
  lotId?: string
  traceabilityUrl?: string
  availability?: 'in_season' | 'out_of_season' | 'limited'
}
