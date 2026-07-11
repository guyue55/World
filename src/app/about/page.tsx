import Link from 'next/link'
import { AboutDynamicHero } from '@/components/about/AboutDynamicHero'
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
      <nav aria-label="关于页出口" className="flex gap-3 text-sm"><Link href="/">返回入口</Link><Link href="/atlas">打开星图</Link></nav>
      <AboutDynamicHero surface={surface} />
    </main>
  )
}
