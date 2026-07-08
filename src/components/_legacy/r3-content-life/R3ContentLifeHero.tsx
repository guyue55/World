
import { getR3Summary } from '@/features/_legacy/r3-content-life'

export function R3ContentLifeHero() {
  const summary = getR3Summary()
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 px-6 py-12 text-white shadow-2xl sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(125,211,252,0.2),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.88))]" />
      <div className="relative max-w-4xl space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-200/80">R3 · Living Content</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">真实节点开始发光，世界不再只是入口。</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-200">R3 把技术、产品、灵感、生活与世界建设记录放入同一套 Node 协议。每个节点都有现实标题、世界标题、时间、位置、关系、权限、生命阶段和下一步动作。</p>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.nodes}</strong><span className="text-sm text-slate-300">真实 / 种子节点</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.paths}</strong><span className="text-sm text-slate-300">精选探索路径</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.areas}</strong><span className="text-sm text-slate-300">主干区域</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.averageMaturity}%</strong><span className="text-sm text-slate-300">平均成熟度</span></div>
        </div>
      </div>
    </section>
  )
}
