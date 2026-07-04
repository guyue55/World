import { getAllPaths } from '@/lib/paths'
import { PathTabs } from '@/components/paths/PathTabs'
import { PathHero } from '@/components/paths/PathHero'
import { createPageMetadata } from '@/lib/metadata'
import { getRecommendedPathOrder } from '@/lib/path-guidance'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const paths = getRecommendedPathOrder(getAllPaths())

  return (
    <main className="world-container space-y-10 py-16">
      <PathHero paths={paths} />
      <PathTabs paths={paths} />
    </main>
  )
}
