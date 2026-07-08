import { describeR7WorldPulse, getR7Summary, r7WorldState } from '@/features/r7-world-evolution'

export function R7WorldEvolutionHero() {
  const summary = getR7Summary()

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">R7 · World Evolution</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-5xl">长期运行与世界自演化</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
        R7 不是继续扩张新概念，而是让古月浮屿具备世界状态、节点生命周期、低光运行、今日世界、维护仪式和周期回望；让世界在低频维护时也能安静生长。
      </p>
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
        当前脉搏：{describeR7WorldPulse()} · {r7WorldState.season}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          ['阶段', summary.stages],
          ['批次', summary.batches],
          ['生命周期', summary.lifecycleStates],
          ['健康度', summary.healthScore],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
