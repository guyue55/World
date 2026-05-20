import type { Node } from '@/lib/types'
import { NodeCard } from '@/components/node/NodeCard'
import { AccessibleCollapsible } from '@/components/interaction/AccessibleCollapsible'

type NodeRelationGroup = {
  id: string
  title: string
  description: string
  nodes: Node[]
}

export function NodeRelationRail({ groups }: { groups: NodeRelationGroup[] }) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm tracking-[0.35em] text-moss">STAR LINES</p>
        <h2 className="mt-3 text-3xl font-semibold">继续探索这片星图</h2>
        <p className="mt-3 max-w-2xl leading-8 text-ink/70">
          节点不是孤岛。相关内容默认收纳，避免压过正文阅读。
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {groups.map((group, index) => (
          <AccessibleCollapsible
            key={group.id}
            title={group.title}
            summary={`${group.description} · ${group.nodes.length} 个节点`}
            defaultOpen={index === 0}
          >
            {group.nodes.length ? (
              <div className="space-y-4">
                {group.nodes.map((node) => <NodeCard key={node.id} node={node} />)}
              </div>
            ) : (
              <p className="rounded-world border border-ink/10 bg-white/45 p-5 text-sm leading-7 text-ink/55">
                这条星线暂时安静，后续会随内容增长而亮起。
              </p>
            )}
          </AccessibleCollapsible>
        ))}
      </div>
    </section>
  )
}
