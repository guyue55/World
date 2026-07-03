import { getR6Summary } from '@/features/r6-service-bridge'

export function R6ServiceHero() {
  const summary = getR6Summary()

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">R6 · Service Bridge</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-5xl">服务化最小闭环</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
        R6 不是把古月浮屿改造成复杂后台，而是给创世台、AI 灯塔和长期档案建立最小服务契约：身份、权限、API、审计、队列、导出与健康检查先形成清醒边界。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          ['阶段', summary.stages],
          ['批次', summary.batches],
          ['API 契约', summary.apiContracts],
          ['审计事件', summary.auditEvents],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
