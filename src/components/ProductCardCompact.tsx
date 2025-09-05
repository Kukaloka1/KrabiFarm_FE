import VerifiedBadge from '@/components/VerifiedBadge'
import SeasonBadge from '@/components/SeasonBadge'
import type { Product } from '@/lib/types'
import { useInquiry } from '@/features/inquiry/InquiryContext'
import { makeSrcSet, responsiveSizes } from '@/lib/media'

export default function ProductCardCompact({ p, producerName, producerVerified }:{
  p: Product; producerName: string; producerVerified: boolean
}){
  const { add } = useInquiry()
  const src = p.image.includes('unsplash.com')
    ? `${p.image}?auto=format&fm=webp&q=80&w=800`
    : p.image
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[4/3]">
        <img src={src} srcSet={p.image.includes('unsplash.com')? makeSrcSet(p.image): undefined} sizes={responsiveSizes} alt={p.name} className="w-full h-full object-cover"/>
        <div className="absolute top-2 left-2"><SeasonBadge status={p.availability}/></div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm">{p.name}</h3>
          {producerVerified && <VerifiedBadge/>}
        </div>
        <div className="mt-1 text-xs text-muted">{producerName} • {p.origin.district}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm font-bold">฿{p.retailPrice}<span className="text-muted text-xs"> / {p.unit}</span></div>
          <button className="px-3 py-1 rounded-lg bg-primary text-white text-xs" onClick={()=>add(p,1)}>Add</button>
        </div>
      </div>
    </article>
  )
}
