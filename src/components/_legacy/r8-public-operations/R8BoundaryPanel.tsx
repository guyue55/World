import { getR8CriticalRisks, r8PrivacyReleaseGuard } from '@/features/r8-public-operations'

export function R8BoundaryPanel() {
  const risks = getR8CriticalRisks()

  return (
    <section className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-amber-950">公开运营边界</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-amber-900">
        R8 的公开发布以隐私守门为先：公开是经过确认的动作，不是内容存在后的默认状态。AI 摘要、私密内容、vault 原文和家庭类信息不能自动进入公开世界。
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {r8PrivacyReleaseGuard.rules.map((rule) => (
          <article key={rule.id} className="rounded-2xl border border-amber-100 bg-white/70 p-4">
            <p className="text-sm font-semibold text-amber-950">{rule.severity} · {rule.id}</p>
            <p className="mt-2 text-sm leading-6 text-amber-900">{rule.rule}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-white/70 p-4 text-sm text-amber-900">高优先级风险：{risks.map((risk) => risk.id).join(' / ')}</div>
    </section>
  )
}
