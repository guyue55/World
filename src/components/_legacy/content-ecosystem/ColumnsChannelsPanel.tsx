import { getContentColumnOperationsPlan, getContentCommunicationChannels } from '@/lib/phase-nine-content'

export function ColumnsChannelsPanel() {
  const columns = getContentColumnOperationsPlan()
  const channels = getContentCommunicationChannels()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">栏目与传播渠道</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">栏目运营</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {columns.columns.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink/55">{item.type} · {item.cadence}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">传播渠道</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {channels.channels.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink/55">{item.role} · {item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
