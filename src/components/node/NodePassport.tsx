import clsx from 'clsx'
import type { Area, LifeStage, Node, NodeType } from '@/lib/types'

export type NodePlaceLifeSignal = { status: 'emerging' | 'growing' | 'ready' | 'archived' | 'quiet'; relationCount: number; pathCount: number; timelineEventCount: number; recommendedPathCount: number }
const lifeStageLabel: Record<LifeStage, string> = { seed: '种子', sprout: '萌芽', growing: '生长中', bloom: '盛放', fruit: '结果', archive: '沉淀', relic: '遗迹', dormant: '休眠', silent: '沉默' }
const typeLabel: Record<NodeType, string> = { article: '文章', project: '项目', fragment: '灵感', memory: '记忆', photo: '照片', document: '文档', letter: '信件', place: '地点', object: '物件', rule: '法则', path: '路径', event: '事件' }

export function NodePassport({ node, area, lifeSignal, compact = false, className }: { node: Node; area?: Area; lifeSignal?: NodePlaceLifeSignal; compact?: boolean; className?: string }) {
  return <section className={clsx('node-passport', compact && 'node-passport--compact', className)} aria-label="地点护照">
    <p>地点护照</p>
    <dl>
      <div><dt>区域</dt><dd>{area?.worldName ?? node.areaId}</dd></div>
      <div><dt>形态</dt><dd>{typeLabel[node.type]}</dd></div>
      <div><dt>阶段</dt><dd>{lifeStageLabel[node.lifeStage]}</dd></div>
      {lifeSignal ? <><div><dt>关系</dt><dd>{lifeSignal.relationCount}</dd></div><div><dt>路径</dt><dd>{lifeSignal.pathCount}</dd></div><div><dt>时间锚</dt><dd>{lifeSignal.timelineEventCount}</dd></div></> : null}
    </dl>
  </section>
}
