import { getTimeCapsuleAnnualBookPlan } from '@/lib/phase-five-inheritance'

export function AnnualWorldBookPanel() {
  const plan = getTimeCapsuleAnnualBookPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">ANNUAL BOOK</p>
      <h2 className="mt-3 text-3xl font-semibold">{plan.annualWorldBook.title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {plan.annualWorldBook.sections.map((section) => (
          <div key={section} className="rounded-2xl bg-paper/70 p-4 text-sm font-semibold text-ink/70">
            {section}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink/55">本阶段只建立年度世界册结构，不自动打包私密内容。</p>
    </section>
  )
}
