export function enableManualScrollRestoration(){
  if ('scrollRestoration' in history){ history.scrollRestoration = 'manual' }
}
export function smoothScrollTo(hash: string){
  const id = hash.replace('#','')
  const el = document.getElementById(id)
  if(!el) return
  const header = document.querySelector<HTMLElement>('header[data-sticky]')
  const offset = header ? header.offsetHeight + 8 : 0
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior:'smooth' })
}
