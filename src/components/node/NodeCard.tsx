import Link from 'next/link'
import type { Node } from '@/lib/types'
import { NodeLifeStageBadge } from './NodeLifeStageBadge'

export function NodeCard({ node }: { node: Node }) {
  return (
    <Link href={`/node/${node.slug}`} className="block rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white/70">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs">{node.type}</span>
        <NodeLifeStageBadge stage={node.lifeStage} compact />
      </div>
      <h3 className="mt-4 text-xl font-semibold">{node.title}</h3>
      {node.worldTitle && <p className="mt-1 text-sm text-moss">{node.worldTitle}</p>}
      {node.summary && <p className="mt-4 line-clamp-3 leading-7 text-ink/65">{node.summary}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {node.tags.slice(0, 4).map((tag) => <span key={tag} className="text-xs text-ink/45">#{tag}</span>)}
      </div>
    </Link>
  )
}
