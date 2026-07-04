import { getCollectionItems, realContentCollections } from '@/features/real-content-v5'

export function RealContentCollectionBoard() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {realContentCollections.map((collection) => (
        <article key={collection.id} className="rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-soft">
          <p className="text-xs tracking-[0.28em] text-moss">{collection.purpose}</p>
          <h3 className="mt-3 text-xl font-semibold">{collection.title}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/65">{collection.description}</p>
          <p className="mt-4 text-xs text-ink/45">items: {getCollectionItems(collection).length}</p>
        </article>
      ))}
    </section>
  )
}
