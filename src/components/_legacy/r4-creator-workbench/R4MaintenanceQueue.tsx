import { r4MaintenanceTasks } from '@/features/_legacy/r4-creator-workbench'

export function R4MaintenanceQueue() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Low-energy Maintenance</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">把维护压力拆成小动作。</h2>
        <p className="mt-3 text-slate-600">创世台不是让主人面对一整座宇宙，而是把混乱转成可领取、可完成、可记录的小任务。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {r4MaintenanceTasks.map((task) => (
          <article key={task.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-950">{task.title}</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500">{task.energy}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">原因：{task.reason}</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">结果：{task.expectedResult}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
