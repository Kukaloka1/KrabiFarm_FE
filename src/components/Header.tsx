import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useI18n } from '@/lib/i18n'
import { smoothScrollTo } from '@/lib/scroll'

const NAV = [
  { href:'#about', key:'about' },
  { href:'#why', key:'why' },
  { href:'#problem', key:'problem' },
  { href:'#solution', key:'solution' },
  { href:'#products', key:'products' },
  { href:'#gallery', key:'gallery' },
  { href:'#cta', key:'cta' },
]

export default function Header(){
  const { theme, toggle } = useTheme()
  const { t, lang, setLang } = useI18n()
  const [open,setOpen] = useState(false)

  useEffect(()=>{
    const onHash = ()=> { if(window.location.hash) smoothScrollTo(window.location.hash) }
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])

  function onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href:string){
    e.preventDefault(); setOpen(false); smoothScrollTo(href); history.replaceState(null,'',href)
  }

  return (
    <header data-sticky className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-border">
      <div className="container-xl h-full flex items-center justify-between">
        <a href="#home" onClick={(e)=>onClick(e as any,'#home')} className="font-extrabold">KrabiFarm</a>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(i=>(
            <a key={i.key} href={i.href} onClick={(e)=>onClick(e,i.href)} className="text-sm font-semibold hover:text-primary">
              {t(`nav.${i.key}`)}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-3 py-2 rounded-lg border border-border focus-outline" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <select className="px-2 py-2 rounded-lg border border-border bg-transparent focus-outline" value={lang} onChange={e=>setLang(e.target.value as any)} aria-label="Language">
            <option value="en">EN</option>
            <option value="th">TH</option>
          </select>
        </div>

        <button className="md:hidden p-2 focus-outline" aria-label="Menu" onClick={()=>setOpen(true)}>☰</button>
      </div>

      {open && (
        <div className="md:hidden absolute inset-x-0 top-[var(--header-h)] bg-surface border-b border-border">
          <div className="container-xl py-3 space-y-1">
            {NAV.map(i=>(
              <a key={i.key} href={i.href} onClick={(e)=>onClick(e,i.href)} className="block px-2 py-3 border-t border-border">
                {t(`nav.${i.key}`)}
              </a>
            ))}
            <div className="flex items-center gap-3 px-2 py-3 border-t border-border">
              <button className="px-3 py-2 rounded-lg border border-border focus-outline" onClick={toggle}>
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
              <select className="px-2 py-2 rounded-lg border border-border bg-transparent flex-1 focus-outline" value={lang} onChange={e=>setLang(e.target.value as any)}>
                <option value="en">EN</option><option value="th">TH</option>
              </select>
              <button className="ml-auto px-3 py-2 focus-outline" onClick={()=>setOpen(false)} aria-label="Close">✕</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
