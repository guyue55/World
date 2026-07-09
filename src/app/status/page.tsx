import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { getPublicWorldEvents } from '@/lib/world-events'
import { buildDynamicWorldStatusSurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { getLighthouseLocalStatus } from '@/lib/lighthouse-status'
import { getLocalMaturityLedger } from '@/lib/local-maturity-ledger'
import { getPathQualityLedger } from '@/lib/path-quality-ledger'
import { getOwnerReadonlyConsoleLedger } from '@/lib/owner-readonly-console'
import { getPublicSceneSummary } from '@/lib/scene-runtime'
import { DynamicWorldStatusBoard } from '@/components/status/DynamicWorldStatusBoard'
import { AiLowLightStatusPanel } from '@/components/status/AiLowLightStatusPanel'
import { LocalMaturityLedgerPanel } from '@/components/status/LocalMaturityLedgerPanel'
import { PathQualityLedgerPanel } from '@/components/status/PathQualityLedgerPanel'
import { OwnerReadonlyConsolePanel } from '@/components/status/OwnerReadonlyConsolePanel'
import { SceneRuntimeStatusPanel } from '@/components/status/SceneRuntimeStatusPanel'

export const metadata = createPageMetadata({
  title: '世界状态',
  description: '古月浮屿的公开运行状态：入口、索引、边界、构建和上线证据。',
  path: '/status',
})

const statusCards = [
  {
    title: '公开入口',
    value: '已收束',
    description: '主导航只保留入口、地图、时间、档案、灯塔与宪章。',
  },
  {
    title: '权限边界',
    value: '已守门',
    description: '私密、家庭、保险箱内容不进入公开索引；旧阶段入口由 middleware 收束。',
  },
  {
    title: 'AI 灯塔',
    value: '低光模式',
    description: '只做公开导览和路径推荐，不写入、不修改、不读取私密层。',
  },
  {
    title: '生产状态',
    value: '待外部签收',
    description: '本地门禁与构建产物验证通过；真实域名、线上 smoke 和人工签收仍需外部环境完成。',
  },
]

export default function StatusPage() {
  const publicNodes = getPublicNodes()
  const areas = getAllAreas().filter((area) => area.level === 1)
  const paths = getAllPaths()
  const lighthouseStatus = getLighthouseLocalStatus()
  const localMaturityLedger = getLocalMaturityLedger()
  const pathQualityLedger = getPathQualityLedger()
  const ownerReadonlyConsoleLedger = getOwnerReadonlyConsoleLedger()
  const sceneRuntimeSummary = getPublicSceneSummary()
  const dynamicWorldStatus = buildDynamicWorldStatusSurface({
    areas,
    nodes: publicNodes,
    paths,
    events: getPublicWorldEvents(),
  })

  return (
    <main className="world-container space-y-10 py-16">
      <ProductRouteGuide
        current="世界状态"
        description="这里只展示公开运行态需要知道的状态，不暴露内部阶段页、审计队列或调试面板。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />

      <section className="rounded-[2.2rem] border border-white/65 bg-night p-8 text-paper shadow-soft md:p-10">
        <p className="text-xs font-semibold tracking-[0.35em] text-gold">运行态</p>
        <h1 className="mt-3 break-words text-4xl font-semibold md:text-5xl">世界可以被进入，但上线证据仍需真实环境补齐。</h1>
        <p className="mt-5 max-w-3xl break-words text-base leading-8 text-paper/70">
          当前代码已经完成产品入口收束、公开索引守门和本地构建产物验证。这里不会伪装为 productionLive，真实外部 URL、线上 smoke test、域名 HTTPS 与人工签收仍需要在部署平台完成。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => (
          <article key={card.title} className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur">
            <p className="truncate text-sm text-ink/50">{card.title}</p>
            <h2 className="mt-3 break-words text-2xl font-semibold text-ink">{card.value}</h2>
            <p className="mt-3 break-words text-sm leading-7 text-ink/62">{card.description}</p>
          </article>
        ))}
      </section>

      <DynamicWorldStatusBoard surface={dynamicWorldStatus} />

      <AiLowLightStatusPanel status={lighthouseStatus} />

      <LocalMaturityLedgerPanel ledger={localMaturityLedger} />

      <PathQualityLedgerPanel ledger={pathQualityLedger} />

      <OwnerReadonlyConsolePanel ledger={ownerReadonlyConsoleLedger} />

      <SceneRuntimeStatusPanel summary={sceneRuntimeSummary} />

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="min-w-0 rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="truncate text-xs font-semibold tracking-[0.35em] text-moss">节点</p>
          <h2 className="mt-3 truncate text-4xl font-semibold text-ink">{publicNodes.length}</h2>
          <p className="mt-3 break-words text-sm leading-7 text-ink/62">公开节点可被地图、档案馆和灯塔低光导览读取。</p>
        </div>
        <div className="min-w-0 rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="truncate text-xs font-semibold tracking-[0.35em] text-moss">主区域</p>
          <h2 className="mt-3 truncate text-4xl font-semibold text-ink">{areas.length}</h2>
          <p className="mt-3 break-words text-sm leading-7 text-ink/62">一级世界区域保持少而清晰，深层内容通过节点和路径进入。</p>
        </div>
        <div className="min-w-0 rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur">
          <p className="truncate text-xs font-semibold tracking-[0.35em] text-moss">路径</p>
          <h2 className="mt-3 truncate text-4xl font-semibold text-ink">{paths.length}</h2>
          <p className="mt-3 break-words text-sm leading-7 text-ink/62">路径用于降低探索门槛，让第一次进入的人不迷路。</p>
        </div>
      </section>
    </main>
  )
}
