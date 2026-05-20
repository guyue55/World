import { getIntelligentOperationsFeedbackLoop } from '@/lib/phase-ten-quality'

export function OpsFeedbackLoopPanel() {
  const loop = getIntelligentOperationsFeedbackLoop()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">智能运营反馈闭环</h2>
      <p className="mt-2 text-sm text-ink/55">loopReady: {String(loop.loopReady)}</p>
      <ol className="mt-5 grid gap-3 md:grid-cols-3">
        {loop.steps.map((step) => (
          <li key={step} className="rounded-2xl bg-paper/70 p-4 text-sm leading-7 text-ink/70">• {step}</li>
        ))}
      </ol>
    </section>
  )
}
