import { evaluateWorldKernel } from '@/lib/world-kernel'

export function WorldKernelPanel() {
  const report = evaluateWorldKernel()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">WORLD KERNEL</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">世界内核总检</h2>
          <p className="mt-3 leading-8 text-ink/70">
            内核不负责华丽，内核负责世界能长期成立。
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink/50">Kernel Score</p>
          <p className="text-5xl font-semibold">{report.score}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">阻断错误</p>
          <p className="mt-2 text-3xl font-semibold">{report.blockingErrors}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">警告</p>
          <p className="mt-2 text-3xl font-semibold">{report.warnings}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">不变量</p>
          <p className="mt-2 text-3xl font-semibold">
            {report.checks.invariants.filter((item) => item.passed).length}/{report.checks.invariants.length}
          </p>
        </div>
      </div>

      {report.issues.length > 0 && (
        <div className="mt-6 space-y-2">
          {report.issues.slice(0, 6).map((issue) => (
            <div key={issue.id} className="rounded-xl bg-paper/70 px-4 py-3 text-sm">
              [{issue.severity}] {issue.message}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
