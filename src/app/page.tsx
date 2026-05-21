import { CelestialPanel } from '@/components/experience/CelestialPanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { FloatingLayer } from '@/components/visual/FloatingLayer'
import { WorldGatewayHero } from '@/components/visual/WorldGatewayHero'
import { experienceNodes } from '@/features/experience-realization'

export default function HomePage() {
  return (
    <ResponsivePageShell>
      <WorldGatewayHero />
      <FloatingLayer eyebrow="WORLD ENTRY" title="从入口进入一座可生长的个人宇宙" description="首页是世界地图、节点星图、时间河、AI 灯塔和记忆图谱的统一入口。">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experienceNodes.map((node) => <CelestialPanel key={node.id} node={node} />)}
        </div>
      </FloatingLayer>
    </ResponsivePageShell>
  )
}
