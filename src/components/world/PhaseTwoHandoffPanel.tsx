import {
  getFoundationFreezeManifest,
  getPhaseTwoBacklogSeed,
  getPhaseTwoHandoffContract,
} from '@/lib/phase-two-handoff'

export function PhaseTwoHandoffPanel() {
  const handoff = getPhaseTwoHandoffContract()
  const freeze = getFoundationFreezeManifest()
  const backlog = getPhaseTwoBacklogSeed()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE TWO HANDOFF</p>
      <h2 className="mt-3 text-3xl font-semibold">第二阶段交接契约</h2>
      <p className="mt-3 leading-8 text-ink/70">
        第一阶段完成后，第二阶段只能在稳定地基上建设，不能反复挖地基。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">冻结项</p>
          <p className="mt-2 text-3xl font-semibold">{freeze.items.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">第二阶段待办</p>
          <p className="mt-2 text-3xl font-semibold">{backlog.items.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">状态</p>
          <p className="mt-2 text-lg font-semibold">{handoff.status}</p>
        </div>
      </div>
    </section>
  )
}
