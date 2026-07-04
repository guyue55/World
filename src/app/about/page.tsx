import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '关于古月',
  description: '了解古月浮屿的造物主、世界方向与进入方式。',
  path: '/about',
})

const directions = [
  {
    title: '进入世界地图',
    description: '从 Atlas 理解技术、产品、记忆、档案与灯塔之间的关系。',
    href: '/atlas',
  },
  {
    title: '阅读世界宣言',
    description: '查看古月浮屿的世界法则、AI 边界与公开/私密分层。',
    href: '/manifesto',
  },
  {
    title: '沿时间河前行',
    description: '从版本、节点和世界事件里观察这个世界如何生长。',
    href: '/timeline',
  },
]

export default function AboutPage() {
  return (
    <main className="reading-container space-y-10 py-16">
      <header className="space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">ABOUT</p>
        <h1 className="text-5xl font-semibold">关于古月</h1>
        <p className="max-w-3xl text-lg leading-9 text-ink/75">
          这里不是一份传统简历，而是说明古月浮屿从哪里来、为什么被建造，以及旅人可以如何进入。
        </p>
      </header>

      <section className="rounded-world border border-ink/10 bg-white/55 p-6 leading-8 shadow-soft md:p-8">
        <p>
          古月浮屿是一个长期生长的个人数字世界。它收纳技术实践、产品想法、灵感碎片、生活光影与未来记忆。
        </p>
        <p className="mt-4">
          AI 可以辅助照亮路径，但不能替代造物主选择方向。公开层展示温度，私密层保存完整。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {directions.map((direction) => (
          <Link
            key={direction.href}
            href={direction.href}
            className="rounded-[1.5rem] border border-white/60 bg-sand/55 p-5 shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
          >
            <p className="text-lg font-semibold text-ink">{direction.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{direction.description}</p>
          </Link>
        ))}
      </section>

      <Link className="underline" href="/atlas">返回世界地图</Link>
    </main>
  )
}
