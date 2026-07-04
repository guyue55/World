import { getPhaseFiveHandoffPreparation } from '@/lib/phase-four-operations'

export function PhaseFiveHandoffPanel() {
  const handoff = getPhaseFiveHandoffPreparation()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE FIVE HANDOFF</p>
      <h2 className="mt-3 text-3xl font-semibold">第五阶段前置交接</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        第五阶段候选重点是私密档案、家庭内容、时间胶囊、年度世界册与传承导出。
        第四阶段只准备边界和问题，不实现私密系统。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="font-semibold">候选重点</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/65">
            {handoff.phaseFiveCandidateFocus.map((item) => <li key={item}>· {item}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="font-semibold">第四阶段不得实现</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/65">
            {handoff.mustNotImplementInPhaseFour.map((item) => <li key={item}>· {item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
