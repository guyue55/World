import { realContentReadiness } from '@/features/real-content-v5'

export function RealContentReadinessPanel() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">CONTENT READINESS</p>
      <h2 className="mt-3 text-3xl font-semibold">真实内容完成度仪表</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {realContentReadiness.map((item) => (
          <article key={item.id} className="rounded-[2rem] border border-white/60 bg-sand/60 p-5">
            <p className="text-xs tracking-[0.28em] text-moss">{item.status}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">{item.evidence}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
