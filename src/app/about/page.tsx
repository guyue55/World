import { AboutDynamicHero } from '@/components/about/AboutDynamicHero'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { createPageMetadata } from '@/lib/metadata'
import { buildAboutDynamicSurface } from '@/lib/public-world-surfaces'

export const metadata = createPageMetadata({
  title: '关于古月',
  description: '了解古月浮屿的造物主、世界方向与进入方式。',
  path: '/about',
})

export default function AboutPage() {
  const surface = buildAboutDynamicSurface()

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="关于古月"
        description="这里是公开世界的现实解释：说明这个世界为什么被建造、能从哪里开始，以及哪些边界不会被越过。"
        primaryHref="/atlas"
        primaryLabel="打开世界地图"
      />
      <AboutDynamicHero surface={surface} />
    </main>
  )
}
