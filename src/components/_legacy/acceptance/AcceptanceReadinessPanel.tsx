import { getAcceptanceReadinessSummary } from '@/lib/_legacy/acceptance-readiness'

export function AcceptanceReadinessPanel() {
  const summary = getAcceptanceReadinessSummary()

  const items = [
    ['lint 状态', summary.lintStatus],
    ['待浏览器 QA 路由', String(summary.pendingRoutes)],
    ['执行分组', String(summary.executionGroups)],
    ['外部门禁', String(summary.externalGates)],
    ['第一阶段状态', summary.stageOneStatus],
  ]

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">ACCEPTANCE READINESS</p>
      <h2 className="mt-3 text-3xl font-semibold">真实验收准备度</h2>
      <p className="mt-3 max-w-2xl leading-8 text-ink/70">
        第二阶段体验开发已经形成多个产品化入口，但最终仍需要真实 lint、typecheck、build、浏览器 QA 与预览冒烟证据。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">{label}</p>
            <p className="mt-2 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
