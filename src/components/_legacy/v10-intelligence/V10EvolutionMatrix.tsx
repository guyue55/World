import { v10EvolutionRules, v10MemoryLifecycle } from '@/features/v10-intelligent-world'

export function V10EvolutionMatrix() {
  return (
    <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-[2.5rem] border border-white/60 bg-white/75 p-6 shadow-soft">
        <p className="text-sm tracking-[0.32em] text-moss">LIFE CYCLE</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {v10MemoryLifecycle.lifeStages.map((stage) => (
            <span key={stage} className="rounded-full bg-moss/10 px-4 py-2 text-sm">{stage}</span>
          ))}
        </div>
      </article>
      <article className="rounded-[2.5rem] border border-white/60 bg-white/75 p-6 shadow-soft">
        <p className="text-sm tracking-[0.32em] text-moss">EVOLUTION RULES</p>
        <div className="mt-5 space-y-3">
          {v10EvolutionRules.rules.map((rule) => (
            <div key={rule.id} className="rounded-2xl bg-cream/70 p-4">
              <p className="font-medium">{rule.id}</p>
              <p className="mt-1 text-sm leading-6 text-ink/65">{rule.trigger} → {rule.action} · 自动执行：否</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
