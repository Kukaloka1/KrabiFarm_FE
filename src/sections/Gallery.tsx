//Gallery/
import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import { GALLERY } from '@/data/gallery'

export default function Gallery(){
  const [open, setOpen] = useState<string | null>(null)
  const item = GALLERY.find(g => g.id === open) || null

  // 🔒 Bloquea scroll y cierra con ESC cuando el modal está abierto
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = GALLERY.findIndex(g => g.id === open)
        const next = e.key === 'ArrowRight'
          ? (idx + 1) % GALLERY.length
          : (idx - 1 + GALLERY.length) % GALLERY.length
        setOpen(GALLERY[next].id)
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section id="gallery" className="section">
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Gallery</h2>
        <p className="text-muted mb-6">Authentic produce and co-op logistics across Krabi.</p>

        {/* 4x2 en md+ (8 ítems) — 1 col en xs, 2 col en sm, 4 col en md+ */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {GALLERY.map(g => (
            <button
              key={g.id}
              onClick={() => setOpen(g.id)}
              className="group rounded-2xl overflow-hidden border border-border/70 bg-surface
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
              aria-label={`Open ${g.alt}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={g.src}
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

      {/* Lightbox */}
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/60"
            aria-label="Close"
            onClick={() => setOpen(null)}
          />

          {/* content */}
          <div className="relative card max-w-5xl w-[94%] p-0 overflow-hidden rounded-2xl">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-contain bg-black"
            />

            {/* controls */}
            <button
              className="absolute top-3 right-3 px-3 py-1 rounded-md border border-border bg-surface
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
              onClick={() => setOpen(null)}
            >
              ✕
            </button>

            {/* prev / next (solo visible en md+) */}
            <div className="hidden md:flex absolute inset-y-0 left-0 items-center">
              <button
                className="m-3 px-3 py-2 rounded-md border border-border bg-surface/90 hover:bg-surface
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                onClick={() => {
                  const idx = GALLERY.findIndex(g => g.id === item.id)
                  const prev = (idx - 1 + GALLERY.length) % GALLERY.length
                  setOpen(GALLERY[prev].id)
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
            </div>
            <div className="hidden md:flex absolute inset-y-0 right-0 items-center">
              <button
                className="m-3 px-3 py-2 rounded-md border border-border bg-surface/90 hover:bg-surface
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                onClick={() => {
                  const idx = GALLERY.findIndex(g => g.id === item.id)
                  const next = (idx + 1) % GALLERY.length
                  setOpen(GALLERY[next].id)
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

