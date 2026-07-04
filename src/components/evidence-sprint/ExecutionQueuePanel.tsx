import { getRealExecutionQueue } from '@/lib/phase-fourteen-evidence'

export function ExecutionQueuePanel() {
  const queue = getRealExecutionQueue()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">真实执行队列</h2>
      <p className="mt-2 text-sm text-ink/55">executionQueueReady: {String(queue.executionQueueReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {queue.items.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.id}</h3>
            <p className="mt-3 text-sm text-ink/60">{item.command}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
