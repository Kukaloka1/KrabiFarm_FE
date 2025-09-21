//Playground//
import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import ProductCardCompact from '@/components/ProductCardCompact'
import ProductCardHorizontal from '@/components/ProductCardHorizontal'
import PlaygroundControls, { type PlaygroundState } from '@/components/PlaygroundControls'
import { PRODUCTS } from '@/data/products'
import { PRODUCERS } from '@/data/producers'
import { useState } from 'react'

export default function Playground(){
  const p = PRODUCTS[0]
  const pr = PRODUCERS.find(x=>x.id===p.producerId)
  const prodName = pr?.name ?? 'Unknown'
  const verified = !!pr?.verified

  const [st, setSt] = useState<PlaygroundState>({
    variant: 'default', cols: 3, gap: 'gap-6', decor: 'gradient'
  })

  const Grid = () => {
    const list = [p, {...p, id:'x2'}, {...p, id:'x3'}, {...p, id:'x4'}]
    const gridCls = `grid ${st.gap} grid-cols-1 ${st.cols>=2?'sm:grid-cols-2':''} ${st.cols>=3?'lg:grid-cols-3':''} ${st.cols>=4?'xl:grid-cols-4':''}`
    return (
      <div className={gridCls}>
        {list.map(item=>{
          if(st.variant==='compact'){
            return <ProductCardCompact key={item.id} p={item} producerName={prodName} producerVerified={verified}/>
          }
          if(st.variant==='horizontal'){
            return <ProductCardHorizontal key={item.id} p={item} producerName={prodName} producerVerified={verified}/>
          }
          return <ProductCard key={item.id} p={item} producerName={prodName} producerVerified={verified} b2bView={false} onOpenProducer={()=>{}}/>
        })}
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-bg relative">
      {st.decor==='gradient' && (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(31,122,76,0.15),transparent),radial-gradient(50%_50%_at_80%_20%,rgba(196,154,35,0.10),transparent)]" />
      )}
      {st.decor==='grid' && (
        <div className="absolute inset-0 -z-10 [background:radial-gradient(#E6EDE7_1px,transparent_1px)] [background-size:24px_24px]" />
      )}
      <header className="py-6 border-b border-border relative">
        <div className="container-xl">
          <h1 className="text-2xl font-bold">Design Playground</h1>
          <p className="text-muted">Elige variante, columnas, gap y decoración.</p>
          <div className="mt-4"><PlaygroundControls state={st} set={setSt}/></div>
        </div>
      </header>
      <main className="section">
        <Container><Grid/></Container>
      </main>
    </div>
  )
}
