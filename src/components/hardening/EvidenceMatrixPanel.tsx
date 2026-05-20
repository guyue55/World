import { getDependencyBuildEvidenceMatrix } from '@/lib/phase-thirteen-hardening'

export function EvidenceMatrixPanel() {
  const matrix = getDependencyBuildEvidenceMatrix()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">依赖与构建证据矩阵</h2>
      <p className="mt-2 text-sm text-ink/55">evidenceReady: {String(matrix.evidenceReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {matrix.checks.map((check) => (
          <article key={check.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{check.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{check.id}</h3>
            <p className="mt-3 text-sm text-ink/60">{check.command}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
