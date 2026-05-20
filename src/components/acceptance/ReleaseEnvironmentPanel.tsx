import { getReleaseConfig, getReleaseEnvironmentSummary } from '@/lib/release-environment'

export function ReleaseEnvironmentPanel() {
  const config = getReleaseConfig()
  const summary = getReleaseEnvironmentSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">DEPLOY ENVIRONMENT</p>
      <h2 className="mt-3 text-3xl font-semibold">发布环境配置</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        部署配置必须把公开边界、预览 URL、构建命令、环境变量和回滚入口写清楚。
        当前配置结构已就绪，但生产平台绑定仍需真实执行。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">平台</p><p className="mt-2 text-2xl font-semibold">{summary.platformTargets}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">环境变量</p><p className="mt-2 text-2xl font-semibold">{summary.environmentVariables}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">公开边界</p><p className="mt-2 text-2xl font-semibold">{summary.publicBoundaryRules}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">回滚规则</p><p className="mt-2 text-2xl font-semibold">{summary.rollbackRules}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">推广</p><p className="mt-2 text-sm font-semibold">{summary.promotionStatus}</p></div>
      </div>
      <div className="mt-6 rounded-2xl bg-paper/70 p-5">
        <p className="text-sm text-ink/50">构建命令</p>
        <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">{config.build.buildCommand}</code>
      </div>
    </section>
  )
}
