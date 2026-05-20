import { getPhaseSevenSeoAnalyticsPlan } from '@/lib/phase-seven-release'

export function SeoAnalyticsPanel() {
  const plan = getPhaseSevenSeoAnalyticsPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">SEO 与访问分析计划</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">SEO 检查</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {plan.seoChecks.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink/55">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">访问分析</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {plan.analyticsPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink/55">{item.mode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
