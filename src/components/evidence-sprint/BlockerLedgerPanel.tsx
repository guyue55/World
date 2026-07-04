import { getRealExecutionBlockerLedger } from '@/lib/phase-fourteen-evidence'

export function BlockerLedgerPanel() {
  const ledger = getRealExecutionBlockerLedger()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">阻断台账</h2>
      <p className="mt-2 text-sm text-ink/55">blockerLedgerReady: {String(ledger.blockerLedgerReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {ledger.blockers.map((blocker) => (
          <article key={blocker.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{blocker.severity}</p>
            <h3 className="mt-3 text-lg font-semibold">{blocker.title}</h3>
            <p className="mt-3 text-sm text-ink/60">{blocker.observed}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
