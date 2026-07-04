import { getAuditComplianceLedger } from '@/lib/phase-twelve-governance'

export function AuditCompliancePanel() {
  const ledger = getAuditComplianceLedger()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">审计日志与合规台账</h2>
      <p className="mt-2 text-sm text-ink/55">auditReady: {String(ledger.auditReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {ledger.events.map((event) => (
          <article key={event.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{event.risk}</p>
            <h3 className="mt-3 text-lg font-semibold">{event.id}</h3>
            <p className="mt-3 text-sm text-ink/60">required: {String(event.required)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
