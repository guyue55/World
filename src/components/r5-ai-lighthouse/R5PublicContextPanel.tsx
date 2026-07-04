import { r5PublicContextItems } from '@/features/r5-ai-lighthouse'

export function R5PublicContextPanel() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Public Index Only</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">公开 AI 只读取公开上下文</h2>
        <p className="mt-3 text-slate-600">访客层 AI 不读取 vault、不读取私密原文、不进入家庭/孩子/住宅等敏感空间。它只能基于明确允许的公开上下文解释世界。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {r5PublicContextItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-cyan-700">{item.type}</p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">public</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.worldTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{item.title}</p>
            <p className="mt-3 leading-7 text-slate-700">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
