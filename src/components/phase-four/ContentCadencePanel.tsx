import { getPhaseFourContentProgram } from '@/lib/phase-four-content'

export function ContentCadencePanel() {
  const program = getPhaseFourContentProgram()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">首月运营节奏</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {program.firstMonthCadence.map((item) => (
          <div key={item.week} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.week}</p>
            <h3 className="mt-3 font-semibold">{item.focus}</h3>
            <p className="mt-2 text-sm leading-7 text-ink/60">{item.output}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
