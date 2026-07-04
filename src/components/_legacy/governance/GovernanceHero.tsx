import { getPhaseTwelveGovernanceSummary } from '@/lib/phase-twelve-governance'

export function GovernanceHero() {
  const summary = getPhaseTwelveGovernanceSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PLATFORM GOVERNANCE</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">平台化治理</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第十二阶段把权限、审计、服务、存储和密钥治理组织为平台边界。当前仅完成治理结构，不声明真实服务上线。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">rbacReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.rbacReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">services</p><p className="mt-2 text-2xl font-semibold">{summary.services}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">auditReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.auditReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">stores</p><p className="mt-2 text-2xl font-semibold">{summary.stores}</p></div>
      </div>
    </section>
  )
}
