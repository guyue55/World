import {
  getFirstStageAcceptanceReportSchema,
  getLocalAcceptanceRunner,
  getStageClosureUpdateProtocol,
} from '@/lib/local-acceptance'

export function LocalAcceptancePanel() {
  const runner = getLocalAcceptanceRunner()
  const protocol = getStageClosureUpdateProtocol()
  const schema = getFirstStageAcceptanceReportSchema()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">LOCAL ACCEPTANCE</p>
      <h2 className="mt-3 text-3xl font-semibold">本地验收运行器</h2>
      <p className="mt-3 leading-8 text-ink/70">
        第一阶段的收口必须能被后来者重复执行。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">运行步骤</p>
          <p className="mt-2 text-3xl font-semibold">{runner.steps.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">报告字段</p>
          <p className="mt-2 text-3xl font-semibold">{schema.requiredFields.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5 md:col-span-2">
          <p className="text-sm text-ink/50">状态转换</p>
          <p className="mt-2 text-lg font-semibold">{protocol.from} → {protocol.to}</p>
        </div>
      </div>
    </section>
  )
}
