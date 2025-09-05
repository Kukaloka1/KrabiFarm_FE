import { useEffect, useState } from 'react'

const IDS = ['home','about','why','problem','solution','products','gallery','cta']

export function useActiveSection(){
  const [active, setActive] = useState<string>('home')
  useEffect(()=>{
    const els = IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if(!els.length) return
    const io = new IntersectionObserver((entries)=>{
      // El que más intersección tenga domina
      const vis = entries
        .filter(e => e.isIntersecting)
        .sort((a,b)=> (b.intersectionRatio - a.intersectionRatio))
      if(vis[0]){
        setActive((vis[0].target as HTMLElement).id)
      }
    }, { rootMargin: '0px 0px -40% 0px', threshold: [0, .25, .5, .75, 1] })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  },[])
  return active
}
