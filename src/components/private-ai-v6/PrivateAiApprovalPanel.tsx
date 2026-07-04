import { getV6AiApprovalItems } from '@/features/private-ai-v6'

export function PrivateAiApprovalPanel() {
  const items = getV6AiApprovalItems()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">APPROVAL QUEUE</p>
      <h2 className="mt-3 text-3xl font-semibold">人工审批队列</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.risk} · {item.status}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/60">类型：{item.kind}</p>
            <p className="mt-2 text-sm leading-7 text-ink/60">来源：{item.source}</p>
            <p className="mt-2 text-sm leading-7 text-ink/60">自动执行：{String(item.allowedExecution)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
