import {
  getNextPhaseReadiness,
  getPhaseOneCompletionMatrix,
  getPhaseOneRemainingWork,
} from '@/lib/phase-one-closure'

export function PhaseOneClosurePanel() {
  const matrix = getPhaseOneCompletionMatrix()
  const remaining = getPhaseOneRemainingWork()
  const next = getNextPhaseReadiness()
  const p0 = remaining.items.filter((item) => item.priority === 'P0')

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE ONE CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">第一阶段收口台账</h2>
      <p className="mt-3 leading-8 text-ink/70">
        第一阶段不是把产品做完，而是确认世界骨架能支撑后续建设。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">完成领域</p>
          <p className="mt-2 text-3xl font-semibold">{matrix.completedDomains.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">剩余领域</p>
          <p className="mt-2 text-3xl font-semibold">{matrix.remainingDomains.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">P0 收口项</p>
          <p className="mt-2 text-3xl font-semibold">{p0.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">建议批次</p>
          <p className="mt-2 text-3xl font-semibold">{next.recommendedNextBatches.length}</p>
        </div>
      </div>
    </section>
  )
}
