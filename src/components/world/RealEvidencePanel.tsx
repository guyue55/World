import {
  getBrowserQaRecords,
  getBuildFailurePlaybook,
  getPerformanceMeasurementRecords,
  getRealExecutionEvidenceLedger,
} from '@/lib/real-evidence'

export function RealEvidencePanel() {
  const ledger = getRealExecutionEvidenceLedger()
  const playbook = getBuildFailurePlaybook()
  const performance = getPerformanceMeasurementRecords()
  const browser = getBrowserQaRecords()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">REAL EVIDENCE</p>
      <h2 className="mt-3 text-3xl font-semibold">真实执行证据</h2>
      <p className="mt-3 leading-8 text-ink/70">
        真实执行结果必须被记录，不能停留在口头通过。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">执行记录</p>
          <p className="mt-2 text-3xl font-semibold">{ledger.records.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">失败类型</p>
          <p className="mt-2 text-3xl font-semibold">{playbook.failureTypes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">性能记录</p>
          <p className="mt-2 text-3xl font-semibold">{performance.routes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">浏览器 QA</p>
          <p className="mt-2 text-3xl font-semibold">{browser.matrix.length}</p>
        </div>
      </div>
    </section>
  )
}
