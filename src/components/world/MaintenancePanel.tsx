import { getMaintenanceCadences, getRecoveryPaths } from '@/lib/maintenance'

export function MaintenancePanel() {
  const cadences = getMaintenanceCadences()
  const recoveryPaths = getRecoveryPaths()

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">MAINTENANCE</p>
        <h2 className="mt-3 text-3xl font-semibold">维护日历</h2>
        <div className="mt-6 space-y-3">
          {cadences.map((item) => (
            <article key={item.id} className="rounded-2xl bg-paper/70 p-4">
              <h3 className="font-semibold">{item.id}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{item.tasks.join(' / ')}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">RECOVERY</p>
        <h2 className="mt-3 text-3xl font-semibold">恢复路径</h2>
        <div className="mt-6 space-y-3">
          {recoveryPaths.slice(0, 4).map((item) => (
            <article key={item.id} className="rounded-2xl bg-paper/70 p-4">
              <h3 className="font-semibold">{item.id}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{item.when}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
