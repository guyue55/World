import { getLintExecutionReadiness } from '@/lib/acceptance-readiness'

export function LintReadinessPanel() {
  const readiness = getLintExecutionReadiness()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">LINT</p>
      <h2 className="mt-3 text-3xl font-semibold">lint 执行状态</h2>
      <p className="mt-3 leading-8 text-ink/70">
        lint 必须真实执行；当前工作区若缺少 node_modules，只能记录为等待真实依赖安装，不能记录为通过。
      </p>
      <div className="mt-5 rounded-2xl bg-paper/70 p-5">
        <p className="text-sm text-ink/50">必要命令</p>
        <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">{readiness.requiredCommand}</code>
        <p className="mt-4 text-sm text-ink/60">当前状态：{readiness.currentStatus}</p>
      </div>
          <div className="mt-4 rounded-2xl bg-paper/70 p-5">
        <p className="text-sm text-ink/50">环境诊断</p>
        <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">npm run check:lint-env</code>
      </div>
    </section>
  )
}
