import { getIdentityRbacAuditProofPlan } from '@/lib/phase-thirteen-hardening'

export function IdentityRbacAuditProofPanel() {
  const plan = getIdentityRbacAuditProofPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">身份 / RBAC / 审计证明</h2>
      <p className="mt-2 text-sm text-ink/55">proofReady: {String(plan.proofReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.proofs.map((proof) => (
          <article key={proof.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{proof.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{proof.title}</h3>
            <p className="mt-3 text-sm text-ink/60">required: {String(proof.required)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
