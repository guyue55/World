import { getAllPaths } from '@/lib/paths'
import { PathTabs } from '@/components/paths/PathTabs'
import { PathHero } from '@/components/paths/PathHero'
import { createPageMetadata } from '@/lib/metadata'
import { getRecommendedPathOrder } from '@/lib/path-guidance'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const paths = getRecommendedPathOrder(getAllPaths())

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="精选路径"
        description="这里把节点排成可理解的行走路线。路径不是分类，而是降低进入门槛的导游层。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />
      <PathHero paths={paths} />

      <section className="grid gap-4 rounded-[2rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur md:grid-cols-3 md:p-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-moss">入口</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">先走一条路</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">第一次进入不需要理解全部宇宙，先沿一条公开路径走完即可。</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-moss">边界</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">只含公开节点</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">路径只读取已审查的公开内容，不把私密层、家庭层或保险箱内容带到前台。</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-moss">回路</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">看完仍能继续</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">每条路径都能回到地图、进入档案馆，或继续沿相关路径探索。</p>
        </div>
      </section>

      <PathTabs paths={paths} />
    </main>
  )
}
