import { r6ExportJobs, r6PrivacyRules, r6R7Handoff } from '@/features/r6-service-bridge'

export function R6BoundaryPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-5">
        <h2 className="text-lg font-semibold text-amber-950">服务边界</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-900">
          {r6PrivacyRules.map((rule) => <li key={rule}>· {rule}</li>)}
        </ul>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">导出与 R7 交接</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
          {r6ExportJobs.map((job) => <li key={job.id}>· {job.id} · {job.status}</li>)}
          {r6R7Handoff.map((item) => <li key={item}>· {item}</li>)}
        </ul>
      </div>
    </section>
  )
}
