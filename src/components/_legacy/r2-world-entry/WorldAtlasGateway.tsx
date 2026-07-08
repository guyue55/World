import { getR2GatewayCards } from '@/features/_legacy/r2-world-experience'

export function WorldAtlasGateway() {
  const cards = getR2GatewayCards()
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Atlas Gateway</p>
      <h2 className="mt-3 text-3xl font-semibold">七个稳定重力中心</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <a key={card.id} href={card.href} className="rounded-3xl bg-ink/5 p-5 transition hover:-translate-y-1 hover:bg-ink/10">
            <p className="text-sm text-ink/50">{card.realName}</p>
            <h3 className="mt-2 text-xl font-semibold">{card.worldName}</h3>
            <p className="mt-3 leading-7 text-ink/65">{card.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
