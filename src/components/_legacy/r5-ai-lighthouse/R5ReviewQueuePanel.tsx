import { getR5PendingReviewItems } from '@/features/r5-ai-lighthouse'

export function R5ReviewQueuePanel() {
  const items = getR5PendingReviewItems()
  return (
    <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">Human Review</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">AI 建议进入审批队列</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-3xl border border-amber-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">{item.kind}</span>
              <span className="text-xs font-semibold text-slate-500">{item.risk}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{item.suggestion}</p>
            <p className="mt-4 text-sm font-medium text-amber-800">状态：{item.status}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
