import { getEvidenceDashboardCommands } from '@/lib/evidence-dashboard'

export function EvidenceCommandPanel() {
  const commands = getEvidenceDashboardCommands()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">真实环境建议执行顺序</h2>
      <div className="mt-5 space-y-3">
        {commands.map((command, index) => (
          <div key={command} className="rounded-2xl bg-ink/5 px-4 py-3 font-mono text-sm">
            {index + 1}. {command}
          </div>
        ))}
      </div>
    </section>
  )
}
