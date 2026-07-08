import { contentSeeds } from '@/features/_legacy/content-ingestion'
import { resolveAssetsForSeed } from '@/features/_legacy/asset-library/resolver'

export function ContentNodeField() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/75 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">CONTENT NODE FIELD</p>
      <h2 className="mt-3 text-3xl font-semibold">内容节点场，而不是文章卡片列表</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contentSeeds.map((seed) => {
          const assets = resolveAssetsForSeed(seed.id)
          return (
            <a key={seed.id} href="/content-studio" className="rounded-[2rem] border border-white/60 bg-sand/55 p-5 transition hover:-translate-y-1 hover:bg-white/80">
              <p className="text-xs tracking-[0.28em] text-moss">{seed.type} · {seed.channel}</p>
              <h3 className="mt-3 text-xl font-semibold">{seed.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{seed.summary}</p>
              <p className="mt-4 text-xs text-ink/45">assets: {assets.length} · visibility: {seed.visibility}</p>
            </a>
          )
        })}
      </div>
    </section>
  )
}
