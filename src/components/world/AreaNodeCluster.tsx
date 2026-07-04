import type { Area, Node } from '@/lib/types'
import { NodeCard } from '@/components/node/NodeCard'
import { EmptyState } from '@/components/common/EmptyState'

export function AreaNodeCluster({ area, nodes }: { area: Area; nodes: Node[] }) {
  return (
    <section className="space-y-4 scroll-mt-24" id={`${area.id}-nodes`}>
      <div className="rounded-[1.75rem] border border-white/65 bg-white/74 p-5 shadow-soft backdrop-blur md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-moss">{area.realName}</p>
            <h2 className="text-3xl font-semibold text-ink">{area.worldName}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">{area.description}</p>
          </div>
          <span className="rounded-full bg-paper/70 px-4 py-2 text-sm text-ink/55">{nodes.length} 个公开节点</span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-xs font-semibold tracking-[0.28em] text-moss">无 AI 时</p>
            <p className="mt-2 text-sm leading-7 text-ink/62">{area.noAIFallback ?? '依靠地图、路径、档案馆和公开节点继续运行。'}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-xs font-semibold tracking-[0.28em] text-moss">AI 可增强</p>
            <p className="mt-2 text-sm leading-7 text-ink/62">{area.aiEnhancement ?? 'AI 只做导览和建议，不替代公开边界与人工判断。'}</p>
          </div>
        </div>
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
