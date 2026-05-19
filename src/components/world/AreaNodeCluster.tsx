import type { Area, Node } from '@/lib/types'
import { NodeCard } from '@/components/node/NodeCard'
import { EmptyState } from '@/components/common/EmptyState'

export function AreaNodeCluster({ area, nodes }: { area: Area; nodes: Node[] }) {
  return (
    <section className="space-y-4 scroll-mt-24" id={`${area.id}-nodes`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-moss">{area.realName}</p>
          <h2 className="text-3xl font-semibold">{area.worldName}</h2>
        </div>
        <span className="rounded-full bg-white/55 px-4 py-2 text-sm text-ink/55">{nodes.length} 个公开节点</span>
      </div>
      {nodes.length === 0 ? (
        <EmptyState
          title={`${area.worldName}仍在等待第一颗星`}
          description={area.noAIFallback ?? '这里还没有公开节点。'}
          href="/archive"
          action="打开档案馆"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nodes.map((node) => <NodeCard key={node.id} node={node} />)}
        </div>
      )}
    </section>
  )
}
