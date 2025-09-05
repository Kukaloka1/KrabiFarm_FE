import VerifiedBadge from '@/components/VerifiedBadge'
import SeasonBadge from '@/components/SeasonBadge'
import type { Product } from '@/lib/types'
import { useInquiry } from '@/features/inquiry/InquiryContext'
import { makeSrcSet } from '@/lib/media'

export default function ProductCardFeatured({ p, producerName, producerVerified }:{
  p: Product; producerName: string; producerVerified: boolean
}){
  const { add } = useInquiry()
  const src = p.image.includes('unsplash.com')
    ? `${p.image}?auto=format&fm=webp&q=80&w=1280`
    : p.image

  return (
    <article className="card p-0 shadow-[0_20px_50px_-20px_rgba(0,0,0,.35)]">
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9]">
          <img
            src={src}
            srcSet={p.image.includes('unsplash.com') ? makeSrcSet(p.image) : undefined}
            sizes="100vw"
            alt={p.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = '/placeholder.webp' }}
          />
        </div>
        {/* overlay oscuro solo dentro de la card */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.25)_0%,transparent_30%,rgba(0,0,0,.45)_100%)] pointer-events-none" />
        {/* banda dorada, confinada por overflow-hidden de .card */}
        <div className="absolute left-0 top-0 z-20 h-2 w-1/3 bg-accent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-7 text-white">
          <div className="flex items-center gap-2">
            {producerVerified && <VerifiedBadge/>}
            <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow">{p.name}</h3>
          </div>
          <div className="mt-1 opacity-90">{producerName} • {p.origin.district}</div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="text-lg font-bold">฿{p.retailPrice} <span className="font-medium opacity-90 text-sm">/ {p.unit}</span></div>
            <button className="btn btn--gold" onClick={()=>add(p,1)}>Add to Inquiry</button>
            {p.traceabilityUrl && (
              <a className="btn btn--outline" href={p.traceabilityUrl}>Traceability</a>
            )}
          </div>
        </div>
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
          <SeasonBadge status={p.availability}/>
          {producerVerified && <span className="badge badge--verified">Verified</span>}
        </div>
      </div>
    </article>
  )
}
