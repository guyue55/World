import Link from 'next/link'
import { ArrowRight, DoorOpen } from 'lucide-react'
import type { Node } from '@/lib/types'

type NodeRelationGroup = { id: string; title: string; description: string; items: Array<{ node: Node; reason: string }> }

export function NodeRelationRail({ groups, sourceSlug }: { groups: NodeRelationGroup[]; sourceSlug?: string }) {
  const doors = groups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title }))).slice(0, 6)
  return <section className="node-relation-rail" aria-labelledby="relation-door-title">
    <header><p><DoorOpen size={16} /> RELATION DOORS</p><h2 id="relation-door-title">从这个地点继续走</h2><span>每扇门都保留为什么相关，而不是只给一个相似标题。</span></header>
    {doors.length ? <div>{doors.map(({ node, reason, group }) => <Link key={`${group}-${node.id}`} href={`/node/${node.slug}?fromNode=${sourceSlug ?? ''}&via=relation`}><small>{group}</small><strong>{node.worldTitle ?? node.title}</strong><span>{reason}</span><i>穿过关系门 <ArrowRight size={14} /></i></Link>)}</div> : <p className="node-relation-empty">这里暂时安静，可以从档案馆选择另一处地点。</p>}
  </section>
}
