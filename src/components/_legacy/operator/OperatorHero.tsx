import { getPhaseElevenRuntimeSummary } from '@/lib/phase-eleven-runtime'

export function OperatorHero() {
  const summary = getPhaseElevenRuntimeSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">OPERATOR DASHBOARD</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">运行态运营控制台</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第十一阶段把自动化、审批、增长闭环和证据追踪组织到一个控制台结构中。当前仅展示运行态结构，不执行真实动作。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">workflowReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.workflowReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">runtimeActions</p><p className="mt-2 text-2xl font-semibold">{summary.runtimeActions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">growthLoopReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.growthLoopReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">evidenceReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.evidenceReady)}</p></div>
      </div>
    </section>
  )
}
