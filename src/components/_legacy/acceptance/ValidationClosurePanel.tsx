import { getReleaseBlockerRegister, getValidationClosureSummary } from '@/lib/_legacy/validation-closure'

export function ValidationClosurePanel() {
  const summary = getValidationClosureSummary()
  const blockers = getReleaseBlockerRegister()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">VALIDATION CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">真实验证线收口</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        真实验证结构已完成，但验证结果仍待真实项目环境执行。当前结论是验证结构可交接，
        但发布级完成仍被阻断。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">复跑 pending</p><p className="mt-2 text-2xl font-semibold">{summary.pendingRerunSteps}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">QA pending</p><p className="mt-2 text-2xl font-semibold">{summary.pendingBrowserQaItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">预览 pending</p><p className="mt-2 text-2xl font-semibold">{summary.pendingPreviewRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">性能 pending</p><p className="mt-2 text-2xl font-semibold">{summary.pendingPerformanceRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.blockers}</p></div>
      </div>
      <div className="mt-6 rounded-2xl bg-paper/70 p-5">
        <h3 className="font-semibold">发布前阻断</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
          {blockers.blockers.map((blocker) => <li key={blocker.id}>- {blocker.severity} · {blocker.title}</li>)}
        </ul>
      </div>
    </section>
  )
}
