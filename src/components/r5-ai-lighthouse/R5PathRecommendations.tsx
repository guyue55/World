import { r5PathRecommendations } from '@/features/r5-ai-lighthouse'

export function R5PathRecommendations() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-700">Path Recommendations</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">灯塔推荐路径，但只推荐公开道路</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {r5PathRecommendations.map((path) => (
          <article key={path.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-slate-950">{path.title}</h3>
              {path.publicOnly ? <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">public only</span> : null}
            </div>
            <p className="mt-2 text-slate-600">{path.intent}</p>
            <ol className="mt-4 space-y-2">
              {path.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3 text-sm text-slate-700"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs text-white">{index + 1}</span>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  )
}
