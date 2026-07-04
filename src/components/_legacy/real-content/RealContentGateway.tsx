import { getPublicRealContentItems } from '@/features/real-content-v5'

export function RealContentGateway() {
  const items = getPublicRealContentItems()
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">V5 REAL CONTENT</p>
      <h2 className="mt-3 text-3xl font-semibold">真实内容进入世界</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/65">
        V4 让世界像世界，V5 开始把文章、项目、生活记录和脱敏记忆放入世界节点。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-[2rem] border border-white/60 bg-sand/60 p-5">
            <p className="text-xs tracking-[0.28em] text-moss">{item.kind} · {item.domain}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-ink/50">{item.subtitle}</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
