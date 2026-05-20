import { getRealServiceAdapterImplementationPlan } from '@/lib/phase-thirteen-hardening'

export function ServiceAdaptersPanel() {
  const plan = getRealServiceAdapterImplementationPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">真实服务适配器</h2>
      <p className="mt-2 text-sm text-ink/55">adapterImplementationReady: {String(plan.adapterImplementationReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.adapters.map((adapter) => (
          <article key={adapter.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{adapter.service}</p>
            <h3 className="mt-3 text-lg font-semibold">{adapter.id}</h3>
            <p className="mt-3 text-sm text-ink/60">proof: {String(adapter.proofRequired)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
