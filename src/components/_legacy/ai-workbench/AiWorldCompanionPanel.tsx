import { getAiWorldCompanionPlan, getAiWorldCompanionSummary } from '@/lib/ai-world-companion'

export function AiWorldCompanionPanel() {
  const plan = getAiWorldCompanionPlan()
  const summary = getAiWorldCompanionSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">WORLD COMPANION</p>
      <h2 className="mt-3 text-3xl font-semibold">AI 世界维护伙伴</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">能力</p><p className="mt-2 text-2xl font-semibold">{summary.capabilities}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">维护检查</p><p className="mt-2 text-2xl font-semibold">{summary.maintenanceChecks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">建议</p><p className="mt-2 text-2xl font-semibold">{summary.recommendations}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">已执行</p><p className="mt-2 text-2xl font-semibold">{summary.executed}</p></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plan.capabilities.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.output}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">humanRequired: {String(item.humanRequired)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
