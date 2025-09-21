import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useI18n } from '@/lib/i18n'
import { smoothScrollTo } from '@/lib/scroll'
import { useActiveSection } from '@/hooks/useActiveSection'
import logo from '@/assets/logo.png'
import { Sun, Moon, Tag, Info } from 'lucide-react'

const NAV = [
  { href: '#about', key: 'about' },
  { href: '#why', key: 'why' },
  { href: '#problem', key: 'problem' },
  { href: '#solution', key: 'solution' },
  { href: '#products', key: 'products' },
  { href: '#gallery', key: 'gallery' },
  { href: '#cta', key: 'cta' },
]

export default function Header() {
  const { theme, toggle } = useTheme()
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection()

  useEffect(() => {
    function onHash() {
      if (window.location.hash) smoothScrollTo(window.location.hash)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function onClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) {
    e.preventDefault()
    setOpen(false)
    smoothScrollTo(href)
    history.replaceState(null, '', href)
  }

  // focus trap drawer
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const root = drawerRef.current
    const focusables = root?.querySelectorAll<HTMLElement>(
      'a,button,select,[tabindex]:not([tabindex="-1"])'
    )
    const first = focusables?.[0]
    const last = focusables?.[focusables.length - 1]
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab' || !first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        ;(last as HTMLElement).focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        ;(first as HTMLElement).focus()
      }
    }
    first?.focus()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      data-sticky
      className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm"
    >
      {/* Top bar (badges estéticos) */}
      <div className="bg-background py-2 text-sm">
        <div className="container-xl flex items-center justify-between gap-6">
          {/* LEFT: badges premium */}
          <div className="flex items-center gap-3">
            {/* Start Selling – verde gradiente */}
            <a
              href="#"
              onClick={(e) => onClick(e as any, '#')}
              aria-label={t('header.start_selling')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
               bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50
               border border-emerald-300 text-emerald-800
               hover:shadow-sm hover:from-emerald-100 hover:to-emerald-100
               transition-[box-shadow,background] focus-outline"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Tag className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-semibold tracking-wide">
                {t('header.start_selling')}
              </span>
            </a>

            {/* How it works – primary gradiente */}
            <a
              href="#how"
              onClick={(e) => onClick(e as any, '#how')}
              aria-label={t('header.how_it_works')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
               bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50
               border border-primary/40 text-primary-800
               hover:shadow-sm hover:from-primary-100 hover:to-primary-100
               transition-[box-shadow,background] focus-outline"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                <Info className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-semibold tracking-wide">
                {t('header.how_it_works')}
              </span>
            </a>
          </div>

          {/* RIGHT: socials, lang, theme */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">{t('header.follow')}</span>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="/facebook.svg" alt="Facebook" className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LINE"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="/LINE.svg" alt="LINE" className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Google"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="/google.svg" alt="Google" className="h-4 w-4" />
              </a>
            </div>

            <select
              className="px-2 py-1 rounded-md border border-border bg-transparent hover:bg-accent/10 transition-colors focus-outline text-sm"
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              aria-label="Language"
            >
              <option value="en">EN</option>
              <option value="th">TH</option>
            </select>

            {/* Theme toggle (sin emojis) */}
            <button
              type="button"
              className="p-1 rounded-md border border-border hover:bg-accent/10 transition-colors focus-outline flex items-center"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={theme === 'dark' ? 'Light' : 'Dark'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-surface py-3 md:py-4">
        <div className="container-xl flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => onClick(e as any, '#home')}
            className="flex items-center gap-3 focus-outline"
            aria-label="Home"
          >
            <img
              src={logo}
              alt="KrabiFarm"
              className="h-12 w-auto md:h-16 lg:h-20"
              loading="eager"
              decoding="async"
            />
            <span className="hidden sm:inline font-bold text-2xl md:text-3xl">
              KrabiFarm
            </span>
          </a>

          {/* Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV.map((i) => {
              const isActive = active === i.href.slice(1)
              return (
                <a
                  key={i.key}
                  href={i.href}
                  onClick={(e) => onClick(e, i.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm md:text-[0.95rem] font-medium hover:text-primary transition-colors ${
                    isActive ? 'text-primary underline underline-offset-4' : ''
                  }`}
                >
                  {t(`nav.${i.key}`)}
                </a>
              )
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            {/* auth */}
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-border bg-background hover:bg-accent/10 transition-colors focus-outline text-sm font-medium"
                >
                  {t('header.log_in')}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-outline text-sm"
                >
                  {t('header.sign_up')}
                </button>
              </div>
              {/* or with (más separado de los botones) */}
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="hidden sm:inline">
                  {t('header.or_with')}
                </span>
                <span className="flex items-center gap-1">
                  <img src="/LINE.svg" alt="LINE" className="h-4 w-4" /> LINE
                </span>
                <span className="flex items-center gap-1">
                  <img src="/google.svg" alt="Google" className="h-4 w-4" /> Google
                </span>
              </div>
            </div>

            {/* mobile menu */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-accent/10 transition-colors focus-outline"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Drawer móvil */}
      {open && (
        <div
          ref={drawerRef}
          className="md:hidden fixed inset-x-0 top-[calc(theme(spacing.10)+theme(spacing.16))] bottom-0 bg-surface overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="container-xl py-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="KrabiFarm" className="h-12 w-auto" />
                <span className="font-bold text-2xl">KrabiFarm</span>
              </div>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-accent/10 transition-colors focus-outline"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {NAV.map((i) => (
                <a
                  key={i.key}
                  href={i.href}
                  onClick={(e) => onClick(e, i.href)}
                  className="block px-4 py-3 text-base font-medium hover:bg-accent/10 rounded-md transition-colors"
                >
                  {t(`nav.${i.key}`)}
                </a>
              ))}
            </nav>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="px-4 py-3 rounded-md border border-border bg-background hover:bg-accent/10 transition-colors focus-outline text-base font-medium"
                >
                  {t('header.log_in')}
                </button>
                <button
                  type="button"
                  className="px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-outline text-base"
                >
                  {t('header.sign_up')}
                </button>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="#"
                  className="px-4 py-2 hover:bg-accent/10 rounded-md transition-colors"
                >
                  {t('header.start_selling')}
                </a>
                <a
                  href="#how"
                  onClick={(e) => onClick(e as any, '#how')}
                  className="px-4 py-2 hover:bg-accent/10 rounded-md transition-colors"
                >
                  {t('header.how_it_works')}
                </a>
              </div>

              <div className="flex items-center gap-4 px-4 text-sm text-muted-foreground">
                <span>{t('header.follow')}</span>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/facebook.svg" alt="Facebook" className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="LINE"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/LINE.svg" alt="LINE" className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="Google"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/google.svg" alt="Google" className="h-4 w-4" />
                </a>
              </div>

              {/* or with (con margen-top extra en mobile) */}
              <div className="px-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <div className="flex flex-col gap-2">
                  <span className="mt-1">
                    {t('header.or_with')}
                  </span>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-accent/10 transition-colors"
                    >
                      <img src="/LINE.svg" alt="LINE" className="h-4 w-4" /> LINE
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-accent/10 transition-colors"
                    >
                      <img src="/google.svg" alt="Google" className="h-4 w-4" /> Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
