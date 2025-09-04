export function makeSrcSet(base: string, widths: number[] = [400, 800, 1200]) {
  // Espera URLs de Unsplash con auto=format&fm=webp&q=80
  const clean = base.includes('auto=') ? base : (base + (base.includes('?') ? '&' : '?') + 'auto=format&fm=webp&q=80')
  return widths.map(w => `${clean}&w=${w} ${w}w`).join(', ')
}
export const responsiveSizes = '(min-width:1280px) 300px, (min-width:1024px) 25vw, (min-width:640px) 33vw, 100vw'
