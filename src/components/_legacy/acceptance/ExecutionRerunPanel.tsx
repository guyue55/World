import { getRealExecutionRerunContract, getRealExecutionRerunSummary } from '@/lib/_legacy/execution-rerun'

export function ExecutionRerunPanel() {
  const contract = getRealExecutionRerunContract()
  const summary = getRealExecutionRerunSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">REAL EXECUTION RERUN</p>
      <h2 className="mt-3 text-3xl font-semibold">真实执行复跑计划</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        复跑不是重新开发，而是把安装、lint、类型检查、世界检查、构建和证据回写串成可重复流程。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">步骤</p><p className="mt-2 text-2xl font-semibold">{summary.stepCount}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">pending</p><p className="mt-2 text-2xl font-semibold">{summary.pending}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">passed</p><p className="mt-2 text-2xl font-semibold">{summary.passed}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">failed</p><p className="mt-2 text-2xl font-semibold">{summary.failed}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">lint</p><p className="mt-2 text-sm font-semibold">{summary.lintStatus}</p></div>
      </div>
      <ol className="mt-6 space-y-3">
        {contract.steps.map((step) => (
          <li key={step.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{step.id}</p>
            <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">{step.command}</code>
            <p className="mt-2 text-sm leading-6 text-ink/60">{step.expected}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
