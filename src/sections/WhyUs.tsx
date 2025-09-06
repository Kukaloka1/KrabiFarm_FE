// src/sections/WhyUs.tsx
import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'
import {
  ShieldCheck, Leaf, Truck, BadgeCheck,
  Sparkles, Globe, Clock8, Handshake
} from 'lucide-react'

const ICONS = [ShieldCheck, Leaf, Truck, BadgeCheck, Sparkles, Globe, Clock8, Handshake]

export default function WhyUs(){
  const { t } = useI18n()
  const raw = t('why.list') as unknown
  const items: string[] = Array.isArray(raw) ? raw : Object.values(raw ?? {})
  const subtitle = (t('why.subtitle') as string) || ''

  return (
    <section id="why" className="section">
      <Container>
        <header className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t('why.title')}
          </h2>
          {subtitle && (
            <p className="mt-2 text-muted max-w-3xl">
              {subtitle}
            </p>
          )}
        </header>

        {/* 1 col (xs) · 2 col (sm) · 3 col (lg) · 4 col (xl) */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {items.map((text, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <li key={i} className="h-full">
                <article
                  className="group h-full relative overflow-hidden rounded-2xl
                             border border-black/5 dark:border-white/10
                             bg-white/70 dark:bg-white/5 backdrop-blur-sm
                             p-5 sm:p-6 lg:p-7 shadow-sm transition-all
                             hover:shadow-md focus-within:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl
                                 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-sky-500/15
                                 ring-1 ring-emerald-400/30 dark:ring-emerald-300/20
                                 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                    </span>

                    <p className="text-base md:text-lg leading-relaxed text-muted">
                      {text}
                    </p>
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


