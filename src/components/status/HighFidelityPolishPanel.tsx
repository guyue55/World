import type { HighFidelityPolishSummary } from '@/lib/high-fidelity-polish'

export function HighFidelityPolishPanel({ summary }: { summary: HighFidelityPolishSummary }) {
  const cards = [
    { label: '目标分', value: summary.targetScore },
    { label: '维度', value: summary.dimensionCount },
    { label: '支柱', value: summary.pillarCount },
    { label: '兜底文件', value: summary.requiredFallbackCount },
  ]

  return (
    <section
      className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur"
      data-testid="high-fidelity-polish-status"
      data-local-only={summary.localOnly}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">High Fidelity Polish M29</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">截图墙审查：从能用到想逛</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">
            M29 只承认本地 / LAN 的真实截图、Scene QA、RC、声景和兜底状态证据。P0/P1 必须为 0；P2 可以保留给 M30 终局候选报告，当前不是 10/10。
          </p>
        </div>
        <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold">P0/P1</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {cards.map((item) => (
          <div key={item.label} className="rounded-[1rem] bg-paper/72 p-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-moss">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {summary.dimensions.map((dimension) => (
          <article key={dimension.id} className="rounded-[1rem] border border-ink/8 bg-paper/62 p-4">
            <p className="truncate text-xs font-semibold text-moss">{dimension.id}</p>
            <h3 className="mt-2 text-sm font-semibold text-ink">{dimension.label}</h3>
            <p className="mt-2 text-xs leading-5 text-ink/56">最低 {dimension.minimumScore}/10</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <p className="rounded-[0.9rem] bg-gold/10 px-4 py-3 text-xs leading-5 text-ink/60">
          验收报告：{summary.reportPath}
        </p>
        <p className="rounded-[0.9rem] bg-gold/10 px-4 py-3 text-xs leading-5 text-ink/60">
          允许开放缺陷：{summary.allowedOpenDefects.join(' / ')}
        </p>
      </div>
    </section>
  )
}
