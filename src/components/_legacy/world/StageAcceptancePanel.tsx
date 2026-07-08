import {
  getFinalAcceptanceChecklist,
  getReleasePreviewChecklist,
  getStageCompletionGate,
} from '@/lib/stage-acceptance'

export function StageAcceptancePanel() {
  const gate = getStageCompletionGate()
  const preview = getReleasePreviewChecklist()
  const acceptance = getFinalAcceptanceChecklist()
  const externalRequired = gate.completionGates.filter((item) => item.status === 'external-required')

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">STAGE ACCEPTANCE</p>
      <h2 className="mt-3 text-3xl font-semibold">第一阶段验收门禁</h2>
      <p className="mt-3 leading-8 text-ink/70">
        阶段完成必须由证据决定，而不是由感觉决定。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">当前状态</p>
          <p className="mt-2 text-lg font-semibold">{gate.currentStatus}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">外部门禁</p>
          <p className="mt-2 text-3xl font-semibold">{externalRequired.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">预览检查</p>
          <p className="mt-2 text-3xl font-semibold">{preview.requiredChecks.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">验收区域</p>
          <p className="mt-2 text-3xl font-semibold">{acceptance.acceptanceAreas.length}</p>
        </div>
      </div>
    </section>
  )
}
