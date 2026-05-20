import type { Node, Path } from '@/lib/types'
import { NodeCard } from '@/components/node/NodeCard'
import { PathCard } from '@/components/paths/PathCard'

export function LighthouseRecommendationGrid({
  nodes,
  paths,
}: {
  nodes: Node[]
  paths: Path[]
}) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm tracking-[0.35em] text-moss">RECOMMENDATIONS</p>
        <h2 className="mt-3 text-3xl font-semibold">灯塔照亮的公开内容</h2>
        <p className="mt-3 max-w-2xl leading-8 text-ink/70">
          推荐来自公开节点和公开路径，不读取私密层，也不生成未经审阅的公开内容。
        </p>
      </div>
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">推荐路径</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paths.map((path) => <PathCard key={path.id} path={path} />)}
        </div>
      </div>
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">推荐节点</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nodes.map((node) => <NodeCard key={node.id} node={node} />)}
        </div>
      </div>
    </section>
  )
}
