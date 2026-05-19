import { getRuntimeStates } from '@/lib/runtime-protocol'
import { createObservabilitySnapshot } from '@/lib/observability'

export function OperationsPanel() {
  const states = getRuntimeStates()
  const snapshot = createObservabilitySnapshot()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">OPERATIONS</p>
      <h2 className="mt-3 text-3xl font-semibold">世界运行态</h2>
      <p className="mt-3 leading-8 text-ink/70">
        世界不是一次构建物，而是需要启动、观测、恢复和维护的长期生命体。
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {states.map((state) => (
          <article key={state.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <h3 className="font-semibold">{state.id}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">{state.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {snapshot.metrics.slice(0, 10).map((metric) => (
          <article key={metric.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">{metric.id}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p className="mt-1 text-xs text-ink/50">target {metric.target}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
