import { getFallbackRules } from '@/lib/fallbacks'
import { getExportBundles } from '@/lib/export-contract'

export function FallbackAndExportPanel() {
  const fallbacks = getFallbackRules()
  const bundles = getExportBundles()

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">FALLBACKS</p>
        <h2 className="mt-3 text-3xl font-semibold">降级策略</h2>
        <div className="mt-6 space-y-3">
          {fallbacks.slice(0, 5).map((item) => (
            <article key={item.capability} className="rounded-2xl bg-paper/70 p-4">
              <h3 className="font-semibold">{item.capability}</h3>
              <p className="mt-2 text-sm text-ink/60">fallback: {item.fallback}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">EXPORT</p>
        <h2 className="mt-3 text-3xl font-semibold">导出契约</h2>
        <div className="mt-6 space-y-3">
          {bundles.map((bundle) => (
            <article key={bundle.id} className="rounded-2xl bg-paper/70 p-4">
              <h3 className="font-semibold">{bundle.id}</h3>
              <p className="mt-2 text-sm text-ink/60">{bundle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
