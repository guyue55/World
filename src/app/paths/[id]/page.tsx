import { notFound } from 'next/navigation'
import { getAllPaths, getPathById } from '@/lib/paths'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { PathProgress } from '@/components/paths/PathProgress'
import { createPageMetadata } from '@/lib/metadata'
import { getNextPaths, getPathNodes } from '@/lib/path-guidance'
import { getAllAreas } from '@/lib/areas'
import { buildPathJourneySurface } from '@/lib/public-world-surfaces'
import { PathDetailHero } from '@/components/paths/PathDetailHero'
import { PathJourneyBoard } from '@/components/paths/PathJourneyBoard'
import { PathNodeSequence } from '@/components/paths/PathNodeSequence'
import { PathNextSteps } from '@/components/paths/PathNextSteps'
import { SceneProductionFrame } from '@/components/world/SceneProductionFrame'

export const dynamicParams = true

type PathPageParams = {
  id: string
}

export function generateStaticParams() {
  // getAllPaths 已在 src/lib/paths.ts 层内做公开性过滤，此处不再重复权限判断
  return getAllPaths().map((path) => ({ id: path.id }))
}

export async function generateMetadata({ params }: { params: Promise<PathPageParams> }) {
  const { id } = await params
  const path = getPathById(id)
  if (!path) return createPageMetadata({ title: '路径不存在', path: '/paths' })

  return createPageMetadata({
    title: path.title,
    description: path.description,
    path: `/paths/${path.id}`,
  })
}

export default async function PathDetailPage({ params }: { params: Promise<PathPageParams> }) {
  const { id } = await params
  const path = getPathById(id)
  // 权限过滤集中在 src/lib/paths.ts；此处只处理"路径不存在"的公开侧兜底
  if (!path) notFound()

  const nodes = getPathNodes(path)
  const nextPaths = getNextPaths(path)
  const journeySurface = buildPathJourneySurface(path, nodes, nextPaths, getAllAreas())

  return (
    <main className="world-container grid gap-10 py-16 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="space-y-10">
        <Breadcrumbs items={[{ label: '古月浮屿', href: '/' }, { label: '精选路径', href: '/paths' }, { label: path.title }]} />
        <PathDetailHero path={path} nodeCount={nodes.length} />
        <SceneProductionFrame
          sceneId="path-detail"
          eyebrow="PATH · 旅程路线"
          title="这条路径是一段可以完成的旅程。"
          description={`当前路线包含 ${nodes.length} 个公开节点，目标是把分散内容组织成起点、途中站和抵达后的下一步。`}
          motionLabel="路径动效只表达进度、下一站和抵达提示；不会阻塞节点阅读。"
          fallback="reduced-motion 下直接显示步骤序列、预计时间、下一站和返回星图。"
          evidence="路径详情纳入 Scene QA 的 path-detail 路由，验证身份带、路径进度、节点序列和出口。"
          actions={[
            { href: nodes[0] ? `/node/${nodes[0].slug}` : '/archive', label: '进入第一站', description: nodes[0]?.worldTitle ?? nodes[0]?.title, tone: 'primary' },
            { href: '/atlas', label: '回到星图', description: '从空间层重新定位' },
            { href: '/timeline', label: '转入时间河', description: '把旅程放回时间中' },
          ]}
        />
        <PathJourneyBoard surface={journeySurface} />
        <PathNodeSequence nodes={nodes} />
        <PathNextSteps nextPaths={nextPaths} />
      </section>

      <aside className="xl:sticky xl:top-24 xl:self-start">
        <PathProgress nodes={nodes} pathId={path.id} />
      </aside>
    </main>
  )
}
