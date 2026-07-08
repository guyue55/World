import { getGateReport } from '@/lib/development-gates'
import { evaluateFoundationQuality } from '@/lib/foundation-quality'
import { getFoundationFreezeReport } from '@/lib/foundation-freeze'

export function FoundationGatePanel() {
  const gate = getGateReport()
  const quality = evaluateFoundationQuality()
  const freeze = getFoundationFreezeReport()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FOUNDATION GATE</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">世界地基准入门</h2>
          <p className="mt-3 leading-8 text-ink/70">
            冻结的是骨架底线，不是未来想象力。
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink/50">Foundation Score</p>
          <p className="text-5xl font-semibold">{quality.totalScore}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">当前阶段</p>
          <p className="mt-2 text-xl font-semibold">{gate.current?.name ?? '未知'}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">冻结项</p>
          <p className="mt-2 text-3xl font-semibold">{freeze.frozenCount}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">地基门禁</p>
          <p className="mt-2 text-xl font-semibold">{quality.pass && gate.kernelPass ? '通过' : '待修正'}</p>
        </div>
      </div>
    </section>
  )
}
