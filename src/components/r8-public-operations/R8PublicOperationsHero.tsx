import { describeR8PublicPulse, getR8Summary } from '@/features/r8-public-operations'

export function R8PublicOperationsHero() {
  const summary = getR8Summary()

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">R8 · Public Operations</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-5xl">公开发布与持续运营</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
        R8 不再扩张新概念，而是把古月浮屿推进到可公开、可反馈、可复访、可复盘的运营闭环；让访问者进入的是一个持续点亮的世界，而不是一次性展示页。
      </p>
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">{describeR8PublicPulse()}</div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          ['阶段', summary.stages],
          ['批次', summary.batches],
          ['发布频道', summary.channels],
          ['Smoke 剧本', summary.smokeTests],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
