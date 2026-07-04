import Link from 'next/link'
import { worldMapNodes } from '@/features/world-map-experience'
export function MobileWorldCompass() {
  return <div className="grid gap-3 lg:hidden">{worldMapNodes.map((node,index)=><Link key={node.id} href={node.href} className="rounded-[1.5rem] border border-white/50 bg-white/75 p-4 shadow-soft" aria-label={`移动世界罗盘 ${index+1}: ${node.title}`}><div className="flex items-start justify-between gap-4"><div><p className="text-xs tracking-[0.28em] text-moss">{node.layer.toUpperCase()}</p><h3 className="mt-2 text-xl font-semibold">{node.title}</h3><p className="mt-2 text-sm leading-6 text-ink/65">{node.description}</p></div><span className="rounded-full bg-ink px-3 py-1 text-xs text-white">{String(index+1).padStart(2,'0')}</span></div></Link>)}</div>
}
