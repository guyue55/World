import { getReleaseClosureSummary, getReleaseReadyMatrix } from '@/lib/release-closure'

export function ReleaseClosurePanel() {
  const summary = getReleaseClosureSummary()
  const matrix = getReleaseReadyMatrix()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">RELEASE CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">发布准备线收口</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        发布准备结构已完成，但 release-ready 仍被真实证据阻断。后续必须补齐本地门禁、
        CI、浏览器 QA、预览冒烟、性能实测和阻断项关闭证据。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布批次</p><p className="mt-2 text-2xl font-semibold">{summary.completedBatches}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">ready 项</p><p className="mt-2 text-2xl font-semibold">{summary.readinessItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">required pending</p><p className="mt-2 text-2xl font-semibold">{summary.requiredPending}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布</p><p className="mt-2 text-sm font-semibold">{summary.releaseDecision}</p></div>
      </div>
      <div className="mt-6 rounded-2xl bg-paper/70 p-5">
        <h3 className="font-semibold">Release Ready 判断矩阵</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
          {matrix.items.map((item) => <li key={item.id}>- {item.id}: {item.status}</li>)}
        </ul>
      </div>
    </section>
  )
}
