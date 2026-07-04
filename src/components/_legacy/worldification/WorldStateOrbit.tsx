import { worldMetrics } from '@/features/worldification-v4'

export function WorldStateOrbit() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/75 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">WORLD STATE ORBIT</p>
      <h2 className="mt-3 text-3xl font-semibold">世界状态轨道</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {worldMetrics.map((metric) => (
          <article key={metric.id} className="rounded-[999px] border border-white/60 bg-sand/60 p-5 text-center shadow-soft">
            <p className="text-xs tracking-[0.22em] text-moss">{metric.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{metric.title}</h3>
            <p className="mt-2 text-sm text-ink/60">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
