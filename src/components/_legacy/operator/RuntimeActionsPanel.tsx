import { getRuntimeActionRegistry } from '@/lib/phase-eleven-runtime'

export function RuntimeActionsPanel() {
  const registry = getRuntimeActionRegistry()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">运行态动作注册表</h2>
      <p className="mt-2 text-sm text-ink/55">registryReady: {String(registry.registryReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {registry.actions.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.type}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.id}</h3>
            <p className="mt-3 text-sm text-ink/60">default: {item.default}</p>
            <p className="mt-2 text-sm text-ink/60">writes: {String(item.writes)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
