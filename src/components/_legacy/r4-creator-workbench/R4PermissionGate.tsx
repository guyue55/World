import { r4ForbiddenActions, r4PermissionRisks } from '@/features/_legacy/r4-creator-workbench'

export function R4PermissionGate() {
  return (
    <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">Permission Gate</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">公开是确认动作，不是默认结果。</h2>
        <p className="mt-3 text-slate-700">R4 把危险操作和隐私边界放进创世台守门层，确保生活、AI 草案、私密与封存内容不会误入公开索引。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {r4PermissionRisks.map((risk) => (
          <article key={risk.id} className="rounded-3xl border border-amber-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-950">{risk.title}</h3>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">{risk.severity}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">规则：{risk.rule}</p>
            <p className="mt-3 text-sm text-slate-700">状态：{risk.status}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
        <h3 className="font-semibold">禁止动作</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {r4ForbiddenActions.map((action) => <span key={action} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">{action}</span>)}
        </div>
      </div>
    </section>
  )
}
