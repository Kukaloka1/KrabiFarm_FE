export type UrlState = Record<string, string | number | boolean | undefined | null>

export function readParams(){
  return new URLSearchParams(location.search)
}

export function getString(sp: URLSearchParams, key: string, def=''){
  const v = sp.get(key); return v ?? def
}
export function getBool(sp: URLSearchParams, key: string, def=false){
  const v = sp.get(key)
  return v === null ? def : v === '1' || v === 'true'
}
export function getList(sp: URLSearchParams, key: string){
  const v = sp.get(key); if(!v) return [] as string[]
  return v.split(',').map(s=>decodeURIComponent(s)).filter(Boolean)
}

export function setParams(partial: UrlState, mode:'replace'|'push'='replace'){
  const sp = readParams()
  for(const [k,v] of Object.entries(partial)){
    if(v === undefined || v === null || v === '' || v === false){
      sp.delete(k)
    }else{
      sp.set(k, String(v))
    }
  }
  const url = location.pathname + (sp.toString() ? `?${sp.toString()}` : '') + location.hash
  if(mode === 'push') history.pushState(null,'',url)
  else history.replaceState(null,'',url)
}
