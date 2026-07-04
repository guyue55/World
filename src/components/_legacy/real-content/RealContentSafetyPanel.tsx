import { getRealContentSafetyIssues, isV5ContentLocallyReady } from '@/features/real-content-v5'

export function RealContentSafetyPanel() {
  const issues = getRealContentSafetyIssues()
  return (
    <section className="rounded-[3rem] border border-white/50 bg-ink p-6 text-white shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-white/45">CONTENT SAFETY</p>
      <h2 className="mt-3 text-3xl font-semibold">内容安全审查</h2>
      <p className="mt-4 text-sm leading-7 text-white/62">localReady: {isV5ContentLocallyReady() ? 'true' : 'false'} · issues: {issues.length}</p>
      <div className="mt-6 grid gap-3">
        {issues.length === 0 ? (
          <p className="rounded-[2rem] border border-white/15 bg-white/10 p-4 text-sm text-white/62">未发现私密原始内容信号或断裂引用。</p>
        ) : issues.map((issue) => (
          <p key={issue} className="rounded-[2rem] border border-white/15 bg-white/10 p-4 text-sm text-white/62">{issue}</p>
        ))}
      </div>
    </section>
  )
}
