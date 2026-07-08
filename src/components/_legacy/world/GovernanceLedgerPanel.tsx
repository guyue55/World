import {
  getCapabilityMaturityModel,
  getDecisionTraceability,
  getGovernanceLedger,
  getRiskRegister,
} from '@/lib/_legacy/governance-ledger'

export function GovernanceLedgerPanel() {
  const ledger = getGovernanceLedger()
  const risks = getRiskRegister()
  const decisions = getDecisionTraceability()
  const maturity = getCapabilityMaturityModel()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">GOVERNANCE</p>
      <h2 className="mt-3 text-3xl font-semibold">治理台账</h2>
      <p className="mt-3 leading-8 text-ink/70">
        治理不是额外流程，而是让世界在长期扩展中不失控。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">治理项</p>
          <p className="mt-2 text-3xl font-semibold">{ledger.ledgers.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">风险</p>
          <p className="mt-2 text-3xl font-semibold">{risks.risks.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">决策</p>
          <p className="mt-2 text-3xl font-semibold">{decisions.decisions.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">能力</p>
          <p className="mt-2 text-3xl font-semibold">{maturity.capabilities.length}</p>
        </div>
      </div>
    </section>
  )
}
