import { getFuturePhaseSummaries } from '@/lib/future-compatibility'

export function FutureRoadmapPanel() {
  const phases = getFuturePhaseSummaries()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FUTURE COMPATIBILITY</p>
      <h2 className="mt-3 text-3xl font-semibold">未来阶段兼容层</h2>
      <p className="mt-3 leading-8 text-ink/70">
        V1 不是终点，而是给 V2 到 V6 留出清晰、受控、可降级的扩展入口。
      </p>

      <div className="mt-6 space-y-3">
        {phases.map((phase) => (
          <article key={phase.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <h3 className="font-semibold">{phase.id}｜{phase.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              能力插槽：{phase.capabilitySlots.map((slot) => slot.id).join(' / ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
