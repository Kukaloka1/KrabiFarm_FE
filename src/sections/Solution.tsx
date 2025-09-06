// src/sections/Solution.tsx
import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'
import {
  Lightbulb, Sparkles, ShieldCheck, Layers,
  Rocket, Globe, Settings, CheckCircle
} from 'lucide-react'

type Item = string | { title?: string; body?: string }

const ICONS = [Lightbulb, Sparkles, ShieldCheck, Layers, Rocket, Globe, Settings, CheckCircle]

// normaliza string | string[] | objeto -> Item[]
function toArray(v: unknown): Item[] {
  if (Array.isArray(v)) return v as Item[]
  if (typeof v === 'string') return v.trim() ? [v] : []
  if (v && typeof v === 'object') return Object.values(v as Record<string, Item>)
  return []
}

export default function Solution(){
  const { t } = useI18n()
  const items = toArray(t('solution.list'))

  // Queremos exactamente 6 para 3x2 en md+
  let list = items.slice(0, 6)
  if (list.length === 5) {
    // Duplico el primero como placeholder temporal (hasta que agregues el sexto al i18n)
    list = [...list, list[0]]
  }

  return (
    <section id="solution" className="section">
      <Container>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
          {t('solution.title')}
        </h2>

        {/* 1 col (xs), 2 cols (sm), 3 cols (md+) → 3 arriba + 3 abajo con 6 ítems */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {list.map((it, i) => {
            const Icon = ICONS[i % ICONS.length]
            const isString = typeof it === 'string'
            const title = isString ? undefined : (it as any).title as string | undefined
            const body  = isString ? (it as string) : ((it as any).body as string | undefined)

            return (
              <li key={i} className="h-full">
                <article
                  className="h-full card group relative overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-7
                             border border-black/5 dark:border-white/10
                             bg-white/70 dark:bg-white/5 backdrop-blur-sm
                             shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-full items-start gap-4">
                    <span
                      className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl
                                 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-sky-500/15
                                 ring-1 ring-emerald-400/30 dark:ring-emerald-300/20
                                 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                    </span>

                    <div className="space-y-1.5">
                      {title && (
                        <h3 className="text-lg md:text-xl font-semibold leading-snug">
                          {title}
                        </h3>
                      )}
                      <p className="text-base md:text-lg leading-relaxed text-muted">
                        {body ?? (isString ? it as string : '')}
                      </p>
                    </div>
                  </div>

                  {/* decor sutil */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full
                                  bg-gradient-to-br from-emerald-500/10 to-teal-500/20 blur-2xl" />
                </article>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

