import { r5GuidedQuestions } from '@/features/r5-ai-lighthouse'

export function R5QuestionGuide() {
  return (
    <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/60 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Guided Questions</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">无 AI 时也能工作的导览问题</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {r5GuidedQuestions.map((question) => (
          <article key={question.id} className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-cyan-700">{question.answerMode}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950">{question.question}</h3>
            <p className="mt-3 leading-7 text-slate-600">{question.fallback}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
