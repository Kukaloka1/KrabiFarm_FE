export function makeSrcSet(url: string){
  const q = (w:number)=> `${url}?auto=format&fm=webp&q=80&w=${w} ${w}w`
  return [480, 640, 800, 1024, 1280].map(q).join(', ')
}
export const responsiveSizes =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw'
