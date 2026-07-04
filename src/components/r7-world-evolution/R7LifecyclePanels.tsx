import { r7LifecycleStates, r7LowLightMode, r7MaintenanceQueue } from '@/features/r7-world-evolution'

export function R7LifecyclePanels() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Panel title="节点生命周期" items={r7LifecycleStates.map((state) => `${state.worldName} · ${state.realDescription}`)} />
      <Panel title="低光运行" items={[r7LowLightMode.realDescription, ...r7LowLightMode.behaviors]} />
      <Panel title="维护队列" items={r7MaintenanceQueue.map((item) => `${item.title} · ${item.nextAction}`)} />
    </section>
  )
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        {items.slice(0, 6).map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-3">{item}</li>)}
      </ul>
    </div>
  )
}
