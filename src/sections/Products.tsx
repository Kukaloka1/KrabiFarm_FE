import { useMemo, useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/data/products'
import { PRODUCERS } from '@/data/producers'
import type { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'
import FilterBar, { type SortBy } from '@/components/FilterBar'
import Modal from '@/components/Modal'
import { useI18n } from '@/lib/i18n'

export default function Products(){
  const { t } = useI18n()
  const [search, setSearch] = useState('')
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [producerId, setProducerId] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [inSeasonOnly, setInSeasonOnly] = useState(false)
  const [b2bView, setB2bView] = useState(false)
  const [groupBy, setGroupBy] = useState(false)
  const [sortBy, setSortBy] = useState<SortBy>('newest')
  const [openProducer, setOpenProducer] = useState<string | null>(null)

  const producerMap = useMemo(()=>Object.fromEntries(PRODUCERS.map(p=>[p.id,p])),[])
  const byProducer = useMemo(()=>{
    return PRODUCTS.reduce<Record<string, Product[]>>((acc,p)=>{
      if(!acc[p.producerId]) acc[p.producerId] = []
      acc[p.producerId].push(p)
      return acc
    },{})
  },[])

  const filtered = useMemo(()=>{
    let list = PRODUCTS.slice()

    if(search.trim()){
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        producerMap[p.producerId]?.name.toLowerCase().includes(q)
      )
    }
    if(selectedCats.length){
      list = list.filter(p => selectedCats.every(c => p.categories.includes(c)))
    }
    if(producerId){
      list = list.filter(p => p.producerId === producerId)
    }
    if(verifiedOnly){
      list = list.filter(p => producerMap[p.producerId]?.verified)
    }
    if(inSeasonOnly){
      list = list.filter(p => p.availability === 'in_season')
    }

    switch(sortBy){
      case 'priceAsc': list.sort((a,b)=>a.retailPrice - b.retailPrice); break
      case 'priceDesc': list.sort((a,b)=>b.retailPrice - a.retailPrice); break
      case 'popular': list.sort((a,b)=>a.name.localeCompare(b.name)); break
      default: break
    }

    return list
  },[search, selectedCats, producerId, verifiedOnly, inSeasonOnly, sortBy, producerMap])

  return (
    <section id="products" className="section">
      <div className="container-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t('products.title')}</h2>
        <p className="text-muted mb-6">{t('products.subtitle')}</p>

        <FilterBar
          categories={CATEGORIES}
          producers={PRODUCERS}
          search={search} setSearch={setSearch}
          selectedCats={selectedCats} setSelectedCats={setSelectedCats}
          producerId={producerId} setProducerId={setProducerId}
          verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly}
          inSeasonOnly={inSeasonOnly} setInSeasonOnly={setInSeasonOnly}
          b2bView={b2bView} setB2bView={setB2bView}
          groupBy={groupBy} setGroupBy={setGroupBy}
          sortBy={sortBy} setSortBy={setSortBy}
          t={t}
        />

        {!groupBy ? (
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(p=>{
              const pr = producerMap[p.producerId]
              return (
                <ProductCard
                  key={p.id}
                  p={p}
                  producerName={pr?.name ?? 'Unknown'}
                  producerVerified={!!pr?.verified}
                  b2bView={b2bView}
                  onOpenProducer={()=>setOpenProducer(p.producerId)}
                />
              )
            })}
          </div>
        ) : (
          <div className="mt-6 space-y-10">
            {Object.keys(byProducer).map(pid=>{
              const pr = producerMap[pid]
              const prods = filtered.filter(p=>p.producerId===pid)
              if(!prods.length) return null
              return (
                <div key={pid}>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold">{pr?.name}</h3>
                    {pr?.verified && <span className="badge badge--verified">Verified</span>}
                  </div>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {prods.map(p=>(
                      <ProductCard
                        key={p.id}
                        p={p}
                        producerName={pr?.name ?? 'Unknown'}
                        producerVerified={!!pr?.verified}
                        b2bView={b2bView}
                        onOpenProducer={()=>setOpenProducer(pid)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <Modal
          open={!!openProducer}
          onClose={()=>setOpenProducer(null)}
          title={openProducer ? (producerMap[openProducer]?.name ?? 'Producer') : ''}
        >
          {openProducer && (
            <div className="space-y-2 text-sm">
              <div><strong>Location:</strong> {producerMap[openProducer]?.location}</div>
              <div className="flex items-center gap-2">
                <strong>Status:</strong> {producerMap[openProducer]?.verified ? 'Verified' : 'Unverified'}
              </div>
              <hr className="border-border my-3"/>
              <div className="font-semibold">Products</div>
              <ul className="list-disc list-inside">
                {PRODUCTS.filter(p=>p.producerId===openProducer).map(p=>(
                  <li key={p.id}>{p.name}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      </div>
    </section>
  )
}
