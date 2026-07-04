import { getPhaseSevenLongTermOperationsPlan, getPhaseSevenOperationsSummary } from '@/lib/phase-seven-operations'

export function LongTermOperationsPanel() {
  const plan = getPhaseSevenLongTermOperationsPlan()
  const summary = getPhaseSevenOperationsSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">LONG-TERM OPS</p>
      <h2 className="mt-3 text-3xl font-semibold">长期运营节奏</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">运营项</p><p className="mt-2 text-2xl font-semibold">{summary.cadenceItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">备份目标</p><p className="mt-2 text-2xl font-semibold">{summary.backupTargets}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">版本规则</p><p className="mt-2 text-2xl font-semibold">{summary.versionRules}</p></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plan.cadence.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.frequency}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">owner: {item.owner}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
