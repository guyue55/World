import { getPhaseThreeEntryHubContract } from '@/lib/phase-three-entry-hub'

export function PhaseThreeEntryGrid() {
  const hub = getPhaseThreeEntryHubContract()

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {hub.entries.map((entry) => (
        <a key={entry.route} href={entry.route} className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft transition hover:-translate-y-0.5 hover:bg-white">
          <p className="text-xs uppercase tracking-[0.25em] text-moss">static prototype</p>
          <h2 className="mt-4 text-2xl font-semibold">{entry.title}</h2>
          <p className="mt-3 leading-7 text-ink/65">{entry.description}</p>
          <p className="mt-5 text-sm font-semibold text-moss">{entry.route}</p>
        </a>
      ))}
    </section>
  )
}
