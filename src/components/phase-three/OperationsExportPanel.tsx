import { getOperationsExportSummary, getPhaseThreeOperationsExportContract } from '@/lib/operations-export-planning'

export function OperationsExportPanel() {
  const summary = getOperationsExportSummary()
  const contract = getPhaseThreeOperationsExportContract()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">OPERATIONS & EXPORT</p>
      <h2 className="mt-3 text-3xl font-semibold">运营、导出与传承线</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        世界要能生长，也要能维护、导出、迁移和传承。第三阶段规划线已收口，
        但 release-ready 仍需真实执行证据。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">运营模块</p><p className="mt-2 text-2xl font-semibold">{summary.operationModules}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">导出格式</p><p className="mt-2 text-2xl font-semibold">{summary.exportFormats}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">隐私规则</p><p className="mt-2 text-2xl font-semibold">{summary.privacyRules}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">导出包</p><p className="mt-2 text-2xl font-semibold">{summary.packages}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">规划批次</p><p className="mt-2 text-2xl font-semibold">{summary.completedBatches}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {contract.operationModules.map((item) => (
          <div key={item.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{item.focus}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
