import type { Area, Node } from '@/lib/types'

export function NodePassport({ node, area }: { node: Node; area?: Area }) {
  return (
    <section className="sticky top-24 rounded-world border border-ink/10 bg-white/50 p-6 shadow-soft">
      <h2 className="text-xl font-semibold">节点护照</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-ink/50">区域</dt>
          <dd className="mt-1 font-medium">{area?.worldName ?? node.areaId}</dd>
        </div>
        <div>
          <dt className="text-ink/50">类型</dt>
          <dd className="mt-1 font-medium">{node.type}</dd>
        </div>
        <div>
          <dt className="text-ink/50">生命阶段</dt>
          <dd className="mt-1 font-medium">{node.lifeStage}</dd>
        </div>
        <div>
          <dt className="text-ink/50">权限</dt>
          <dd className="mt-1 font-medium">{node.visibility}</dd>
        </div>
        <div>
          <dt className="text-ink/50">来源</dt>
          <dd className="mt-1 font-medium">{node.source}</dd>
        </div>
        <div>
          <dt className="text-ink/50">标签</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {node.tags.map((tag) => <span className="rounded-full bg-ink/5 px-2 py-1" key={tag}>#{tag}</span>)}
          </dd>
        </div>
      </dl>
    </section>
  )
}
