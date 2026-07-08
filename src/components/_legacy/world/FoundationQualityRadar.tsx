import { evaluateFoundationQuality } from '@/lib/foundation-quality'

export function FoundationQualityRadar() {
  const quality = evaluateFoundationQuality()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">QUALITY RADAR</p>
      <h2 className="mt-3 text-3xl font-semibold">地基质量雷达</h2>
      <div className="mt-6 space-y-3">
        {quality.dimensions.map((item) => (
          <article key={item.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">{item.id}</h3>
              <span className="text-sm text-ink/60">{item.score}/{item.weight}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${Math.round((item.score / item.weight) * 100)}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/60">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
