import type { Area, Node } from '@/lib/types'
import { NodeLifeStageBadge } from '@/components/node/NodeLifeStageBadge'

export function NodeReadingHeader({
  node,
  areaName,
  readingMinutes,
}: {
  node: Node
  areaName?: string
  readingMinutes: number | null
}) {
  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <NodeLifeStageBadge stage={node.lifeStage} />
        <span className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink/60">{node.type}</span>
        {areaName && <span className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink/60">{areaName}</span>}
        {readingMinutes && <span className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink/60">约 {readingMinutes} 分钟</span>}
      </div>
      <div className="space-y-4">
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">{node.title}</h1>
        {node.worldTitle && <p className="text-2xl text-moss">{node.worldTitle}</p>}
        {node.summary && <p className="max-w-3xl text-lg leading-9 text-ink/75">{node.summary}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        {node.tags.map((tag) => <span key={tag} className="rounded-full bg-white/50 px-3 py-1 text-sm text-ink/55">#{tag}</span>)}
      </div>
    </header>
  )
}
