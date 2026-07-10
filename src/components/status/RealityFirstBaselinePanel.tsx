const invalidatedConclusions = [
  '固定分数与阈值托底不能代表真实视觉质量。',
  '截图存在、报告通过和 DOM token 不能替代逐页体验审查。',
  '当前主线仍需完成七类空间、九条流程和四种模式的真实验收。',
]

export function RealityFirstBaselinePanel() {
  return (
    <section
      className="border border-ink/12 bg-paper/78 p-6 shadow-soft"
      data-testid="reality-first-baseline-status"
      data-product-status="FOUNDATION_ONLY"
    >
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-moss">Reality-First 当前事实</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">工程底座可运行，世界体验尚未完成</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">
            M29 / M30 的候选分数已作为历史结论失效。这里从真实页面和连续旅程重新验收，不再用内部评分证明完成。
          </p>
        </div>
        <p className="border border-ink/12 bg-night px-4 py-3 font-mono text-xs text-paper">FOUNDATION_ONLY</p>
      </div>

      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {invalidatedConclusions.map((conclusion) => (
          <li key={conclusion} className="border-l-2 border-gold/70 bg-white/45 px-4 py-3 text-sm leading-6 text-ink/65">
            {conclusion}
          </li>
        ))}
      </ul>
    </section>
  )
}
