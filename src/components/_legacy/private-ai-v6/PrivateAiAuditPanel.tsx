import { getV6AiAuditEvents } from '@/features/private-ai-v6'

export function PrivateAiAuditPanel() {
  const events = getV6AiAuditEvents()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">AUDIT LEDGER</p>
      <h2 className="mt-3 text-3xl font-semibold">AI 审计日志</h2>
      <div className="mt-5 space-y-3">
        {events.map((event) => (
          <article key={event.id} className="rounded-2xl bg-paper/70 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold">{event.action}</h3>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs tracking-[0.18em] text-moss">{event.result}</span>
            </div>
            <p className="mt-3 text-sm text-ink/60">actor: {event.actor} · target: {event.target}</p>
            <p className="mt-2 text-sm text-ink/60">rawPrivateContentAccessed: {String(event.rawPrivateContentAccessed)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
