import { r8FeedbackLoop, r8OperationsCadence, r8PublicSmokeTests, r8SeoPublicationPlan } from '@/features/r8-public-operations'

export function R8OperationsPanels() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">持续运营节奏</h2>
        <div className="mt-4 space-y-3">
          {r8OperationsCadence.map((ritual) => (
            <div key={ritual.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">{ritual.name}</p>
              <p className="mt-2 text-sm text-slate-500">{ritual.frequency}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                {ritual.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">反馈与 Smoke Test</h2>
        <div className="mt-4 grid gap-3">
          {r8FeedbackLoop.channels.map((channel) => (
            <div key={channel.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">{channel.name}</p>
              <p className="mt-2 text-sm text-slate-600">{channel.review}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-slate-100 p-4">
          <p className="text-sm font-medium text-slate-900">公开路由</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{r8SeoPublicationPlan.publicRoutes.join(' · ')}</p>
        </div>
        <div className="mt-4 text-sm text-slate-600">Smoke 剧本数：{r8PublicSmokeTests.length}</div>
      </div>
    </section>
  )
}
