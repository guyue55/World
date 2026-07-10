import Link from 'next/link'
import type { Area, LifeStage, Node, NodeType, Visibility } from '@/lib/types'

export type NodePlaceLifeSignal = {
  status: 'emerging' | 'growing' | 'ready' | 'archived' | 'quiet'
  relationCount: number
  pathCount: number
  timelineEventCount: number
  recommendedPathCount: number
}

const visibilityLabel: Record<Visibility, string> = {
  public: '公开',
  unlisted: '不列入索引',
  semiPublic: '半公开',
  private: '私密',
  family: '亲友可见',
  partner: '双方可见',
  vault: '保险箱',
  sealed: '封存',
  silent: '沉默',
}

const lifeStageLabel: Record<LifeStage, string> = {
  seed: '种子',
  sprout: '萌芽',
  growing: '生长中',
  bloom: '盛放',
  fruit: '结果',
  archive: '沉淀',
  relic: '遗迹',
  dormant: '休眠',
  silent: '沉默',
}

const typeLabel: Record<NodeType, string> = {
  article: '文章',
  project: '项目',
  fragment: '灵感',
  memory: '记忆',
  photo: '照片',
  document: '文档',
  letter: '信件',
  place: '地点',
  object: '物件',
  rule: '法则',
  path: '路径',
  event: '事件',
}

const lifeStatusLabel: Record<NodePlaceLifeSignal['status'], string> = {
  emerging: '正在显影',
  growing: '持续生长',
  ready: '适合阅读',
  archived: '已经沉淀',
  quiet: '低光静置',
}

export function NodePassport({ node, area, lifeSignal }: { node: Node; area?: Area; lifeSignal?: NodePlaceLifeSignal }) {
  return (
    <section className="rounded-[1.75rem] border border-white/65 bg-white/76 p-6 shadow-soft backdrop-blur">
      <p className="text-xs font-semibold tracking-[0.32em] text-moss">NODE PASSPORT · 地点护照</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">节点护照</h2>
      <p className="mt-2 text-sm leading-7 text-ink/60">
        这不是内部字段面板，而是帮助读者理解这个节点的位置、状态与下一步的公开说明。
      </p>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-ink/50">它是什么</dt>
          <dd className="mt-1 font-medium text-ink">{typeLabel[node.type]}</dd>
        </div>
        <div>
          <dt className="text-ink/50">属于哪里</dt>
          <dd className="mt-1 font-medium text-ink">{area?.worldName ?? node.areaId}</dd>
        </div>
        <div>
          <dt className="text-ink/50">当前状态</dt>
          <dd className="mt-1 font-medium text-ink">{lifeStageLabel[node.lifeStage]}</dd>
        </div>
        <div>
          <dt className="text-ink/50">可见边界</dt>
          <dd className="mt-1 font-medium text-ink">{visibilityLabel[node.visibility]}</dd>
        </div>
        {lifeSignal && (
          <div>
            <dt className="text-ink/50">内容生命</dt>
            <dd className="mt-3 grid grid-cols-2 gap-2">
              <span className="rounded-[0.9rem] bg-paper/70 px-3 py-2">
                <span className="block text-xs text-ink/46">状态</span>
                <span className="mt-1 block truncate font-medium text-ink">{lifeStatusLabel[lifeSignal.status]}</span>
              </span>
              <span className="rounded-[0.9rem] bg-paper/70 px-3 py-2">
                <span className="block text-xs text-ink/46">关系</span>
                <span className="mt-1 block font-medium text-ink">{lifeSignal.relationCount} 条</span>
              </span>
              <span className="rounded-[0.9rem] bg-paper/70 px-3 py-2">
                <span className="block text-xs text-ink/46">路径</span>
                <span className="mt-1 block font-medium text-ink">{lifeSignal.pathCount} 条</span>
              </span>
              <span className="rounded-[0.9rem] bg-paper/70 px-3 py-2">
                <span className="block text-xs text-ink/46">时间锚点</span>
                <span className="mt-1 block font-medium text-ink">{lifeSignal.timelineEventCount} 个</span>
              </span>
            </dd>
          </div>
        )}
        <div>
          <dt className="text-ink/50">为什么存在</dt>
          <dd className="mt-1 leading-7 text-ink/68">{node.summary ?? '它被安放在世界中，等待继续生长。'}</dd>
        </div>
        <div>
          <dt className="text-ink/50">可以去哪</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            <Link className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper" href="/atlas">地图</Link>
            <Link className="rounded-full bg-ink/5 px-3 py-1.5 text-xs font-semibold text-ink/70" href="/timeline">时间流</Link>
            <Link className="rounded-full bg-ink/5 px-3 py-1.5 text-xs font-semibold text-ink/70" href="/archive">档案馆</Link>
          </dd>
        </div>
      </dl>
    </section>
  )
}
