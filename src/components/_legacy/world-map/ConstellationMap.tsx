import { worldMapConnections, worldMapNodes } from '@/features/_legacy/world-map-experience'
import { WorldConnectionLine } from './WorldConnectionLine'
import { WorldOrbitNode } from './WorldOrbitNode'
export function ConstellationMap() {
  return <section className="relative min-h-[720px] overflow-hidden rounded-[3rem] border border-white/20 bg-ink p-6 text-white shadow-soft"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,.20),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(121,151,128,.22),transparent_34%)]" /><div className="pointer-events-none absolute inset-8 rounded-[2.5rem] border border-white/10" /><div className="pointer-events-none absolute inset-20 rounded-full border border-white/10" />{worldMapConnections.map((connection)=><WorldConnectionLine key={connection.id} connection={connection} nodes={worldMapNodes} />)}{worldMapNodes.map((node)=><WorldOrbitNode key={node.id} node={node} />)}</section>
}
