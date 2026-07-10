import { WorldFallbackScene } from '@/components/world/WorldFallbackScene'

export default function NotFound() {
  return (
    <WorldFallbackScene
      eyebrow="雾区"
      title="你走到了一片尚未命名的区域。"
      description="这里还没有稳定路径，或内容仍在世界深处沉睡。你可以回到地图、打开档案馆，或让灯塔给你一个方向。"
      sceneLabel="Not Found · 可恢复雾区"
      primaryAction={{ href: '/atlas', label: '回到世界地图' }}
      actions={[
        { href: '/archive', label: '打开档案馆' },
        { href: '/ask', label: '点亮灯塔' },
      ]}
    />
  )
}
