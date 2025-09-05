import { useState } from 'react'

type Variant = 'default'|'compact'|'horizontal'
export type PlaygroundState = {
  variant: Variant
  cols: 1|2|3|4
  gap: 'gap-4'|'gap-6'|'gap-8'
  decor: 'none'|'gradient'|'grid'
}
export default function PlaygroundControls({ state, set }:{
  state: PlaygroundState
  set: (s:PlaygroundState)=>void
}){
  const [local, setLocal] = useState(state)
  function apply(){ set(local) }
  return (
    <div className="card p-4 flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-xs text-muted mb-1">Variant</label>
        <select className="px-3 py-2 rounded-lg border border-border bg-surface" value={local.variant}
          onChange={e=>setLocal({...local, variant: e.target.value as any})}>
          <option value="default">Default</option>
          <option value="compact">Compact</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-muted mb-1">Columns</label>
        <select className="px-3 py-2 rounded-lg border border-border bg-surface" value={local.cols}
          onChange={e=>setLocal({...local, cols: Number(e.target.value) as any})}>
          <option value="1">1</option><option value="2">2</option>
          <option value="3">3</option><option value="4">4</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-muted mb-1">Gap</label>
        <select className="px-3 py-2 rounded-lg border border-border bg-surface" value={local.gap}
          onChange={e=>setLocal({...local, gap: e.target.value as any})}>
          <option value="gap-4">4</option>
          <option value="gap-6">6</option>
          <option value="gap-8">8</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-muted mb-1">Decor</label>
        <select className="px-3 py-2 rounded-lg border border-border bg-surface" value={local.decor}
          onChange={e=>setLocal({...local, decor: e.target.value as any})}>
          <option value="none">None</option>
          <option value="gradient">Gradient</option>
          <option value="grid">Grid</option>
        </select>
      </div>
      <button className="btn" onClick={apply}>Apply</button>
    </div>
  )
}
