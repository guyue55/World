import { getV10Summary } from '@/features/v10-intelligent-world'

export function V10IntelligenceHero() {
  const summary = getV10Summary()

  return (
    <section className="rounded-[3rem] border border-white/60 bg-white/80 p-8 shadow-soft md:p-12">
      <p className="text-sm tracking-[0.42em] text-moss">V10 · INTELLIGENT WORLD</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">长期智能世界版</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第十轮把古月浮屿收束为可长期记忆、持续演化、可审计 AI 协作、可回望、可迁移、可传承的个人数字世界。
      </p>
      <div className="mt-8 grid gap-3 text-sm md:grid-cols-6">
        <span className="rounded-2xl bg-moss/10 px-4 py-3">阶段 {summary.stages}/4</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">批次 {summary.batches}/16</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">扩展 {summary.extensions}</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">AI 角色 {summary.aiRoles}</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">生命周期 {summary.lifeStages}</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">生产上线：否</span>
      </div>
    </section>
  )
}
