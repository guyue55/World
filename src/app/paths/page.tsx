import { PathsOverviewStage } from '@/components/paths/JourneyRouteStage'
import { createPageMetadata } from '@/lib/metadata'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildPathsOverviewModel } from '@/lib/scenes/build-path-model'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const model = buildPathsOverviewModel(getPublicWorldObjectIndex())
  return <main><PathsOverviewStage model={model} /></main>
}
