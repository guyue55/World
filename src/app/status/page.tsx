import { ProductRouteGuide } from '@/components/product/ProductRouteGuide'
import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { getPublicWorldEvents } from '@/lib/world-events'
import { buildDynamicWorldStatusSurface } from '@/lib/public-world-surfaces'
import { createPageMetadata } from '@/lib/metadata'
import { getAdvancedVisualizationSummary } from '@/lib/advanced-visualization'
import { getAuthorWorldEditorSummary } from '@/lib/author-world-editor'
import { getHighFidelityPolishSummary } from '@/lib/high-fidelity-polish'
import { getLighthouseLocalStatus } from '@/lib/lighthouse-status'
import { getLocalMaturityLedger } from '@/lib/local-maturity-ledger'
import { getPathQualityLedger } from '@/lib/path-quality-ledger'
import { getOwnerReadonlyConsoleLedger } from '@/lib/owner-readonly-console'
import { getAmbientEnvironmentSummary } from '@/lib/ambient-environment'
import { getJourneyMemorySummary } from '@/lib/journey-memory'
import { getLongRunningOpsSummary } from '@/lib/long-running-ops'
import { getSensoryAudioSummary } from '@/lib/sensory-audio'
import { getPublicSceneSummary } from '@/lib/scene-runtime'
import { getScenePersonalitySummary } from '@/lib/scene-personality'
import { getSceneTransitionSummary } from '@/lib/scene-transition'
import { getUltimateCandidateSummary } from '@/lib/ultimate-candidate'
import { getWorldRuntimeStateSummary } from '@/lib/world-runtime-state'
import {
  AdvancedVisualizationPilotPanel,
  AiLowLightStatusPanel,
  AuthorWorldEditorPanel,
  DynamicWorldStatusBoard,
  HighFidelityPolishPanel,
  LocalMaturityLedgerPanel,
  LongRunningOpsPanel,
  OwnerReadonlyConsolePanel,
  PathQualityLedgerPanel,
  SceneRuntimeStatusPanel,
  UltimateCandidatePanel,
} from '@/components/status'
import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'

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
  const advancedVisualizationSummary = getAdvancedVisualizationSummary()
  const authorWorldEditorSummary = getAuthorWorldEditorSummary()
  const highFidelityPolishSummary = getHighFidelityPolishSummary()
  const pathQualityLedger = getPathQualityLedger()
  const ownerReadonlyConsoleLedger = getOwnerReadonlyConsoleLedger()
  const ambientEnvironmentSummary = getAmbientEnvironmentSummary()
  const journeyMemorySummary = getJourneyMemorySummary()
  const longRunningOpsSummary = getLongRunningOpsSummary()
  const sensoryAudioSummary = getSensoryAudioSummary()
  const sceneRuntimeSummary = getPublicSceneSummary()
  const scenePersonalitySummary = getScenePersonalitySummary()
  const sceneTransitionSummary = getSceneTransitionSummary()
  const ultimateCandidateSummary = getUltimateCandidateSummary()
  const runtimeStateSummary = getWorldRuntimeStateSummary()
  const dynamicWorldStatus = buildDynamicWorldStatusSurface({
    areas,
    nodes: publicNodes,
    paths,
    events: getPublicWorldEvents(),
  })

  return (
    <main className="world-container space-y-10 py-16">
      <SceneWorldPortal
        scene="status"
        eyebrow="STATUS · 维护舱"
        title="本地世界可以被复查，外部发布继续冻结。"
        description="维护舱只展示公开运行态、本地 RC、场景 QA、内容质量和权限边界摘要。它帮助判断 localhost / LAN 是否成熟，不伪装成外部 production。"
        objects={['门禁', '证据', '心跳', '截图', '边界', '本地 RC']}
        primaryAction={{ href: '/', label: '返回世界入口' }}
        secondaryActions={[
          { href: '/atlas', label: '查看星图' },
          { href: '/ask', label: '询问灯塔' },
        ]}
        stats={[
          { label: '公开节点', value: publicNodes.length, note: '可被公开入口读取' },
          { label: '路径', value: paths.length, note: '用于连续探索' },
          { label: '发布状态', value: '冻结', note: '只做本地/LAN 成熟' },
        ]}
      />

      <ProductRouteGuide
        current="世界状态"
        description="这里只展示公开运行态需要知道的状态，不暴露内部阶段页、审计队列或调试面板。"
        primaryHref="/atlas"
        primaryLabel="回到世界地图"
      />

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

      <AdvancedVisualizationPilotPanel summary={advancedVisualizationSummary} />

      <AuthorWorldEditorPanel summary={authorWorldEditorSummary} />

      <HighFidelityPolishPanel summary={highFidelityPolishSummary} />

      <UltimateCandidatePanel summary={ultimateCandidateSummary} />

      <OwnerReadonlyConsolePanel ledger={ownerReadonlyConsoleLedger} />

      <LongRunningOpsPanel summary={longRunningOpsSummary} />

      <SceneRuntimeStatusPanel
        summary={sceneRuntimeSummary}
        ambientEnvironmentSummary={ambientEnvironmentSummary}
        journeyMemorySummary={journeyMemorySummary}
        sensoryAudioSummary={sensoryAudioSummary}
        personalitySummary={scenePersonalitySummary}
        transitionSummary={sceneTransitionSummary}
        runtimeStateSummary={runtimeStateSummary}
      />

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
