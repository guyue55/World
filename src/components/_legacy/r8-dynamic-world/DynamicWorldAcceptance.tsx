import { r8DynamicAcceptance, r8DynamicSurfaces } from '@/features/_legacy/r8-dynamic-world'

export function DynamicWorldAcceptance() {
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs font-semibold tracking-[0.32em] text-moss">R8.1 QUALITY BOUNDARY</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">动态不是炫技，而是有边界的世界反馈。</h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3">
          {r8DynamicSurfaces.map((surface) => (
            <article key={surface.id} className="rounded-3xl bg-sand/55 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-ink/40">{surface.id}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{surface.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/62">{surface.purpose}</p>
              <p className="mt-3 text-xs leading-5 text-ink/45">降级：{surface.reducedMotionFallback}</p>
            </article>
          ))}
        </div>
        <div className="rounded-[2rem] bg-ink p-5 text-white">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/45">ACCEPTANCE</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/68">
            {r8DynamicAcceptance.map((item) => <li key={item}>✓ {item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
