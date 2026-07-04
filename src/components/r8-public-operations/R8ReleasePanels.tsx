import { r8CalendarItems, r8ReleaseChannels, r8WorldReleaseLog } from '@/features/r8-public-operations'

export function R8ReleasePanels() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="text-xl font-semibold text-slate-950">公开发布频道</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {r8ReleaseChannels.map((channel) => (
            <article key={channel.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-medium text-slate-900">{channel.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{channel.purpose}</p>
              <p className="mt-3 text-xs text-slate-500">{channel.audience} · {channel.cadence}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">最近发生</h2>
        <div className="mt-4 space-y-3">
          {r8WorldReleaseLog.map((event) => (
            <div key={event.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">{event.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{event.impact}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
        <h2 className="text-xl font-semibold text-slate-950">公开内容日历</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {r8CalendarItems.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.type}</p>
              <p className="mt-2 font-medium text-slate-900">{item.title}</p>
              <p className="mt-3 text-sm text-slate-500">{item.status}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
