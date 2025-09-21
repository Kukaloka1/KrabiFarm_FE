export type Dict = Record<string, any>

const en: Dict = {
  nav: { about:'About', why:'Why Us', problem:'Problem', solution:'Solution', products:'Products', gallery:'Gallery', cta:'Contact' },

  hero: {
    title:'Fresh & Verified from Local Farms',
    subtitle:'Direct from Krabi’s farms to hotels, restaurants and families. QR payments, traceability and collaborative logistics.',
    primary:'Browse Products',
    secondary:'Contact',
    extra:'Connecting Krabi’s farmers directly with global markets through technology, traceability and fair trade.',
    banner_main_alt:'Fresh produce from Krabi',
    promo:'Buy directly from farmers with QR payments and traceability',
    cta_shop:'Shop now'
  },

  header: {
    start_selling:'Start Selling',
    how_it_works:'How it works',
    follow:'Follow us',
    log_in:'Log in',
    sign_up:'Sign up',
    or_with:'Or sign in with'
  },
  

  // NUEVO esquema de categorías + alias de compatibilidad
  categories: {
    fruits:'Fruits',
    vegetables:'Vegetables',
    seafood:'Seafood',
    eggs:'Eggs',
    artisan:'Artisan',
    // aliases (no borrar aún)
    frutas:'Fruits',
    vegetales:'Vegetables',
    mariscos:'Seafood',
    huevos:'Eggs',
    artesanales:'Artisan'
  },

  features: {
    qr:'QR PromptPay',
    trace:'Traceability',
    fresh:'Fresh & Local',
    fair:'Fair Price',
    b2b:'B2B Hotels',
    support:'Farmer Support'
  },

  about: {
    title:'About',
    body:'A practical backbone for the Krabi Smart Region. We enable direct sales, digital payments (QR/PromptPay), and lot-level traceability for verified producers.'
  },

  why: {
    title:'Why choose us',
    subtitle:'Verified origin, fair prices and reliable local logistics — a modern supply chain for Krabi produce.',
    list:[
      'Verified producers and origin transparency',
      'Fair pricing with direct sales',
      'Local logistics with reliable partners'
    ]
  },

  problem: {
    title:'Problem',
    body:'Low and unstable farmer margins, little traceability, and logistics friction limit growth and trust.',
    list:[
      { title:'Unstable farmer margins', body:'Prices driven by middlemen and weekly volatility reduce income and planning capacity.' },
      { title:'Low traceability & quality confidence', body:'Buyers can’t easily verify origin, lot or practices — trust and repeat orders suffer.' },
      { title:'Fragmented last-mile logistics', body:'Uncoordinated routes, cash handling and small MOQs cause friction, delays and waste.' }
    ]
  },

  solution: {
    title:'Solution',
    list:[
      'Direct B2C & B2B sales (marketplace EN/TH)',
      'Instant QR payments; TouristDigiPay-ready',
      'Lot-level QR traceability with chain anchoring',
      'B2B tiers and delivery scheduling',
      'Collaborative hubs (markets, hotels, airport)',
      'Open a global channel for Krabi agriculture'
    ]
  },

  products: {
    title:'Products',
    subtitle:'Filter by category, producer and availability. Toggle B2B tiers or group by producer.',
    search:'Search products or producers…',
    producerAll:'All producers',
    verifiedOnly:'Verified only',
    inSeasonOnly:'In season',
    b2bView:'B2B view',
    groupBy:'Group by producer',
    sort:{ newest:'Newest', priceAsc:'Price ↑', priceDesc:'Price ↓', popular:'Popular' },
    status:{ in:'In season', out:'Out of season', limited:'Limited' },
    actions:{ add:'Add to Inquiry', tiersShow:'View tiers', tiersHide:'Hide tiers', trace:'Traceability' }
  },

  gallery:{ title:'Gallery', subtitle:'Authentic produce and co-op logistics across Krabi.' },

  cta:{
    title:'Ready to order?',
    subtitle:'Message us on WhatsApp or pay via PromptPay. For B2B, ask about delivery schedules and tiers.',
    whatsapp:'WhatsApp', email:'Email', promptpay:'PromptPay'
  },

  footer:{ legal:'All rights reserved.' }
}

export default en
