import { getPhaseFourOperationsBoard, getPhaseFourOperationsSummary } from '@/lib/phase-four-operations'

export function OperationsBoardPanel() {
  const board = getPhaseFourOperationsBoard()
  const summary = getPhaseFourOperationsSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">OPERATIONS</p>
      <h2 className="mt-3 text-3xl font-semibold">内容运营节奏板</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">泳道</p><p className="mt-2 text-2xl font-semibold">{summary.lanes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">指标</p><p className="mt-2 text-2xl font-semibold">{summary.metrics}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">交接问题</p><p className="mt-2 text-2xl font-semibold">{summary.handoffQuestions}</p></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {board.lanes.map((lane) => (
          <article key={lane.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{lane.cadence}</p>
            <h3 className="mt-3 text-xl font-semibold">{lane.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/65">{lane.goal}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
