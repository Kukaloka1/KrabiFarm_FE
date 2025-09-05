import { useEffect, useState } from 'react'

export default function ScrollTopFab(){
  const [show, setShow] = useState(false)
  useEffect(()=>{
    const onScroll = ()=> setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive:true })
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  if(!show) return null
  return (
    <button
      onClick={()=>window.scrollTo({ top:0, behavior:'smooth' })}
      className="fixed bottom-24 right-5 z-50 btn btn--outline"
      aria-label="Scroll to top"
      title="Back to top"
    >
      ↑ Top
    </button>
  )
}
