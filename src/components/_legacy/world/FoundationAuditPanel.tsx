import { evaluateFoundationAudit, getFoundationCertification } from '@/lib/foundation-audit'

export function FoundationAuditPanel() {
  const report = evaluateFoundationAudit()
  const certification = getFoundationCertification()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FOUNDATION AUDIT</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">{certification.name}</h2>
          <p className="mt-3 leading-8 text-ink/70">{certification.exitStatement}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink/50">Pass Rate</p>
          <p className="text-5xl font-semibold">{Math.round(report.passRate * 100)}%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {report.items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.category}</p>
            <h3 className="mt-2 font-semibold">{item.id}</h3>
            <p className="mt-2 text-sm text-ink/60">{item.detail}</p>
            <p className="mt-2 text-sm">{item.passed ? '通过' : '失败'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
