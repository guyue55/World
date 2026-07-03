import { v7V8Handoff } from '@/features/v7-release-ops'

export function V7HandoffPanel() {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
      <p className="text-sm tracking-[0.28em] text-moss">HANDOFF</p>
      <h2 className="mt-2 text-3xl font-semibold">V8 真实生产运维交接</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/70 p-4">
          <p className="font-medium">V8 Focus</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
            {v7V8Handoff.v8Focus.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white/70 p-4">
          <p className="font-medium">Carry Forward</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
            {v7V8Handoff.carryForward.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
