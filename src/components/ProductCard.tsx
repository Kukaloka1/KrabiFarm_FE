import VerifiedBadge from '@/components/VerifiedBadge'
import SeasonBadge from '@/components/SeasonBadge'
import type { Product } from '@/lib/types'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { useInquiry } from '@/features/inquiry/InquiryContext'
import { makeSrcSet, responsiveSizes } from '@/lib/media'

export default function ProductCard({
  p, producerName, producerVerified, b2bView, onOpenProducer, onAdded
}: {
  p: Product
  producerName: string
  producerVerified: boolean
  b2bView: boolean
  onOpenProducer: ()=>void
  onAdded?: ()=>void
}){
  const [showTiers, setShowTiers] = useState(false)
  const { t } = useI18n()
  const { add } = useInquiry()

  const src = p.image.includes('unsplash.com')
    ? `${p.image}?auto=format&fm=webp&q=80&w=800`
    : p.image

  return (
    <article className="card overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-border overflow-hidden">
        <img
          src={src}
          srcSet={p.image.includes('unsplash.com') ? makeSrcSet(p.image) : undefined}
          sizes={p.image.includes('unsplash.com') ? responsiveSizes : undefined}
          alt={p.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <SeasonBadge status={p.availability}/>
        </div>
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
              {showTiers ? t('products.actions.tiersHide') : t('products.actions.tiersShow')}
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
          <button
            className="btn"
            onClick={()=>{ add(p,1); onAdded?.() }}
          >
            {t('products.actions.add')}
          </button>
          {p.traceabilityUrl && (
            <a className="px-3 py-2 rounded-xl border border-border text-sm hover:border-primary" href={p.traceabilityUrl}>
              {t('products.actions.trace')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
