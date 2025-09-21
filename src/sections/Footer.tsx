//Footer/
import { useI18n } from '@/lib/i18n'
import logo from '@/assets/logo.png'
import bitLogo from '@/assets/bit.svg'

export default function Footer(){
  const { t } = useI18n()
  const label = (key: string, fallback: string) => {
    const v = t(key) as unknown
    return typeof v === 'string' && v.trim() ? v : fallback
  }

  const nav = [
    { href: '#products',  label: label('nav.products',  'Products') },
    { href: '#producers', label: label('nav.producers', 'Producers') },
    { href: '#why',       label: label('nav.why',       'Why Us') },
    { href: '#solution',  label: label('nav.solution',  'Solution') },
    { href: '#gallery',   label: label('nav.gallery',   'Gallery') },
    { href: '#faq',       label: label('nav.faq',       'FAQ') },
    { href: '#contact',   label: label('nav.contact',   'Contact') },
  ]

  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
      {/* línea luminosa sutil */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

      <div className="container-xl px-4">
        <div className="py-10 md:py-12">
          {/* fila principal estable: brand | nav | créditos */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Brand — LOGO GRANDE */}
            <div className="flex items-center gap-4 lg:basis-1/3 min-w-0">
              <img
                src={logo}
                alt="KrabiFarm logo"
                className="h-16 md:h-20 w-auto select-none shrink-0"
                loading="lazy"
                decoding="async"
              />
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                KrabiFarm
              </span>
            </div>

            {/* Nav — centrado y con wrap; ocupa el espacio intermedio */}
            <nav aria-label="Footer navigation" className="flex-1">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-base md:text-lg">
                {nav.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:underline underline-offset-4 decoration-emerald-500/60
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Créditos Bittech — LOGO GRANDE + subtítulo clicable */}
            <a
              href="https://www.bittechnetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-start lg:items-end text-left lg:basis-1/3"
              aria-label="Bittech Network (opens in a new tab)"
            >
              <img
                src={bitLogo}
                alt="Bittech Network"
                className="h-16 md:h-24 w-auto transition-transform group-hover:scale-[1.02] shrink-0"
                loading="lazy"
                decoding="async"
              />
              <span className="mt-2 text-sm md:text-base text-muted leading-tight">
                Developed and supported by <span className="font-semibold">Bittech Network</span>
              </span>
            </a>
          </div>

          {/* línea legal */}
          <div className="mt-8 pt-6 border-t border-white/10 text-sm text-muted
                          flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} KrabiFarm. {t('footer.legal') as string}</p>
            <p className="opacity-80">Made in Krabi • Thailand</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


