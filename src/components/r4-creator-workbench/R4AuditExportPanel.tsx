import { r4AuditEvents, r4ExportPlans, r4R5Handoff } from '@/features/r4-creator-workbench'

export function R4AuditExportPanel() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Audit</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">操作要留痕。</h2>
        <div className="mt-5 space-y-3">
          {r4AuditEvents.map((event) => (
            <div key={event.id} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <strong className="text-slate-950">{event.action}</strong> · {event.target} → {event.result}
              {event.requiresReview ? <span className="ml-2 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">review</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Export & R5</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">档案可靠，AI 才能安全接入。</h2>
        <div className="mt-5 space-y-3">
          {r4ExportPlans.map((plan) => (
            <div key={plan.id} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <strong className="text-slate-950">{plan.name}</strong> · {plan.format} · {plan.ready ? 'ready' : 'draft'}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">
          <strong className="text-white">R5 交接：</strong>{r4R5Handoff.map((item) => item.title).join(' / ')}
        </div>
      </div>
    </section>
  )
}
