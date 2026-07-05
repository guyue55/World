import { ManifestoDynamicHero } from '@/components/manifesto/ManifestoDynamicHero'
import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { createPageMetadata } from '@/lib/metadata'
import { buildManifestoDynamicSurface } from '@/lib/public-world-surfaces'

export const metadata = createPageMetadata({
  title: '世界宣言',
  description: '古月浮屿的世界法则：AI 是灯塔，不是太阳；公开层不是完整世界。',
  path: '/manifesto',
})

export default function ManifestoPage() {
  const surface = buildManifestoDynamicSurface()

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="世界宪章"
        description="这里记录古月浮屿的稳定法则。浪漫表达之下必须有清晰的数据、权限、路由和 AI 边界。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />
      <ManifestoDynamicHero surface={surface} />
    </main>
  )
}
