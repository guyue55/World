import { getRealValidationRunnerContract, getRealValidationSummary } from '@/lib/_legacy/real-validation'

export function RealValidationRunnerPanel() {
  const contract = getRealValidationRunnerContract()
  const summary = getRealValidationSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">REAL VALIDATION</p>
      <h2 className="mt-3 text-3xl font-semibold">真实验证运行器</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        真实验证运行器只生成计划和检查入口，不伪造真实执行结果。它把安装、lint、类型检查、构建、
        浏览器 QA、预览冒烟和性能实测串成统一顺序。
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">验证步骤</p><p className="mt-2 text-2xl font-semibold">{summary.validationSteps}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">复跑步骤</p><p className="mt-2 text-2xl font-semibold">{summary.rerunSteps}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">QA 项</p><p className="mt-2 text-2xl font-semibold">{summary.browserQaItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">性能项</p><p className="mt-2 text-2xl font-semibold">{summary.performanceRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">缺陷</p><p className="mt-2 text-2xl font-semibold">{summary.defectCount}</p></div>
      </div>

      <div className="mt-6 rounded-2xl bg-paper/70 p-5">
        <p className="text-sm text-ink/50">运行计划</p>
        <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">{contract.runner.printCommand}</code>
      </div>
    </section>
  )
}
