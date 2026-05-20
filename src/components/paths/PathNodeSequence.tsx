import type { Node } from '@/lib/types'
import { NodeCard } from '@/components/node/NodeCard'

export function PathNodeSequence({ nodes }: { nodes: Node[] }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm tracking-[0.35em] text-moss">SEQUENCE</p>
        <h2 className="mt-3 text-3xl font-semibold">按这个顺序走</h2>
        <p className="mt-3 max-w-2xl leading-8 text-ink/70">
          每一步都是一颗星。路径的价值不在于收集节点，而在于让它们形成进入世界的节奏。
        </p>
      </div>
      <div className="space-y-5">
        {nodes.map((node, index) => (
          <div key={node.id} className="grid gap-4 md:grid-cols-[88px_minmax(0,1fr)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-xl font-semibold text-paper shadow-soft">
              {index + 1}
            </div>
            <NodeCard node={node} />
          </div>
        ))}
      </div>
    </section>
  )
}
