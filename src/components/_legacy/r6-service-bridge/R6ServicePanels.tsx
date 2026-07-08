import { r6ApiContracts, r6Operations, r6StoragePorts } from '@/features/r6-service-bridge'

export function R6ServicePanels() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Panel title="API 合约" items={r6ApiContracts.map((item) => `${item.method} ${item.path} · ${item.visibility}`)} />
      <Panel title="存储端口" items={r6StoragePorts.map((item) => `${item.id} · ${item.implementation}`)} />
      <Panel title="操作队列" items={r6Operations.map((item) => `${item.kind} · ${item.status} · ${item.risk}`)} />
    </section>
  )
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-slate-50 p-3">{item}</li>
        ))}
      </ul>
    </div>
  )
}
