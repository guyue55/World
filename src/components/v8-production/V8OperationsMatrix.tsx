import { v8DeploymentPipeline, v8ObservabilityMatrix } from '@/features/v8-production-ops'

export function V8OperationsMatrix() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-[2.5rem] border border-white/60 bg-white/75 p-8 shadow-soft">
        <p className="text-sm tracking-[0.36em] text-moss">DEPLOYMENT</p>
        <h2 className="mt-3 text-3xl font-semibold">真实部署流水线</h2>
        <div className="mt-6 space-y-3">
          {v8DeploymentPipeline.steps.map((step) => (
            <div key={step.id} className="rounded-3xl bg-white/70 p-4">
              <p className="font-medium">{step.name}</p>
              <p className="mt-1 text-sm text-ink/60">{step.command}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="rounded-[2.5rem] border border-white/60 bg-white/75 p-8 shadow-soft">
        <p className="text-sm tracking-[0.36em] text-moss">OBSERVABILITY</p>
        <h2 className="mt-3 text-3xl font-semibold">生产观测矩阵</h2>
        <div className="mt-6 space-y-3">
          {v8ObservabilityMatrix.signals.map((signal) => (
            <div key={signal.id} className="rounded-3xl bg-white/70 p-4">
              <p className="font-medium">{signal.target}</p>
              <p className="mt-1 text-sm text-ink/60">{signal.source} · {signal.severity}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
