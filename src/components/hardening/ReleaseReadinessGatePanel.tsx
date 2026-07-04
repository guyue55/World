import { getReleaseReadinessTransitionGate } from '@/lib/phase-thirteen-release'

export function ReleaseReadinessGatePanel() {
  const gate = getReleaseReadinessTransitionGate()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">release-ready 转换门槛</h2>
      <p className="mt-2 text-sm text-ink/55">
        releaseReady: {String(gate.releaseReady)} · transitionAllowed: {String(gate.transitionAllowed)}
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {gate.conditions.map((condition) => (
          <article key={condition.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{String(condition.met)}</p>
            <h3 className="mt-3 text-lg font-semibold">{condition.id}</h3>
            <p className="mt-3 text-sm text-ink/60">required: {String(condition.required)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
