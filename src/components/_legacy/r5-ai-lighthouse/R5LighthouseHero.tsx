import { getR5Summary } from '@/features/r5-ai-lighthouse'

export function R5LighthouseHero() {
  const summary = getR5Summary()
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-slate-950 px-6 py-12 text-white shadow-2xl sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(34,211,238,0.26),transparent_30%),radial-gradient(circle_at_78%_10%,rgba(168,85,247,0.22),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.9))]" />
      <div className="relative max-w-4xl space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-cyan-200/80">R5 · AI Lighthouse</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">AI 是灯塔，不是太阳。</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-200">R5 将 AI 灯塔从占位入口推进为真实可用的公开导览、公开问答、路径推荐、摘要建议、隐私守门与审计审批闭环。它只照亮道路，不替主人决定世界。</p>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.publicContextItems}</strong><span className="text-sm text-slate-300">公开上下文</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.capabilities}</strong><span className="text-sm text-slate-300">灯塔能力</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.reviewItems}</strong><span className="text-sm text-slate-300">审批建议</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.forbiddenActions}</strong><span className="text-sm text-slate-300">禁止动作</span></div>
        </div>
      </div>
    </section>
  )
}
