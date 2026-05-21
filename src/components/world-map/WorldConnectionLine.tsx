import type { WorldMapConnection, WorldMapNode } from '@/features/world-map-experience'
export function WorldConnectionLine({ connection, nodes }: { connection: WorldMapConnection; nodes: WorldMapNode[] }) {
  const source = nodes.find((node)=>node.id===connection.source)
  const target = nodes.find((node)=>node.id===connection.target)
  if(!source || !target) return null
  const left = Math.min(source.position.x, target.position.x)
  const top = Math.min(source.position.y, target.position.y)
  const width = Math.abs(source.position.x - target.position.x)
  const height = Math.abs(source.position.y - target.position.y)
  return <span className="absolute border-t border-white/18" title={connection.label} style={{left:`${left}%`,top:`${top}%`,width:`${Math.max(width,8)}%`,transform:`translateY(${height/2}%) rotate(${source.position.y < target.position.y ? 18 : -18}deg)`}} />
}
