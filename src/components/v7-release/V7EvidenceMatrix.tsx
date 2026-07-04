import { getV7BlockedReleaseReasons, v7EvidenceMatrix } from '@/features/v7-release-ops'

export function V7EvidenceMatrix() {
  const blocked = getV7BlockedReleaseReasons()

  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm tracking-[0.28em] text-moss">EVIDENCE</p>
          <h2 className="mt-2 text-3xl font-semibold">发布证据矩阵</h2>
        </div>
        <p className="rounded-full bg-amber-100 px-4 py-2 text-sm text-amber-900">releaseReady: {String(v7EvidenceMatrix.releaseReady)}</p>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {v7EvidenceMatrix.items.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white/70 p-4">
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 text-xs text-ink/50">{item.command}</p>
            <p className="mt-2 text-sm text-ink/70">{item.status}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-7 text-ink/65">仍阻断 release-ready：{blocked.join('、')}</p>
    </section>
  )
}
