import { worldMapNodes } from '@/features/_legacy/world-map-experience'
export function WorldMapLegend() {
  const layers = Array.from(new Set(worldMapNodes.map((node)=>node.layer)))
  return <div className="grid gap-3 rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-soft md:grid-cols-5">{layers.map((layer)=><div key={layer}><p className="text-xs tracking-[0.28em] text-moss">{layer.toUpperCase()}</p><p className="mt-2 text-sm text-ink/60">{worldMapNodes.filter((node)=>node.layer===layer).length} nodes</p></div>)}</div>
}
