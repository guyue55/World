import Link from 'next/link'
import { getAllPaths } from '@/lib/paths'
import { getPublicNodes } from '@/lib/nodes'
import { getLighthouseRecommendedNodes, getLighthouseRecommendedPaths } from '@/lib/lighthouse'
import { createPageMetadata } from '@/lib/metadata'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'

export const metadata = createPageMetadata({
  title: 'AI 灯塔',
  description: '古月浮屿的低光导览：回答我在哪、能去哪、下一步看什么。',
  path: '/ask',
})

const guideQuestions = [
  {
    title: '我在哪？',
    answer: '你位于古月浮屿的公开世界层。这里可以进入地图、时间流、档案馆，也可以沿精选路径慢慢探索。',
  },
  {
    title: '我能去哪？',
    answer: '第一次来建议进入世界地图；想看变化就去时间流；想快速查找就进档案馆。',
  },
  {
    title: '推荐路径',
    answer: '从“第一次来到古月浮屿”开始，再进入“技术与 AI 探索路径”或“这个世界如何被创造”。',
  },
]

export default function AskPage() {
  const paths = getAllPaths()
  const nodes = getPublicNodes()
  const recommendedNodes = getLighthouseRecommendedNodes(nodes).slice(0, 4)
  const recommendedPaths = getLighthouseRecommendedPaths(paths).slice(0, 3)

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="AI 灯塔"
        description="灯塔当前以低光模式运行：只读公开索引，只做导览和路径推荐，不修改节点、不写入数据、不读取私密内容。"
        primaryHref="/atlas"
        primaryLabel="打开世界地图"
      />

      <section className="relative overflow-hidden rounded-[2.2rem] border border-white/65 bg-night p-8 text-paper shadow-soft md:p-10">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-gold/18 blur-3xl" />
        <div className="relative max-w-4xl">
          <p className="text-sm tracking-[0.35em] text-gold">LIGHTHOUSE</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">灯塔不是太阳</h1>
          <p className="mt-5 text-lg leading-9 text-paper/75">
            它只负责照亮路径：解释当前位置、推荐下一步、把访问者带回世界地图。
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {guideQuestions.map((question) => (
          <article key={question.title} className="rounded-[1.6rem] border border-white/65 bg-white/76 p-6 shadow-soft backdrop-blur">
            <h2 className="text-2xl font-semibold text-ink">{question.title}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/64">{question.answer}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">PATHS</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">推荐路径</h2>
          <div className="mt-6 space-y-3">
            {recommendedPaths.map((path) => (
              <Link key={path.id} href={`/paths/${path.id}`} className="block rounded-2xl bg-paper/65 p-4 transition hover:bg-white">
                <span className="font-semibold text-ink">{path.title}</span>
                <span className="mt-1 block text-sm leading-6 text-ink/60">{path.description}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">NODES</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">可以先看的节点</h2>
          <div className="mt-6 space-y-3">
            {recommendedNodes.map((node) => (
              <Link key={node.id} href={`/node/${node.slug}`} className="block rounded-2xl bg-paper/65 p-4 transition hover:bg-white">
                <span className="font-semibold text-ink">{node.worldTitle ?? node.title}</span>
                <span className="mt-1 block text-sm leading-6 text-ink/60">{node.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
