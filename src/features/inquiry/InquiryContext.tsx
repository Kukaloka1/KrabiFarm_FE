import { createContext, useContext, useMemo } from 'react'
import type { Product } from '@/lib/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export type InquiryItem = { product: Product; qty: number }
type Ctx = {
  items: InquiryItem[]
  add: (p: Product, qty?: number)=>void
  remove: (id: string)=>void
  clear: ()=>void
  count: number
}
const C = createContext<Ctx>({ items:[], add:()=>{}, remove:()=>{}, clear:()=>{}, count:0 })

export function InquiryProvider({children}:{children:React.ReactNode}){
  const [items, setItems] = useLocalStorage<InquiryItem[]>('krabifarm:inquiry', [])

  const api: Ctx = useMemo(()=>({
    items,
    add(p, qty = 1){
      setItems(prev=>{
        const i = prev.findIndex(x=>x.product.id===p.id)
        if(i>=0){ const copy = prev.slice(); copy[i] = { ...copy[i], qty: copy[i].qty + qty }; return copy }
        return [...prev, { product:p, qty }]
      })
    },
    remove(id){ setItems(prev=>prev.filter(x=>x.product.id !== id)) },
    clear(){ setItems([]) },
    get count(){ return items.reduce((n,x)=>n+x.qty,0) }
  }),[items, setItems])

  return <C.Provider value={api}>{children}</C.Provider>
}
export function useInquiry(){ return useContext(C) }
