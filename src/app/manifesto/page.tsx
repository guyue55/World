import Link from 'next/link'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '世界宣言',
  description: '古月浮屿的世界法则：AI 是灯塔，不是太阳；公开层不是完整世界。',
  path: '/manifesto',
})

const rules = [
  {
    title: 'AI 是灯塔，不是太阳',
    description: 'AI 只照亮路径、整理线索、提出建议；不自动发布、不删除、不越权读取私密内容。',
  },
  {
    title: '公开层不是完整世界',
    description: '访客看到的是精选前厅。私密、家庭、保险箱和沉默内容不会进入公开索引。',
  },
  {
    title: '入口清澈，深处浩瀚',
    description: '首页只给少数清晰路径，复杂性放在可探索的深处，而不是压到第一屏。',
  },
  {
    title: '前台浪漫，后台清醒，档案可靠',
    description: '世界语言负责体验，现实解释负责理解，稳定数据协议负责长期保存和迁移。',
  },
  {
    title: '世界为生活服务',
    description: '它允许低光、静默、修复和复活，不用更新压力反过来支配生活。',
  },
]

export default function ManifestoPage() {
  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="世界宪章"
        description="这里记录古月浮屿的稳定法则。浪漫表达之下必须有清晰的数据、权限、路由和 AI 边界。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />

      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/65 bg-night p-8 text-paper shadow-soft md:p-10">
        <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-gold/18 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="text-xs font-semibold tracking-[0.35em] text-gold">MANIFESTO</p>
          <h1 className="break-words text-5xl font-semibold leading-tight md:text-6xl">世界宣言</h1>
          <p className="break-words text-lg leading-9 text-paper/72">
            古月浮屿不是公共多人 3D 元宇宙，也不是虚拟经济空间。它是一个以内容为节点、以时间为河流、以权限为边界、以 AI 为灯塔的个人数字世界。
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {rules.map((rule) => (
          <article key={rule.title} className="rounded-[1.6rem] border border-white/65 bg-white/76 p-6 shadow-soft backdrop-blur">
            <h2 className="break-words text-2xl font-semibold text-ink">{rule.title}</h2>
            <p className="mt-3 break-words text-sm leading-7 text-ink/64">{rule.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-moss">一句话</p>
        <p className="mt-3 break-words text-2xl font-semibold leading-relaxed text-ink">
          以内容为星体，以区域为空间，以关系为星线，以时间为河流，以权限为边界，以规则为自然法则。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/about" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5">了解古月</Link>
          <Link href="/paths" className="rounded-full border border-ink/10 bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5">沿路径进入</Link>
          <Link href="/ask" className="rounded-full border border-ink/10 bg-white/45 px-5 py-3 text-sm font-semibold text-ink/70 transition hover:-translate-y-0.5">点亮灯塔</Link>
        </div>
      </section>
    </main>
  )
}
