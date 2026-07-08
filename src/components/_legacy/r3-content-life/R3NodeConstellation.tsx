
import { getR3FeaturedNodes } from '@/features/_legacy/r3-content-life'

export function R3NodeConstellation() {
  const nodes = getR3FeaturedNodes(9)
  return (
    <section className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Node Constellation</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">首批真实节点星群</h2>
        <p className="mt-2 max-w-3xl text-slate-600">节点不是普通列表。它们在世界中同时投影到区域、路径、时间河和档案馆。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {nodes.map((node) => (
          <article key={node.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
              <span>{node.area}</span>
              <span>{node.lifeStage}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-950">{node.worldTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{node.title}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{node.summary}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-white">成熟度 {node.maturity}%</span>
              <span className="text-slate-500">{node.visibility}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
