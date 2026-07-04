import { getV10IntelligenceCards } from '@/features/v10-intelligent-world'

export function V10IntelligenceDashboard() {
  const cards = getV10IntelligenceCards()

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.id} className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/45">{card.state}</p>
          <h2 className="mt-3 text-2xl font-semibold">{card.title}</h2>
          <p className="mt-3 leading-7 text-ink/70">{card.description}</p>
        </article>
      ))}
    </section>
  )
}
