import { getAiPathExhibitionRecommendations } from '@/lib/ai-world-companion'

export function AiRecommendationPanel() {
  const recommendations = getAiPathExhibitionRecommendations()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">路径、展览与维护建议</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recommendations.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.kind}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">sourceTier: {item.sourceTier}</p>
            <p className="mt-2 text-sm text-ink/60">execution: {item.execution}</p>
            <p className="mt-2 text-sm text-ink/60">review: {String(item.requiresReview)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
