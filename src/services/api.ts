import { ENV } from '@/config/env'

type Options = RequestInit & { query?: Record<string,string|number|boolean|undefined|null> }

function withQuery(url: string, query?: Options['query']){
  if(!query) return url
  const params = new URLSearchParams()
  Object.entries(query).forEach(([k,v])=>{
    if(v !== undefined && v !== null) params.append(k, String(v))
  })
  return url + (url.includes('?') ? '&' : '?') + params.toString()
}

export async function apiGet<T=unknown>(path: string, opts: Options = {}){
  const url = withQuery((ENV.API_BASE + path), opts.query)
  const res = await fetch(url, { ...opts, headers: { 'Accept':'application/json', ...(opts.headers||{}) } })
  if(!res.ok) throw new Error(`GET ${path} ${res.status}`)
  return res.json() as Promise<T>
}

export async function apiPost<T=unknown, B=unknown>(path: string, body: B, opts: Options = {}){
  const url = withQuery((ENV.API_BASE + path), opts.query)
  const res = await fetch(url, { method:'POST', body: JSON.stringify(body), ...opts, headers: { 'Content-Type':'application/json', 'Accept':'application/json', ...(opts.headers||{}) } })
  if(!res.ok) throw new Error(`POST ${path} ${res.status}`)
  return res.json() as Promise<T>
}
