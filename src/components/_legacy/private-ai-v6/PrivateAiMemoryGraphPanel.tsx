import { getV6AiRedactedMemoryGraph } from '@/features/private-ai-v6'

export function PrivateAiMemoryGraphPanel() {
  const graph = getV6AiRedactedMemoryGraph()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">REDACTED MEMORY GRAPH</p>
      <h2 className="mt-3 text-3xl font-semibold">脱敏记忆图谱</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-xl font-semibold">节点</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink/65">
            {graph.nodes.map((node) => <li key={node.id}>· {node.label} / {node.visibility} / {node.kind}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-xl font-semibold">关系</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink/65">
            {graph.edges.map((edge) => <li key={`${edge.from}-${edge.to}`}>· {edge.from} → {edge.to} / {edge.relation}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
