import { ReactNode, useEffect } from 'react'

export default function Modal({
  open, onClose, title, children
}: { open: boolean; onClose: ()=>void; title: string; children: ReactNode }){
  useEffect(()=>{
    function onEsc(e: KeyboardEvent){ if(e.key === 'Escape') onClose() }
    if(open){ document.addEventListener('keydown', onEsc) }
    return () => document.removeEventListener('keydown', onEsc)
  },[open,onClose])

  if(!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <button aria-label="Close overlay" onClick={onClose} className="absolute inset-0 bg-black/40"></button>
      <div className="relative card max-w-2xl w-[92%] p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="px-2 py-1 rounded-md border border-border">✕</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
