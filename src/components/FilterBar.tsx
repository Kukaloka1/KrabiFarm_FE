import type { Producer } from '@/lib/types'

export type SortBy = 'newest' | 'priceAsc' | 'priceDesc' | 'popular'

export default function FilterBar({
  categories, producers,
  search, setSearch,
  selectedCats, setSelectedCats,
  producerId, setProducerId,
  verifiedOnly, setVerifiedOnly,
  inSeasonOnly, setInSeasonOnly,
  b2bView, setB2bView,
  groupBy, setGroupBy,
  sortBy, setSortBy,
  t,
}: {
  categories: string[]
  producers: Producer[]
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
  function toggleCat(c:string){
    setSelectedCats(selectedCats.includes(c)
      ? selectedCats.filter(x=>x!==c) : [...selectedCats, c])
  }

  return (
    <div className="card p-4 sticky top-[calc(var(--header-h)+8px)] z-10">
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-4">
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder={t('products.search')}
            className="w-full px-4 py-2 rounded-xl border border-border bg-surface"
          />
        </div>

        <div className="md:col-span-3">
          <select value={producerId} onChange={e=>setProducerId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-border bg-surface">
            <option value="">{t('products.producerAll')}</option>
            {producers.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="md:col-span-3">
          <select value={sortBy} onChange={e=>setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-border bg-surface">
            <option value="newest">{t('products.sort.newest')}</option>
            <option value="priceAsc">{t('products.sort.priceAsc')}</option>
            <option value="priceDesc">{t('products.sort.priceDesc')}</option>
            <option value="popular">{t('products.sort.popular')}</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
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

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {categories.map(c=>(
          <button key={c}
            onClick={()=>toggleCat(c)}
            className={`px-3 py-1 rounded-full border text-sm ${selectedCats.includes(c) ? 'bg-primary text-white border-primary' : 'bg-surface border-border'}`}>
            {c}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={b2bView} onChange={e=>setB2bView(e.target.checked)} />
            {t('products.b2bView')}
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={groupBy} onChange={e=>setGroupBy(e.target.checked)} />
            {t('products.groupBy')}
          </label>
        </div>
      </div>
    </div>
  )
}
