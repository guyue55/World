import type { Node } from '@/lib/types'
import { NodeCard } from '@/components/node/NodeCard'
import { AccessibleCollapsible } from '@/components/interaction/AccessibleCollapsible'

type NodeRelationGroup = {
  id: string
  title: string
  description: string
  items: Array<{
    node: Node
    reason: string
  }>
}

export function NodeRelationRail({ groups }: { groups: NodeRelationGroup[] }) {
  if (groups.length === 0) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm tracking-[0.35em] text-moss">STAR LINES</p>
          <h2 className="mt-3 text-3xl font-semibold">继续探索这片星图</h2>
        </div>
        <div className="rounded-[1.75rem] border border-white/65 bg-white/72 p-6 shadow-soft backdrop-blur xl:p-8">
          <p className="font-semibold text-ink">当前星域较为静谧</p>
          <p className="mt-3 text-sm leading-7 text-ink/70">
            这颗星暂时没有直接相连的内容。你可以去档案馆中自由探索。
          </p>
          <a href="/archive" className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-night">
            去档案馆看看
          </a>
        </div>
      </section>
    )
  }

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
            summary={`${group.description} · ${group.items.length} 个节点`}
            defaultOpen={index === 0}
          >
            {group.items.length ? (
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.node.id} className="space-y-2">
                    <NodeCard node={item.node} />
                    <p className="rounded-[1rem] bg-paper/70 px-4 py-3 text-sm leading-7 text-ink/62">
                      为什么相关：{item.reason}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-[1.25rem] border border-ink/10 bg-white/45 p-5 text-sm leading-7 text-ink/55">
                这条星线暂时安静，后续会随内容增长而亮起。
              </p>
            )}
          </AccessibleCollapsible>
        ))}
      </div>
    </section>
  )
}
