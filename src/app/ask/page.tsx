import Link from 'next/link'
import { getAllPaths } from '@/lib/paths'
import { getPublicNodes } from '@/lib/nodes'
import { getLighthouseRecommendedNodes, getLighthouseRecommendedPaths } from '@/lib/lighthouse'
import { buildLighthouseConsoleSurface } from '@/lib/public-world-surfaces'
import { runLowLightLighthouse } from '@/server/ai/lighthouse-runtime'
import { createPageMetadata } from '@/lib/metadata'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { PublicLighthouseConsole } from '@/components/ask/PublicLighthouseConsole'
import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'

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
  const lighthouseSurface = buildLighthouseConsoleSurface({
    questions: guideQuestions,
    paths: recommendedPaths,
    nodes: recommendedNodes,
  })
  const lighthouseRuntime = runLowLightLighthouse('我第一次来到古月浮屿，下一步去哪？')

  return (
    <main className="world-container space-y-10 py-16">
      <SceneWorldPortal
        scene="lighthouse"
        eyebrow="LIGHTHOUSE · 低光灯塔"
        title="灯塔只照路，不替你改写世界。"
        description="这里读取公开索引，解释你在哪里、能去哪、下一步看什么。它不会修改节点，不读取私密层，也不会绕过后端权限。"
        objects={['灯塔', '光束', '问路', '路径', '边界', '公开索引']}
        primaryAction={{ href: '/atlas', label: '打开世界地图' }}
        secondaryActions={[
          { href: '/paths', label: '进入精选路径' },
          { href: '/archive', label: '查找公开节点' },
        ]}
        stats={[
          { label: '推荐路径', value: recommendedPaths.length, note: '来自公开路径索引' },
          { label: '推荐节点', value: recommendedNodes.length, note: '只读公开节点' },
          { label: '权限边界', value: '只读', note: '后端守门，前端体现' },
        ]}
      />

      <ProductRouteGuide
        current="AI 灯塔"
        description="灯塔当前以低光模式运行：只读公开索引，只做导览和路径推荐，不修改节点、不写入数据、不读取私密内容。"
        primaryHref="/atlas"
        primaryLabel="打开世界地图"
      />

      <PublicLighthouseConsole surface={lighthouseSurface} runtimeResponse={lighthouseRuntime} />

      <section className="grid gap-4 md:grid-cols-3">
        {guideQuestions.map((question) => (
          <article key={question.title} className="rounded-[1.6rem] border border-white/65 bg-white/76 p-6 shadow-soft backdrop-blur">
            <h2 className="break-words text-2xl font-semibold text-ink">{question.title}</h2>
            <p className="mt-3 break-words text-sm leading-7 text-ink/64">{question.answer}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">PATHS</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">推荐路径</h2>
          <div className="mt-6 space-y-3">
            {recommendedPaths.map((path) => (
              <Link key={path.id} href={`/paths/${path.id}`} className="min-w-0 block rounded-2xl bg-paper/65 p-4 transition hover:bg-white">
                <span className="truncate font-semibold text-ink block">{path.title}</span>
                <span className="mt-1 block line-clamp-2 text-sm leading-6 text-ink/60">{path.description}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">NODES</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">可以先看的节点</h2>
          <div className="mt-6 space-y-3">
            {recommendedNodes.map((node) => (
              <Link key={node.id} href={`/node/${node.slug}`} className="min-w-0 block rounded-2xl bg-paper/65 p-4 transition hover:bg-white">
                <span className="truncate font-semibold text-ink block">{node.worldTitle ?? node.title}</span>
                <span className="mt-1 block line-clamp-2 text-sm leading-6 text-ink/60">{node.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
