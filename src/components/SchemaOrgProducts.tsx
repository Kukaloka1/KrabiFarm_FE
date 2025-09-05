import { useMemo } from 'react'
import type { Product } from '@/lib/types'
import { PRODUCERS } from '@/data/producers'

export default function SchemaOrgProducts({ products }:{ products: Product[] }){
  const data = useMemo(()=> {
    const items = products.slice(0,20).map((p,i)=>{
      const prod: any = {
        "@type": "Product",
        "name": p.name,
        "category": p.categories?.[0] || "Food",
        "brand": PRODUCERS.find(x=>x.id===p.producerId)?.name || "Krabi producer",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "THB",
          "price": p.retailPrice,
          "availability": p.availability === 'out_of_season' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
        }
      }
      return prod
    })
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": items.map((p,i)=>({ "@type":"ListItem", "position": i+1, "item": p }))
    }
  },[products])

  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
}
