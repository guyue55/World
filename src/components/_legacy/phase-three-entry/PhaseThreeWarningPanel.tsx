import { getPhaseThreeEntryHubContract } from '@/lib/phase-three-entry-hub'

export function PhaseThreeWarningPanel() {
  const hub = getPhaseThreeEntryHubContract()

  return (
    <section className="rounded-world border border-amber-200 bg-amber-50/80 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold text-amber-950">发布边界提醒</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-900">
        {hub.warnings.map((warning) => <li key={warning}>- {warning}</li>)}
      </ul>
    </section>
  )
}
