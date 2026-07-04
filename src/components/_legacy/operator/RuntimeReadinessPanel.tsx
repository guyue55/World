import { getRuntimeReadinessBoard } from '@/lib/phase-eleven-integration'

export function RuntimeReadinessPanel() {
  const board = getRuntimeReadinessBoard()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">运行态就绪度</h2>
      <p className="mt-2 text-sm text-ink/55">runtimeReady: {String(board.runtimeReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {board.readiness.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.id}</p>
            <h3 className="mt-3 text-lg font-semibold">{String(item.value)}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
