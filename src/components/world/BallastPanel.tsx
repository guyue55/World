import {
  getAntiFragilityStrategy,
  getFutureStressTests,
  getLongTermInvariants,
  getPrincipleCheckMap,
  getWorldCharterRuntime,
} from '@/lib/ballast'

export function BallastPanel() {
  const charter = getWorldCharterRuntime()
  const principles = getPrincipleCheckMap()
  const invariants = getLongTermInvariants()
  const antiFragility = getAntiFragilityStrategy()
  const stress = getFutureStressTests()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">BALLAST</p>
      <h2 className="mt-3 text-3xl font-semibold">世界骨架压舱石</h2>
      <p className="mt-3 leading-8 text-ink/70">
        长期不变量是世界未来扩张时仍不可破坏的压舱石。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">宪章条款</p>
          <p className="mt-2 text-3xl font-semibold">{charter.charterArticles.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">原则映射</p>
          <p className="mt-2 text-3xl font-semibold">{principles.mappings.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">长期不变量</p>
          <p className="mt-2 text-3xl font-semibold">{invariants.invariants.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">反脆弱策略</p>
          <p className="mt-2 text-3xl font-semibold">{antiFragility.strategies.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">压力场景</p>
          <p className="mt-2 text-3xl font-semibold">{stress.scenarios.length}</p>
        </div>
      </div>
    </section>
  )
}
