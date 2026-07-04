import { v10FinalManifest, v10GovernanceSovereignty } from '@/features/v10-intelligent-world'

export function V10FinalManifestPanel() {
  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-ink p-8 text-cream shadow-soft">
      <p className="text-sm tracking-[0.32em] text-cream/60">TEN ROUND CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">{v10FinalManifest.name}</h2>
      <p className="mt-4 max-w-4xl leading-8 text-cream/75">{v10FinalManifest.conclusion}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {v10GovernanceSovereignty.principles.map((principle) => (
          <span key={principle} className="rounded-2xl bg-white/10 px-4 py-3 text-sm">{principle}</span>
        ))}
      </div>
    </section>
  )
}
