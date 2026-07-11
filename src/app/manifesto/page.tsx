import Link from 'next/link'
import { ManifestoDynamicHero } from '@/components/manifesto/ManifestoDynamicHero'
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
      <nav aria-label="宪章页出口" className="flex gap-3 text-sm"><Link href="/">返回入口</Link><Link href="/atlas">回到星图</Link></nav>
      <ManifestoDynamicHero surface={surface} />
    </main>
  )
}
