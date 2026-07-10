'use client'

import Link from 'next/link'
import { ArrowRight, Clock3, LocateFixed } from 'lucide-react'
import { SceneInspector } from '@/components/world/primitives/SceneInspector'
import type { AtlasAreaView, AtlasLinkView, AtlasNodeView } from '@/lib/scenes/build-atlas-model'
import styles from './AtlasExplorationStage.module.css'

type AtlasInspectorProps = {
  area: AtlasAreaView | null
  node: AtlasNodeView | null
  areaNodes: AtlasNodeView[]
  relatedLinks: AtlasLinkView[]
  areaById: Map<string, AtlasAreaView>
  onClose: () => void
  onSelectArea: (areaId: string) => void
  onSelectNode: (nodeId: string) => void
}

export function AtlasInspector({ area, node, areaNodes, relatedLinks, areaById, onClose, onSelectArea, onSelectNode }: AtlasInspectorProps) {
  const open = Boolean(area)
  const title = node?.title ?? area?.title ?? '星图地点'

  return (
    <SceneInspector open={open} title={title} onClose={onClose}>
      {node && area ? (
        <div className={styles.inspectorBody} data-testid="atlas-node-inspector">
          <p className={styles.inspectorKicker}><LocateFixed size={14} aria-hidden="true" /> {area.title} · 地点</p>
          <p>{node.summary}</p>
          {node.relationReasons[0] ? <p className={styles.relationReason}>与世界相连：{node.relationReasons[0]}</p> : null}
          <Link href={node.href} className={styles.primaryJourneyLink} data-atlas-enter-node>
            进入地点 <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button type="button" className={styles.backToArea} onClick={() => onSelectArea(area.id)}>返回 {area.title}</button>
        </div>
      ) : area ? (
        <div className={styles.inspectorBody} data-testid="atlas-area-inspector">
          <p className={styles.inspectorKicker}>{area.icon} {area.realName}</p>
          <p>{area.description}</p>
          <p className={styles.areaCount}>{area.publicNodeCount} 个公开地点，这里先点亮 3 个入口。</p>
          <div className={styles.nodeChoices} aria-label={`${area.title}代表地点`}>
            {areaNodes.map((entry) => (
              <button key={entry.id} type="button" onClick={() => onSelectNode(entry.id)}>
                <span>{entry.title}</span><ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.relationList} aria-label="相邻星域">
            {relatedLinks.map((link) => {
              const targetId = link.from === area.id ? link.to : link.from
              const target = areaById.get(targetId)
              return target ? (
                <button key={link.id} type="button" onClick={() => onSelectArea(target.id)}>
                  <span>{target.title}</span><small>{link.reason}</small>
                </button>
              ) : null
            })}
          </div>
          <Link href={`/timeline?area=${area.id}`} className={styles.timelineLink}>
            <Clock3 size={15} aria-hidden="true" /> 看这片星域的时间
          </Link>
        </div>
      ) : null}
    </SceneInspector>
  )
}
