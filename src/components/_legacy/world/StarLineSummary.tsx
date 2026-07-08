import { getPublicStarGraph } from '@/lib/star-lines'

export function StarLineSummary() {
  const graph = getPublicStarGraph()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">STAR LINES</p>
      <h2 className="mt-3 text-3xl font-semibold">星线概览</h2>
      <p className="mt-3 leading-8 text-ink/70">
        V1 不做复杂星图，但关系层已经存在。后续 Atlas 深潜模式、创世台和高级星图都将从这里生长。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">公开节点</p>
          <p className="mt-2 text-4xl font-semibold">{graph.nodes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">公开星线</p>
          <p className="mt-2 text-4xl font-semibold">{graph.lines.length}</p>
        </div>
      </div>
    </section>
  )
}
