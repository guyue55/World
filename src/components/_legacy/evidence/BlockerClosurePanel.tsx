import { getOpenReleaseBlockersForClosure, getReleaseBlockerClosureSummary } from '@/lib/blocker-closure'

export function BlockerClosurePanel() {
  const summary = getReleaseBlockerClosureSummary()
  const blockers = getOpenReleaseBlockersForClosure()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">BLOCKER CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">发布阻断关闭辅助</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        阻断项只能被证据推动进入关闭流程，不能被脚本或面板自动关闭。这里展示仍需补证的阻断项。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">开放阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">P0</p><p className="mt-2 text-2xl font-semibold">{summary.p0OpenBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">请求</p><p className="mt-2 text-2xl font-semibold">{summary.requests}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">状态</p><p className="mt-2 text-xs font-semibold">{summary.recordStatus}</p></div>
      </div>
      <div className="mt-6 grid gap-3">
        {blockers.map((blocker) => (
          <div key={blocker.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{blocker.severity} · {blocker.source}</p>
            <p className="mt-2 font-semibold">{blocker.title}</p>
            <p className="mt-2 text-sm text-ink/60">{blocker.id}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
