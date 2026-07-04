import { getPrivateArchiveIndex } from '@/lib/private-archive'

export function PrivateArchivePlaceholderGrid() {
  const items = getPrivateArchiveIndex()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">档案占位索引</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.tier} · {item.kind}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/65">{item.description}</p>
            <p className="mt-4 text-xs text-ink/50">contentStored: {String(item.contentStored)} · publicBuild: {item.publicBuild}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
