import Link from 'next/link'
import type { Area, Node } from '@/lib/types'
import { resolveNodeCover } from '@/lib/homepage'
import { NodeLifeStageBadge } from './NodeLifeStageBadge'

export function NodeCard({ node, area }: { node: Node; area?: Area }) {
  return (
    <Link href={`/node/${node.slug}`} className="group block overflow-hidden rounded-world border border-ink/10 bg-white/45 shadow-soft transition hover:-translate-y-1 hover:bg-white/70">
      <div className="aspect-[16/9] overflow-hidden bg-ink/5">
        <img
          src={resolveNodeCover(node)}
          alt={`${node.title} 的封面`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-ink/5 px-3 py-1 text-xs">{node.type}</span>
          <NodeLifeStageBadge stage={node.lifeStage} compact />
        </div>
        <h3 className="mt-4 truncate text-xl font-semibold">{node.title}</h3>
        {node.worldTitle && <p className="mt-1 truncate text-sm text-moss">{node.worldTitle}</p>}
        {area && <p className="mt-2 truncate text-xs text-ink/45">{area.icon} {area.worldName}</p>}
        {node.summary && <p className="mt-4 line-clamp-3 leading-7 text-ink/65">{node.summary}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {node.tags.slice(0, 4).map((tag) => <span key={tag} className="text-xs text-ink/45">#{tag}</span>)}
        </div>
      </div>
    </Link>
  )
}
