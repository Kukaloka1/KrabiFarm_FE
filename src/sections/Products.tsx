import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/data/products'
import { PRODUCERS } from '@/data/producers'
import type { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'
import FilterBar, { type SortBy } from '@/components/FilterBar'
import Modal from '@/components/Modal'
import { useI18n } from '@/lib/i18n'
import SchemaOrgProducts from '@/components/SchemaOrgProducts'
import { readParams, getString, getBool, getList, setParams } from '@/lib/url'

export default function Products({ onAdded }: { onAdded?: ()=>void }){
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

  // Cargar desde URL una vez
  useEffect(()=>{
    const sp = readParams()
    setSearch(getString(sp,'q',''))
    setProducerId(getString(sp,'pid',''))
    setSelectedCats(getList(sp,'cats'))
    setVerifiedOnly(getBool(sp,'verified', false))
    setInSeasonOnly(getBool(sp,'season', false))
    setB2bView(getBool(sp,'b2b', false))
    setGroupBy(getBool(sp,'group', false))
    const s = getString(sp,'sort','newest')
    if(['newest','priceAsc','priceDesc','popular'].includes(s)) setSortBy(s as SortBy)
  },[])

  // Escribir a URL cuando cambie estado (sin ensuciar el histórico)
  useEffect(()=>{
    setParams({
      q: search || undefined,
      pid: producerId || undefined,
      cats: selectedCats.length ? selectedCats.map(encodeURIComponent).join(',') : undefined,
      verified: verifiedOnly || undefined,
      season: inSeasonOnly || undefined,
      b2b: b2bView || undefined,
      group: groupBy || undefined,
      sort: sortBy !== 'newest' ? sortBy : undefined,
    }, 'replace')
  },[search, producerId, selectedCats, verifiedOnly, inSeasonOnly, b2bView, groupBy, sortBy])

  const producerMap = useMemo(()=>Object.fromEntries(PRODUCERS.map(p=>[p.id,p])),[])
  const byProducer = useMemo(()=>{
    return PRODUCTS.reduce<Record<string, Product[]>>((acc,p)=>{
      (acc[p.producerId] ||= []).push(p)
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
    if(selectedCats.length){ list = list.filter(p => selectedCats.every(c => p.categories.includes(c))) }
    if(producerId){ list = list.filter(p => p.producerId === producerId) }
    if(verifiedOnly){ list = list.filter(p => producerMap[p.producerId]?.verified) }
    if(inSeasonOnly){ list = list.filter(p => p.availability === 'in_season') }

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
                  onAdded={onAdded}
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
                        onAdded={onAdded}
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

        <SchemaOrgProducts products={filtered}/>
      </div>
    </section>
  )
}
