import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import ProductCardCompact from '@/components/ProductCardCompact'
import ProductCardHorizontal from '@/components/ProductCardHorizontal'
import { PRODUCTS } from '@/data/products'
import { PRODUCERS } from '@/data/producers'

export default function Playground(){
  const p = PRODUCTS[0]
  const pr = PRODUCERS.find(x=>x.id===p.producerId)
  const prodName = pr?.name ?? 'Unknown'
  const verified = !!pr?.verified

  return (
    <div className="min-h-dvh bg-bg">
      <header className="py-6 border-b border-border">
        <div className="container-xl">
          <h1 className="text-2xl font-bold">Design Playground</h1>
          <p className="text-muted">Prueba variantes de card para definir el look & feel.</p>
        </div>
      </header>
      <main className="section">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              p={p}
              producerName={prodName}
              producerVerified={verified}
              b2bView={false}
              onOpenProducer={()=>{}}
            />
            <ProductCardCompact
              p={{...p, id:'x2'}}
              producerName={prodName}
              producerVerified={verified}
            />
            <ProductCardHorizontal
              p={{...p, id:'x3'}}
              producerName={prodName}
              producerVerified={verified}
            />
          </div>
        </Container>
      </main>
    </div>
  )
}
