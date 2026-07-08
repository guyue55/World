import { lighthouseSuggestions } from '@/features/_legacy/experience-realization'

export function LighthouseQueue() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {lighthouseSuggestions.map((suggestion) => (
        <article key={suggestion.title} className="rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-soft">
          <p className="text-xs tracking-[0.32em] text-moss">AI LIGHTHOUSE · {suggestion.risk.toUpperCase()}</p>
          <h3 className="mt-3 text-2xl font-semibold">{suggestion.title}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/65">{suggestion.description}</p>
          <p className="mt-4 rounded-full bg-moss/10 px-4 py-2 text-sm text-moss">{suggestion.status}</p>
        </article>
      ))}
    </div>
  )
}
