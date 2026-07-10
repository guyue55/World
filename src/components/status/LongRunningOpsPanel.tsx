import type { LongRunningOpsSummary } from '@/lib/long-running-ops'

export function LongRunningOpsPanel({ summary }: { summary: LongRunningOpsSummary }) {
  const stats = [
    { label: '观测目标', value: summary.targetCount },
    { label: '失败分类', value: summary.failureCategoryCount },
    { label: '安全命令', value: summary.safeRollbackCommandCount },
    { label: '禁止命令', value: summary.forbiddenCommandCount },
  ]

  return (
    <section
      className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur"
      data-testid="long-running-ops-status"
      data-local-only={summary.localOnly}
      data-lan-ip-accepted={summary.lanIpAccepted}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">Long Running Ops M28</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">长期运行观测与回滚：本地 / LAN</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">
            M28 不把本地验收伪装成外部发布；它把构建、主线、浏览器、权限、资产和 RC 报告收束为可复查的最近失败定位与回滚演练入口。
          </p>
        </div>
        <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold">BACKUP</p>
          <p className="mt-2 text-2xl font-semibold">{summary.backupCommandCount}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[1rem] bg-paper/72 p-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-moss">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {summary.targets.map((target) => (
          <article key={target.id} className="rounded-[1rem] border border-ink/8 bg-paper/62 p-4">
            <p className="truncate text-xs font-semibold text-moss">{target.id}</p>
            <h3 className="mt-2 break-words text-sm font-semibold text-ink">{target.command}</h3>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-ink/56">{target.evidence}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-4">
        {summary.failureTaxonomy.map((failure) => (
          <article key={failure.id} className="rounded-[1rem] bg-ink/5 p-4">
            <p className="truncate text-xs font-semibold tracking-[0.16em] text-moss">{failure.id}</p>
            <p className="mt-2 text-xs leading-5 text-ink/58">最近失败先执行：{failure.firstAction}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <p className="rounded-[0.9rem] bg-gold/10 px-4 py-3 text-xs leading-5 text-ink/60">
          回滚演练手册：{summary.runbook}
        </p>
        <p className="rounded-[0.9rem] bg-gold/10 px-4 py-3 text-xs leading-5 text-ink/60">
          验收报告：{summary.reportPath}
        </p>
      </div>
    </section>
  )
}
