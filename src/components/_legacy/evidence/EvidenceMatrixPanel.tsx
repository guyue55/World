import { getEvidenceDashboardMatrix } from '@/lib/evidence-dashboard'

export function EvidenceMatrixPanel() {
  const matrix = getEvidenceDashboardMatrix()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">Release Ready 证据矩阵</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {matrix.map((item) => (
          <div key={item.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.id}</p>
            <p className="mt-2 text-sm text-ink/60">{item.kind}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-moss">{item.status}</p>
            <p className="mt-2 text-xs text-ink/50">required: {item.required ? 'yes' : 'no'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
