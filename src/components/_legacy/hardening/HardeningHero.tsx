import { getPhaseThirteenHardeningSummary } from '@/lib/phase-thirteen-hardening'

export function HardeningHero() {
  const summary = getPhaseThirteenHardeningSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">IMPLEMENTATION HARDENING</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实实现加固</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第十三阶段聚焦真实实现加固、服务适配器证明、安全基线和 release-ready 证据闭环。当前仍为执行准备，不伪造通过状态。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">evidenceReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.evidenceReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">checks</p><p className="mt-2 text-2xl font-semibold">{summary.checks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">adapters</p><p className="mt-2 text-2xl font-semibold">{summary.adapters}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">proofReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.proofReady)}</p></div>
      </div>
    </section>
  )
}
