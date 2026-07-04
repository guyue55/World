import { getAiSuggestionAuditQueue } from '@/lib/ai-workbench-v2'

export function AiSuggestionQueuePanel() {
  const queue = getAiSuggestionAuditQueue()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">AI 建议审计队列</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {queue.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.type} · {item.risk}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">sourceTier: {item.sourceTier}</p>
            <p className="mt-2 text-sm text-ink/60">execution: {item.execution}</p>
            <p className="mt-2 text-sm text-ink/60">humanRequired: {String(item.requiredHumanAction)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
