import { getPhaseThreePlanningCharter, getPhaseThreePlanningSummary } from '@/lib/phase-three-planning'

export function PhaseThreePlanningPanel() {
  const charter = getPhaseThreePlanningCharter()
  const summary = getPhaseThreePlanningSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE THREE</p>
      <h2 className="mt-3 text-3xl font-semibold">第三阶段规划线</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        第三阶段从体验能力增长开始，但不能绕过发布级真实证据。当前可以规划和开发非发布承诺能力，
        但 release-ready 仍需真实执行补证。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">目标</p><p className="mt-2 text-2xl font-semibold">{summary.goals}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">非目标</p><p className="mt-2 text-2xl font-semibold">{summary.nonGoals}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">能力线</p><p className="mt-2 text-2xl font-semibold">{summary.tracks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">架构层</p><p className="mt-2 text-2xl font-semibold">{summary.architectureLayers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {charter.tracks.map((track) => (
          <div key={track.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{track.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{track.focus}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
