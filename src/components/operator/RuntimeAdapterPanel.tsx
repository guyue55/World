import { getRuntimeAdapterContract } from '@/lib/phase-eleven-integration'

export function RuntimeAdapterPanel() {
  const contract = getRuntimeAdapterContract()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">运行态适配层</h2>
      <p className="mt-2 text-sm text-ink/55">adapterReady: {String(contract.adapterReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {contract.adapters.map((adapter) => (
          <article key={adapter.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{adapter.kind}</p>
            <h3 className="mt-3 text-lg font-semibold">{adapter.id}</h3>
            <p className="mt-3 text-sm text-ink/60">writes: {String(adapter.writes)}</p>
            <p className="mt-2 text-sm text-ink/60">evidence: {String(adapter.requiresEvidence)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
