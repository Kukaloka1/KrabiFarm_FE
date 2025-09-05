import VerifiedBadge from '@/components/VerifiedBadge'
import SeasonBadge from '@/components/SeasonBadge'
import type { Product } from '@/lib/types'
import { useInquiry } from '@/features/inquiry/InquiryContext'
import { makeSrcSet, responsiveSizes } from '@/lib/media'

export default function ProductCardHorizontal({ p, producerName, producerVerified }:{
  p: Product; producerName: string; producerVerified: boolean
}){
  const { add } = useInquiry()
  const src = p.image.includes('unsplash.com')
    ? `${p.image}?auto=format&fm=webp&q=80&w=800`
    : p.image
  return (
    <article className="card overflow-hidden flex">
      <div className="relative w-40 sm:w-56 shrink-0">
        <div className="aspect-[4/3]">
          <img src={src} srcSet={p.image.includes('unsplash.com')? makeSrcSet(p.image): undefined} sizes={responsiveSizes} alt={p.name} className="w-full h-full object-cover"/>
        </div>
        <div className="absolute top-2 left-2"><SeasonBadge status={p.availability}/></div>
      </div>
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{p.name}</h3>
          {producerVerified && <VerifiedBadge/>}
        </div>
        <div className="mt-1 text-sm text-muted">{producerName} • {p.origin.district}</div>
        <div className="mt-3 text-lg font-bold">฿{p.retailPrice}<span className="text-sm text-muted"> / {p.unit}</span></div>
        <div className="mt-3">
          <button className="btn" onClick={()=>add(p,1)}>Add to Inquiry</button>
        </div>
      </div>
    </article>
  )
}
