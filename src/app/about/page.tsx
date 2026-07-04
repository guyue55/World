import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import Link from 'next/link'
import { DynamicScenePrelude, WorldActionRituals } from '@/components/r8-full-dynamic-world'
import { createPageMetadata } from '@/lib/metadata'
import { LivingUniverseSection } from '@/components/r8-living-universe'

export const metadata = createPageMetadata({
  title: '关于古月',
  description: '了解古月浮屿的造物主、世界方向与进入方式。',
  path: '/about',
})

export default function AboutPage() {
  return (
    <main className="reading-container space-y-8 py-16">
      <LivingUniverseSection />
      <DynamicScenePrelude label="CREATOR ORIGIN" title="造物主不是简历，而是世界的原点。" description="这个页面从静态关于我升级为可抵达的身份场景：它说明古月浮屿为什么存在、如何被创造，以及旅人下一步可以去哪里。" primaryHref="/manifesto" primaryLabel="阅读世界宣言" secondaryHref="/atlas" secondaryLabel="打开星图" objects={['书桌', '灯', '手稿', '侧影']} />
      <p className="text-sm tracking-[0.35em] text-moss">ABOUT</p>
      <h1 className="text-5xl font-semibold">关于古月</h1>
      <p className="text-lg leading-9 text-ink/75">
        这里不是一份传统简历，而是说明这个世界从哪里来、为什么被建造，以及旅人可以如何进入。
      </p>
      <div className="rounded-world border border-ink/10 bg-white/45 p-6 leading-8">
        <p>
          古月浮屿是一个长期生长的个人数字世界。它收纳技术实践、产品想法、灵感碎片、生活光影与未来记忆。
        </p>
        <p className="mt-4">
          AI 可以辅助照亮路径，但不能替代造物主选择方向。
        </p>
      </div>
      <WorldActionRituals />
      <Link className="underline" href="/atlas">返回世界地图</Link>
    </main>
  )
}
