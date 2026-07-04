import type { LifeStage } from '@/lib/types'

const labels: Record<LifeStage, string> = {
  seed: '种子',
  sprout: '发芽',
  growing: '生长',
  bloom: '开花',
  fruit: '结果',
  archive: '归档',
  relic: '遗迹',
  dormant: '沉睡',
  silent: '沉默',
}

export function NodeLifeStageBadge({ stage, compact = false }: { stage: LifeStage; compact?: boolean }) {
  return (
    <span className="inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-ink/70">
      {compact ? labels[stage] : `生命阶段：${labels[stage]}`}
    </span>
  )
}
