import { isProductionLiveAllowed, productionGates } from '@/features/production-readiness'

export function ProductionReadinessBoard() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/75 p-6 shadow-soft">
      <p className="text-xs tracking-[0.34em] text-moss">PRODUCTION READINESS</p>
      <h2 className="mt-3 text-3xl font-semibold">生产发布前门禁</h2>
      <p className="mt-3 text-sm leading-6 text-ink/65">productionLiveAllowed: {isProductionLiveAllowed() ? 'true' : 'false'}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {productionGates.map((gate) => (
          <article key={gate.id} className="rounded-[2rem] border border-white/50 bg-sand/50 p-5">
            <p className="text-xs tracking-[0.28em] text-moss">{gate.status.toUpperCase()}</p>
            <h3 className="mt-3 text-xl font-semibold">{gate.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/60">{gate.evidence}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
