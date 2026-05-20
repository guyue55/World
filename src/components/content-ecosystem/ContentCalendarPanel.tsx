import { getContentCalendarPlan } from '@/lib/phase-nine-content'

export function ContentCalendarPanel() {
  const calendar = getContentCalendarPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">内容日历</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {calendar.monthlyPlan.map((item) => (
          <article key={item.week} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.week}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.focus}</h3>
            <p className="mt-3 text-sm text-ink/60">{item.deliverable}</p>
            <p className="mt-2 text-sm text-ink/60">review: {String(item.humanReviewRequired)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
