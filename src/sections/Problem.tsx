import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'
import { BadgeDollarSign, QrCode, Truck } from 'lucide-react'

type Item = string | { title?: string; body?: string }

const ICONS = [BadgeDollarSign, QrCode, Truck]

// Normaliza string | string[] | objeto -> Item[]
function toArray(v: unknown): Item[] {
  if (Array.isArray(v)) return v as Item[]
  if (typeof v === 'string') return v.trim() ? [v] : []
  if (v && typeof v === 'object') return Object.values(v as Record<string, Item>)
  return []
}

export default function Problem(){
  const { t } = useI18n()

  const title = (t('problem.title') as string) ?? 'Problem'
  const raw   = toArray(t('problem.list')) // espera 3 elementos; si no, deriva de body
  const bodyStr = (t('problem.body') as string) ?? ''

  // Si aún no tienes problem.list, derivamos 3 bullets desde body
  let items: Item[] = raw.length ? raw : bodyStr
    .split(/\s*,\s*|\s+and\s+/i)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 3)

  // Forzamos exactamente 3 tarjetas
  while (items.length < 3) items.push(items[items.length - 1] ?? '—')

  return (
    <section id="problem" className="section">
      <Container>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
          {title}
        </h2>

        {/* 1 col (xs) · 2 col (sm) · 3 col (md+) */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {items.map((it, i) => {
            const Icon = ICONS[i % ICONS.length]
            const isString = typeof it === 'string'
            const cardTitle = isString ? null : (it as any).title as string | undefined
            const cardBody  = isString ? (it as string) : ((it as any).body as string | undefined)

            return (
              <li key={i} className="h-full">
                <article
                  className="h-full relative overflow-hidden rounded-2xl
                             border border-black/5 dark:border-white/10
                             bg-white/70 dark:bg-white/5 backdrop-blur-sm
                             p-5 sm:p-6 lg:p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl
                                 bg-amber-500/10 ring-1 ring-amber-400/25"
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                    </span>

                    <div className="space-y-1.5">
                      {cardTitle && (
                        <h3 className="text-lg md:text-xl font-semibold leading-snug">
                          {cardTitle}
                        </h3>
                      )}
                      <p className="text-base md:text-lg leading-relaxed text-muted">
                        {cardBody ?? (isString ? it : '')}
                      </p>
                    </div>
                  </div>

                  {/* Decor sutil */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full
                                  bg-gradient-to-br from-amber-500/10 to-orange-500/20 blur-2xl" />
                </article>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}


