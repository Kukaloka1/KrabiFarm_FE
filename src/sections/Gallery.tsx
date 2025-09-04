import { useState } from 'react'
import Container from '@/components/Container'
import { GALLERY } from '@/data/gallery'
import { makeSrcSet, responsiveSizes } from '@/lib/media'

export default function Gallery(){
  const [open, setOpen] = useState<string | null>(null)
  const item = GALLERY.find(g=>g.id===open)
  return (
    <section id="gallery" className="section">
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Gallery</h2>
        <p className="text-muted mb-6">Authentic produce and co-op logistics across Krabi.</p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {GALLERY.map(g=>(
            <button key={g.id} onClick={()=>setOpen(g.id)} className="group rounded-2xl overflow-hidden border border-border bg-surface">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={`${g.src}?auto=format&fm=webp&q=80&w=800`}
                  srcSet={makeSrcSet(g.src)}
                  sizes={responsiveSizes}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>
      </Container>

      {item && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <button className="absolute inset-0 bg-black/60" aria-label="Close" onClick={()=>setOpen(null)}></button>
          <div className="relative card max-w-4xl w-[94%] p-0 overflow-hidden">
            <img
              src={`${item.src}?auto=format&fm=webp&q=85&w=1600`}
              alt={item.alt}
              className="w-full h-full object-contain bg-black"
            />
            <button className="absolute top-3 right-3 px-3 py-1 rounded-md border border-border bg-surface" onClick={()=>setOpen(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
