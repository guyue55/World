import {
  getFinalClosureReportContract,
  getPhaseOneFinalDecisionTemplate,
} from '@/lib/_legacy/final-closure'

export function FinalClosurePanel() {
  const contract = getFinalClosureReportContract()
  const decision = getPhaseOneFinalDecisionTemplate()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FINAL CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">第一阶段最终关闭报告</h2>
      <p className="mt-3 leading-8 text-ink/70">
        最终关闭报告必须汇总所有真实证据，而不是重新制造一个主观结论。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">输入报告</p>
          <p className="mt-2 text-3xl font-semibold">{contract.inputReports.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">完成规则</p>
          <p className="mt-2 text-3xl font-semibold">{contract.completionRules.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">当前决策</p>
          <p className="mt-2 text-lg font-semibold">{decision.currentDecision}</p>
        </div>
      </div>
    </section>
  )
}
