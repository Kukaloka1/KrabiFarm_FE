import VerifiedBadge from '@/components/VerifiedBadge'
import type { Product } from '@/lib/types'
import { useState } from 'react'

export default function ProductCard({
  p, producerName, producerVerified, b2bView, onOpenProducer
}: {
  p: Product
  producerName: string
  producerVerified: boolean
  b2bView: boolean
  onOpenProducer: ()=>void
}){
  const [showTiers, setShowTiers] = useState(false)

  return (
    <article className="card overflow-hidden flex flex-col">
      <div className="aspect-[4/3] bg-border overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{p.name}</h3>
          {producerVerified && <VerifiedBadge/>}
        </div>
        <div className="mt-1 text-sm text-muted">
          <button onClick={onOpenProducer} className="underline hover:text-primary">{producerName}</button>
          <span className="mx-2">•</span>
          <span>{p.origin.district}</span>
        </div>

        {!b2bView ? (
          <div className="mt-3">
            <div className="text-lg font-bold">฿{p.retailPrice} <span className="text-sm font-medium text-muted">/ {p.unit}</span></div>
          </div>
        ) : (
          <div className="mt-3">
            <button onClick={()=>setShowTiers(s => !s)} className="text-sm underline hover:text-primary">
              {showTiers ? 'Hide tiers' : 'View tiers'}
            </button>
            {showTiers && (
              <ul className="mt-2 text-sm list-disc list-inside">
                {p.b2bTiers?.map((t, i)=>(
                  <li key={i}>≥ {t.minQty} — ฿{t.price} / {t.unit}</li>
                )) ?? <li>No tiers</li>}
              </ul>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center gap-2">
          <a className="btn" href={`mailto:orders@example.com?subject=Inquiry: ${encodeURIComponent(p.name)}`}>Add to Inquiry</a>
          {p.traceabilityUrl && (
            <a className="px-3 py-2 rounded-xl border border-border text-sm hover:border-primary" href={p.traceabilityUrl}>Traceability</a>
          )}
        </div>
      </div>
    </article>
  )
}
