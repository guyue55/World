import {
  getPhaseTwoCharter,
  getPhaseTwoContentCoverPlan,
  getPhaseTwoExecutionBoard,
  getPhaseTwoRoutePlan,
} from '@/lib/phase-two-kickoff'

export function PhaseTwoKickoffPanel() {
  const charter = getPhaseTwoCharter()
  const board = getPhaseTwoExecutionBoard()
  const routes = getPhaseTwoRoutePlan()
  const content = getPhaseTwoContentCoverPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE TWO</p>
      <h2 className="mt-3 text-3xl font-semibold">第二阶段开工</h2>
      <p className="mt-3 leading-8 text-ink/70">
        第二阶段从真实体验开始，不再继续堆地基协议。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">状态</p>
          <p className="mt-2 text-lg font-semibold">{charter.status}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">执行泳道</p>
          <p className="mt-2 text-3xl font-semibold">{board.lanes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">页面计划</p>
          <p className="mt-2 text-3xl font-semibold">{routes.routes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">内容目标</p>
          <p className="mt-2 text-3xl font-semibold">{content.contentTargets.length}</p>
        </div>
      </div>
    </section>
  )
}
