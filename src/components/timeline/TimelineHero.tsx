import type { WorldState } from '@/lib/types'
import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'
import type { SceneDeepInteractionModel } from '@/lib/scene-deep-interaction'

const stateLabels = {
  mode: {
    alive: '运行中',
    quiet: '低光运行',
    frozen: '冻结',
    repair: '修复中',
    archive: '归档态',
  },
  season: {
    spring: '春 · 萌发',
    summer: '夏 · 生长',
    autumn: '秋 · 沉淀',
    winter: '冬 · 静读',
  },
  aiStatus: {
    enabled: '灯塔可用',
    'low-light': '灯塔低光',
    disabled: '灯塔关闭',
  },
}

export function TimelineHero({
  state,
  interactionModel,
}: {
  state: WorldState
  interactionModel?: SceneDeepInteractionModel
}) {
  return (
    <SceneWorldPortal
      scene="timeline"
      eyebrow="TIME RIVER · 时间河"
      title="事件不是日志，是世界的水位。"
      description="一颗种子被点亮、一个项目进入工坊、一条法则被写入宪章，都会在时间河中留下可追溯的涟漪。"
      objects={['涟漪', '事件', '回声', '节点', '季节', '流向']}
      primaryAction={{ href: '/archive', label: '查看档案馆' }}
      secondaryActions={[
        { href: '/atlas', label: '回到星图' },
        { href: '/paths', label: '选择路径' },
      ]}
      stats={[
        { label: '运行态', value: stateLabels.mode[state.mode], note: '公开世界当前状态' },
        { label: '季节', value: stateLabels.season[state.season], note: '用于解释节奏' },
        { label: '灯塔', value: stateLabels.aiStatus[state.aiStatus], note: '只读导览边界' },
      ]}
      interactionModel={interactionModel}
    />
  )
}
