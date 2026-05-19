import {
  getDeveloperOnboarding,
  getFoundationBaseline,
  getFoundationHandoffManifest,
  getFutureExpansionGuardrails,
} from '@/lib/foundation-baseline'

export function FoundationHandoffPanel() {
  const baseline = getFoundationBaseline()
  const handoff = getFoundationHandoffManifest()
  const guardrails = getFutureExpansionGuardrails()
  const onboarding = getDeveloperOnboarding()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FOUNDATION HANDOFF</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">{baseline.name}</h2>
          <p className="mt-3 leading-8 text-ink/70">{baseline.principle}</p>
        </div>
        <span className="rounded-full bg-ink/5 px-4 py-2 text-sm">
          {handoff.fromStage} → {handoff.toStage}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">基线项</p>
          <p className="mt-2 text-3xl font-semibold">{baseline.baselineItems.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">交接项</p>
          <p className="mt-2 text-3xl font-semibold">{handoff.handoffItems.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">护栏</p>
          <p className="mt-2 text-3xl font-semibold">{guardrails.guardrails.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">入门步骤</p>
          <p className="mt-2 text-3xl font-semibold">{onboarding.steps.length}</p>
        </div>
      </div>
    </section>
  )
}
