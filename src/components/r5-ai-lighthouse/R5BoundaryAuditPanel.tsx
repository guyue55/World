import { r5AuditEvents, r5ForbiddenActions, r5R6Handoff } from '@/features/r5-ai-lighthouse'

export function R5BoundaryAuditPanel() {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-rose-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-700">Boundary</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">禁止动作是灯塔的安全护栏</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {r5ForbiddenActions.map((action) => (
            <span key={action} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm text-rose-700">{action}</span>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {r5AuditEvents.map((event) => (
            <div key={event.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <strong className="text-slate-950">{event.action}</strong> → {event.target} · {event.result}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">R6 Handoff</p>
        <h2 className="mt-2 text-3xl font-semibold">交接服务化最小闭环</h2>
        <div className="mt-5 space-y-4">
          {r5R6Handoff.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/10 bg-white/10 p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.need}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
