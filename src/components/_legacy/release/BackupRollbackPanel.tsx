import { getPhaseSevenBackupRollbackPlan } from '@/lib/phase-seven-operations'

export function BackupRollbackPanel() {
  const plan = getPhaseSevenBackupRollbackPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">备份恢复与回滚预案</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">备份目标</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {plan.backupTargets.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink/55">{item.method} · {item.frequency}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">回滚步骤</h3>
          <ol className="mt-4 space-y-2 text-sm leading-7 text-ink/65">
            {plan.rollbackSteps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
