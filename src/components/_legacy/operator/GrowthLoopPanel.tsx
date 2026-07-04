import { getRuntimeGrowthLoopPlan } from '@/lib/phase-eleven-runtime'

export function GrowthLoopPanel() {
  const loop = getRuntimeGrowthLoopPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">运行态增长闭环</h2>
      <p className="mt-2 text-sm text-ink/55">growthLoopReady: {String(loop.growthLoopReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {loop.steps.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.automation}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">writes: {String(item.writes)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
