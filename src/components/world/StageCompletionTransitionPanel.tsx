import {
  getStageCompletionCertificateTemplate,
  getStageCompletionTransitionGuard,
} from '@/lib/stage-completion-transition'

export function StageCompletionTransitionPanel() {
  const guard = getStageCompletionTransitionGuard()
  const certificate = getStageCompletionCertificateTemplate()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">COMPLETION TRANSITION</p>
      <h2 className="mt-3 text-3xl font-semibold">阶段完成状态转换守卫</h2>
      <p className="mt-3 leading-8 text-ink/70">
        阶段状态只能由完整证据推动，不能由人工感觉推动。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">状态转换</p>
          <p className="mt-2 text-lg font-semibold">{guard.from} → {guard.to}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">阻断条件</p>
          <p className="mt-2 text-3xl font-semibold">{guard.blockedWhen.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">证书字段</p>
          <p className="mt-2 text-3xl font-semibold">{certificate.fields.length}</p>
        </div>
      </div>
    </section>
  )
}
