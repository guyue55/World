export function StatusSummaryGrid({
  cards,
}: {
  cards: Array<{ id: string; label: string; value: string; description: string }>
}) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.id} className="rounded-2xl border border-ink/10 bg-white/45 p-5 shadow-soft">
          <p className="text-sm text-ink/50">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          <p className="mt-3 text-sm leading-6 text-ink/60">{card.description}</p>
        </div>
      ))}
    </section>
  )
}
