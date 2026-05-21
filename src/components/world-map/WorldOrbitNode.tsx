import Link from 'next/link'
import type { WorldMapNode } from '@/features/world-map-experience'
export function WorldOrbitNode({ node }: { node: WorldMapNode }) {
  return <Link href={node.href} className="group absolute min-w-36 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border border-white/25 bg-white/14 p-4 text-white shadow-soft backdrop-blur transition hover:bg-white/22 focus:outline-none focus:ring-2 focus:ring-white/70" style={{left:`${node.position.x}%`,top:`${node.position.y}%`}} aria-label={`${node.title}：${node.description}`}><span className="text-[10px] tracking-[0.28em] text-white/50">{node.layer.toUpperCase()}</span><h3 className="mt-2 text-lg font-semibold">{node.title}</h3><p className="mt-2 text-xs leading-5 text-white/62">{node.signal}</p></Link>
}
