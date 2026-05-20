import { getRuntimeIntegrationGates } from '@/lib/phase-eleven-integration'

export function RuntimeIntegrationPanel() {
  const gates = getRuntimeIntegrationGates()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">运行态真实接入门禁</h2>
      <p className="mt-2 text-sm text-ink/55">integrationReady: {String(gates.integrationReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {gates.gates.map((gate) => (
          <article key={gate.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{String(gate.ready)}</p>
            <h3 className="mt-3 text-lg font-semibold">{gate.title}</h3>
            <p className="mt-3 text-sm text-ink/60">humanReview: {String(gate.requiresHumanReview)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
