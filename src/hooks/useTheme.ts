import { useEffect, useState } from 'react'
import { readParams, setParams } from '@/lib/url'

type Theme = 'light'|'dark'

function prefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
}
function applyTheme(theme: Theme){
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export function useTheme(){
  const [theme, setTheme] = useState<Theme>(() => {
    const sp = readParams()
    const q = sp.get('theme')
    if (q === 'light' || q === 'dark') return q
    const ls = localStorage.getItem('theme')
    if (ls === 'light' || ls === 'dark') return ls
    return prefersDark() ? 'dark' : 'light'
  })

  useEffect(()=>{
    applyTheme(theme)
    try { localStorage.setItem('theme', theme) } catch {}
    setParams({ theme }, 'replace')
  },[theme])

  // Si el user cambia el sistema y NO hay ?theme forzado, seguimos preferencia
  useEffect(()=>{
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if(!mq) return
    const onChange = () => {
      if (!readParams().get('theme')) setTheme(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener?.('change', onChange)
    return ()=> mq.removeEventListener?.('change', onChange)
  },[])

  return { theme, setTheme, toggle: ()=> setTheme(t => t==='dark'?'light':'light'==='light'?'dark':'dark') }
}
