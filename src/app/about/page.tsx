import Link from 'next/link'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '关于古月',
  description: '了解古月浮屿的造物主、世界方向与进入方式。',
  path: '/about',
})

const identityCards = [
  {
    title: '这里不是简历页',
    body: '它解释古月浮屿为什么存在：把技术、产品、灵感、生活与记忆安放到一个可长期维护的个人数字世界。',
  },
  {
    title: 'AI 是灯塔，不是太阳',
    body: 'AI 可以导览、整理和提出建议，但不替造物主决定公开、删除、权限或意义。',
  },
  {
    title: '公开层不是完整世界',
    body: '访客看到的是精选世界。私密、家庭、保险箱和沉默内容不会进入公开索引。',
  },
]

export default function AboutPage() {
  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="关于古月"
        description="这里是公开世界的现实解释：说明这个世界为什么被建造、能从哪里开始，以及哪些边界不会被越过。"
        primaryHref="/atlas"
        primaryLabel="打开世界地图"
      />

      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/65 bg-white/76 p-8 shadow-soft backdrop-blur md:p-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lake/18 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">ABOUT</p>
          <h1 className="text-5xl font-semibold leading-tight text-ink md:text-6xl">造物主不是简历，而是世界的原点。</h1>
          <p className="text-lg leading-9 text-ink/72">
            古月浮屿是一座持续生长的个人数字世界。它对外是可探索的公开前厅，对内是创世台，对未来是档案，对 AI 是可读、可审计、可边界化协作的世界协议。
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {identityCards.map((card) => (
          <article key={card.title} className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur">
            <h2 className="text-2xl font-semibold text-ink">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/64">{card.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/65 bg-night p-7 text-paper shadow-soft md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-gold">继续路径</p>
        <h2 className="mt-3 text-3xl font-semibold">第一次来，可以先走一条清晰路径。</h2>
        <p className="mt-3 max-w-3xl leading-8 text-paper/68">
          不需要一次理解全部宇宙。先从世界地图、时间流或宪章开始，再进入具体节点。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/atlas" className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5">进入地图</Link>
          <Link href="/paths" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-white/10">查看路径</Link>
          <Link href="/manifesto" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper/80 transition hover:-translate-y-0.5 hover:bg-white/10">阅读宪章</Link>
        </div>
      </section>
    </main>
  )
}
