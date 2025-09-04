import { useEffect, useState } from 'react'
export function useTheme(){
  const [theme,setTheme] = useState<string>(() => localStorage.getItem('theme') || 'light')
  useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark'){ root.classList.add('dark') } else { root.classList.remove('dark') }
    localStorage.setItem('theme', theme)
  },[theme])
  function toggle(){ setTheme(prev => prev === 'dark' ? 'light' : 'dark') }
  return { theme, toggle }
}
