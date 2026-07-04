import { r1DeploymentRunbook, r1QualityGates, r1RiskLedger } from '@/features/r1-production-stabilization'

export function R1ReleaseEvidencePanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Quality Evidence</p>
        <h2 className="mt-3 text-2xl font-semibold">本地门禁与外部证据边界</h2>
        <div className="mt-5 space-y-3">
          {r1QualityGates.localCommands.map((gate) => (
            <div key={gate.command} className="rounded-2xl bg-ink/5 p-4">
              <p className="font-mono text-sm">{gate.command}</p>
              <p className="mt-1 text-xs text-ink/50">required: {String(gate.required)}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Smoke & Risks</p>
        <h2 className="mt-3 text-2xl font-semibold">真实部署仍需签收</h2>
        <p className="mt-3 leading-7 text-ink/65">Preview smoke 路径：{r1DeploymentRunbook.previewSmokeRoutes.length} 条；Production smoke 路径：{r1DeploymentRunbook.productionSmokeRoutes.length} 条。</p>
        <div className="mt-5 space-y-3">
          {r1RiskLedger.risks.map((risk) => (
            <div key={risk.id} className="rounded-2xl bg-ink/5 p-4">
              <p className="font-semibold">{risk.id}</p>
              <p className="mt-1 text-sm text-ink/60">{risk.description}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
