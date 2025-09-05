import { useMemo } from 'react'

export type SortBy = 'newest'|'priceAsc'|'priceDesc'|'popular'

export default function FilterBar(props:{
  categories: string[]
  producers: Array<{id:string; name:string; verified?:boolean}>
  search: string; setSearch: (v:string)=>void
  selectedCats: string[]; setSelectedCats: (v:string[])=>void
  producerId: string; setProducerId: (v:string)=>void
  verifiedOnly: boolean; setVerifiedOnly: (v:boolean)=>void
  inSeasonOnly: boolean; setInSeasonOnly: (v:boolean)=>void
  b2bView: boolean; setB2bView: (v:boolean)=>void
  groupBy: boolean; setGroupBy: (v:boolean)=>void
  sortBy: SortBy; setSortBy: (v:SortBy)=>void
  t: (k:string)=>string
}){
  const {
    categories, producers, search, setSearch,
    selectedCats, setSelectedCats,
    producerId, setProducerId,
    verifiedOnly, setVerifiedOnly,
    inSeasonOnly, setInSeasonOnly,
    b2bView, setB2bView,
    groupBy, setGroupBy,
    sortBy, setSortBy, t
  } = props

  function toggleCat(c:string){
    setSelectedCats(selectedCats.includes(c) ? selectedCats.filter(x=>x!==c) : [...selectedCats, c])
  }

  const producerOptions = useMemo(()=>[
    {id:'', name:t('products.producerAll')}, ...producers
  ],[producers,t])

  return (
    <div className="card p-4 md:p-5">
      <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder={t('products.search')}
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface"
          />
        </div>
        <div className="md:col-span-3">
          <select value={producerId} onChange={e=>setProducerId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface">
            {producerOptions.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <select value={sortBy} onChange={e=>setSortBy(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface">
            <option value="newest">{t('products.sort.newest')}</option>
            <option value="priceAsc">{t('products.sort.priceAsc')}</option>
            <option value="priceDesc">{t('products.sort.priceDesc')}</option>
            <option value="popular">{t('products.sort.popular')}</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={verifiedOnly} onChange={e=>setVerifiedOnly(e.target.checked)} />
            {t('products.verifiedOnly')}
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inSeasonOnly} onChange={e=>setInSeasonOnly(e.target.checked)} />
            {t('products.inSeasonOnly')}
          </label>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map(c=>(
          <button key={c}
                  onClick={()=>toggleCat(c)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${selectedCats.includes(c) ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-text hover:border-primary'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={b2bView} onChange={e=>setB2bView(e.target.checked)} />
          {t('products.b2bView')}
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={groupBy} onChange={e=>setGroupBy(e.target.checked)} />
          {t('products.groupBy')}
        </label>
      </div>
    </div>
  )
}
